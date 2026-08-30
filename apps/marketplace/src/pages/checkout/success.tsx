import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { 
  CheckCircle2, Copy, ExternalLink, ShieldCheck, 
  MessageSquare, ArrowLeft, Loader2, Sparkles, 
  Globe, AlertCircle, Clock
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { orderNumber } = router.query;
  const { showToast } = useAuth();

  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState<any>(null);
  const [orderPaid, setOrderPaid] = useState(false);
  const [tenantSlug, setTenantSlug] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const rawOrderNumber = typeof orderNumber === 'string' ? orderNumber : Array.isArray(orderNumber) ? orderNumber[0] : '';
  const cleanOrderNumber = rawOrderNumber ? rawOrderNumber.trim().replace(/\s+/g, '-') : '';

  // 1. Fetch initial order status
  const fetchOrderStatus = async (ordNo: string) => {
    try {
      const res = await axios.get(`${API_URL}/api/marketplace/orders/${encodeURIComponent(ordNo)}/status`, {
        withCredentials: true,
      });
      if (res.data?.success && res.data?.data) {
        setOrderData(res.data.data);
        if (res.data.data.isCompleted) {
          setOrderPaid(true);
          setTenantSlug(res.data.data.tenantSlug || '');
        }
      }
    } catch (err) {
      console.error('Error fetching order status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cleanOrderNumber) {
      fetchOrderStatus(cleanOrderNumber);
    } else if (router.isReady && !cleanOrderNumber) {
      setLoading(false);
    }
  }, [cleanOrderNumber, router.isReady]);

  // 2. Real-time Live Polling check for Admin Approval
  useEffect(() => {
    if (!cleanOrderNumber || orderPaid) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${API_URL}/api/marketplace/orders/${encodeURIComponent(cleanOrderNumber)}/status`, {
          withCredentials: true,
        });
        if (res.data?.success && res.data?.data?.isCompleted) {
          setOrderPaid(true);
          setTenantSlug(res.data.data.tenantSlug || '');
          showToast('🎉 Admin đã duyệt đơn & kích hoạt website của bạn thành công!', 'success');
          clearInterval(interval);
        }
      } catch {
        // ignore polling errors
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [cleanOrderNumber, orderPaid, showToast]);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    showToast(`Đã sao chép ${field}!`, 'success');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(amount || 0);
  };

  const zaloChatUrl = orderData ? `https://zalo.me/0983312219?text=${encodeURIComponent(`Chào Admin, tôi vừa đặt mẫu website trên TEMPLATES BDS. Mã đơn: ${orderData.orderNumber}. Nhờ bạn tư vấn thanh toán và kích hoạt website.`)}` : 'https://zalo.me/0983312219';

  return (
    <>
      <Head>
        <title>Xác Nhận Đơn Hàng & Bàn Giao Website | TEMPLATES BDS</title>
      </Head>

      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />

        <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link href="/" className="hover:text-slate-700">Trang chủ</Link>
            <span>/</span>
            <Link href="/templates" className="hover:text-slate-700">Mẫu website</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Xác nhận đơn hàng</span>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <p className="text-sm font-medium">Đang tải thông tin đơn hàng...</p>
            </div>
          ) : !orderData ? (
            <div className="bg-white rounded-3xl p-12 text-center max-w-lg mx-auto border border-slate-200 shadow-sm">
              <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-slate-900 mb-2">Không tìm thấy đơn hàng</h2>
              <p className="text-xs text-slate-500 mb-6">Mã đơn hàng không hợp lệ hoặc đã bị hủy.</p>
              <Link href="/templates" className="px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-blue-700">
                Xem kho mẫu website
              </Link>
            </div>
          ) : orderPaid ? (
            /* ═══════════════════════════════════════════════════════════════
               COMPLETED STATE: WEBSITE ACTIVATED BY ADMIN
               ═══════════════════════════════════════════════════════════════ */
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 border-4 border-emerald-100 shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <span className="text-[11px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                ⚡ Website đã kích hoạt thành công
              </span>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-4 mb-2">
                Chúc Mừng! Website Của Bạn Đã Sẵn Sàng!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                Đơn hàng <strong className="text-slate-800">#{orderData.orderNumber}</strong> đã được Admin kích hoạt hoàn tất. Bạn có thể đăng nhập vào trang CMS để quản lý giao diện và đăng tải dự án ngay!
              </p>

              {/* Information Cards */}
              <div className="w-full mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200/80 text-left text-xs space-y-4 font-semibold text-slate-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Website Công Khai Của Bạn:</span>
                  <a
                    href={`https://${tenantSlug || orderData.subdomain || 'site'}.${process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'templates.aireviewbds.com'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-mono font-bold flex items-center gap-1 text-sm"
                  >
                    {tenantSlug || orderData.subdomain || 'site'}.{process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'templates.aireviewbds.com'}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-slate-200/60 pt-3">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Link Xem Demo Trực Tiếp:</span>
                  <a
                    href={`https://website.aireviewbds.com/?subdomain=${tenantSlug || orderData.subdomain || 'site'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline font-mono font-bold flex items-center gap-1 text-sm"
                  >
                    https://website.aireviewbds.com/?subdomain={tenantSlug || orderData.subdomain || 'site'}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-slate-200/60 pt-3">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Trang Quản Trị Website (CMS):</span>
                  <a
                    href={process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline font-mono font-bold flex items-center gap-1 text-sm"
                  >
                    {process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-slate-200/60 pt-3">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Tài Khoản Đăng Nhập CMS:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-900 text-sm font-bold">{orderData.email}</span>
                    <button
                      onClick={() => handleCopy(orderData.email, 'Email')}
                      className="p-1 hover:bg-slate-200 rounded text-slate-500 transition-all text-[11px] flex items-center gap-1 border border-slate-200 bg-white px-2"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedField === 'Email' ? 'Đã chép!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-slate-200/60 pt-3">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Mật Khẩu Đăng Nhập CMS:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono bg-amber-50 border border-amber-300 text-amber-950 font-black px-3 py-1 rounded-lg text-sm tracking-wider">
                      {orderData.email ? orderData.email.split('@')[0] : '123456'}
                    </span>
                    <button
                      onClick={() => handleCopy(orderData.email ? orderData.email.split('@')[0] : '123456', 'Mật khẩu')}
                      className="p-1 hover:bg-slate-200 rounded text-slate-500 transition-all text-[11px] flex items-center gap-1 border border-slate-200 bg-white px-2 font-bold"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedField === 'Mật khẩu' ? 'Đã chép!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 mt-2">
                  <p className="text-xs text-emerald-800 leading-relaxed font-normal">
                    <strong className="font-bold text-emerald-900">⚡ Mật khẩu CMS cấp tức thì:</strong> Mật khẩu mặc định của bạn là <strong className="font-mono font-bold text-emerald-950 bg-emerald-100 px-1.5 py-0.5 rounded">{orderData.email ? orderData.email.split('@')[0] : '123456'}</strong> (phần trước dấu @ trong email). Bạn có thể bấm nút <strong>"Vào Quản Trị CMS Ngay"</strong> bên dưới để đăng nhập và bắt đầu chỉnh sửa website!
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-8">
                <a
                  href={process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Vào Quản Trị CMS Ngay</span>
                </a>
                <a
                  href={`https://${tenantSlug || orderData.subdomain || 'site'}.${process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'templates.aireviewbds.com'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span>Xem Website Thực Tế</span>
                </a>
              </div>

              {/* Secondary Navigation Links */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-6 border-t border-slate-100 text-xs font-bold text-slate-600">
                <Link
                  href="/customer/dashboard?tab=orders"
                  className="hover:text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>📦 Xem Lịch Sử Đơn Hàng</span>
                </Link>
                <span className="text-slate-300">•</span>
                <Link
                  href="/customer/dashboard?tab=settings"
                  className="hover:text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>👤 Thông Tin Cá Nhân</span>
                </Link>
                <span className="text-slate-300">•</span>
                <Link
                  href="/customer/dashboard?tab=downloads"
                  className="hover:text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>📥 Kho Tải Source Code (ZIP)</span>
                </Link>
              </div>
            </div>
          ) : (
            /* ═══════════════════════════════════════════════════════════════
               PENDING STATE: ZALO CONNECTION & ORDER SUMMARY
               ═══════════════════════════════════════════════════════════════ */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column (7 cols): Zalo Connection & Step Guide */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                
                {/* Header */}
                <div className="border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping shrink-0" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      Đã gửi yêu cầu • Chờ xác nhận Zalo
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-3">
                    Đã Ghi Nhận Đơn Hàng #{orderData.orderNumber}
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Cảm ơn bạn! Chuyên viên hỗ trợ sẽ liên hệ trực tiếp qua Zalo để gửi số tài khoản và kích hoạt website ngay cho bạn.
                  </p>
                </div>

                {/* Big Zalo Action Button */}
                <div className="p-6 bg-gradient-to-br from-blue-50 via-indigo-50/40 to-blue-50 rounded-3xl border border-blue-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Mã đơn hàng của bạn:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono font-black text-blue-700 text-lg sm:text-xl">#{orderData.orderNumber}</span>
                        <button
                          onClick={() => handleCopy(orderData.orderNumber, 'Mã đơn')}
                          className="px-2.5 py-1 bg-white hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-bold border shadow-2xs transition-colors flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          {copiedField === 'Mã đơn' ? 'Đã chép' : 'Chép mã'}
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Tổng thanh toán:</span>
                      <span className="text-lg sm:text-xl font-black text-blue-600 mt-1 block">{formatCurrency(orderData.amount)}</span>
                    </div>
                  </div>

                  <a
                    href={zaloChatUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 bg-[#0068FF] hover:bg-[#0052cc] text-white font-bold rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transition-all hover:scale-[1.01]"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Mở Chat Zalo Với Admin Ngay (0983.312.219)</span>
                  </a>

                  <div className="text-center">
                    <span className="text-[11px] text-slate-400">hoặc gọi Hotline tư vấn nhanh: </span>
                    <a href="tel:0919006030" className="text-xs font-bold text-emerald-600 hover:underline">
                      0919.006.030
                    </a>
                  </div>
                </div>

                {/* 3 Step Guide */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    Quy trình 3 bước kích hoạt website:
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center mb-2">1</div>
                      <div className="font-bold text-slate-800">Nhắn tin Zalo</div>
                      <p className="text-[11px] text-slate-500 leading-normal">Nhắn tin mã đơn cho Admin để nhận STK ngân hàng và chốt tên miền.</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center mb-2">2</div>
                      <div className="font-bold text-slate-800">Chuyển khoản</div>
                      <p className="text-[11px] text-slate-500 leading-normal">Chuyển tiền trực tiếp đến STK cá nhân / công ty của Admin.</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center mb-2">3</div>
                      <div className="font-bold text-slate-800">Nhận Website CMS</div>
                      <p className="text-[11px] text-slate-500 leading-normal">Admin tạo tài khoản CMS có sẵn mẫu giao diện bạn đã chọn để dùng ngay.</p>
                    </div>
                  </div>
                </div>

                {/* Auto Refresh indicator */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Trang sẽ tự động cập nhật ngay khi Admin duyệt đơn và bàn giao web...</span>
                  </div>
                  <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin" />
                </div>

              </div>

              {/* Right Column (5 cols): Order Summary & Customer Info */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Order Summary Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                    Chi Tiết Mẫu Đã Đặt
                  </h3>

                  {orderData.template && (
                    <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                      {orderData.template.thumbnail && (
                        <img
                          src={orderData.template.thumbnail}
                          alt={orderData.template.name}
                          className="w-16 h-16 rounded-xl object-cover border shrink-0"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="font-extrabold text-slate-900 text-sm truncate">{orderData.template.name}</div>
                        <div className="text-[11px] text-blue-600 font-bold mt-0.5">Bản quyền trọn gói 1 năm</div>
                        <div className="text-xs font-black text-slate-800 mt-1">{formatCurrency(orderData.amount)}</div>
                      </div>
                    </div>
                  )}

                  {/* Customer Details */}
                  <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Người đặt:</span>
                      <span className="font-bold text-slate-800">{orderData.fullName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Email CMS:</span>
                      <span className="font-bold text-slate-800 truncate max-w-[180px]">{orderData.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Số điện thoại:</span>
                      <span className="font-mono font-bold text-slate-800">{orderData.phone}</span>
                    </div>
                    {orderData.note && (
                      <div className="pt-2 border-t border-slate-100 text-[11px]">
                        <span className="text-slate-400 block font-semibold mb-0.5">Ghi chú yêu cầu:</span>
                        <p className="text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed font-medium">
                          {orderData.note}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                    <Link
                      href="/templates"
                      className="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Xem thêm mẫu khác
                    </Link>
                    <Link
                      href="/customer/dashboard?tab=orders"
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      Đơn hàng của tôi
                    </Link>
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="p-4 bg-slate-100/80 rounded-2xl border border-slate-200 text-[11px] text-slate-500 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Hỗ trợ kỹ thuật & Vận hành trọn đời</span>
                  </div>
                  <p className="leading-relaxed">
                    Sau khi Admin bàn giao tài khoản CMS, bạn sẽ được hỗ trợ hướng dẫn thay đổi logo, đăng tin bất động sản và trỏ tên miền thương hiệu riêng 100% miễn phí.
                  </p>
                </div>

              </div>

            </div>
          )}

        </main>
        <Footer />
      </div>
    </>
  );
}
