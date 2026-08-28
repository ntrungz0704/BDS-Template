import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';

// Lỗi do Hook Form yêu cầu @hookform/resolvers, ta giải quyết bằng cách cài sau
const loginSchema = z.object({
  email: z.string().email('Định dạng email không hợp lệ.'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự.'),
});

type LoginFields = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
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
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        const user = res.data.data.user;
        if (user.role !== 'SUPER_ADMIN') {
          setErrorMsg('Tài khoản của bạn không có quyền truy cập trang quản trị Super Admin.');
          return;
        }
        router.push('/');
      }
    } catch (error: any) {
      setErrorMsg(
        error.response?.data?.error?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-md rounded-2xl bg-white/[0.03] backdrop-blur-xl p-10 shadow-2xl border border-white/10 relative overflow-hidden">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-purple-500"></div>

        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 mb-4 ring-1 ring-white/20">
            <svg className="w-7 h-7" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">SAAS PLATFORM</h1>
          <p className="mt-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">Quản trị hệ thống Marketplace & Tenant</p>
        </div>

        {errorMsg && (
          <div className="mb-6 rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 text-xs font-medium text-rose-300 flex items-start gap-3">
            <svg className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Email Đăng Nhập</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <svg className="w-4 h-4" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                </svg>
              </span>
              <input
                type="email"
                {...register('email')}
                className="w-full rounded-xl border border-white/10 bg-white/[0.02] pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:border-indigo-500 focus:bg-white/[0.04] focus:outline-none transition-all shadow-inner"
                placeholder="admin@myplatform.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Mật Khẩu</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <svg className="w-4 h-4" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type="password"
                {...register('password')}
                className="w-full rounded-xl border border-white/10 bg-white/[0.02] pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:border-indigo-500 focus:bg-white/[0.04] focus:outline-none transition-all shadow-inner"
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs uppercase tracking-widest font-bold rounded-xl hover:from-indigo-600 hover:to-purple-700 hover:scale-[1.01] focus:outline-none disabled:opacity-50 transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.99]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xác thực...
              </span>
            ) : 'Đăng Nhập Quản Trị'}
          </button>

          {/* Quick Fill Button */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                setValue('email', 'admin@platformbds.vn');
                setValue('password', 'adminsuper@123456');
              }}
              className="text-xs text-indigo-400/90 hover:text-indigo-300 hover:underline inline-flex items-center gap-1.5 transition-colors"
            >
              <span>🔑 Điền nhanh tài khoản Admin mẫu</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

