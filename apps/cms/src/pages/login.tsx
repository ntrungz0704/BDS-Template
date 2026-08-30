import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Định dạng email không hợp lệ.'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự.'),
});

type LoginFields = z.infer<typeof loginSchema>;

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';

export default function LoginPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFields) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          email: data.email.trim(),
          password: data.password,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        const user = res.data.data.user;
        const allowedRoles = ['TENANT_OWNER', 'EDITOR', 'STAFF', 'CUSTOMER', 'SUPER_ADMIN'];
        if (!allowedRoles.includes(user.role)) {
          await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true }).catch(() => undefined);
          setErrorMsg('Tài khoản không có quyền truy cập CMS.');
          return;
        }

        const requestedRedirect = router.query.redirect;
        const fallbackRedirect = user.role === 'STAFF' ? '/leads' : '/';
        const redirectTo = typeof requestedRedirect === 'string'
          && requestedRedirect.startsWith('/')
          && !requestedRedirect.startsWith('//')
          ? requestedRedirect
          : fallbackRedirect;
        
        router.push(redirectTo);
      }
    } catch (error: any) {
      setErrorMsg(
        error.response?.data?.error?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>Đăng Nhập CMS Quản Trị Website | TEMPLATES BDS</title>
      </Head>

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 font-sans selection:bg-indigo-500 selection:text-white">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse" />

        <div className="w-full max-w-md rounded-3xl bg-white/[0.04] backdrop-blur-2xl p-8 sm:p-10 shadow-2xl border border-white/10 relative overflow-hidden">
          {/* Top Line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500" />

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 mb-4 ring-1 ring-white/20">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              WEBSITE CMS BUILDER
            </h1>
            <p className="mt-2 text-xs font-bold text-indigo-300 uppercase tracking-widest">
              Quản Trị Giao Diện, Dự Án & Tin Tức
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 p-4 text-xs font-bold text-rose-300 flex items-start gap-2.5">
              <span className="text-rose-400 mt-0.5 text-sm font-bold">⚠️</span>
              <span className="leading-relaxed">{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                Email Tài Khoản CMS
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-indigo-400 focus:bg-white/[0.08] focus:outline-none transition-all shadow-inner"
                  placeholder="moi-gioi@gmail.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                Mật Khẩu CMS
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-10 pr-10 py-3 text-sm text-white placeholder-slate-500 focus:border-indigo-400 focus:bg-white/[0.08] focus:outline-none transition-all shadow-inner font-mono"
                  placeholder="Nhập mật khẩu..."
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs uppercase tracking-widest font-black rounded-2xl hover:scale-[1.01] active:scale-[0.99] focus:outline-none disabled:opacity-50 transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Đang xác thực...</span>
                </span>
              ) : (
                <>
                  <span>Đăng Nhập CMS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Helper tip */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              💡 Mật khẩu mặc định là <strong className="text-amber-300 font-mono">phần trước dấu @</strong> trong email của bạn (vd: <span className="font-mono">nguyenlongdz8</span>).
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
