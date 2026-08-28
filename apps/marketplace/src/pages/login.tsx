import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const { user, login, showToast } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [registeredMsg, setRegisteredMsg] = useState('');

  const redirectUrl = (router.query.redirect as string) || '/customer/dashboard';

  // Handle registered query or email pre-fill
  useEffect(() => {
    if (router.isReady) {
      if (router.query.email && typeof router.query.email === 'string') {
        setEmail(router.query.email);
      }
      if (router.query.registered === 'true') {
        setRegisteredMsg('Tài khoản đã được tạo thành công! Vui lòng nhập mật khẩu để đăng nhập.');
      }
    }
  }, [router.isReady, router.query]);

  // If already logged in, redirect based on role
  useEffect(() => {
    if (user) {
      if ((user.role as any) === 'SUPER_ADMIN') {
        window.location.href = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3002';
      } else if ((user.role as any) === 'TENANT_OWNER' || (user as any).role === 'CUSTOMER_OWNER' || (user as any).tenantId) {
        window.location.href = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001';
      } else {
        router.replace(redirectUrl);
      }
    }
  }, [user, redirectUrl, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    setLoading(true);
    try {
      const loggedIn = await login(email, password);
      if (loggedIn) {
        showToast('Đăng nhập thành công!', 'success');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Email hoặc mật khẩu không chính xác.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Đăng Nhập | TEMPLATES BDS</title>
      </Head>

      <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans">
        <Header />

        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-12 sm:py-16">
          <div className="w-full max-w-[420px] bg-white rounded-lg shadow-sm border border-slate-200 animate-fadeIn">
            {/* Header */}
            <div className="px-6 pt-8 pb-4 text-center border-b border-slate-100">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Hệ thống quản trị TEMPLATES BDS</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Đăng Nhập
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Nhập thông tin tài khoản của bạn để tiếp tục
              </p>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-7">
              {registeredMsg && (
                <div className="p-3 mb-4 bg-emerald-50 border border-emerald-200 rounded-md text-xs font-medium text-emerald-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                  <span>{registeredMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-3 mb-4 bg-rose-50 border border-rose-200 rounded-md text-xs font-medium text-rose-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0"></span>
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email <span className="text-rose-500">*</span>
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
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Mật khẩu <span className="text-rose-500">*</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm disabled:opacity-60 flex items-center justify-center gap-2 mt-5"
                >
                  {loading ? (
                    <span>Đang xử lý...</span>
                  ) : (
                    <>
                      <span>Đăng nhập</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Register link */}
              <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-600">
                Chưa có tài khoản?{' '}
                <Link
                  href={router.query.redirect ? `/register?redirect=${encodeURIComponent(router.query.redirect as string)}` : '/register'}
                  className="font-semibold text-blue-600 hover:text-blue-800"
                >
                  Đăng ký tài khoản mới
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

