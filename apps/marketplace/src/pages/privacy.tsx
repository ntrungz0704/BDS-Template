import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Mail, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100/70 text-slate-900 antialiased font-sans">
      <Head>
        <title>Chính Sách B?o M?t Thông Tin | PLATFORMBDS</title>
        <meta name="description" content="Chính sách b?o m?t thông tin khách hàng và d? li?u v?n hành website b?t d?ng s?n t?i PlatformBDS" />
      </Head>

      <Header />

      <main className="flex-grow max-w-[1000px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header Section */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-3">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay l?i Trang ch?</span>
          </Link>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 inline-block mb-2">
              VAN B?N PHÁP LÝ
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Chính Sách B?o M?t Thông Tin
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Cam k?t b?o v? d? li?u thông tin cá nhân c?a các d?i tác môi gi?i, sàn giao d?ch và doanh nghi?p trên toàn h? th?ng PlatformBDS.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-lg shadow-sm font-sans text-xs sm:text-sm leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>1. Thu th?p thông tin cá nhân</span>
            </h2>
            <p className="text-slate-600">
              Chúng tôi ch? ti?n hành thu th?p các tru?ng thông tin c?n thi?t ph?c v? cho quá trình dang ký tài kho?n, liên k?t tên mi?n riêng và qu?n lý d?ch v? bao g?m: H? tên, s? di?n tho?i, d?a ch? email (<strong className="text-slate-800">ntrungz0704@gmail.com</strong>) và d?a ch? liên l?c.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>2. M?c dích s? d?ng d? li?u</span>
            </h2>
            <p className="text-slate-600">
              Các thông tin du?c thu th?p ch? du?c ph?c v? trong các công tác v?n hành sau:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Xác nh?n dang ký s? h?u mã ngu?n giao di?n BÐS và phân quy?n tài kho?n CMS.</li>
              <li>T? d?ng c?u hình h? th?ng website, tên mi?n riêng và ch?ng ch? b?o m?t SSL.</li>
              <li>H? tr? x? lý nhanh các s? c? k? thu?t và nâng c?p tính nang.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>3. Cam k?t b?o m?t tuy?t d?i</span>
            </h2>
            <p className="text-slate-600">
              PlatformBDS cam k?t tuy?t d?i không bán, trao d?i ho?c chia s? thông tin d? li?u c?a khách hàng cho b?t k? bên th? ba nào khác ngoài m?c dích th?c hi?n giao d?ch ho?c du?c s? d?ng ý b?ng van b?n c?a chính khách hàng.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 mb-2">Thông tin liên h? khi?u n?i & h? tr? b?o m?t</h2>
            <div className="bg-slate-50 p-4 rounded-md border border-slate-200 text-xs text-slate-700 space-y-1.5">
              <p><strong>Hotline:</strong> <a href="tel:0919006030" className="text-blue-600 hover:underline">0919 006 030</a> (24/7)</p>
              <p><strong>Email:</strong> <a href="mailto:ntrungz0704@gmail.com" className="text-blue-600 hover:underline">ntrungz0704@gmail.com</a></p>
              <p><strong>Ð?a ch?:</strong> Tòa nhà PlatformBDS, TP. H? Chí Minh & Hà N?i</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

