import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Phone, ArrowRight, CheckCircle2, ShieldCheck, Check, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RegisterPage() {
  const router = useRouter();
  const { user, register, showToast } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const requestedRedirect = router.query.redirect;
  const redirectUrl = typeof requestedRedirect === 'string'
    && requestedRedirect.startsWith('/')
    && !requestedRedirect.startsWith('//')
    ? requestedRedirect
    : '/customer/dashboard';

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      router.replace(redirectUrl);
    }
  }, [user, redirectUrl, router]);

  // Password Strength Calculation
  const hasMinLength = password.length >= 8;
  const hasUpperAndLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const strengthScore = [hasMinLength, hasUpperAndLower, hasNumber, hasSpecial].filter(Boolean).length;
  const getStrengthData = () => {
    if (!password) return { text: '', colorBg: 'bg-slate-200', colorText: 'text-slate-400', percent: 0 };
    if (strengthScore <= 1) return { text: 'Mật khẩu yếu (Cần thêm ký tự)', colorBg: 'bg-rose-500', colorText: 'text-rose-600', percent: 25 };
    if (strengthScore === 2) return { text: 'Độ mạnh trung bình', colorBg: 'bg-amber-500', colorText: 'text-amber-600', percent: 50 };
    if (strengthScore === 3) return { text: 'Mật khẩu khá mạnh', colorBg: 'bg-blue-500', colorText: 'text-blue-600', percent: 75 };
    return { text: 'Mật khẩu rất mạnh & an toàn tuyệt đối', colorBg: 'bg-emerald-500', colorText: 'text-emerald-600', percent: 100 };
  };
  const strength = getStrengthData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!fullName || !email || !phone || !password) {
      setErrorMsg('Vui lòng điền đầy đủ Họ tên, Email, Số điện thoại và Mật khẩu.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Email không hợp lệ. VD: ten@gmail.com');
      return;
    }

    const phoneClean = phone.replace(/\s/g, '');
    if (!/^(0|\+84)[0-9]{9,10}$/.test(phoneClean)) {
      setErrorMsg('SĐT phải bắt đầu bằng 0 hoặc +84, từ 10-11 số.');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Mật khẩu cần tối thiểu 8 ký tự để đảm bảo an toàn cho tài khoản của bạn.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp.');
      return;
    }

    if (!agreeTerms) {
      setErrorMsg('Vui lòng đồng ý với Điều khoản dịch vụ.');
      return;
    }

    setLoading(true);
    try {
      await register({ fullName, email, phone, password });
      setSuccessMsg('Đăng ký tài khoản thành công! Đang chuyển hướng đến trang đăng nhập...');
      showToast('Đăng ký thành công! Vui lòng đăng nhập vào tài khoản của bạn.', 'success');
      
      setTimeout(() => {
        const loginQuery = new URLSearchParams();
        if (router.query.redirect) {
          loginQuery.set('redirect', router.query.redirect as string);
        }
        loginQuery.set('registered', 'true');
        loginQuery.set('email', email);
        router.push(`/login?${loginQuery.toString()}`);
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Đăng ký không thành công. Email có thể đã tồn tại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Đăng ký tài khoản | TEMPLATES BDS</title>
        <meta name="description" content="Đăng ký tài khoản TEMPLATES BDS để sở hữu kho giao diện BĐS chuyên nghiệp và hệ thống CMS thông minh." />
      </Head>

      <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans">
        <Header />

        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
          <div className="w-full max-w-[500px] bg-white rounded-xl shadow-sm border border-slate-200 animate-fadeIn">
            {/* Header */}
            <div className="px-6 pt-8 pb-4 text-center border-b border-slate-100">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Hệ thống tài khoản TEMPLATES BDS Marketplace</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Đăng Ký Tài Khoản
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Tạo tài khoản để mua, tải mã nguồn và quản lý các website BĐS của bạn
              </p>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-7">
              {errorMsg && (
                <div className="p-3 mb-4 bg-rose-50 border border-rose-200 rounded-md text-xs font-medium text-rose-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0"></span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 mb-4 bg-emerald-50 border border-emerald-200 rounded-md text-xs font-medium text-emerald-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Họ và tên <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email đăng nhập <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Số điện thoại <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="0919 006 030"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mật khẩu <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        placeholder="Tối thiểu 8 ký tự"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Xác nhận mật khẩu <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Strength Meter */}
                {password.length > 0 && (
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg space-y-2 text-left">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-semibold text-slate-600">Độ mạnh mật khẩu:</span>
                      <span className={`font-bold ${strength.colorText}`}>{strength.text}</span>
                    </div>

                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${strength.colorBg}`}
                        style={{ width: `${strength.percent}%` }}
                      ></div>
                    </div>

                    {/* Criteria Checklist */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px]">
                      <span className={`flex items-center gap-1 font-medium ${hasMinLength ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {hasMinLength ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3 text-slate-400" />}
                        Ít nhất 8 ký tự
                      </span>
                      <span className={`flex items-center gap-1 font-medium ${hasUpperAndLower ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {hasUpperAndLower ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3 text-slate-400" />}
                        Chữ hoa & thường
                      </span>
                      <span className={`flex items-center gap-1 font-medium ${hasNumber ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {hasNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3 text-slate-400" />}
                        Chứa chữ số (0-9)
                      </span>
                      <span className={`flex items-center gap-1 font-medium ${hasSpecial ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {hasSpecial ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3 text-slate-400" />}
                        Ký tự đặc biệt (!@#...)
                      </span>
                    </div>
                  </div>
                )}

                <div className="pt-1">
                  <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="accent-slate-900 w-3.5 h-3.5 rounded mt-0.5 shrink-0"
                    />
                    <span>
                      Tôi đồng ý với{' '}
                      <Link href="/terms" className="text-blue-600 hover:underline font-medium" target="_blank">
                        Điều khoản dịch vụ
                      </Link>{' '}
                      và{' '}
                      <Link href="/privacy" className="text-blue-600 hover:underline font-medium" target="_blank">
                        Chính sách bảo mật
                      </Link>.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm disabled:opacity-60 flex items-center justify-center gap-2 mt-4 cursor-pointer"
                >
                  {loading ? (
                    <span>Đang xử lý...</span>
                  ) : (
                    <>
                      <span>Đăng ký tài khoản</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Login link */}
              <div className="mt-5 pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
                Đã có tài khoản?{' '}
                <Link
                  href={router.query.redirect ? `/login?redirect=${encodeURIComponent(router.query.redirect as string)}` : '/login'}
                  className="font-semibold text-blue-600 hover:text-blue-800"
                >
                  Đăng nhập ngay
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
