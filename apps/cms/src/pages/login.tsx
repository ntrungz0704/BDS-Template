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

export default function LoginPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

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
        'http://localhost:5000/api/auth/login',
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        const user = res.data.data.user;
        if (user.role !== 'TENANT_ADMIN' && user.role !== 'TENANT_EDITOR') {
          setErrorMsg('Tài khoản của bạn không thuộc vai trò quản lý Website.');
          return;
        }
        // Lưu thông tin Tenant ID vào localStorage để sử dụng cho Header x-tenant-id
        localStorage.setItem('tenantId', user.tenantId || '');
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
            <input
              type="password"
              {...register('password')}
              className="w-full rounded-lg border border-[#E5E0D8] px-4 py-3 text-sm focus:border-[#C5A572] focus:outline-none transition-colors"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#C5A572] py-3 text-sm font-semibold text-white hover:bg-[#B8941F] focus:outline-none disabled:opacity-50 transition-colors"
          >
            {loading ? 'Đang xác thực...' : 'Đăng Nhập Quản Trị'}
          </button>
        </form>
      </div>
    </div>
  );
}
