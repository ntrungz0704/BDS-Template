import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function VerifyEmail() {
  const router = useRouter();
  const { token } = router.query;
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!router.isReady) return;
    
    if (!token) {
      setStatus('error');
      setMessage('Token không hợp lệ hoặc không tồn tại.');
      return;
    }

    const verify = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/verify-email?token=${token}`);
        setStatus('success');
        setMessage(res.data?.data?.message || 'Xác thực email thành công!');
      } catch (err: any) {
        setStatus('error');
        setMessage(err.response?.data?.error?.message || 'Có lỗi xảy ra khi xác thực.');
      }
    };

    verify();
  }, [router.isReady, token]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Head>
        <title>Xác thực Email | PlatformBDS</title>
      </Head>
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4 py-20">
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] p-6 text-white text-center">
            <h3 className="text-xl font-bold font-serif">Xác Thực Email</h3>
          </div>
          
          <div className="p-8 text-center space-y-4">
            {status === 'loading' && (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 text-[#0F172A] animate-spin" />
                <p className="text-slate-600">Đang xác thực email của bạn...</p>
              </div>
            )}
            
            {status === 'success' && (
              <div className="flex flex-col items-center gap-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                <h4 className="text-lg font-bold text-slate-800">Thành công!</h4>
                <p className="text-sm text-slate-600">{message}</p>
                <Link href="/">
                  <span className="mt-4 inline-block bg-[#0F172A] text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:bg-[#1E293B] transition-colors cursor-pointer">
                    Về trang chủ
                  </span>
                </Link>
              </div>
            )}

            {status === 'error' && (
              <div className="flex flex-col items-center gap-4">
                <XCircle className="w-16 h-16 text-red-500" />
                <h4 className="text-lg font-bold text-slate-800">Xác thực thất bại</h4>
                <p className="text-sm text-slate-600">{message}</p>
                <Link href="/">
                  <span className="mt-4 inline-block bg-[#0F172A] text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:bg-[#1E293B] transition-colors cursor-pointer">
                    Về trang chủ
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
