import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { 
  LogOut, LayoutDashboard, Users, ShoppingCart, Settings, ArrowLeft, BarChart3, Database,
  Check, X, ShieldAlert, Wifi, WifiOff, Lock, Unlock, Loader2, ChevronRight, Plus, Sparkles, Globe, UserPlus, FileText
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [rejectNotes, setRejectNotes] = useState('');
  const [showCreateTenantModal, setShowCreateTenantModal] = useState(false);
  const [newTenantData, setNewTenantData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subdomain: '',
    templateId: 'luxury-gold',
    plan: 'STARTER'
  });

  // 1. Fetch Stats
  const { data: statsRes, error: statsError, isLoading: statsLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/admin/stats`, { withCredentials: true });
      return res.data;
    },
    retry: 1,
  });

  // 2. Fetch Orders
  const { data: ordersRes, isLoading: ordersLoading } = useQuery({
    queryKey: ['adminOrders'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/admin/orders?limit=50`, { withCredentials: true });
      return res.data;
    },
    enabled: activeTab === 'orders' || activeTab === 'overview',
  });

  // 3. Fetch Tenants (Customers)
  const { data: tenantsRes, isLoading: tenantsLoading } = useQuery({
    queryKey: ['adminTenants'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/admin/tenants`, { withCredentials: true });
      return res.data;
    },
    enabled: activeTab === 'users',
  });

  // Approve Order Mutation
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
      alert(res.data.status === 'PENDING_SUBDOMAIN_CONFLICT' 
        ? 'Phát hiện trùng lặp subdomain. Đơn hàng chuyển sang hàng chờ xử lý đổi slug.'
        : 'Đã phê duyệt đơn hàng & tự động khởi tạo Tenant Website thành công!'
      );
      setSelectedOrder(null);
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.error?.message || 'Có lỗi xảy ra khi duyệt đơn hàng.');
    },
  });

  // Reject Order Mutation
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
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.error?.message || 'Có lỗi xảy ra khi từ chối đơn hàng.');
    },
  });

  // Toggle Tenant Status Mutation
  const updateTenantStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.put(
        `${API_URL}/api/admin/tenants/${id}/status`,
        { status },
        {
          headers: { 'X-CSRF-Token': csrfToken || '' },
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTenants'] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.error?.message || 'Có lỗi xảy ra khi cập nhật trạng thái.');
    },
  });

  // Create Tenant Manually Mutation
  const createTenantMutation = useMutation({
    mutationFn: async (data: any) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.post(
        `${API_URL}/api/admin/tenants`,
        data,
        {
          headers: { 'X-CSRF-Token': csrfToken || '' },
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      alert(`🎉 Đã tạo website & tài khoản thành công cho khách hàng ${newTenantData.fullName}!\n\nEmail CMS: ${newTenantData.email}\nMật khẩu mặc định: Password123@ (hoặc khách đăng nhập trực tiếp)\nSubdomain: ${newTenantData.subdomain}.platformbds.vn`);
      setShowCreateTenantModal(false);
      setNewTenantData({
        fullName: '',
        email: '',
        phone: '',
        subdomain: '',
        templateId: 'luxury-gold',
        plan: 'STARTER'
      });
      queryClient.invalidateQueries({ queryKey: ['adminTenants'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || error.response?.data?.error?.message || 'Có lỗi xảy ra khi tạo website.');
    },
  });

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'SUPER_ADMIN')) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // Fallback data when DB is offline or mock values are preferred
  const isOffline = !!statsError;
  const stats = statsRes?.data || {
    totalTenants: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: []
  };

  const orders = ordersRes?.data || [];
  const tenants = tenantsRes?.data || [];

  return (
    <>
      <Head>
        <title>Admin Dashboard | PLATFORMBDS</title>
      </Head>

      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Header />

        <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">System Admin</h1>
              <p className="text-slate-500 mt-1">Quản lý toàn bộ hệ thống PlatformBDS</p>
            </div>
            {isOffline && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold animate-pulse">
                <WifiOff className="w-3.5 h-3.5" /> Chế độ Demo
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar */}
            <aside className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg border border-indigo-200 shrink-0">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-base font-bold text-slate-900 leading-tight truncate">{user.fullName}</h3>
                  <span className="bg-indigo-100 text-indigo-800 text-[9px] font-bold px-2 py-0.5 rounded uppercase mt-1 inline-block">
                    SUPER ADMIN
                  </span>
                </div>
              </div>

              <nav className="flex flex-col gap-1 text-sm font-semibold text-slate-600">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === 'overview' ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" /> Tổng quan
                </button>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === 'orders' ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" /> Quản lý Đơn hàng
                </button>
                <button 
                  onClick={() => setActiveTab('users')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === 'users' ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Users className="w-4 h-4" /> Quản lý Khách hàng
                </button>
                <div className="h-px bg-slate-100 my-2"></div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-rose-600 hover:bg-rose-50 transition-all mt-2"
                >
                  <LogOut className="w-4 h-4" /> Đăng xuất
                </button>
              </nav>
            </aside>

            {/* Content Area */}
            <div className="lg:col-span-9 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 min-h-[500px]">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Tổng quan hệ thống</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-500 font-medium text-sm">Tổng Khách Hàng</span>
                        <Users className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div className="text-3xl font-black text-slate-900">
                        {statsLoading ? '...' : (stats.totalTenants ?? 0).toLocaleString()}
                      </div>
                      <div className="text-emerald-600 text-xs font-semibold mt-1">+12% tuần này</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-500 font-medium text-sm">Đơn hàng mới</span>
                        <ShoppingCart className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div className="text-3xl font-black text-slate-900">
                        {statsLoading ? '...' : (stats.totalOrders ?? 0).toLocaleString()}
                      </div>
                      <div className="text-emerald-600 text-xs font-semibold mt-1">Chờ duyệt</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-500 font-medium text-sm">Doanh thu</span>
                        <BarChart3 className="w-5 h-5 text-amber-500" />
                      </div>
                      <div className="text-3xl font-black text-slate-900 truncate">
                        {statsLoading ? '...' : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(stats.totalRevenue ?? 0)}
                      </div>
                      <div className="text-emerald-600 text-xs font-semibold mt-1">+8% so với tháng trước</div>
                    </div>
                  </div>
                  
                  {/* Status Banner */}
                  <div className={`border rounded-xl p-6 text-center flex flex-col items-center justify-center mb-8 ${
                    isOffline 
                      ? 'border-amber-200 bg-amber-50/50' 
                      : 'border-slate-100 bg-slate-50'
                  }`}>
                    <Database className={`w-12 h-12 mb-4 ${isOffline ? 'text-amber-400' : 'text-indigo-400'}`} />
                    <h3 className="text-lg font-bold text-slate-800">
                      {isOffline ? 'Database Offline (Demo Mode)' : 'Database Connected'}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2 max-w-lg">
                      {isOffline 
                        ? 'Không thể kết nối đến cơ sở dữ liệu PostgreSQL. Hệ thống tự động chuyển sang chế độ Mock Session để đảm bảo trải nghiệm giao diện không bị gián đoạn.' 
                        : 'Hệ thống đang hoạt động trực tuyến. Mọi dữ liệu như Khách hàng, Đơn hàng và Doanh thu được đồng bộ thời gian thực từ cơ sở dữ liệu chính.'
                      }
                    </p>
                  </div>

                  {/* Recent Orders in Overview */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 text-sm">Giao dịch gần đây</h3>
                      <button onClick={() => setActiveTab('orders')} className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-0.5">
                        Xem tất cả <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-slate-100 text-slate-600 uppercase tracking-wider font-bold">
                          <tr>
                            <th className="px-5 py-3 border-b border-slate-200">Mã đơn hàng</th>
                            <th className="px-5 py-3 border-b border-slate-200">Khách hàng</th>
                            <th className="px-5 py-3 border-b border-slate-200">Loại hình</th>
                            <th className="px-5 py-3 border-b border-slate-200">Số tiền</th>
                            <th className="px-5 py-3 border-b border-slate-200">Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {stats.recentOrders?.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="px-5 py-8 text-center text-slate-400">Không có giao dịch gần đây.</td>
                            </tr>
                          ) : (
                            stats.recentOrders?.map((order: any) => (
                              <tr key={order.id} className="hover:bg-slate-50/50">
                                <td className="px-5 py-3.5 font-mono font-bold text-slate-800">{order.orderNumber}</td>
                                <td className="px-5 py-3.5 font-medium text-slate-700">
                                  <div>{order.fullName}</div>
                                  <div className="text-[10px] text-slate-400">{order.email}</div>
                                </td>
                                <td className="px-5 py-3.5 text-slate-600">
                                  {order.type === 'BUY' ? 'Mua đứt' : 'Thuê tháng'}
                                </td>
                                <td className="px-5 py-3.5 font-bold text-slate-800">
                                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(order.amount)}
                                </td>
                                <td className="px-5 py-3.5">
                                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    order.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                                    order.status === 'WAITING_CONFIRM' ? 'bg-amber-100 text-amber-800' :
                                    'bg-slate-100 text-slate-600'
                                  }`}>
                                    {order.status}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ORDER MANAGEMENT */}
              {activeTab === 'orders' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Quản lý Đơn hàng</h2>
                      <p className="text-xs text-slate-400 mt-1">Xem chi tiết giao dịch, xác thực chuyển khoản và kích hoạt tenant website.</p>
                    </div>
                  </div>

                  {ordersLoading ? (
                    <div className="py-20 text-center flex flex-col items-center justify-center text-slate-400">
                      <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-2" />
                      Đang tải danh sách đơn hàng...
                    </div>
                  ) : (
                    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-bold border-b border-slate-200">
                            <tr>
                              <th className="px-5 py-3">Mã đơn hàng</th>
                              <th className="px-5 py-3">Mẫu Template</th>
                              <th className="px-5 py-3">Khách hàng</th>
                              <th className="px-5 py-3">Subdomain yêu cầu</th>
                              <th className="px-5 py-3">Số tiền</th>
                              <th className="px-5 py-3">Trạng thái</th>
                              <th className="px-5 py-3">Mã giao dịch</th>
                              <th className="px-5 py-3 text-right">Hành động</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {orders.length === 0 ? (
                              <tr>
                                <td colSpan={8} className="px-5 py-12 text-center text-slate-400">Không tìm thấy đơn hàng nào trong hệ thống.</td>
                              </tr>
                            ) : (
                              orders.map((order: any) => (
                                <tr key={order.id} className="hover:bg-slate-50/50">
                                  <td className="px-5 py-4 font-mono font-bold text-slate-800">{order.orderNumber}</td>
                                  <td className="px-5 py-4">
                                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-bold truncate max-w-[140px]" title={order.template?.name}>
                                      {order.template?.name || 'N/A'}
                                    </span>
                                  </td>
                                  <td className="px-5 py-4">
                                    <div className="font-bold text-slate-700">{order.fullName}</div>
                                    <div className="text-[10px] text-slate-400">{order.phone}</div>
                                  </td>
                                  <td className="px-5 py-4 font-bold text-indigo-600">
                                    {order.subdomain ? `${order.subdomain}.localhost` : 'Mua Source Code'}
                                  </td>
                                  <td className="px-5 py-4 font-black text-slate-800">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(order.amount)}
                                  </td>
                                  <td className="px-5 py-4">
                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                      order.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                                      order.status === 'PENDING' || order.status === 'WAITING_CONFIRM' ? 'bg-amber-100 text-amber-800' :
                                      order.status === 'REJECTED' ? 'bg-rose-100 text-rose-800' :
                                      'bg-slate-100 text-slate-600'
                                    }`}>
                                      {order.status === 'PENDING' ? 'Chờ duyệt Zalo' : order.status}
                                    </span>
                                  </td>
                                  <td className="px-5 py-4 font-mono text-slate-500">{order.transactionCode || 'Zalo Direct'}</td>
                                  <td className="px-5 py-4 text-right">
                                    {order.status === 'PENDING' || order.status === 'WAITING_CONFIRM' ? (
                                      <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-sm text-[10px] inline-flex items-center gap-1"
                                      >
                                        <Sparkles className="w-3 h-3" />
                                        <span>Duyệt & Bàn Giao Web</span>
                                      </button>
                                    ) : (
                                      <span className="text-slate-400 text-[10px] font-medium">Đã kích hoạt</span>
                                    )}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: CUSTOMER MANAGEMENT */}
              {activeTab === 'users' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Quản lý Khách hàng & Website</h2>
                      <p className="text-xs text-slate-400 mt-1">Danh sách các website khách thuê (Tenants) đang vận hành trên hệ thống.</p>
                    </div>
                    <button
                      onClick={() => setShowCreateTenantModal(true)}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>➕ Tạo Website Thủ Công Cho Khách</span>
                    </button>
                  </div>

                  {tenantsLoading ? (
                    <div className="py-20 text-center flex flex-col items-center justify-center text-slate-400">
                      <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-2" />
                      Đang tải danh sách khách hàng...
                    </div>
                  ) : (
                    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-bold border-b border-slate-200">
                            <tr>
                              <th className="px-5 py-3">Tên văn phòng / Website</th>
                              <th className="px-5 py-3">Subdomain (SaaS)</th>
                              <th className="px-5 py-3">Mẫu template</th>
                              <th className="px-5 py-3">Ngày kích hoạt</th>
                              <th className="px-5 py-3">Trạng thái</th>
                              <th className="px-5 py-3 text-right">Hành động</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {tenants.length === 0 ? (
                              <tr>
                                <td colSpan={6} className="px-5 py-12 text-center text-slate-400">Chưa có website tenant nào được đăng ký.</td>
                              </tr>
                            ) : (
                              tenants.map((tenant: any) => (
                                <tr key={tenant.id} className="hover:bg-slate-50/50">
                                  <td className="px-5 py-4 font-bold text-slate-800">{tenant.name}</td>
                                  <td className="px-5 py-4 font-mono">
                                    <a
                                      href={`http://${tenant.slug}.localhost:3000`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-indigo-600 hover:underline font-semibold"
                                    >
                                      {tenant.slug}.localhost:3000
                                    </a>
                                  </td>
                                  <td className="px-5 py-4 text-slate-600">{tenant.template?.name || 'Luxury Default'}</td>
                                  <td className="px-5 py-4 text-slate-500">
                                    {new Date(tenant.createdAt).toLocaleDateString('vi-VN')}
                                  </td>
                                  <td className="px-5 py-4">
                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                      tenant.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                    }`}>
                                      {tenant.status === 'ACTIVE' ? 'Hoạt động' : 'Tạm khóa'}
                                    </span>
                                  </td>
                                  <td className="px-5 py-4 text-right">
                                    {tenant.status === 'ACTIVE' ? (
                                      <button
                                        onClick={() => updateTenantStatusMutation.mutate({ id: tenant.id, status: 'SUSPENDED' })}
                                        disabled={updateTenantStatusMutation.isPending}
                                        className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-600 font-bold hover:bg-rose-100 transition-colors text-[10px] inline-flex items-center gap-1"
                                      >
                                        <Lock className="w-3 h-3" /> Khóa Web
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => updateTenantStatusMutation.mutate({ id: tenant.id, status: 'ACTIVE' })}
                                        disabled={updateTenantStatusMutation.isPending}
                                        className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 font-bold hover:bg-emerald-100 transition-colors text-[10px] inline-flex items-center gap-1"
                                      >
                                        <Unlock className="w-3 h-3" /> Kích Hoạt
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </main>
        <Footer />
      </div>

      {/* DETAIL APPROVAL MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={e => e.target === e.currentTarget && setSelectedOrder(null)}>
          <div className="w-full max-w-xl bg-white rounded-3xl p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Đơn hàng #{selectedOrder.orderNumber}</span>
                <h2 className="text-lg font-black text-slate-900 mt-0.5">Xét Duyệt & Bàn Giao Website</h2>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                selectedOrder.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {selectedOrder.status}
              </span>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600 mb-6">
              <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100">
                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider block">Mẫu Template Khách Chọn:</span>
                <span className="font-extrabold text-slate-900 text-sm">{selectedOrder.template?.name || selectedOrder.templateId || 'Bất động sản'}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Khách hàng:</span>
                  <span className="font-bold text-slate-800">{selectedOrder.fullName}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Số điện thoại:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedOrder.phone}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Email CMS:</span>
                <span className="font-mono font-bold text-slate-800">{selectedOrder.email}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Số tiền thanh toán:</span>
                <span className="text-base font-black text-blue-600">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(selectedOrder.amount)}
                </span>
              </div>

              {selectedOrder.note && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Ghi chú của khách:</span>
                  <p className="text-slate-700 mt-1 font-medium leading-relaxed">{selectedOrder.note}</p>
                </div>
              )}

              <div className="pt-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Ghi chú từ chối (nếu có):</label>
                <textarea
                  value={rejectNotes}
                  onChange={(e) => setRejectNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-blue-500 focus:outline-none"
                  placeholder="Lý do từ chối (nếu không duyệt)..."
                  rows={2}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-colors text-xs"
              >
                Đóng
              </button>
              <button
                onClick={() => rejectMutation.mutate({ id: selectedOrder.id, version: selectedOrder.version, notes: rejectNotes })}
                disabled={rejectMutation.isPending || approveMutation.isPending}
                className="px-4 py-2 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-colors text-xs disabled:opacity-50"
              >
                Từ chối đơn
              </button>
              <button
                onClick={() => approveMutation.mutate({ id: selectedOrder.id, version: selectedOrder.version })}
                disabled={approveMutation.isPending || rejectMutation.isPending}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all text-xs disabled:opacity-50 inline-flex items-center gap-1.5 shadow-md"
              >
                {(approveMutation.isPending) && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <Sparkles className="w-3.5 h-3.5" />
                <span>Duyệt & Bàn Giao Website Ngay</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE TENANT MANUALLY MODAL (FACEBOOK / ZALO MANUAL FLOW) */}
      {showCreateTenantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={e => e.target === e.currentTarget && setShowCreateTenantModal(false)}>
          <div className="w-full max-w-lg bg-white rounded-3xl p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">Admin Toolkit</span>
                <h2 className="text-lg font-black text-slate-900 mt-1">Tạo Website & Cấp Tài Khoản Cho Khách</h2>
              </div>
              <button onClick={() => setShowCreateTenantModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                createTenantMutation.mutate(newTenantData);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Họ và tên khách hàng *</label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={newTenantData.fullName}
                  onChange={(e) => setNewTenantData({ ...newTenantData, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-semibold focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email CMS *</label>
                  <input
                    type="email"
                    required
                    placeholder="khach@example.com"
                    value={newTenantData.email}
                    onChange={(e) => setNewTenantData({ ...newTenantData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-semibold focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0983xxxxxx"
                    value={newTenantData.phone}
                    onChange={(e) => setNewTenantData({ ...newTenantData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-semibold focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Subdomain Website (slug) *</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    required
                    placeholder="hoanggialand"
                    value={newTenantData.subdomain}
                    onChange={(e) => setNewTenantData({ ...newTenantData, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-l-xl font-mono font-bold focus:border-blue-500 focus:outline-none"
                  />
                  <span className="bg-slate-100 border border-l-0 border-slate-300 px-3 py-2 rounded-r-xl text-slate-500 font-mono text-xs">
                    .platformbds.vn
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Mẫu Giao Diện Website (Template) *</label>
                <select
                  value={newTenantData.templateId}
                  onChange={(e) => setNewTenantData({ ...newTenantData, templateId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-slate-800 focus:border-blue-500 focus:outline-none bg-white"
                >
                  <option value="luxury-gold">Luxury Gold Style (Biệt thự, Sang trọng)</option>
                  <option value="mega-developer">Mega Developer Pro (Chủ đầu tư lớn)</option>
                  <option value="modern-highrise">Modern Highrise (Chung cư, Căn hộ)</option>
                  <option value="minimal-white">Minimalist White (Hiện đại, Tinh tế)</option>
                  <option value="eco-green">Eco Green Living (Khu đô thị sinh thái)</option>
                  <option value="villa-resort">Luxury Villa Resort (Nghỉ dưỡng 5 sao)</option>
                  <option value="industrial-loft">Industrial Loft (Mặt bằng, Kho xưởng)</option>
                  <option value="sunset-oasis">Sunset Oasis Resort (Đất biển)</option>
                  <option value="penthouse-sky">Penthouse Sky High (Căn hộ cao cấp)</option>
                  <option value="tropical-haven">Tropical Haven (Nghỉ dưỡng nhiệt đới)</option>
                  <option value="royal-estate">Royal Estate (BĐS Hoàng Gia)</option>
                  <option value="cyber-city">Cyber City Living (Smart City)</option>
                  <option value="zen-garden">Zen Garden Estate (Thiền viện, Sinh thái)</option>
                  <option value="ocean-view">Ocean View Luxury (Biệt thự biển)</option>
                  <option value="heritage-house">Heritage House (Nhà phố cổ điển)</option>
                  <option value="neon-future">Neon Future Smart (Nhà thông minh)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateTenantModal(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-800 font-bold rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={createTenantMutation.isPending}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5 disabled:opacity-50"
                >
                  {createTenantMutation.isPending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Đang khởi tạo website...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Tạo Website & Bàn Giao CMS</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
