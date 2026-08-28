import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';

export default function AcceptInvitePage() {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState<'loading' | 'needs_registration' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const [inviteData, setInviteData] = useState<{ email: string; tenantName: string } | null>(null);

  const [registerForm, setRegisterForm] = useState({ fullName: '', password: '', confirmPassword: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!token) return;

    axios.post(`${API_URL}/api/cms/members/accept-invite`, { token })
      .then((res) => {
        if (res.data.data.needsRegistration) {
          setInviteData(res.data.data);
          setStatus('needs_registration');
        } else {
          setStatus('success');
          setTimeout(() => router.push('/login'), 3000);
        }
      })
      .catch((err) => {
        setStatus('error');
        setErrorMsg(err.response?.data?.error?.message || 'Có lỗi xảy ra khi xác nhận lời mời.');
      });
  }, [token, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/api/cms/members/complete-registration`, {
        token,
        fullName: registerForm.fullName,
        password: registerForm.password,
      });
      setStatus('success');
      setTimeout(() => router.push('/login'), 3000);
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Có lỗi xảy ra khi đăng ký.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Head>
        <title>Chấp nhận lời mời - PlatformBDS</title>
      </Head>

      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl mx-auto flex items-center justify-center text-white font-bold text-xl mb-4">
            P
          </div>
          <h1 className="text-2xl font-bold text-slate-900">PlatformBDS CMS</h1>
        </div>

        {status === 'loading' && (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Đang kiểm tra lời mời...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center py-8">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Không thể chấp nhận lời mời</h2>
            <p className="text-slate-600 mb-6">{errorMsg}</p>
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Về trang đăng nhập
            </button>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Thành công!</h2>
            <p className="text-slate-600 mb-6">Bạn đã là thành viên của Website. Đang chuyển hướng đến trang đăng nhập...</p>
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Đăng nhập ngay
            </button>
          </div>
        )}

        {status === 'needs_registration' && inviteData && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Hoàn tất đăng ký</h2>
              <p className="text-slate-500 text-sm mt-2">
                Tạo tài khoản để tham gia quản trị website <strong>{inviteData.tenantName}</strong>
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={inviteData.email}
                  disabled
                  className="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
                <input
                  type="text"
                  required
                  value={registerForm.fullName}
                  onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 mt-4"
              >
                {isSubmitting ? 'Đang xử lý...' : 'Hoàn tất & Đăng nhập'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

