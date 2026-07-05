import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

export default function AdminOrders() {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [rejectNotes, setRejectNotes] = useState('');

  // 1. Query danh sách đơn hàng chờ duyệt và đã hoàn thành
  const { data: ordersRes, isLoading } = useQuery({
    queryKey: ['adminOrders'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/admin/orders', {
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
        `http://localhost:5000/api/admin/orders/${id}/approve`,
        { version },
        {
          headers: { 'X-CSRF-Token': csrfToken || '' },
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: (res) => {
      alert(res.data.status === 'AWAITING_MANUAL_REVIEW' 
        ? 'Phát hiện trùng lặp subdomain. Đơn hàng chuyển sang hàng chờ xử lý đổi slug.'
        : 'Đã phê duyệt đơn hàng & tự động khởi tạo Tenant Website thành công!'
      );
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
        `http://localhost:5000/api/admin/orders/${id}/reject`,
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
      <div className="flex min-h-screen items-center justify-center bg-[#F8F6F3]">
        <div className="text-lg font-medium text-[#7F7F8F]">Đang tải danh sách đơn hàng...</div>
      </div>
    );
  }

  const orders = ordersRes?.data || [];

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      {/* Navbar */}
      <nav className="border-b border-[#E5E0D8] bg-white px-8 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-8">
            <span className="text-xl font-bold text-[#1A1A2E]">SUPER ADMIN PANEL</span>
            <div className="flex space-x-6 text-sm font-medium text-[#7F7F8F]">
              <Link href="/" className="hover:text-[#1A1A2E]">Tổng quan</Link>
              <Link href="/orders" className="text-[#C5A572] hover:text-[#B8941F]">Quản lý đơn hàng</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1A2E]">Duyệt Đơn Hàng & Kích Hoạt</h1>
          <p className="text-sm text-[#7F7F8F] mt-1">Kiểm tra thông tin giao dịch chuyển khoản và ảnh hóa đơn.</p>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-[#E5E0D8] bg-white shadow-sm overflow-hidden mb-10">
          <table className="w-full border-collapse text-left text-sm text-[#1A1A2E]">
            <thead className="bg-[#F8F6F3] text-xs font-semibold text-[#7F7F8F]">
              <tr>
                <th className="px-6 py-3">Mã đơn hàng</th>
                <th className="px-6 py-3">Khách hàng</th>
                <th className="px-6 py-3">Subdomain yêu cầu</th>
                <th className="px-6 py-3">Số tiền</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3">Mã giao dịch</th>
                <th className="px-6 py-3 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8]">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-[#7F7F8F]">Không có đơn hàng nào cần duyệt.</td>
                </tr>
              ) : (
                orders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono font-semibold">{order.orderNumber}</td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold">{order.fullName}</div>
                        <div className="text-xs text-[#7F7F8F]">{order.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#C5A572]">{order.subdomain || 'Mua Source (Không)'}</td>
                    <td className="px-6 py-4 font-semibold">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                        order.status === 'WAITING_CONFIRM' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'PENDING' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{order.transactionCode || 'Chưa nạp'}</td>
                    <td className="px-6 py-4 text-right">
                      {order.status === 'WAITING_CONFIRM' && (
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="rounded-lg bg-[#C5A572] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#B8941F] transition-colors"
                        >
                          Xem & Xét Duyệt
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal Xét Duyệt Chi Tiết */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg border border-[#E5E0D8] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-4">Xét Duyệt Đơn Hàng: {selectedOrder.orderNumber}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-[#7F7F8F] mb-2">Thông tin hóa đơn chuyển khoản</h3>
                {selectedOrder.billImageUrl ? (
                  <img
                    src={selectedOrder.billImageUrl}
                    alt="Biên lai thanh toán"
                    className="w-full h-auto rounded-lg border border-[#E5E0D8] object-cover"
                  />
                ) : (
                  <div className="rounded-lg bg-gray-100 py-20 text-center text-sm text-[#7F7F8F]">Khách hàng chưa tải ảnh hóa đơn.</div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs text-[#7F7F8F]">Khách hàng</span>
                  <p className="font-semibold">{selectedOrder.fullName}</p>
                </div>
                <div>
                  <span className="text-xs text-[#7F7F8F]">Mã giao dịch ngân hàng</span>
                  <p className="font-mono font-semibold text-sm">{selectedOrder.transactionCode || 'Không nạp'}</p>
                </div>
                <div>
                  <span className="text-xs text-[#7F7F8F]">Số tiền cần thanh toán</span>
                  <p className="text-lg font-bold text-[#1A1A2E]">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedOrder.amount)}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E0D8]">
                  <label className="block text-xs font-semibold text-[#7F7F8F] mb-2">Ghi chú từ chối (nếu có)</label>
                  <textarea
                    value={rejectNotes}
                    onChange={(e) => setRejectNotes(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E0D8] px-3 py-2 text-sm focus:border-[#C5A572] focus:outline-none"
                    placeholder="Mã giao dịch sai, tiền chưa nổi..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 border-t border-[#E5E0D8] pt-4">
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg border border-[#E5E0D8] px-4 py-2 text-sm font-semibold text-[#1A1A2E] hover:bg-gray-50"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => rejectMutation.mutate({ id: selectedOrder.id, version: selectedOrder.version, notes: rejectNotes })}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Từ Chối Giao Dịch
              </button>
              <button
                onClick={() => approveMutation.mutate({ id: selectedOrder.id, version: selectedOrder.version })}
                className="rounded-lg bg-[#C5A572] px-4 py-2 text-sm font-semibold text-white hover:bg-[#B8941F]"
              >
                Phê Duyệt & Kích Hoạt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
