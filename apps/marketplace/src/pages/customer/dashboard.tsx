import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { 
  User as UserIcon, ShoppingBag, Download, Heart, Settings, 
  Bell, FileText, LogOut, LayoutDashboard, CreditCard,
  Lock, Eye, AlertCircle, CheckCircle2, ChevronRight, ArrowLeft, Sparkles,
  Info, Loader2, Check, X, ShieldAlert, MapPin, Edit3
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ZeroCodeCmsEditor from '../../components/cms/ZeroCodeCmsEditor';
import { getProvinces, getDistricts, getWards, parseAddress, formatAddress } from '@repo/utils';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));

export default function CustomerDashboard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, orders, wishlists, isLoading, openAuthModal, logout, updateProfile, updatePassword, addToCart, showToast } = useAuth();
  // Initialize activeTab from URL query if available
  const [activeTab, setActiveTab] = useState<'dashboard' | 'websites' | 'orders' | 'downloads' | 'wishlist' | 'settings'>('dashboard');

  useEffect(() => {
    if (router.isReady && router.query.tab) {
      const tabQuery = router.query.tab as string;
      if (['dashboard', 'websites', 'orders', 'downloads', 'wishlist', 'settings'].includes(tabQuery)) {
        setActiveTab(tabQuery as any);
      }
    }
  }, [router.isReady, router.query.tab]);

  const handleTabChange = (tab: 'dashboard' | 'websites' | 'orders' | 'downloads' | 'wishlist' | 'settings') => {
    setActiveTab(tab);
    router.replace(
      {
        pathname: '/customer/dashboard',
        query: { tab },
      },
      undefined,
      { shallow: true }
    );
  };

  // Single-Tenant Export Engine state
  const [exportJobs, setExportJobs] = useState<Record<string, {
    status: 'NONE' | 'PENDING' | 'PROCESSING' | 'READY' | 'FAILED' | 'EXPIRED';
    downloadToken?: string;
    downloadUrl?: string;
    fileName?: string;
    expiresAt?: string;
    isPolling?: boolean;
  }>>({});

  const handleRequestExport = async (orderNumber: string) => {
    try {
      setExportJobs((prev) => ({
        ...prev,
        [orderNumber]: { status: 'PROCESSING', isPolling: true },
      }));
      showToast('🚀 Đang khởi tạo tiến trình bóc tách & đóng gói Single-Tenant Next.js...', 'info');

      const res = await axios.post(
        `${API_URL}/api/marketplace/orders/${encodeURIComponent(orderNumber)}/request-export`,
        {},
        { withCredentials: true }
      );

      if (res.data?.success) {
        const jobData = res.data.data;
        if (jobData.status === 'READY') {
          setExportJobs((prev) => ({
            ...prev,
            [orderNumber]: {
              status: 'READY',
              downloadToken: jobData.downloadToken,
              downloadUrl: jobData.downloadUrl,
              fileName: jobData.fileName,
              expiresAt: jobData.expiresAt,
              isPolling: false,
            },
          }));
          showToast('🎉 Gói mã nguồn đã sẵn sàng tải về!', 'success');
          return;
        }

        // Bắt đầu polling kiểm tra tiến trình
        const pollInterval = setInterval(async () => {
          try {
            const statusRes = await axios.get(
              `${API_URL}/api/marketplace/orders/${encodeURIComponent(orderNumber)}/export-status`,
              { withCredentials: true }
            );

            if (statusRes.data?.success) {
              const currentJob = statusRes.data.data;
              if (currentJob.status === 'READY') {
                clearInterval(pollInterval);
                setExportJobs((prev) => ({
                  ...prev,
                  [orderNumber]: {
                    status: 'READY',
                    downloadToken: currentJob.downloadToken,
                    downloadUrl: currentJob.downloadUrl,
                    fileName: currentJob.fileName,
                    expiresAt: currentJob.expiresAt,
                    isPolling: false,
                  },
                }));
                showToast('🎉 Đóng gói Single-Tenant hoàn tất! Bạn có thể tải file ZIP ngay.', 'success');
              } else if (currentJob.status === 'FAILED') {
                clearInterval(pollInterval);
                setExportJobs((prev) => ({
                  ...prev,
                  [orderNumber]: { status: 'FAILED', isPolling: false },
                }));
                showToast(currentJob.errorMessage || 'Lỗi khi đóng gói mã nguồn.', 'error');
              }
            }
          } catch (pollErr) {
            console.error('Polling error:', pollErr);
          }
        }, 2500);

        // Dừng polling sau tối đa 60 giây
        setTimeout(() => clearInterval(pollInterval), 60000);
      }
    } catch (err: any) {
      console.error('Export request error:', err);
      const errMsg = err?.response?.data?.error?.message || err.message || 'Lỗi khi yêu cầu đóng gói.';
      showToast(errMsg, 'error');
      setExportJobs((prev) => ({
        ...prev,
        [orderNumber]: { status: 'FAILED', isPolling: false },
      }));
    }
  };

  const handleDownloadByToken = (token: string, fileName?: string) => {
    const downloadUrl = `${API_URL}/api/marketplace/exports/download/${token}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName || 'bds-single-tenant-source.zip';
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('🚀 Đang bắt đầu tải xuống gói mã nguồn Single-Tenant...', 'info');
  };

  // Payment proof modal states
  const [selectedPaymentOrder, setSelectedPaymentOrder] = useState<any | null>(null);
  const [transactionCode, setTransactionCode] = useState('');
  const [billImageUrl, setBillImageUrl] = useState('');
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [editingOrderForCms, setEditingOrderForCms] = useState<any | null>(null);

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Profile update local form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [taxCode, setTaxCode] = useState('');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    } else if (user?.role === 'SUPER_ADMIN') {
      router.push('/admin/dashboard');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setPhone(user.phone || '');
      const rawAddr = user.customerProfile?.address || '';
      setAddress(rawAddr);
      const parsed = parseAddress(rawAddr);
      setSelectedProvince(parsed.province);
      setSelectedDistrict(parsed.district);
      setSelectedWard(parsed.ward);
      setStreetAddress(parsed.street);
      setCompanyName(user.customerProfile?.companyName || '');
      setTaxCode(user.customerProfile?.taxCode || '');
    }
  }, [user]);

  const handleProvinceChange = (prov: string) => {
    setSelectedProvince(prov);
    setSelectedDistrict('');
    setSelectedWard('');
    const full = formatAddress(streetAddress, '', '', prov);
    setAddress(full);
  };

  const handleDistrictChange = (dist: string) => {
    setSelectedDistrict(dist);
    setSelectedWard('');
    const full = formatAddress(streetAddress, '', dist, selectedProvince);
    setAddress(full);
  };

  const handleWardChange = (ward: string) => {
    setSelectedWard(ward);
    const full = formatAddress(streetAddress, ward, selectedDistrict, selectedProvince);
    setAddress(full);
  };

  const handleStreetChange = (st: string) => {
    setStreetAddress(st);
    const full = formatAddress(st, selectedWard, selectedDistrict, selectedProvince);
    setAddress(full);
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const full = formatAddress(streetAddress, selectedWard, selectedDistrict, selectedProvince);
    await updateProfile({
      fullName,
      phone,
      address: full,
      companyName,
      taxCode,
    });
    setProfileSuccessMsg('🎉 Hồ sơ của bạn đã được cập nhật thành công!');
    setTimeout(() => setProfileSuccessMsg(''), 4000);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Mật khẩu mới không trùng khớp!');
      return;
    }
    await updatePassword(passwordForm.oldPassword, passwordForm.newPassword);
    alert('Thay đổi mật khẩu tài khoản thành công!');
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  // Submit payment proof
  const handlePaymentProofSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionCode || !billImageUrl) {
      alert('Vui lòng điền mã giao dịch và đường dẫn ảnh hóa đơn thanh toán.');
      return;
    }

    setSubmittingPayment(true);
    try {
      const res = await axios.post(`${API_URL}/api/marketplace/orders/${selectedPaymentOrder.id}/payment`, {
        transactionCode: transactionCode.trim(),
        billImageUrl: billImageUrl.trim()
      }, { withCredentials: true });

      if (res.data.success) {
        alert('Gửi minh chứng chuyển khoản thành công! Đơn hàng đang chờ quản trị viên đối soát.');
        setSelectedPaymentOrder(null);
        setTransactionCode('');
        setBillImageUrl('');
        // Trigger page refresh of orders list
        if (typeof window !== 'undefined') {
          router.reload();
        }
      }
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Có lỗi xảy ra khi gửi minh chứng thanh toán. Vui lòng kiểm tra lại.');
    } finally {
      setSubmittingPayment(false);
    }
  };

  const generateMockBillUrl = () => {
    const randomNum = Math.floor(Math.random() * 10000);
    setBillImageUrl(`https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&mockBill=${randomNum}`);
    setTransactionCode(`FT${Date.now().toString().slice(-10)}`);
  };

  // ⛔ REMOVED: handleQuickApprove — route đã bị xóa vì lỗ hổng bảo mật
  // Duyệt đơn hàng chỉ thực hiện qua Super Admin Panel (:3002)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
          <div className="text-sm font-semibold text-[#64748B] animate-pulse">Đang đồng bộ dữ liệu tài khoản...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased font-sans">
      <Head>
        <title>Customer Dashboard - PlatformBDS</title>
        <meta name="description" content="Quản lý tài khoản khách hàng, đơn hàng, tải source code và danh sách yêu thích" />
      </Head>

      <Header 
        onSearch={() => {}} 
        onOpenConsultation={() => alert('Đội ngũ tư vấn sẽ liên hệ bạn qua hotline 0919 006 030!')} 
      />

      <main className="flex-grow max-w-[1280px] w-full mx-auto px-6 py-10 md:py-16">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#64748B] hover:text-[#2563EB] transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Trang Chủ Marketplace</span>
        </Link>

        {!user ? (
          /* Empty / Unauthenticated State Card */
          <div className="bg-white border border-slate-200 rounded-[24px] p-10 md:p-16 text-center max-w-xl mx-auto shadow-sm my-12">
            <div className="w-16 h-16 bg-blue-50 text-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-6">
              <UserIcon className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Bạn Chưa Đăng Nhập Tài Khoản</h2>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              Vui lòng đăng nhập hoặc đăng ký tài khoản thành viên để quản lý đơn hàng mua template, tải source code và lưu mẫu website yêu thích.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/login?redirect=/customer/dashboard"
                className="px-8 py-3.5 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold rounded-xl text-sm transition-all shadow-md inline-flex items-center justify-center"
              >
                Đăng Nhập Ngay
              </Link>
              <Link
                href="/register?redirect=/customer/dashboard"
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                Đăng Ký Tài Khoản Mới
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT SIDEBAR (3 cols) */}
            <aside className="lg:col-span-3 bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm space-y-8">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] font-bold text-lg border border-[#2563EB]/20 shrink-0">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-[16px] font-bold text-slate-900 leading-tight truncate">{user.fullName}</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded uppercase mt-1 inline-block">
                    {user.role === 'SUPER_ADMIN' ? 'SUPER ADMIN' : user.role === 'TENANT_ADMIN' ? 'TENANT VIP' : 'CUSTOMER'}
                  </span>
                </div>
              </div>

              {/* Sidebar Menu Items */}
              <nav className="flex flex-col gap-1.5 text-xs font-semibold text-slate-600">
                <button 
                  onClick={() => handleTabChange('dashboard')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-[#2563EB] text-white shadow-md' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Tổng quan</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </button>
                <button 
                  onClick={() => handleTabChange('websites')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === 'websites' ? 'bg-[#2563EB] text-white shadow-md' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="font-bold">Website của tôi</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeTab === 'websites' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                    {orders?.filter((o: any) => o.status === 'COMPLETED').length || 0}
                  </span>
                </button>
                <button 
                  onClick={() => handleTabChange('orders')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-[#2563EB] text-white shadow-md' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Đơn hàng của tôi</span>
                  </div>
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-[10px]">
                    {orders?.length || 0}
                  </span>
                </button>
                <button 
                  onClick={() => handleTabChange('downloads')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === 'downloads' ? 'bg-[#2563EB] text-white shadow-md' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-4 h-4" />
                    <span>Tải file Source</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </button>
                <button 
                  onClick={() => handleTabChange('wishlist')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === 'wishlist' ? 'bg-[#2563EB] text-white shadow-md' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4" />
                    <span>Mẫu yêu thích</span>
                  </div>
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-[10px]">
                    {wishlists?.length || 0}
                  </span>
                </button>
                <button 
                  onClick={() => handleTabChange('settings')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-[#2563EB] text-white shadow-md' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4" />
                    <span>Hồ sơ & Bảo mật</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </button>
              </nav>

              <div className="pt-6 border-t border-slate-100">
                <button 
                  onClick={() => logout()}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition-all text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất tài khoản</span>
                </button>
              </div>
            </aside>

            {/* RIGHT CONTENT PANEL (9 cols) */}
            <section className="lg:col-span-9 bg-white border border-slate-100 rounded-[24px] p-6 md:p-8 shadow-sm min-h-[520px]">
              {/* TAB 1: OVERVIEW DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  <div className="text-left">
                    <h2 className="text-2xl md:text-[32px] font-bold text-slate-900 leading-[1.15]">Xin chào, {user.fullName}!</h2>
                    <p className="text-[14px] text-[#64748B] font-normal leading-[1.7] mt-1">Chào mừng bạn quay lại cổng dịch vụ PlatformBDS VIP Member.</p>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { title: "Đơn hàng đã đặt", val: `${orders?.length || 0} đơn`, icon: <ShoppingBag className="w-5 h-5 text-blue-500" /> },
                      { title: "Mẫu đã mua source", val: `${orders?.filter((o: any) => (o.type === 'BUY' || o.type === 'BUY_SOURCE') && o.status === 'COMPLETED').length || 0} mẫu`, icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
                      { title: "Gói thuê hoạt động", val: `${orders?.filter((o: any) => o.type === 'RENT' && o.status === 'COMPLETED').length || 0} website`, icon: <Download className="w-5 h-5 text-indigo-500" /> },
                      { title: "Lưu yêu thích", val: `${wishlists?.length || 0} mẫu`, icon: <Heart className="w-5 h-5 text-red-500" /> },
                    ].map((metric, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl text-left flex flex-col justify-between min-h-[110px] hover:border-slate-200 transition-all">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">{metric.title}</span>
                          {metric.icon}
                        </div>
                        <span className="text-lg font-bold text-slate-900 mt-4 font-mono">{metric.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Recent Activities / Notices */}
                  <div className="border border-slate-150 rounded-[24px] p-6 space-y-4 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <Bell className="w-4 h-4 text-[#F59E0B]" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950">Hoạt động & Thông báo mới nhất</h3>
                    </div>
                    <div className="space-y-3.5 text-xs text-[#64748B] font-medium leading-[1.7]">
                      {!orders || orders.length === 0 ? (
                        <p className="text-slate-400 italic">Chưa có giao dịch hoặc đơn đặt hàng nào gần đây.</p>
                      ) : (
                        orders.map((ord: any) => (
                          <div key={ord.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <span className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${ord.status === 'COMPLETED' ? 'bg-green-500' : 'bg-amber-500'}`} />
                            <div className="flex-1">
                              <span className="font-bold text-slate-900">Đơn hàng #{ord.orderNumber}</span> ({ord.template?.name}) 
                              {ord.status === 'COMPLETED' 
                                ? ` đã hoàn tất kích hoạt. ${(ord.type === 'BUY' || ord.type === 'BUY_SOURCE') ? 'Bạn có thể tải file nguồn ZIP ở mục Tải file Source.' : `Website của bạn đã sẵn sàng sử dụng.`}`
                                : ord.status === 'WAITING_CONFIRM' 
                                ? ` đang chờ quản trị viên đối soát giao dịch chuyển khoản.`
                                : ` đang chờ bạn gửi thông tin xác nhận chuyển khoản.`
                              }
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono shrink-0">{new Date(ord.createdAt).toLocaleDateString('vi-VN')}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: MY WEBSITES (Danh sách các website đã sở hữu) */}
              {activeTab === 'websites' && (
                <div className="space-y-6">
                  <div className="text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl md:text-[32px] font-bold text-slate-900 leading-[1.15]">Website Của Tôi</h2>
                      <p className="text-[14px] text-[#64748B] font-normal leading-[1.7] mt-1">Danh sách các website bất động sản bạn đã mua và kích hoạt trọn đời.</p>
                    </div>
                    <Link href="/templates" className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs shrink-0">
                      <Sparkles className="w-4 h-4" />
                      <span>Mua Thêm Template Khác</span>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {!orders || orders.filter((o: any) => o.status === 'COMPLETED').length === 0 ? (
                      <div className="bg-slate-50 border border-dashed border-slate-200 p-12 rounded-2xl text-center">
                        <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <h4 className="text-base font-bold text-slate-800">Chưa có website nào được kích hoạt</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">Sau khi mua template và đơn hàng được duyệt, website của bạn sẽ xuất hiện tại đây kèm quyền truy cập CMS quản trị riêng.</p>
                        <Link href="/templates" className="mt-5 inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-md">
                          Xem Kho 24 Mẫu Template
                        </Link>
                      </div>
                    ) : (
                      orders.filter((o: any) => o.status === 'COMPLETED').map((ord: any, idx: number) => {
                        const siteName = ord.template?.name || 'Mẫu Bất Động Sản';
                        const siteSlug = ord.subdomain || `website-${ord.orderNumber.toLowerCase()}`;
                        const siteUrl = `https://${siteSlug}.${process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'templates.aireviewbds.com'}`;
                        return (
                          <div key={ord.id} className="bg-white border border-slate-200 hover:border-blue-300 p-6 rounded-2xl shadow-xs transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black text-lg shadow-md shrink-0">
                                #{idx + 1}
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-black px-2.5 py-0.5 rounded-full uppercase">
                                    🟢 Đang Hoạt Động (Sở Hữu Trọn Đời)
                                  </span>
                                  <span className="text-xs font-mono font-bold text-slate-400">#{ord.orderNumber}</span>
                                </div>
                                <h3 className="text-base font-bold text-slate-900">{siteName}</h3>
                                <div className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
                                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span className="text-blue-600 font-semibold">{siteSlug}.{process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'templates.aireviewbds.com'}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                              <button
                                onClick={() => setEditingOrderForCms(ord)}
                                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm shadow-amber-500/20 hover:scale-105 active:scale-95"
                              >
                                <Edit3 className="w-4 h-4" />
                                <span>Sửa Nội Dung Website (CMS)</span>
                              </button>

                              <a
                                href={siteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                                <span>Xem Website</span>
                              </a>

                              {ord.type === 'BUY_SOURCE' && (

                                <button
                                  onClick={() => handleTabChange('downloads')}
                                  className="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-indigo-600 font-bold text-xs flex items-center gap-1.5 transition-colors"
                                  title="Tải mã nguồn ZIP"
                                >
                                  <Download className="w-4 h-4" />
                                  <span>Tải ZIP</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: MY ORDERS */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="text-left flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl md:text-[32px] font-bold text-slate-900 leading-[1.15]">Lịch Sử Đơn Hàng</h2>
                      <p className="text-[14px] text-[#64748B] font-normal leading-[1.7] mt-1">Quản lý và theo dõi các giao dịch mua source hoặc thuê bao SaaS.</p>
                    </div>
                    <Link href="/templates" className="hidden sm:flex px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl items-center gap-1.5">
                      <span>Mua thêm mẫu</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          <th className="py-3.5 px-4">Mã đơn</th>
                          <th className="py-3.5 px-4">Tên mẫu website</th>
                          <th className="py-3.5 px-4">Ngày đặt</th>
                          <th className="py-3.5 px-4">Hình thức</th>
                          <th className="py-3.5 px-4">Thành tiền</th>
                          <th className="py-3.5 px-4 text-center">Trạng thái</th>
                          <th className="py-3.5 px-4 text-right">Hành động</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {!orders || orders.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-12 text-center text-slate-400 italic">Bạn chưa có đơn hàng nào. Hãy khám phá kho 24 mẫu template ngay!</td>
                          </tr>
                        ) : (
                          orders.map((ord: any) => (
                            <tr key={ord.id} className="text-slate-750 hover:bg-slate-50/60 transition-colors">
                              <td className="py-4 px-4 font-mono font-bold text-slate-950">{ord.orderNumber}</td>
                              <td className="py-4 px-4 font-bold text-slate-850">
                                {ord.template?.name || 'N/A'}
                                {ord.subdomain && <span className="block text-[10px] text-slate-400 font-normal font-mono">Domain: {ord.subdomain}.{process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'templates.aireviewbds.com'}</span>}
                              </td>
                              <td className="py-4 px-4 text-slate-500 font-mono">
                                {new Date(ord.createdAt).toLocaleDateString('vi-VN')}
                              </td>
                              <td className="py-4 px-4">
                                <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded uppercase ${(ord.type === 'BUY' || ord.type === 'BUY_SOURCE') ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/50' : 'bg-amber-50 text-amber-800 border border-amber-200/50'}`}>
                                  {(ord.type === 'BUY' || ord.type === 'BUY_SOURCE') ? 'Mua mã nguồn' : 'Thuê SaaS trọn gói'}
                                </span>
                              </td>
                              <td className="py-4 px-4 font-bold font-mono text-slate-950">
                                {ord.amount.toLocaleString('vi-VN')} VNĐ
                              </td>
                              <td className="py-4 px-4 text-center">
                                <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                                  ord.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                  ord.status === 'WAITING_CONFIRM' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                  ord.status === 'REJECTED' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                                  'bg-slate-100 text-slate-600'
                                }`}>
                                  {ord.status === 'COMPLETED' ? 'Đã duyệt' : ord.status === 'WAITING_CONFIRM' ? 'Chờ duyệt' : ord.status === 'REJECTED' ? 'Bị từ chối' : ord.status}
                                </span>
                              </td>
                                 {/* Đơn chờ xác nhận CK */}
                                 {(ord.status === 'PENDING' || ord.status === 'REJECTED') && (
                                   <div className="inline-flex gap-2">
                                     <button
                                       onClick={() => setSelectedPaymentOrder(ord)}
                                       className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all text-[10px]"
                                     >
                                       Xác nhận CK
                                     </button>
                                   </div>
                                 )}
                                  {/* Đơn đã duyệt → Nút đi CMS & Xem Website */}
                                  {ord.status === 'COMPLETED' && (
                                    <div className="inline-flex items-center gap-1.5 flex-wrap">
                                      <a
                                        href={process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all text-[10px]"
                                      >
                                        <LayoutDashboard className="w-3 h-3" />
                                        Vào CMS
                                      </a>
                                      {ord.subdomain && (
                                        <a
                                          href={`https://${ord.subdomain}.${process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'templates.aireviewbds.com'}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all text-[10px]"
                                        >
                                          <Eye className="w-3 h-3" />
                                          Xem Web
                                        </a>
                                      )}
                                      {(ord.type === 'BUY' || ord.type === 'BUY_SOURCE') && (
                                        <button
                                          onClick={() => handleTabChange('downloads')}
                                          className="text-indigo-600 hover:text-indigo-800 font-bold text-[10px] underline ml-1"
                                        >
                                          Tải source
                                        </button>
                                      )}
                                    </div>
                                  )}
                                 {/* Đơn chờ admin duyệt */}
                                 {ord.status === 'WAITING_CONFIRM' && (
                                   <div className="inline-flex items-center gap-2">
                                     <span className="text-amber-600 font-medium text-[10px]">Đang xử lý...</span>
                                   </div>
                                 )}
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: DOWNLOADS — SINGLE-TENANT EXPORT ENGINE */}
              {activeTab === 'downloads' && (
                <div className="space-y-6">
                  <div className="text-left">
                    <h2 className="text-2xl md:text-[32px] font-bold text-slate-900 leading-[1.15]">Bản Quyền & Tải Mã Nguồn Single-Tenant</h2>
                    <p className="text-[14px] text-[#64748B] font-normal leading-[1.7] mt-1">
                      Đóng gói và tải xuống bộ mã nguồn độc lập (Next.js 15, Tailwind, Prisma, PostgreSQL + CMS Admin Panel) dành riêng cho các đơn hàng Mua Đứt.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {!orders || orders.filter((o: any) => o.status === 'COMPLETED').length === 0 ? (
                      <div className="bg-slate-50 border border-dashed border-slate-200 p-10 rounded-2xl text-center text-slate-500 text-xs">
                        Chưa có đơn hàng Mua Đứt nào hoàn tất. Hãy mua bản quyền template để kích hoạt đường ống đóng gói mã nguồn Single-Tenant độc quyền.
                      </div>
                    ) : (
                      orders.filter((o: any) => o.status === 'COMPLETED').map((ord: any) => {
                        const isBuyOut = ord.type === 'BUY_SOURCE';
                        const currentJob = exportJobs[ord.orderNumber];
                        const isProcessing = currentJob?.status === 'PROCESSING' || currentJob?.status === 'PENDING';
                        const isReady = currentJob?.status === 'READY' && currentJob?.downloadToken;

                        if (!isBuyOut) {
                          // Đơn hàng Thuê Cloud SaaS
                          return (
                            <div key={ord.id} className="bg-slate-50/80 border border-slate-200 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                  <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                    GÓI THUÊ CLOUD SAAS
                                  </span>
                                  <span className="text-slate-400 text-xs font-mono font-bold">#{ord.orderNumber}</span>
                                </div>
                                <h4 className="text-base font-bold text-slate-800">
                                  {ord.template?.name || 'Website BĐS'} — Vận Hành Trực Tiếp Trên Cloud
                                </h4>
                                <p className="text-xs text-slate-600">
                                  Gói Thuê SaaS được lưu trữ và tối ưu trên hạ tầng Cloud Server của hệ thống. Bạn có toàn quyền truy cập CMS để quản lý tin tức, dự án và thu lead mà không cần cài đặt code.
                                </p>
                              </div>
                              <a
                                href={process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shrink-0"
                              >
                                <LayoutDashboard className="w-4 h-4 text-teal-400" />
                                <span>Quản Trị CMS</span>
                              </a>
                            </div>
                          );
                        }

                        // Đơn hàng Mua Đứt Bản Quyền
                        return (
                          <div key={ord.id} className="bg-white border-2 border-indigo-100 hover:border-indigo-300 p-6 rounded-2xl shadow-sm transition-all flex flex-col justify-between items-start text-slate-950 gap-5 text-left">
                            <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-100 pb-3">
                              <div className="flex items-center gap-2">
                                <span className="bg-indigo-100 text-indigo-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                                  MUA ĐỨT BẢN QUYỀN (SINGLE-TENANT)
                                </span>
                                <span className="text-slate-400 text-xs font-mono font-bold">#{ord.orderNumber}</span>
                              </div>
                              {isReady && currentJob?.expiresAt && (
                                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                                  ✓ Sẵn sàng tải về (Hạn đến: {new Date(currentJob.expiresAt).toLocaleDateString('vi-VN')})
                                </span>
                              )}
                            </div>

                            <div className="space-y-2">
                              <h4 className="text-lg font-black text-slate-900">
                                {ord.template?.name || 'Website BĐS'} — Gói Mã Nguồn Single-Tenant Next.js Độc Lập
                              </h4>
                              <p className="text-xs text-slate-600 font-medium">
                                Bản xuất sạch 100% được bóc tách từ CloneCraft, tích hợp sẵn cả Website công khai và CMS Admin Panel (<code className="bg-slate-100 text-indigo-700 px-1 py-0.5 rounded">/admin</code>).
                              </p>
                              
                              {/* Feature Checklist */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-slate-700 font-medium">
                                <div className="flex items-center gap-1.5 text-slate-800">
                                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                  <span>Next.js 15 + React 19 + Tailwind CSS (Bỏ multi-tenant)</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-800">
                                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                  <span>Prisma Schema độc lập + PostgreSQL</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-800">
                                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                  <span>Seed script chứa 100% dữ liệu dự án & liên hệ của bạn</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-800">
                                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                  <span>Sổ tay README.md tiếng Việt hướng dẫn chạy Local & Deploy</span>
                                </div>
                              </div>
                            </div>

                            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3 border-t border-slate-100">
                              <p className="text-[11px] text-slate-500 italic">
                                * Mã nguồn sẽ được nén thành file ZIP bảo mật và lưu trữ trong 7 ngày.
                              </p>

                              {isReady ? (
                                <button
                                  onClick={() => handleDownloadByToken(currentJob.downloadToken!, currentJob.fileName)}
                                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-lg transition cursor-pointer shrink-0"
                                >
                                  <Download className="w-4 h-4" />
                                  <span>Tải Mã Nguồn ZIP (.ZIP)</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleRequestExport(ord.orderNumber)}
                                  disabled={isProcessing}
                                  className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-blue-400 text-white font-black text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-md transition cursor-pointer shrink-0"
                                >
                                  {isProcessing ? (
                                    <>
                                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                                      <span>Đang bóc tách & nạp seed data...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Sparkles className="w-4 h-4 text-amber-300" />
                                      <span>Đóng Gói Mã Nguồn Single-Tenant</span>
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: WISHLIST */}
              {activeTab === 'wishlist' && (
                <div className="space-y-6">
                  <div className="text-left">
                    <h2 className="text-2xl md:text-[32px] font-bold text-slate-900 leading-[1.15]">Mẫu Đã Lưu Thích</h2>
                    <p className="text-[14px] text-[#64748B] font-normal leading-[1.7] mt-1">Danh sách lưu trữ các thiết kế bạn đang quan tâm để theo dõi giá và dùng thử.</p>
                  </div>

                  {!wishlists || wishlists.length === 0 ? (
                    <div className="bg-slate-50 border border-dashed border-slate-200 p-12 rounded-2xl text-center text-slate-500 text-xs">
                      Chưa có mẫu nào trong danh sách yêu thích của bạn. Hãy bấm biểu tượng trái tim khi xem danh sách template nhé!
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                      {wishlists.map((w: any) => {
                        const tpl = w.template;
                        if (!tpl) return null;
                        return (
                          <div key={w.id} className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                            <div className="aspect-video w-full overflow-hidden bg-slate-50 relative">
                              <img src={tpl.thumbnail || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'} alt={tpl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                              <span className="absolute top-3 left-3 bg-[#0F172A]/80 backdrop-blur text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase">
                                {tpl.collectionSlug || 'BĐS Nổi bật'}
                              </span>
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider line-clamp-1">{tpl.name}</h4>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{tpl.shortDescription}</p>
                              </div>
                              <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-4 text-xs font-bold font-mono text-slate-950">
                                <span>{(tpl.priceBuy || 499000).toLocaleString('vi-VN')} VNĐ</span>
                                <div className="flex gap-2">
                                  <Link href={`/demo/${tpl.slug}`} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-[11px] font-sans font-bold transition-colors">
                                    Xem Demo
                                  </Link>
                                  <button
                                    onClick={() => {
                                      addToCart(tpl, 'BUY');
                                      router.push('/cart');
                                    }}
                                    className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-[11px] font-sans font-bold transition-colors cursor-pointer"
                                  >
                                    Mua Ngay
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: PROFILE & SECURITY */}
              {activeTab === 'settings' && (
                <div className="space-y-8 text-left">
                  {/* 1. Profile information */}
                  <div>
                    <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider mb-6 pb-2 border-b border-slate-100">
                      Thông Tin Hồ Sơ Cá Nhân
                    </h2>
                    <form onSubmit={handleProfileUpdate} className="space-y-4 text-xs">
                      {profileSuccessMsg && (
                        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-700 flex items-center gap-2 animate-fadeIn shadow-sm">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span>{profileSuccessMsg}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1.5">Họ và tên thành viên</label>
                          <input 
                            type="text" 
                            value={fullName} 
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full h-[52px] border border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#2563EB] transition-colors" 
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1.5">Email tài khoản đăng nhập</label>
                          <input 
                            type="email" 
                            value={user.email || ''} 
                            className="w-full h-[52px] border border-slate-150 bg-slate-100 rounded-2xl px-4 py-2.5 text-slate-500 focus:outline-none cursor-not-allowed font-mono" 
                            disabled 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1.5">Số điện thoại liên lạc / Zalo</label>
                          <input 
                            type="text" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full h-[52px] border border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#2563EB] transition-colors font-mono" 
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1.5">Tên công ty xuất hóa đơn VAT</label>
                          <input 
                            type="text" 
                            value={companyName} 
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Công ty TNHH Bất Động Sản..."
                            className="w-full h-[52px] border border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#2563EB] transition-colors" 
                          />
                        </div>
                      </div>

                      {/* Cascading Address Selectors */}
                      <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-3.5 mt-2">
                        <div className="flex items-center gap-2 text-slate-800 font-bold text-xs mb-1">
                          <MapPin className="w-4 h-4 text-[#2563EB]" />
                          <span>Địa chỉ liên hệ & Bàn giao hồ sơ (Tỉnh / Thành phố ➡️ Quận / Huyện ➡️ Phường / Xã)</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-slate-600 font-semibold mb-1">Tỉnh / Thành phố *</label>
                            <select
                              value={selectedProvince}
                              onChange={(e) => handleProvinceChange(e.target.value)}
                              className="w-full h-[46px] border border-slate-200 bg-white rounded-xl px-3 text-slate-900 focus:outline-none focus:border-[#2563EB] transition-colors font-medium cursor-pointer"
                            >
                              <option value="">-- Chọn Tỉnh / TP --</option>
                              {getProvinces().map((p) => (
                                <option key={p} value={p}>{p}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-slate-600 font-semibold mb-1">Quận / Huyện *</label>
                            <select
                              value={selectedDistrict}
                              onChange={(e) => handleDistrictChange(e.target.value)}
                              disabled={!selectedProvince}
                              className="w-full h-[46px] border border-slate-200 bg-white rounded-xl px-3 text-slate-900 focus:outline-none focus:border-[#2563EB] transition-colors disabled:bg-slate-100 disabled:text-slate-400 font-medium cursor-pointer"
                            >
                              <option value="">-- Chọn Quận / Huyện --</option>
                              {getDistricts(selectedProvince).map((d) => (
                                <option key={d} value={d}>{d}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-slate-600 font-semibold mb-1">Phường / Xã *</label>
                            <select
                              value={selectedWard}
                              onChange={(e) => handleWardChange(e.target.value)}
                              disabled={!selectedDistrict}
                              className="w-full h-[46px] border border-slate-200 bg-white rounded-xl px-3 text-slate-900 focus:outline-none focus:border-[#2563EB] transition-colors disabled:bg-slate-100 disabled:text-slate-400 font-medium cursor-pointer"
                            >
                              <option value="">-- Chọn Phường / Xã --</option>
                              {getWards(selectedProvince, selectedDistrict).map((w) => (
                                <option key={w} value={w}>{w}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1">Số nhà, tên đường / Tòa nhà chi tiết</label>
                          <input
                            type="text"
                            value={streetAddress}
                            onChange={(e) => handleStreetChange(e.target.value)}
                            placeholder="Ví dụ: 68 Nguyễn Huệ, Tòa nhà Saigon Center..."
                            className="w-full h-[46px] border border-slate-200 bg-white rounded-xl px-3 text-slate-900 focus:outline-none focus:border-[#2563EB] transition-colors"
                          />
                        </div>

                        {address && (
                          <div className="text-[11px] text-slate-600 bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-2">
                            <span className="font-bold text-slate-800 shrink-0">📍 Địa chỉ hoàn chỉnh:</span>
                            <span className="text-slate-900 font-medium">{address}</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1.5">Mã số thuế (nếu có)</label>
                          <input 
                            type="text" 
                            value={taxCode} 
                            onChange={(e) => setTaxCode(e.target.value)}
                            placeholder="0312345678"
                            className="w-full h-[52px] border border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#2563EB] transition-colors font-mono" 
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <button 
                          type="submit" 
                          className="h-[52px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold uppercase tracking-wider px-8 rounded-2xl transition-all font-sans shadow-md"
                        >
                          Cập nhật hồ sơ
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* 2. Password updates */}
                  <div>
                    <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider mb-6 pb-2 border-b border-slate-100">
                      Đổi Mật Khẩu Bảo Mật
                    </h2>
                    <form onSubmit={handlePasswordUpdate} className="space-y-4 text-xs max-w-md">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1.5">Mật khẩu hiện tại</label>
                        <input 
                          type="password" 
                          value={passwordForm.oldPassword} 
                          onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                          className="w-full h-[52px] border border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#2563EB]" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1.5">Mật khẩu mới</label>
                        <input 
                          type="password" 
                          value={passwordForm.newPassword} 
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          className="w-full h-[52px] border border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#2563EB]" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1.5">Xác nhận mật khẩu mới</label>
                        <input 
                          type="password" 
                          value={passwordForm.confirmPassword} 
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                          className="w-full h-[52px] border border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#2563EB]" 
                          required 
                        />
                      </div>
                      <div className="pt-2">
                        <button 
                          type="submit" 
                          className="h-[52px] bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider px-8 rounded-2xl transition-all font-sans shadow-md"
                        >
                          Đổi mật khẩu
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      {/* PAYMENT PROOF MODAL */}
      {selectedPaymentOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={() => setSelectedPaymentOrder(null)}>
          <div className="w-full max-w-[540px] bg-white rounded-[24px] p-7 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-slate-100 pb-3.5 mb-5">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-indigo-600" /> Xác nhận chuyển khoản đơn: #{selectedPaymentOrder.orderNumber}
              </h3>
              <button onClick={() => setSelectedPaymentOrder(null)} className="p-1 rounded hover:bg-slate-100 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 text-xs space-y-3 mb-5">
              <div className="flex justify-between">
                <span className="text-slate-450">Tài khoản thụ hưởng:</span>
                <span className="font-bold text-slate-800 text-right">Techcombank - 19033283122019<br />(Chủ TK: NGUYEN TRUNG)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-450">Số tiền cần chuyển:</span>
                <span className="font-extrabold text-slate-900">{selectedPaymentOrder.amount.toLocaleString('vi-VN')} VNĐ</span>
              </div>
              <div className="flex justify-between bg-indigo-50 border border-indigo-100 p-2.5 rounded-lg">
                <span className="text-indigo-600 font-bold">Nội dung chuyển khoản chuẩn:</span>
                <span className="font-mono font-black text-indigo-800">THANH TOAN {selectedPaymentOrder.orderNumber}</span>
              </div>
            </div>

            <form onSubmit={handlePaymentProofSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Mã giao dịch ngân hàng *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: FT2319208312, mBill-10239, v.v."
                  value={transactionCode}
                  onChange={(e) => setTransactionCode(e.target.value)}
                  className="w-full h-[46px] border border-slate-250 rounded-xl px-4 py-2 font-mono font-bold text-slate-800 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Đường dẫn ảnh hóa đơn thanh toán *</label>
                  <button
                    type="button"
                    onClick={generateMockBillUrl}
                    className="text-[10px] text-indigo-600 font-bold hover:underline"
                  >
                    Tự động tạo Mock Bill
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Nhập URL ảnh hóa đơn (hoặc click tự động tạo Mock Bill)"
                  value={billImageUrl}
                  onChange={(e) => setBillImageUrl(e.target.value)}
                  className="w-full h-[46px] border border-slate-250 rounded-xl px-4 py-2 text-slate-700 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedPaymentOrder(null)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-lg text-xs"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={submittingPayment}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-750 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 disabled:opacity-50"
                >
                  {submittingPayment && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Gửi minh chứng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ZERO-CODE CMS EDITOR MODAL */}
      {editingOrderForCms && (
        <ZeroCodeCmsEditor
          order={editingOrderForCms}
          isOpen={!!editingOrderForCms}
          onClose={() => setEditingOrderForCms(null)}
          showToast={showToast}
        />
      )}

      <Footer />
    </div>
  );
}

