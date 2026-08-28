import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Mail, Phone, Lock, ArrowRight, CheckCircle2, ShieldCheck, PhoneCall, KeyRound } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ZaloIcon from '../components/icons/ZaloIcon';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';

export default function ForgotPassword() {
  const router = useRouter();
  const { showToast } = useAuth();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !phone || !newPassword) {
      setErrorMsg('Vui lòng điền đầy đủ Email, Số điện thoại và Mật khẩu mới.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('Mật khẩu mới cần tối thiểu 6 ký tự.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/direct-reset-password`, {
        email: email.trim(),
        phone: phone.trim(),
        newPassword,
      });

      if (res.data?.success) {
        setSuccess(true);
        showToast('Đặt lại mật khẩu thành công! Quý khách có thể đăng nhập ngay.', 'success');
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error?.message || 'Thông tin xác thực không chính xác. Vui lòng kiểm tra lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Khôi phục mật khẩu | PLATFORMBDS</title>
        <meta name="description" content="Khôi phục và đặt lại mật khẩu tài khoản PlatformBDS qua xác thực bảo mật nội bộ hoặc hỗ trợ CSKH." />
      </Head>

      <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans">
        <Header />

        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-12 sm:py-16">
          <div className="w-full max-w-[460px] bg-white rounded-lg shadow-sm border border-slate-200 animate-fadeIn">
            {/* Header */}
            <div className="px-6 pt-8 pb-4 text-center border-b border-slate-100">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Khôi phục quyền truy cập nội bộ</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Đặt Lại Mật Khẩu
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Xác thực bằng Email & Số điện thoại đã đăng ký để đổi mật khẩu ngay
              </p>
            </div>

            {/* Form & Support Section */}
            <div className="p-6 sm:p-7">
              {success ? (
                <div className="text-center space-y-3 py-2">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900">Mật khẩu đã được cập nhật!</h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tài khoản của bạn đã được đặt lại mật khẩu mới thành công. Bạn có thể sử dụng mật khẩu mới này để đăng nhập ngay bây giờ.
                  </p>
                  <div className="pt-3">
                    <Link
                      href="/login"
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-md hover:bg-slate-800 transition-colors shadow-sm"
                    >
                      Đăng nhập ngay
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  {errorMsg && (
                    <div className="p-3 mb-4 bg-rose-50 border border-rose-200 rounded-md text-xs font-medium text-rose-700">
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email tài khoản <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Số điện thoại đăng ký <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0919 006 030"
                          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Mật khẩu mới <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="password"
                            required
                            placeholder="Tối thiểu 6 ký tự"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
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

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
                    >
                      {loading ? (
                        <span>Đang xác thực dữ liệu...</span>
                      ) : (
                        <>
                          <KeyRound className="w-4 h-4" />
                          <span>Xác thực & Đặt lại mật khẩu</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Customer Care / Zalo Direct Support */}
                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <div className="bg-slate-50 border border-slate-200 rounded-md p-3.5 text-xs text-slate-700">
                      <p className="font-semibold text-slate-900 mb-1">Cần hỗ trợ khôi phục tài khoản gấp?</p>
                      <p className="text-slate-500 text-[11px] mb-3">
                        Nếu bạn không nhớ số điện thoại đăng ký, hãy liên hệ trực tiếp đội ngũ kỹ thuật PlatformBDS:
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <a
                          href="https://zalo.me/0919006030"
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#0068FF] hover:bg-blue-600 text-white font-medium rounded text-xs transition-colors shadow-sm"
                        >
                          <ZaloIcon variant="glyph" className="w-3.5 h-3.5 text-white" />
                          <span>Chat Zalo CSKH</span>
                        </a>
                        <a
                          href="tel:0919006030"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-medium rounded text-xs transition-colors"
                        >
                          <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Hotline: 0919 006 030</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="mt-5 text-center text-xs text-slate-600">
                Nhớ lại mật khẩu?{' '}
                <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-800">
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

