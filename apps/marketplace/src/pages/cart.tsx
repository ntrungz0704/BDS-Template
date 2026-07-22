import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { 
  Trash2, CreditCard, ShoppingBag, ArrowLeft, Loader2, Sparkles, CheckCircle2, 
  ChevronRight, Lock, HelpCircle, Phone, Mail, User, Info, Check, Settings, DatabaseZap
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, user, openAuthModal } = useAuth();
  const router = useRouter();

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  
  // Upsell options state
  const [includeMaintenance, setIncludeMaintenance] = useState<Record<string, boolean>>({});
  const [includeHosting, setIncludeHosting] = useState<Record<string, boolean>>({});

  // Checkout success state
  const [successOrders, setSuccessOrders] = useState<any[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Pre-fill user data
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  // Pricing calculator
  const totalAmount = cart.reduce((sum, item) => {
    let price = 499000; // Unified template design price
    if (includeMaintenance[item.template.id]) {
      price += 299000;
    }
    if (includeHosting[item.template.id]) {
      price += 799000;
    }
    return sum + price;
  }, 0);

  // Mutator for creating orders
  const createOrderMutation = useMutation({
    mutationFn: async (orderPayload: any) => {
      const res = await axios.post(`${API_URL}/api/marketplace/orders`, orderPayload);
      return res.data;
    }
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Giỏ hàng của bạn đang trống!');
      return;
    }

    if (!fullName || !email || !phone) {
      alert('Vui lòng điền đầy đủ Họ tên, Email và Số điện thoại liên hệ.');
      return;
    }

    try {
      const createdOrders: any[] = [];
      
      // Submit orders in sequence
      for (const item of cart) {
        let price = 499000;
        let selectedAddons = [];
        if (includeMaintenance[item.template.id]) {
          price += 299000;
          selectedAddons.push("Gói Bảo trì website (+299.000đ/tháng)");
        }
        if (includeHosting[item.template.id]) {
          price += 799000;
          selectedAddons.push("Gói Hosting & Domain (+799.000đ/năm)");
        }

        const addonNote = selectedAddons.length > 0 ? ` [Kèm thêm: ${selectedAddons.join(', ')}]` : '';

        const payload = {
          templateId: item.template.id || item.template.slug,
          type: 'BUY',
          amount: price,
          fullName,
          email,
          phone,
          note: (note || '') + addonNote,
        };

        const res = await createOrderMutation.mutateAsync(payload);
        if (res.success && res.data) {
          createdOrders.push(res.data);
        }
      }

      // Display success modal
      setSuccessOrders(createdOrders);
      setShowSuccessModal(true);
      clearCart();

    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Có lỗi xảy ra khi gửi đơn hàng. Vui lòng thử lại.');
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

  return (
    <>
      <Head>
        <title>Giỏ hàng của bạn | PLATFORMBDS</title>
      </Head>

      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Header />

        <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <div className="mb-8">
            <Link href="/templates" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Tiếp tục xem mẫu website
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">Giỏ hàng</h1>
            <p className="text-slate-500 text-sm mt-1">Quản lý các mẫu website bạn đã chọn và tiến hành thanh toán kích hoạt.</p>
          </div>

          {cart.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Giỏ hàng của bạn đang trống</h3>
              <p className="text-xs text-slate-400 mt-2 max-w-sm">
                Hãy lựa chọn những mẫu giao diện bất động sản ưng ý nhất tại trang chủ để bắt đầu xây dựng thương hiệu trực tuyến.
              </p>
              <Link href="/templates" className="mt-6 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-700 hover:scale-105 transition-all shadow-md">
                Quay lại Mẫu Website
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: LIST ITEMS */}
              <div className="lg:col-span-8 space-y-4">
                {cart.map((item) => {
                  let itemPrice = 499000;
                  if (includeMaintenance[item.template.id]) itemPrice += 299000;
                  if (includeHosting[item.template.id]) itemPrice += 799000;

                  return (
                    <div key={item.template.slug} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-5 justify-between">
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b border-slate-100 pb-4">
                        <div className="flex gap-4 items-center">
                          <img 
                            src={item.template.thumbnail} 
                            alt={item.template.name} 
                            className="w-24 h-16 rounded-lg object-cover border border-slate-100 shrink-0" 
                          />
                          <div>
                            <h3 className="font-extrabold text-slate-900 text-sm">{item.template.name}</h3>
                            <span className="text-[9px] bg-blue-50 text-blue-600 font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider mt-1.5 inline-block border border-blue-200">
                              Thiết kế trọn gói
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 self-end sm:self-auto">
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Chi phí</span>
                            <span className="text-base font-black text-slate-950">
                              {formatCurrency(itemPrice)}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.template.id)}
                            className="p-2.5 border border-slate-200 hover:border-rose-200 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50/50 transition-all shrink-0"
                            title="Xóa khỏi giỏ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Upsell Checkboxes */}
                      <div className="bg-indigo-50/30 border border-indigo-100/80 rounded-2xl p-5">
                        <div className="text-[10px] font-black text-indigo-700 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-650" />
                          <span>LỰA CHỌN ĐI KÈM (TÙY CHỌN DỊCH VỤ)</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Maintenance service option */}
                          <label className="flex items-start gap-3 cursor-pointer select-none">
                            <input 
                              type="checkbox"
                              checked={!!includeMaintenance[item.template.id]}
                              onChange={() => toggleMaintenance(item.template.id)}
                              className="accent-indigo-600 w-4 h-4 rounded mt-0.5 shrink-0"
                            />
                            <div>
                              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                                <Settings className="w-3.5 h-3.5 text-slate-500" />
                                Bảo trì Website (+299k/tháng)
                              </span>
                              <p className="text-[10px] text-slate-450 leading-normal mt-0.5 font-medium">Backup dữ liệu hàng tuần, phòng ngừa virus, cập nhật hệ thống định kỳ.</p>
                            </div>
                          </label>

                          {/* Hosting & Domain service option */}
                          <label className="flex items-start gap-3 cursor-pointer select-none">
                            <input 
                              type="checkbox"
                              checked={!!includeHosting[item.template.id]}
                              onChange={() => toggleHosting(item.template.id)}
                              className="accent-indigo-600 w-4 h-4 rounded mt-0.5 shrink-0"
                            />
                            <div>
                              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                                <DatabaseZap className="w-3.5 h-3.5 text-slate-500" />
                                Hosting & Domain (+799k/năm)
                              </span>
                              <p className="text-[10px] text-slate-450 leading-normal mt-0.5 font-medium">Tên miền thương hiệu đăng ký chính chủ, máy chủ SSD đám mây tốc độ cao.</p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* RIGHT COLUMN: CHECKOUT FORM & SUMMARY */}
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">Thông tin đăng ký</h2>
                  
                  {!user && (
                    <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 mb-4 text-xs text-indigo-800 flex items-center justify-between">
                      <span className="font-medium">Đã có tài khoản?</span>
                      <button 
                        type="button"
                        onClick={() => openAuthModal('login')} 
                        className="font-bold hover:underline shrink-0 text-indigo-600"
                      >
                        Đăng nhập ngay
                      </button>
                    </div>
                  )}

                  <form onSubmit={handleCheckout} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Họ và tên người mua *</label>
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
                          className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email nhận tài khoản *</label>
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
                          className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Số điện thoại liên hệ *</label>
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
                          className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Ghi chú thêm</label>
                      <textarea
                        placeholder="Yêu cầu cụ thể, màu sắc, logo..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg text-xs font-semibold focus:border-indigo-500 focus:outline-none px-3 py-2"
                        rows={2}
                      />
                    </div>

                    <div className="h-px bg-slate-100 my-4"></div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-slate-500 font-medium">
                        <span>Số lượng sản phẩm</span>
                        <span>{cart.length} mẫu</span>
                      </div>
                      <div className="flex justify-between text-slate-500 font-medium">
                        <span>Thuế giá trị gia tăng</span>
                        <span>0% (Miễn phí)</span>
                      </div>
                      <div className="flex justify-between items-baseline pt-2">
                        <span className="font-bold text-slate-900 text-sm">Tổng cộng thanh toán:</span>
                        <span className="text-xl font-black text-indigo-600">{formatCurrency(totalAmount)}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={createOrderMutation.isPending}
                      className="w-full h-11 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-700 hover:scale-[1.02] transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50 mt-4"
                    >
                      {createOrderMutation.isPending ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Đang tạo đơn hàng...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-3.5 h-3.5" />
                          Xác nhận & Thanh toán
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
              
            </div>
          )}
        </main>
        <Footer />
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Đặt hàng thành công!</h3>
            <p className="text-slate-500 text-xs mt-3 leading-relaxed">
              Cảm ơn bạn đã lựa chọn dịch vụ của PlatformBDS. Mã đơn hàng của bạn đang được khởi tạo. Đội ngũ CSKH sẽ liên hệ với bạn trong vòng 5 phút qua Zalo/Hotline.
            </p>
            <button 
              onClick={() => { setShowSuccessModal(false); router.push('/customer/dashboard'); }}
              className="mt-8 w-full py-3 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-700 transition-all shadow-md"
            >
              Xem trang quản trị của tôi
            </button>
          </div>
        </div>
      )}
    </>
  );
}
