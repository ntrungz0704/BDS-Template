import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/auth/forgot-password`, { email: email.trim() });
      setSuccess(true);
    } catch (error: any) {
      setErrorMsg(error.response?.data?.error?.message || 'Không thể gửi yêu cầu. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Khôi phục mật khẩu | PlatformBDS</title>
        <meta name="description" content="Nhận liên kết đặt lại mật khẩu PlatformBDS qua email." />
      </Head>

      <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4 py-16">
          <div className="w-full max-w-[440px] rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-6 text-center">
              <ShieldCheck className="mx-auto mb-3 h-9 w-9 text-emerald-600" />
              <h1 className="text-2xl font-bold text-slate-900">Khôi phục mật khẩu</h1>
              <p className="mt-2 text-sm text-slate-500">
                Nhập email tài khoản do Admin đã tạo. Liên kết một lần sẽ hết hạn sau 60 phút.
              </p>
            </div>

            {success ? (
              <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-center">
                <CheckCircle2 className="mx-auto mb-2 h-7 w-7 text-emerald-600" />
                <p className="text-sm font-semibold text-emerald-800">
                  Nếu email tồn tại, hệ thống đã gửi liên kết đặt lại mật khẩu.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && <div className="rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{errorMsg}</div>}
                <div>
                  <label htmlFor="reset-email" className="mb-1 block text-sm font-semibold text-slate-700">Email tài khoản</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="reset-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full rounded-md border border-slate-300 py-2.5 pl-9 pr-3 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
                >
                  {loading ? 'Đang gửi...' : 'Gửi liên kết đặt lại mật khẩu'}
                </button>
              </form>
            )}

            <p className="mt-5 text-center text-sm text-slate-600">
              <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-800">Quay lại đăng nhập</Link>
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
