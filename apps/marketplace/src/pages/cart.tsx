import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { 
  Trash2, CreditCard, ShoppingBag, ArrowLeft, Loader2, Sparkles, CheckCircle2, 
  ChevronRight, Lock, HelpCircle, Phone, Mail, User, Info, Check, Settings, DatabaseZap,
  ShieldCheck, MessageSquare, Globe
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, user, openAuthModal, showToast, isPurchased } = useAuth();
  const router = useRouter();

  // Mounted guard to prevent SSR hydration mismatch / blank screen
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [desiredSubdomain, setDesiredSubdomain] = useState('');
  const [note, setNote] = useState('');
  const [itemNotes, setItemNotes] = useState<Record<string, string>>({});
  
  // Upsell options state
  const [includeMaintenance, setIncludeMaintenance] = useState<Record<string, boolean>>({});
  const [includeHosting, setIncludeHosting] = useState<Record<string, boolean>>({});

  // Pre-fill user data
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  // Safe cart array
  const safeCart = (Array.isArray(cart) ? cart : []).filter((item: any) => item && (item.template || item.id));

  // Pricing calculator helper
  const getItemPrice = (item: any) => {
    if (!item) return 399000;
    const tpl = item.template || item;
    let price = Number(tpl.priceBuy) || Number(tpl.price) || 399000;
    const id = tpl.id || tpl.slug || 'default';
    if (includeMaintenance[id]) {
      price += 799000; // Bảo trì website 799k/năm
    }
    if (includeHosting[id]) {
      price += 799000; // Hosting & Domain 799k/năm
    }
    return price;
  };

  const originalTotal = safeCart.reduce((sum: number, item: any) => {
    const tpl = item?.template || item;
    const buyPrice = Number(tpl?.priceBuy) || Number(tpl?.price) || 399000;
    const orig = Number(tpl?.originalPrice) || (buyPrice <= 399000 ? 799000 : Math.round(buyPrice * 1.5));
    const id = tpl?.id || tpl?.slug || 'default';
    let total = orig;
    if (includeMaintenance[id]) total += 799000;
    if (includeHosting[id]) total += 799000;
    return sum + total;
  }, 0);

  const totalAmount = safeCart.reduce((sum: number, item: any) => sum + getItemPrice(item), 0);
  const discountTotal = Math.max(0, originalTotal - totalAmount);

  // Mutator for creating orders
  const createOrderMutation = useMutation({
    mutationFn: async (orderPayload: any) => {
      const res = await axios.post(`${API_URL}/api/marketplace/orders`, orderPayload, {
        withCredentials: true,
      });
      return res.data;
    }
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (safeCart.length === 0) {
      showToast('Giỏ hàng của bạn đang trống!', 'info');
      return;
    }

    if (!user) {
      showToast('Vui lòng đăng nhập hoặc đăng ký trước khi đặt mua để nhận quyền tải source.', 'info');
      router.push('/login?redirect=/cart');
      return;
    }

    if (!fullName || fullName.trim().length < 2) {
      showToast('Vui lòng nhập Họ và tên (tối thiểu 2 ký tự).', 'error');
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      showToast('Vui lòng nhập Email hợp lệ (VD: ten@gmail.com).', 'error');
      return;
    }

    const phoneClean = phone.replace(/\s/g, '');
    if (!phoneClean || !/^(0|\+84)[0-9]{9,10}$/.test(phoneClean)) {
      showToast('Số điện thoại phải bắt đầu bằng 0 hoặc +84, từ 10-11 số.', 'error');
      return;
    }

    try {
      const createdOrders: any[] = [];
      
      // Submit orders in sequence with per-item notes
      for (const item of (safeCart as any[])) {
        const tpl: any = item.template || item;
        const tplIdentifier = tpl?.slug || tpl?.id || 'luxury-gold';
        const price = getItemPrice(item);
        let selectedAddons = [];
        const itemId = tpl?.id || tpl?.slug;
        if (includeMaintenance[itemId]) {
          selectedAddons.push("Gói Bảo trì website (+799.000đ/năm)");
        }
        if (includeHosting[itemId]) {
          selectedAddons.push("Gói Hosting & Domain (+799.000đ/năm)");
        }

        const itemSpecificNote = itemNotes[itemId]?.trim();
        const addonNote = selectedAddons.length > 0 ? ` [Kèm thêm: ${selectedAddons.join(', ')}]` : '';
        
        let noteParts = [];
        if (itemSpecificNote) noteParts.push(`Yêu cầu riêng mẫu: ${itemSpecificNote}`);
        if (note?.trim()) noteParts.push(`Ghi chú chung: ${note.trim()}`);
        if (addonNote) noteParts.push(addonNote);
        
        const fullOrderNote = noteParts.join(' | ');

        const payload = {
          templateId: tplIdentifier,
          type: 'BUY',
          amount: price,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phoneClean,
          subdomain: desiredSubdomain?.trim() || undefined,
          note: fullOrderNote,
        };

        const res = await createOrderMutation.mutateAsync(payload);
        if (res.success && res.data) {
          createdOrders.push(res.data);
        }
      }

      // Clear cart on successful order submission
      clearCart();
      const firstOrder = createdOrders[0];
      if (firstOrder?.orderNumber) {
        showToast('Đã gửi yêu cầu đặt website thành công!', 'success');
        
        // Build Zalo URL for the success page to display as a clickable link
        const zaloText = encodeURIComponent(`Chào Admin, tôi vừa đặt mẫu website trên PlatformBDS. Mã đơn hàng: ${firstOrder.orderNumber}. Họ tên: ${fullName}. Nhờ bạn tư vấn thanh toán và bàn giao website.`);
        const zaloUrl = `https://zalo.me/0983312219?text=${zaloText}`;
        
        router.push(`/checkout/success?orderNumber=${firstOrder.orderNumber}&zalo=${encodeURIComponent(zaloUrl)}`);
      } else {
        router.push('/templates');
      }

    } catch (err: any) {
      showToast(err.response?.data?.error?.message || 'Có lỗi xảy ra khi gửi đơn hàng. Vui lòng thử lại.', 'error');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(amount);
  };

  const toggleMaintenance = (id: string) => {
    setIncludeMaintenance(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleHosting = (id: string) => {
    setIncludeHosting(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Header />
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold text-slate-400">Đang tải giỏ hàng...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Giỏ hàng của bạn | TEMPLATES BDS</title>
      </Head>

      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Header />

        <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="mb-6">
            <Link href="/templates" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Tiếp tục xem mẫu website
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">Giỏ hàng</h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Quản lý các mẫu website bạn đã chọn và tiến hành thanh toán kích hoạt.</p>
          </div>

          {/* User Auth Banner constraint */}
          {!user && (
            <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-amber-900">Yêu cầu đăng nhập hoặc đăng ký tài khoản</p>
                  <p className="text-xs text-amber-700 mt-0.5">Để bảo vệ quyền sở hữu website và kích hoạt tài khoản CMS quản trị, quý khách vui lòng đăng nhập trước khi hoàn tất thanh toán.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <Link
                  href="/login?redirect=/cart"
                  className="flex-1 sm:flex-initial px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all shadow-sm text-center"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register?redirect=/cart"
                  className="flex-1 sm:flex-initial px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all text-center"
                >
                  Đăng ký mới
                </Link>
              </div>
            </div>
          )}

          {safeCart.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Giỏ hàng của bạn đang trống</h3>
              <p className="text-xs text-slate-400 mt-2 max-w-sm">
                Hãy lựa chọn những mẫu giao diện bất động sản ưng ý nhất tại kho giao diện để bắt đầu xây dựng thương hiệu trực tuyến.
              </p>
              <Link href="/templates" className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 hover:scale-105 transition-all shadow-md">
                Xem Kho Mẫu Website BĐS
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: LIST ITEMS */}
              <div className="lg:col-span-8 space-y-4">
                {(safeCart as any[]).map((item: any) => {
                  const tpl = item?.template || item;
                  const id = tpl?.id || tpl?.slug || 'item';
                  const itemPrice = getItemPrice(item);
                  const owned = typeof isPurchased === 'function' ? isPurchased(tpl?.slug || id) : false;

                  return (
                    <div key={tpl?.slug || id} className={`bg-white border ${owned ? 'border-emerald-300 ring-2 ring-emerald-500/20' : 'border-slate-200'} rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-4 justify-between`}>
                      {owned && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-800">
                          <div className="flex items-center gap-2 font-bold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Bạn đã mua và sở hữu mẫu này trọn đời. Không cần thanh toán lại!</span>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                            <a
                              href={process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all text-center"
                            >
                              Vào CMS Quản trị
                            </a>
                            <button
                              type="button"
                              onClick={() => removeFromCart(id)}
                              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-300 rounded-lg transition-all font-semibold"
                            >
                              Xóa khỏi giỏ
                            </button>
                          </div>
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b border-slate-100 pb-4">
                        <div className="flex gap-3.5 items-center">
                          <img 
                            src={tpl.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'} 
                            alt={tpl.name || 'Mẫu Website'} 
                            className="w-24 h-16 rounded-xl object-cover border border-slate-100 shrink-0" 
                          />
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm">{tpl.name || 'Mẫu Website BĐS'}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-[10px] ${owned ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-600 border-blue-200'} font-bold px-2 py-0.5 rounded uppercase tracking-wider border`}>
                                {owned ? 'ĐÃ SỞ HỮU TRỌN ĐỜI' : 'Bàn giao trọn gói / 1 Năm'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-5 self-end sm:self-auto">
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Đơn giá / Năm</span>
                            <span className="text-base font-black text-blue-600">
                              {formatCurrency(itemPrice)}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(id)}
                            className="p-2 border border-slate-200 hover:border-rose-200 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50/50 transition-all shrink-0"
                            title="Xóa khỏi giỏ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Upsell Checkboxes */}
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                          <span>DỊCH VỤ TÙY CHỌN BỔ SUNG (TÍCH CHỌN NẾU CẦN)</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Maintenance service option */}
                          <label className="flex items-start gap-2.5 cursor-pointer select-none">
                            <input 
                              type="checkbox"
                              checked={!!includeMaintenance[id]}
                              onChange={() => toggleMaintenance(id)}
                              className="accent-blue-600 w-4 h-4 rounded mt-0.5 shrink-0"
                            />
                            <div>
                              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                                <Settings className="w-3.5 h-3.5 text-slate-500" />
                                Bảo trì Website VIP (+799k/năm)
                              </span>
                              <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Backup dữ liệu định kỳ, vá lỗi bảo mật, hỗ trợ kỹ thuật cả năm.</p>
                            </div>
                          </label>

                          {/* Hosting & Domain service option */}
                          <label className="flex items-start gap-2.5 cursor-pointer select-none">
                            <input 
                              type="checkbox"
                              checked={!!includeHosting[id]}
                              onChange={() => toggleHosting(id)}
                              className="accent-blue-600 w-4 h-4 rounded mt-0.5 shrink-0"
                            />
                            <div>
                              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                                <DatabaseZap className="w-3.5 h-3.5 text-slate-500" />
                                Hosting Cloud & Domain (+799k/năm)
                              </span>
                              <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Tên miền thương hiệu riêng, máy chủ Cloud SSD siêu tốc 12 tháng.</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Individual template note */}
                      <div className="pt-2 border-t border-slate-100">
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <span className="text-blue-600">📝</span>
                          <span>Ghi chú riêng cho mẫu này (Tên thương hiệu, Domain mong muốn...):</span>
                          <span className="text-slate-400 font-normal lowercase">(tùy chọn)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Ví dụ: BĐS Hoàng Gia Landmark, hoanggialand.vn, yêu cầu gắn logo riêng..."
                          value={itemNotes[id] || ''}
                          onChange={(e) => setItemNotes(prev => ({ ...prev, [id]: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* RIGHT COLUMN: CHECKOUT FORM & SUMMARY */}
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <h2 className="text-base font-bold text-slate-900">Thông tin thanh toán</h2>
                    {user ? (
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Đã đăng nhập
                      </span>
                    ) : (
                      <Link
                        href="/login?redirect=/cart"
                        className="text-xs font-bold text-blue-600 hover:underline"
                      >
                        Đăng nhập
                      </Link>
                    )}
                  </div>

                  <form onSubmit={handleCheckout} className="space-y-3.5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Họ và tên người nhận *</label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Nguyễn Văn A"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email nhận quyền quản trị *</label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Số điện thoại kích hoạt *</label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <input
                          type="tel"
                          required
                          placeholder="0983xxxxxx"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                        <span>Tên miền phụ thương hiệu (Subdomain)</span>
                        <span className="text-slate-400 font-normal lowercase">(miễn phí)</span>
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Globe className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Ví dụ: thanhtrung-land, hoanggia, villas-saigon..."
                          value={desiredSubdomain}
                          onChange={(e) => setDesiredSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                          className="w-full pl-9 pr-32 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:border-blue-500 focus:outline-none font-mono"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 text-[11px] font-bold font-mono">
                          .aireviewbds.com
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {desiredSubdomain ? (
                          <>Đường dẫn website: <strong className="text-blue-600 font-mono">https://{desiredSubdomain}.aireviewbds.com</strong></>
                        ) : (
                          <>Để trống hệ thống sẽ tự sinh tên sang trọng từ Họ tên của bạn (VD: <span className="font-mono text-slate-700">thanhtrung-land.aireviewbds.com</span>)</>
                        )}
                      </p>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Ghi chú chung cho đơn hàng (tùy chọn)</label>
                      <textarea
                        placeholder="Yêu cầu hóa đơn, thỏa thuận riêng hoặc lưu ý thêm..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl text-xs font-semibold focus:border-blue-500 focus:outline-none px-3 py-2"
                        rows={2}
                      />
                    </div>

                    <div className="h-px bg-slate-100 my-3"></div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-slate-500 font-medium">
                        <span>Giá gốc niêm yết ({safeCart.length} mẫu)</span>
                        <span className="font-bold text-slate-400 line-through">{formatCurrency(originalTotal)}</span>
                      </div>
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Ưu đãi Flash Sale (-38%)</span>
                        <span>-{formatCurrency(discountTotal)}</span>
                      </div>
                      <div className="flex justify-between text-slate-500 font-medium">
                        <span>Thuế VAT</span>
                        <span>0% (Miễn phí)</span>
                      </div>
                      <div className="flex justify-between items-baseline pt-2 border-t border-slate-100">
                        <span className="font-bold text-slate-900 text-sm">Tổng cộng:</span>
                        <span className="text-xl font-black text-blue-600">{formatCurrency(totalAmount)}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={createOrderMutation.isPending}
                      className="w-full h-12 bg-[#0068FF] hover:bg-[#0052cc] text-white font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                    >
                      {createOrderMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Đang gửi yêu cầu...</span>
                        </>
                      ) : !user ? (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Đăng nhập & Gửi Yêu Cầu Zalo</span>
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-4 h-4" />
                          <span>Gửi Yêu Cầu & Thanh Toán Qua Zalo</span>
                        </>
                      )}
                    </button>

                    <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-2xl text-[11px] text-slate-600 space-y-1 mt-3">
                      <div className="font-bold text-blue-900 flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Quy trình thanh toán & nhận website:</span>
                      </div>
                      <p className="leading-relaxed text-slate-500">
                        1. Sau khi gửi, hệ thống tự động kết nối Zalo trực tiếp với Admin.
                      </p>
                      <p className="leading-relaxed text-slate-500">
                        2. Admin gửi STK chuyển khoản & xác nhận cấu hình theo yêu cầu.
                      </p>
                      <p className="leading-relaxed text-slate-500">
                        3. Admin kích hoạt Website và gửi tài khoản CMS đăng nhập có sẵn mẫu bạn đã chọn.
                      </p>
                    </div>
                  </form>
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
