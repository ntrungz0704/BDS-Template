import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

export default function AdminDashboard() {
  // Lấy dữ liệu thống kê từ API Super Admin
  const { data: statsRes, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/admin/stats', {
        withCredentials: true,
      });
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F6F3]">
        <div className="text-lg font-medium text-[#7F7F8F]">Đang tải dữ liệu hệ thống...</div>
      </div>
    );
  }

  const stats = statsRes?.data || { totalTenants: 0, totalOrders: 0, totalRevenue: 0, recentOrders: [] };

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      {/* Navbar */}
      <nav className="border-b border-[#E5E0D8] bg-white px-8 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-8">
            <span className="text-xl font-bold text-[#1A1A2E]">SUPER ADMIN PANEL</span>
            <div className="flex space-x-6 text-sm font-medium text-[#7F7F8F]">
              <Link href="/" className="text-[#C5A572] hover:text-[#B8941F]">Tổng quan</Link>
              <Link href="/orders" className="hover:text-[#1A1A2E]">Quản lý đơn hàng</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-semibold text-[#1A1A2E]">Admin User</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1A2E]">Tổng Quan Hệ Thống</h1>
          <p className="text-sm text-[#7F7F8F] mt-1">Theo dõi hoạt động kinh doanh và kích hoạt Tenant SaaS.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-10">
          <div className="rounded-xl border border-[#E5E0D8] bg-white p-6 shadow-sm">
            <span className="text-sm font-medium text-[#7F7F8F]">Tổng Doanh Thu</span>
            <div className="mt-2 text-3xl font-bold text-[#1A1A2E]">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.totalRevenue)}
            </div>
          </div>

          <div className="rounded-xl border border-[#E5E0D8] bg-white p-6 shadow-sm">
            <span className="text-sm font-medium text-[#7F7F8F]">Số Lượng Website Khách Thuê (Tenants)</span>
            <div className="mt-2 text-3xl font-bold text-[#1A1A2E]">{stats.totalTenants}</div>
          </div>

          <div className="rounded-xl border border-[#E5E0D8] bg-white p-6 shadow-sm">
            <span className="text-sm font-medium text-[#7F7F8F]">Tổng Số Đơn Hàng</span>
            <div className="mt-2 text-3xl font-bold text-[#1A1A2E]">{stats.totalOrders}</div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="rounded-xl border border-[#E5E0D8] bg-white shadow-sm overflow-hidden">
          <div className="border-b border-[#E5E0D8] px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-bold text-[#1A1A2E]">Giao Dịch Gần Đây</h2>
            <Link href="/orders" className="text-xs font-semibold text-[#C5A572] hover:underline">Xem tất cả đơn hàng</Link>
          </div>
          
          <table className="w-full border-collapse text-left text-sm text-[#1A1A2E]">
            <thead className="bg-[#F8F6F3] text-xs font-semibold text-[#7F7F8F]">
              <tr>
                <th className="px-6 py-3">Mã đơn hàng</th>
                <th className="px-6 py-3">Khách hàng</th>
                <th className="px-6 py-3">Loại hình</th>
                <th className="px-6 py-3">Số tiền</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3">Mã giao dịch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8]">
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-[#7F7F8F]">Không có giao dịch nào gần đây.</td>
                </tr>
              ) : (
                stats.recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono font-semibold">{order.orderNumber}</td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold">{order.fullName}</div>
                        <div className="text-xs text-[#7F7F8F]">{order.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{order.type === 'BUY' ? 'Mua Source Code' : 'Thuê Subdomain'}</td>
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
