import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import AdminLayout from '../components/AdminLayout';
import { formatVND } from '@repo/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminDashboard() {
  // Lấy dữ liệu thống kê từ API Super Admin
  const { data: statsRes, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/admin/stats`, {
        withCredentials: true,
      });
      return res.data;
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
          <span className="text-sm font-bold text-slate-500">Đang tải dữ liệu hệ thống...</span>
        </div>
      </div>
    );
  }

  const stats = statsRes?.data || { 
    totalTenants: 0, 
    activeTenants: 0,
    activeTrials: 0,
    expiringTrials: 0,
    expiredTrials: 0,
    activeSubscriptions: 0,
    totalUsers: 0,
    totalOrders: 0, 
    totalRevenue: 0, 
    recentOrders: [] 
  };

  return (
    <AdminLayout title="Tổng Quan Hệ Thống" subtitle="Trung tâm giám sát toàn bộ hoạt động kinh doanh và vận hành của nền tảng PlatformBDS SaaS.">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Stat 1 */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Tổng Doanh Thu</span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              {formatVND(stats.totalRevenue)}
            </span>
          </div>
          <p className="text-xs text-emerald-600 font-semibold mt-2">Từ các đơn hàng đã thanh toán</p>
        </div>

        {/* Stat 2 */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Website Đang Hoạt Động</span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-indigo-600 tracking-tight">{stats.activeTenants}</span>
            <span className="text-xs font-bold text-slate-500">/ {stats.totalTenants} tổng website</span>
          </div>
          <p className="text-xs text-indigo-600 font-semibold mt-2">{stats.activeSubscriptions} gói thuê năm</p>
        </div>

        {/* Stat 3 */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Website Đang Dùng Thử</span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-600 tracking-tight">{stats.activeTrials}</span>
            <span className="text-xs font-bold text-amber-600">trial</span>
          </div>
          <p className="text-xs text-amber-600 font-semibold mt-2">{stats.expiringTrials} trial sắp hết hạn (&lt;24h)</p>
        </div>

        {/* Stat 4 */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Tổng Giao Dịch</span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 tracking-tight">{stats.totalOrders}</span>
            <span className="text-xs font-bold text-slate-500">đơn hàng</span>
          </div>
          <p className="text-xs text-slate-500 font-semibold mt-2">{stats.totalUsers} khách hàng</p>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="mb-8">
        <h3 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-3">Thao Tác Nhanh Quản Trị</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/customers"
            className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
              👤
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Tạo Khách Hàng</p>
              <p className="text-[10px] text-slate-400">Cấp tài khoản & Trial</p>
            </div>
          </Link>

          <Link
            href="/tenants"
            className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
              🌐
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Tạo Website Mới</p>
              <p className="text-[10px] text-slate-400">Khởi tạo tenant</p>
            </div>
          </Link>

          <Link
            href="/templates"
            className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-200 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
              🎨
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Quản Lý Template</p>
              <p className="text-[10px] text-slate-400">16+ Mẫu & Giá bán</p>
            </div>
          </Link>

          <Link
            href="/orders"
            className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-rose-200 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
              💳
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Xét Duyệt Đơn Hàng</p>
              <p className="text-[10px] text-slate-400">Kích hoạt chuyển khoản</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Giao Dịch Gần Đây</h3>
          <Link href="/orders" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-all flex items-center gap-1">
            Xem tất cả đơn hàng
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <table className="w-full border-collapse text-left text-sm text-slate-700">
          <thead className="bg-slate-50/30 text-xs font-bold text-slate-400 border-b border-slate-100">
            <tr>
              <th className="px-8 py-4">Mã đơn hàng</th>
              <th className="px-8 py-4">Khách hàng</th>
              <th className="px-8 py-4">Loại hình</th>
              <th className="px-8 py-4">Số tiền</th>
              <th className="px-8 py-4">Trạng thái</th>
              <th className="px-8 py-4">Mã giao dịch</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {stats.recentOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-8 py-12 text-center text-slate-400 font-semibold">Không có giao dịch nào gần đây.</td>
              </tr>
            ) : (
              stats.recentOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4 font-mono font-bold text-slate-800">{order.orderNumber}</td>
                  <td className="px-8 py-4">
                    <div>
                      <div className="font-bold text-slate-800">{order.fullName}</div>
                      <div className="text-xs text-slate-400 font-semibold">{order.email}</div>
                    </div>
                  </td>
                  <td className="px-8 py-4 font-bold text-xs uppercase tracking-wider text-slate-500">
                    {order.type === 'BUY' ? 'Mua Source Code' : 'Thuê Subdomain'}
                  </td>
                  <td className="px-8 py-4 font-extrabold text-slate-800">
                    {formatVND(order.amount)}
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
