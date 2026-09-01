import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import AdminLayout from '../components/AdminLayout';
import { formatVND } from '@repo/utils';
import { 
  DollarSign, Globe, ShoppingBag, 
  ArrowUpRight, Users, Sparkles, ChevronRight
} from 'lucide-react';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));

export default function AdminDashboard() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const clockInterval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const formatFullDateTime = (date: Date) => {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const mins = String(date.getMinutes()).padStart(2, '0');
    const secs = String(date.getSeconds()).padStart(2, '0');
    return `${dayName}, ${day}/${month}/${year} - ${hours}:${mins}:${secs}`;
  };

  // 1. Stats query
  const { data: statsRes, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/admin/stats`, { withCredentials: true });
      return res.data;
    },
    refetchInterval: 30000,
  });

  // 2. Leads query
  const { data: leadsRes } = useQuery({
    queryKey: ['adminDashboardLeads'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/admin/leads?limit=5`, { withCredentials: true });
      return res.data;
    },
    refetchInterval: 30000,
  });

  // 3. Orders query
  const { data: ordersRes } = useQuery({
    queryKey: ['adminDashboardOrders'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/admin/orders?limit=5`, { withCredentials: true });
      return res.data;
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-bold text-slate-600">Đang tải trung tâm quản trị...</span>
        </div>
      </div>
    );
  }

  const stats = statsRes?.data || { 
    totalTenants: 0, 
    activeTenants: 0,
    activeTrials: 0,
    totalUsers: 0,
    totalOrders: 0, 
    totalRevenue: 0, 
  };

  const realOrders: any[] = (ordersRes?.data || []).filter((o: any) => o.amount > 0 && !o.note?.includes('[LIÊN HỆ TƯ VẤN]'));
  const pendingOrders = realOrders.filter((o: any) => o.status === 'PENDING' || o.status === 'WAITING_CONFIRM');
  const recentLeads: any[] = leadsRes?.data?.leads || [];
  const leadsCounts = leadsRes?.data?.counts || { total: 0, newCount: 0 };

  const actualRevenue = stats.totalRevenue || 0;

  return (
    <AdminLayout 
      title="Tổng Quan Hệ Thống & Doanh Thu" 
      subtitle="Giám sát minh bạch hoạt động kinh doanh, đơn hàng mua bản quyền và khách hàng tư vấn CRM."
    >
      {/* ─── LIVE REALTIME STATUS BAR ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <span>Hệ Thống Trực Tuyến:</span>
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-mono font-extrabold border border-emerald-200 shadow-xs">
              {now ? formatFullDateTime(now) : 'Đang đồng bộ...'}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tự động cập nhật mỗi 5 giây</span>
          </span>
        </div>
      </div>

      {/* ─── 4 MAIN KPI CARDS (CLEAN & TRUTHFUL) ─── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Card 1: Doanh Thu Thực Thu */}
        <div className="rounded-2xl bg-white p-5 shadow-xs border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Doanh Thu Thực Thu</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 tracking-tight font-mono">
              {formatVND(actualRevenue)}
            </span>
          </div>
          <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Tiền đã vào tài khoản ngân hàng</span>
          </p>
        </div>

        {/* Card 2: Đơn Mua Chờ Duyệt */}
        <Link href="/orders" className="rounded-2xl bg-white p-5 shadow-xs border border-slate-100 relative overflow-hidden group hover:shadow-md hover:border-indigo-300 transition-all block">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Đơn Mua Chờ Duyệt</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-600 tracking-tight font-mono">{pendingOrders.length}</span>
            <span className="text-xs font-bold text-slate-400">/ {realOrders.length} đơn</span>
          </div>
          <p className="text-xs text-amber-700 font-semibold mt-2 flex items-center gap-1">
            <span>{pendingOrders.length > 0 ? 'Có đơn cần duyệt kích hoạt web' : 'Tất cả đơn đã được xử lý'}</span>
            <ChevronRight className="w-3.5 h-3.5 ml-auto" />
          </p>
        </Link>

        {/* Card 3: Khách Tư Vấn CRM */}
        <Link href="/leads" className="rounded-2xl bg-white p-5 shadow-xs border border-slate-100 relative overflow-hidden group hover:shadow-md hover:border-rose-300 transition-all block">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Khách Tư Vấn CRM</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Users className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-600 tracking-tight font-mono">{leadsCounts.total}</span>
            <span className="text-xs font-bold text-slate-400">khách ({leadsCounts.newCount} mới)</span>
          </div>
          <p className="text-xs text-rose-600 font-semibold mt-2 flex items-center gap-1">
            <span>Điền form nhận bảng giá & tài liệu</span>
            <ChevronRight className="w-3.5 h-3.5 ml-auto" />
          </p>
        </Link>

        {/* Card 4: Website Khách Hàng */}
        <Link href="/tenants" className="rounded-2xl bg-white p-5 shadow-xs border border-slate-100 relative overflow-hidden group hover:shadow-md hover:border-blue-300 transition-all block">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Website Khách Hàng</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Globe className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-blue-600 tracking-tight font-mono">{stats.activeTenants}</span>
            <span className="text-xs font-bold text-slate-400">/ {stats.totalTenants} tổng web</span>
          </div>
          <p className="text-xs text-blue-600 font-semibold mt-2 flex items-center gap-1">
            <span>{stats.activeTrials} web đang dùng thử (Trial)</span>
            <ChevronRight className="w-3.5 h-3.5 ml-auto" />
          </p>
        </Link>
      </div>

      {/* ─── TWO MAIN GRIDS: RECENT ORDERS & RECENT CRM LEADS ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Box 1: Đơn Hàng Mua Bản Quyền Gần Đây */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Đơn Hàng Mua Bản Quyền</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Khách đặt mua mã nguồn & thuê website SaaS</p>
              </div>
              <Link href="/orders" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5">
                <span>Xem tất cả</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {realOrders.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs font-semibold">
                Chưa có đơn hàng mua bản quyền nào.
              </div>
            ) : (
              <div className="space-y-3">
                {realOrders.slice(0, 4).map((order: any) => (
                  <div key={order.id} className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-all border border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-xs text-slate-900">{order.orderNumber}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${order.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {order.status === 'COMPLETED' ? 'Đã duyệt' : 'Chờ duyệt'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-1">
                        {order.fullName} • {order.template?.name || 'Mẫu BĐS'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-black text-sm text-slate-900 block">{formatVND(order.amount)}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 text-right">
            <Link href="/orders" className="text-xs font-extrabold text-indigo-600 hover:underline">
              Xét duyệt các đơn hàng chờ →
            </Link>
          </div>
        </div>

        {/* Box 2: Khách Hàng Tư Vấn CRM Gần Đây */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Khách Tư Vấn CRM Mới Nhất</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Khách điền form nhận bảng giá, tài liệu & tư vấn</p>
              </div>
              <Link href="/leads" className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-0.5">
                <span>Xem CRM</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentLeads.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs font-semibold">
                Chưa có yêu cầu tư vấn nào.
              </div>
            ) : (
              <div className="space-y-3">
                {recentLeads.slice(0, 4).map((lead: any) => {
                  const cleanPhone = lead.phone.replace(/\D/g, '');
                  return (
                    <div key={lead.id} className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-all border border-slate-100 flex items-center justify-between">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 truncate">{lead.fullName || 'Khách vãng lai'}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                            {lead.isMarketplace ? 'Mẫu Demo' : 'Website Khách'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium mt-1 truncate max-w-[220px]">
                          {lead.projectTitle || 'Bất động sản'}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="font-mono font-bold text-xs text-slate-800 mr-1">{lead.phone}</span>
                        {cleanPhone && (
                          <a
                            href={`https://zalo.me/${cleanPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-[10px] font-bold"
                          >
                            Zalo
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 text-right">
            <Link href="/leads" className="text-xs font-extrabold text-rose-600 hover:underline">
              Quản lý toàn bộ khách tư vấn CRM →
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
