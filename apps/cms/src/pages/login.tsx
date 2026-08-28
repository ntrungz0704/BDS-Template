import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';

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
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        const user = res.data.data.user;
        const allowedRoles = ['TENANT_OWNER', 'EDITOR', 'STAFF', 'SUPER_ADMIN', 'ADMIN', 'CUSTOMER', 'CUSTOMER_OWNER', 'USER'];
        if (!allowedRoles.includes(user.role)) {
          setErrorMsg('Tài khoản không hợp lệ.');
          return;
        }
        // Redirect về trang mà user muốn vào, hoặc trang chủ CMS
        const redirectTo = (router.query.redirect as string) || '/';
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F6F3] px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md border border-[#E5E0D8]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#1A1A2E]">WEBSITE CMS</h1>
          <p className="mt-2 text-[#7F7F8F]">Quản lý tin đăng Bất động sản & Blog</p>
        </div>

        {errorMsg && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">Email Tài Khoản</label>
            <input
              type="email"
              {...register('email')}
              className="w-full rounded-lg border border-[#E5E0D8] px-4 py-3 text-sm focus:border-[#C5A572] focus:outline-none transition-colors"
              placeholder="moi-gioi@gmail.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">Mật Khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className="w-full rounded-lg border border-[#E5E0D8] pl-4 pr-10 py-3 text-sm focus:border-[#C5A572] focus:outline-none transition-colors font-mono"
                placeholder="Nhập mật khẩu..."
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#C5A572] py-3 text-sm font-semibold text-white hover:bg-[#B8941F] focus:outline-none disabled:opacity-50 transition-colors shadow-sm"
          >
            {loading ? 'Đang xác thực...' : 'Đăng Nhập Quản Trị'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
          Mật khẩu mặc định: <span className="font-bold text-slate-700 font-mono">123456</span> (hoặc mật khẩu bạn đã tạo khi đăng ký)
        </div>
      </div>
    </div>
  );
}

