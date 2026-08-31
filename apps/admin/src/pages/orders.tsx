import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { formatVND } from '@repo/utils';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));
const PLATFORM_DOMAIN = process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'templates.aireviewbds.com';
const CMS_APP_URL = process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com';
const getTenantUrl = (subdomain: string) => `https://${subdomain}.${PLATFORM_DOMAIN}/?tenant=${subdomain}`;

// Web Audio API beep chime for new orders
function playOrderAlertSound() {
  if (typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {}
}

export default function AdminOrders() {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [rejectNotes, setRejectNotes] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED' | 'REJECTED'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [approvalResult, setApprovalResult] = useState<any>(null);

  // Sound chime tracking
  const prevPendingCountRef = useRef<number | null>(null);

  // 1. Fetch Danh Sách Đơn Hàng
  const { data: ordersRes, isLoading, dataUpdatedAt } = useQuery({
    queryKey: ['adminOrders'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/admin/orders?limit=100`, {
        withCredentials: true,
      });
      return res.data;
    },
    refetchInterval: 5000,
  });

  const orders: any[] = (ordersRes?.data || []).filter(
    (o: any) => o.amount > 0 && !o.note?.includes('[LIÊN HỆ TƯ VẤN]')
  );

  // Tính số lượng theo trạng thái
  const pendingOrders = orders.filter(
    (o) => o.status === 'PENDING' || o.status === 'WAITING_CONFIRM' || o.status === 'PENDING_SUBDOMAIN_CONFLICT' || o.status === 'AWAITING_MANUAL_REVIEW'
  );
  const completedOrders = orders.filter((o) => o.status === 'COMPLETED');
  const rejectedOrders = orders.filter((o) => o.status === 'REJECTED');

  // Âm thanh thông báo khi có đơn hàng mới
  useEffect(() => {
    if (prevPendingCountRef.current !== null && pendingOrders.length > prevPendingCountRef.current) {
      playOrderAlertSound();
    }
    prevPendingCountRef.current = pendingOrders.length;
  }, [pendingOrders.length]);

  // 2. Mutation duyệt đơn hàng & tạo Tenant
  const approveMutation = useMutation({
    mutationFn: async ({ id, version }: { id: string; version: number }) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];
      const headers: Record<string, string> = {
        'X-CSRF-Token': csrfToken || '',
      };

      const res = await axios.put(
        `${API_URL}/api/admin/orders/${id}/approve`,
        { version },
        {
          headers,
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: (res: any) => {
      setSelectedOrder(null);
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });

      const raw = res?.data || res;
      const orderCreds = raw?.credentials || raw;
      const creds = {
        email: orderCreds?.email || raw?.email,
        password: orderCreds?.password || orderCreds?.cmsPassword || '',
        cmsPassword: orderCreds?.cmsPassword || orderCreds?.password || '',
        subdomain: orderCreds?.subdomain || orderCreds?.tenantSlug || raw?.subdomain,
        tenantSlug: orderCreds?.subdomain || orderCreds?.tenantSlug || raw?.subdomain,
        templateSlug: selectedOrder?.template?.slug || selectedOrder?.templateId || 'luxury-gold',
      };

      setApprovalResult(creds);
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
      const headers: Record<string, string> = {
        'X-CSRF-Token': csrfToken || '',
      };

      const res = await axios.put(
        `${API_URL}/api/admin/orders/${id}/reject`,
        { version, adminNotes: notes },
        {
          headers,
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      alert('Đã từ chối đơn hàng.');
      setSelectedOrder(null);
      setRejectNotes('');
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.error?.message || 'Có lỗi xảy ra khi từ chối đơn hàng.');
    },
  });

  // 4. Mutation xóa đơn hàng
  const deleteOrderMutation = useMutation({
    mutationFn: async (id: string) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];
      const headers: Record<string, string> = {
        'X-CSRF-Token': csrfToken || '',
      };

      const res = await axios.delete(`${API_URL}/api/admin/orders/${id}`, {
        headers,
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      alert('Đã xóa đơn hàng thành công.');
      setSelectedOrder(null);
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.error?.message || 'Có lỗi xảy ra khi xóa đơn hàng.');
    },
  });

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  // Filter & Search
  const filteredOrders = orders.filter((order) => {
    // Tab filter
    if (activeFilter === 'PENDING') {
      if (order.status !== 'PENDING' && order.status !== 'WAITING_CONFIRM' && order.status !== 'PENDING_SUBDOMAIN_CONFLICT' && order.status !== 'AWAITING_MANUAL_REVIEW') {
        return false;
      }
    } else if (activeFilter === 'COMPLETED') {
      if (order.status !== 'COMPLETED') return false;
    } else if (activeFilter === 'REJECTED') {
      if (order.status !== 'REJECTED') return false;
    }

    // Search filter
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      order.orderNumber?.toLowerCase().includes(term) ||
      order.fullName?.toLowerCase().includes(term) ||
      order.phone?.toLowerCase().includes(term) ||
      order.email?.toLowerCase().includes(term) ||
      order.subdomain?.toLowerCase().includes(term) ||
      order.template?.name?.toLowerCase().includes(term)
    );
  });

  const isPendingStatus = (status: string) => {
    return status === 'PENDING' || status === 'WAITING_CONFIRM' || status === 'PENDING_SUBDOMAIN_CONFLICT' || status === 'AWAITING_MANUAL_REVIEW';
  };

  // Ticking Live Clock (Cập nhật liên tục mỗi 1 giây kèm Ngày Tháng Năm)
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

  return (
    <AdminLayout
      title="Duyệt Đơn Hàng & Kích Hoạt"
      subtitle="Quản lý và kích hoạt website tự động cho khách hàng. Hệ thống đồng bộ thời gian thực (Real-time)."
    >
      {/* Live Polling & Continuous Live Clock Indicator */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <span>Trực Tuyến Thời Gian Thực:</span>
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-mono font-extrabold border border-emerald-200 shadow-xs">
              {now ? formatFullDateTime(now) : 'Đang đồng bộ...'}
            </span>
          </span>
        </div>

        {pendingOrders.length > 0 && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-3.5 py-1.5 rounded-xl text-xs font-bold animate-pulse">
            <span>⚡ Có {pendingOrders.length} đơn hàng đang chờ bạn duyệt!</span>
          </div>
        )}
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
        {/* Tabs */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/60 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeFilter === 'ALL'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Tất cả đơn</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200/70 text-slate-700 font-mono">
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('PENDING')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeFilter === 'PENDING'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Chờ duyệt</span>
            {pendingOrders.length > 0 ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-600 text-white font-mono font-bold animate-pulse">
                {pendingOrders.length}
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200/70 text-slate-700 font-mono">
                0
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveFilter('COMPLETED')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeFilter === 'COMPLETED'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Đã duyệt / Hoàn thành</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200/70 text-slate-700 font-mono">
              {completedOrders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('REJECTED')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeFilter === 'REJECTED'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Từ chối</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200/70 text-slate-700 font-mono">
              {rejectedOrders.length}
            </span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Tìm theo mã đơn, SĐT, tên, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-2xs"
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden mb-10">
        <div className="w-full">
          <table className="w-full table-fixed border-collapse text-left text-xs text-slate-700">
            <thead className="bg-slate-50/70 text-[10px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-3 py-3 w-[15%]">Mã đơn hàng</th>
                <th className="px-3 py-3 w-[20%]">Khách hàng</th>
                <th className="px-3 py-3 w-[18%]">Mẫu Website</th>
                <th className="px-3 py-3 w-[15%]">Gói / Loại</th>
                <th className="px-3 py-3 w-[12%]">Số tiền</th>
                <th className="px-3 py-3 w-[10%]">Trạng thái</th>
                <th className="px-3 py-3 w-[10%] text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400 font-semibold">
                    Đang tải dữ liệu đơn hàng...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center text-slate-400 font-semibold">
                    {searchTerm ? 'Không tìm thấy đơn hàng nào khớp với tìm kiếm.' : 'Không có đơn hàng nào trong mục này.'}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order: any) => {
                  const isPending = isPendingStatus(order.status);
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Mã đơn */}
                      <td className="px-3 py-3">
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 text-[11px] block truncate">
                          #{order.orderNumber}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-1 font-mono truncate">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : ''}
                        </div>
                      </td>

                      {/* Khách hàng */}
                      <td className="px-3 py-3">
                        <div className="font-bold text-slate-900 truncate">{order.fullName || 'Khách hàng'}</div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-slate-700 font-mono font-bold text-[11px] truncate">{order.phone || '—'}</span>
                          {order.phone && (
                            <a
                              href={`https://zalo.me/${order.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-1 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-[9px] rounded border border-blue-200 transition-colors shrink-0"
                              title="Zalo"
                            >
                              Zalo
                            </a>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">{order.email}</div>
                      </td>

                      {/* Mẫu Website */}
                      <td className="px-3 py-3">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60 truncate max-w-full">
                          {order.template?.name || order.templateId || 'Mẫu Mặc Định'}
                        </span>
                      </td>

                      {/* Subdomain / Loại */}
                      <td className="px-3 py-3">
                        {order.type === 'BUY_SOURCE' ? (
                          <div>
                            <span className="font-bold text-slate-800 text-[11px] block">Mua Mã Nguồn</span>
                            <span className="text-[9px] text-slate-400 italic">File nén mã nguồn</span>
                          </div>
                        ) : order.subdomain ? (
                          <div>
                            <span className="font-mono font-bold text-indigo-700 text-[11px] truncate block">{order.subdomain}</span>
                            <span className="text-[9px] text-slate-400 italic">Cấp tên miền tự động</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">Chưa đặt</span>
                        )}
                      </td>

                      {/* Số tiền */}
                      <td className="px-3 py-3 font-mono font-black text-slate-900 text-[11px]">
                        {formatVND(order.amount)}
                      </td>

                      {/* Trạng thái */}
                      <td className="px-3 py-3">
                        {isPending ? (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            Chờ duyệt
                          </span>
                        ) : order.status === 'COMPLETED' ? (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Đã duyệt
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
                            Từ chối
                          </span>
                        )}
                      </td>

                      {/* Hành động */}
                      <td className="px-3 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {isPending && (
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded text-[10px] transition-colors"
                            >
                              Duyệt
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded text-[10px] transition-colors"
                          >
                            Chi tiết
                          </button>
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
          MODAL XÉT DUYỆT / XEM CHI TIẾT ĐƠN HÀNG
          ═══════════════════════════════════════════════════════════════════════ */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200/50 max-h-[90vh] overflow-y-auto relative animate-scale-in">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all text-lg font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                Chi Tiết Đơn Hàng
              </span>
              <span className="text-xs text-slate-400 font-mono">#{selectedOrder.orderNumber}</span>
            </div>

            <h2 className="text-xl font-black text-slate-900 mb-6">
              Xét Duyệt Đơn #{selectedOrder.orderNumber}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Thông tin đơn hàng */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/70 space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Họ Tên Khách Hàng</span>
                  <p className="font-extrabold text-slate-900 text-sm mt-0.5">{selectedOrder.fullName}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Số Điện Thoại</span>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <p className="font-mono font-bold text-slate-800 text-sm">{selectedOrder.phone || '—'}</p>
                    {selectedOrder.phone && (
                      <a
                        href={`https://zalo.me/${selectedOrder.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-lg transition-all inline-flex items-center gap-1 shadow-sm"
                      >
                        <span>💬 Mở Zalo Xác Nhận Chuyển Khoản</span>
                      </a>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Email Đăng Nhập</span>
                  <p className="font-mono font-bold text-slate-800 mt-0.5">{selectedOrder.email}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Ghi Chú Đơn Hàng</span>
                  <p className="text-slate-600 italic mt-0.5">{selectedOrder.note || 'Không có ghi chú'}</p>
                </div>
              </div>

              {/* Thông tin mẫu & thanh toán */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/70 space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Mẫu Website Đã Chọn</span>
                  <p className="font-extrabold text-indigo-700 text-sm mt-0.5">
                    {selectedOrder.template?.name || selectedOrder.templateId || 'Luxury Gold'}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tổng Tiền Thanh Toán</span>
                  <p className="text-xl font-black text-emerald-600 mt-0.5">
                    {formatVND(selectedOrder.amount)}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Subdomain Yêu Cầu</span>
                  <p className="font-mono font-bold text-slate-800 mt-0.5">
                    {selectedOrder.subdomain 
                      ? `${selectedOrder.subdomain}.${PLATFORM_DOMAIN}`
                      : 'Tự động tạo từ tên khách hàng'}
                  </p>
                  {selectedOrder.status === 'COMPLETED' && selectedOrder.tenantId && (
                    <p className="text-[10px] text-emerald-600 mt-1 font-bold">✓ Subdomain đã được kích hoạt</p>
                  )}
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Mã Giao Dịch Ngân Hàng</span>
                  <p className="font-mono font-bold text-slate-700 mt-0.5">{selectedOrder.transactionCode || 'Chưa cung cấp'}</p>
                </div>
              </div>
            </div>

            {/* THÔNG TIN BÀN GIAO WEBSITE & TÀI KHOẢN CMS DÀNH CHO ĐƠN ĐÃ DUYỆT */}
            {selectedOrder.status === 'COMPLETED' && (
              <div className="mb-6 p-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 text-left">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-emerald-200/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900">
                      Thông Tin Bàn Giao Website & Tài Khoản CMS
                    </h4>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-bold">
                    Khách Có Thể Đăng Nhập Ngay
                  </span>
                </div>

                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-slate-500 font-sans">Website Khách Hàng:</span>
                    <div className="text-right">
                      <a
                        href={getTenantUrl(selectedOrder.subdomain || selectedOrder.tenantId || 'website')}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 font-bold hover:underline font-mono block"
                      >
                        {getTenantUrl(selectedOrder.subdomain || selectedOrder.tenantId || 'website')}
                      </a>
                      <a
                        href={`https://${PLATFORM_DOMAIN}/demo/${selectedOrder.template?.slug || selectedOrder.templateId || 'luxury-gold'}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-emerald-600 font-sans font-bold hover:underline block mt-0.5"
                      >
                        👉 Xem trực tiếp mẫu giao diện tức thì
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-slate-500 font-sans">Trang Quản Trị CMS:</span>
                    <a
                      href={CMS_APP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 font-bold hover:underline font-mono"
                    >
                      {CMS_APP_URL}
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-slate-500 font-sans">Email Đăng Nhập:</span>
                    <span className="font-bold text-slate-800">{selectedOrder.email}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-slate-500 font-sans">Mật Khẩu CMS:</span>
                    <span className="font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300 inline-block w-fit">
                      {selectedOrder.email ? selectedOrder.email.split('@')[0] : '123456'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-200/60 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={() => {
                      const pwd = selectedOrder.email ? selectedOrder.email.split('@')[0] : '123456';
                      const targetSub = selectedOrder.subdomain || selectedOrder.tenantId || 'website';
                      const siteLink = getTenantUrl(targetSub);
                      const info = `🎉 THÔNG TIN BÀN GIAO WEBSITE BẤT ĐỘNG SẢN:\n\n` +
                        `- Website công khai: ${siteLink}\n` +
                        `- Trang quản trị CMS: ${CMS_APP_URL}\n` +
                        `- Email đăng nhập: ${selectedOrder.email}\n` +
                        `- Mật khẩu CMS: ${pwd}\n\n` +
                        `👉 Bạn hãy đăng nhập vào CMS để đổi thông tin và đăng tải dự án ngay!`;
                      handleCopy(info, `HANDOVER_${selectedOrder.id}`);
                    }}
                    className="w-full sm:flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>{copiedField === `HANDOVER_${selectedOrder.id}` ? '✓ Đã Sao Chép Toàn Bộ' : '📋 Sao Chép Gửi Zalo Cho Khách'}</span>
                  </button>

                  <a
                    href={getTenantUrl(selectedOrder.subdomain || selectedOrder.tenantId || 'website')}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-all text-center"
                  >
                    Xem Web
                  </a>
                </div>
              </div>
            )}

            {/* Ghi chú từ chối nếu có */}
            {isPendingStatus(selectedOrder.status) && (
              <div className="mb-6">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Lý do từ chối (nếu không duyệt)
                </label>
                <textarea
                  value={rejectNotes}
                  onChange={(e) => setRejectNotes(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-xs focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
                  placeholder="Nhập lý do từ chối đơn hàng (ví dụ: chưa nhận được chuyển khoản, trùng thông tin...)"
                  rows={2}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 pt-5">
              {selectedOrder.status !== 'COMPLETED' ? (
                <button
                  onClick={() => {
                    if (confirm(`Xác nhận hủy đơn hàng #${selectedOrder.orderNumber}?`)) {
                      deleteOrderMutation.mutate(selectedOrder.id);
                    }
                  }}
                  disabled={deleteOrderMutation.isPending}
                  className="w-full sm:w-auto px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl border border-rose-200 transition-all"
                >
                  {deleteOrderMutation.isPending ? 'Đang hủy...' : '🚫 Hủy Đơn Hàng'}
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-5 py-2.5 border border-slate-300 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50 transition-all"
                >
                  Đóng
                </button>

                {isPendingStatus(selectedOrder.status) && (
                  <>
                    <button
                      disabled={rejectMutation.isPending || approveMutation.isPending}
                      onClick={() =>
                        rejectMutation.mutate({
                          id: selectedOrder.id,
                          version: selectedOrder.version || 1,
                          notes: rejectNotes,
                        })
                      }
                      className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all shadow-md disabled:opacity-50"
                    >
                      {rejectMutation.isPending ? 'Đang từ chối...' : 'Từ Chối Đơn'}
                    </button>

                    <button
                      disabled={approveMutation.isPending || rejectMutation.isPending}
                      onClick={() =>
                        approveMutation.mutate({
                          id: selectedOrder.id,
                          version: selectedOrder.version || 1,
                        })
                      }
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {approveMutation.isPending ? (
                        <span>Đang kích hoạt website...</span>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Duyệt & Tự Động Tạo Website</span>
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          MODAL THÔNG BÁO BÀN GIAO WEBSITE THÀNH CÔNG CHO ADMIN COPY QUA ZALO
          ═══════════════════════════════════════════════════════════════════════ */}
      {approvalResult && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-emerald-200 relative animate-scale-in text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border-2 border-emerald-200">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-xl font-black text-slate-900">
              Website Đã Kích Hoạt Thành Công!
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Hệ thống đã tự động cấu hình Tenant và tài khoản CMS cho khách hàng. Hãy sao chép thông tin bàn giao dưới đây gửi cho khách:
            </p>

            <div className="my-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs font-mono space-y-3">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">Website công khai:</span>
                <a
                  href={getTenantUrl(approvalResult.subdomain || approvalResult.tenantSlug || 'website')}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 font-bold hover:underline"
                >
                  {getTenantUrl(approvalResult.subdomain || approvalResult.tenantSlug || 'website')}
                </a>
                <a
                  href={`https://${PLATFORM_DOMAIN}/demo/${approvalResult.templateSlug || 'luxury-gold'}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-emerald-600 font-sans font-bold hover:underline block mt-0.5"
                >
                  👉 Xem trực tiếp mẫu giao diện tức thì
                </a>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">Trang quản trị CMS:</span>
                <a
                  href={CMS_APP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 font-bold hover:underline"
                >
                  {CMS_APP_URL}
                </a>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">Email đăng nhập:</span>
                <span className="font-bold text-slate-800">{approvalResult.email}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">Mật khẩu CMS (Mặc định):</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 text-sm">
                  {approvalResult.cmsPassword || approvalResult.password || (approvalResult.email ? approvalResult.email.split('@')[0] : '123456')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const targetSub = approvalResult.subdomain || approvalResult.tenantSlug || 'website';
                  const pwd = approvalResult.cmsPassword || approvalResult.password || (approvalResult.email ? approvalResult.email.split('@')[0] : '123456');
                  const tenantLink = getTenantUrl(targetSub);
                  const info = `🎉 CHÚC MỪNG! WEBSITE CỦA BẠN ĐÃ KÍCH HOẠT THÀNH CÔNG:\n\n` +
                    `- Website công khai: ${tenantLink}\n` +
                    `- Quản trị website (CMS): ${CMS_APP_URL}\n` +
                    `- Email đăng nhập: ${approvalResult.email}\n` +
                    `- Mật khẩu đăng nhập: ${pwd}\n\n` +
                    `👉 Bạn hãy đăng nhập vào CMS để đổi thông tin và đăng tải dự án ngay!`;
                  handleCopy(info, 'ALL_INFO');
                }}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md"
              >
                {copiedField === 'ALL_INFO' ? '✓ Đã Sao Chép Toàn Bộ' : '📋 Sao Chép Thông Tin Gửi Zalo'}
              </button>

              <button
                onClick={() => setApprovalResult(null)}
                className="px-6 py-3 border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-all"
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
