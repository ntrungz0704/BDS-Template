import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, FileText, ShieldCheck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100/70 text-slate-900 antialiased font-sans">
      <Head>
        <title>�i?u Kho?n D?ch V? | PLATFORMBDS</title>
        <meta name="description" content="Quy d?nh s? d?ng d?ch v? kh?i t?o v� qu?n tr? website b?t d?ng s?n t?i PlatformBDS" />
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
              VAN B?N PH�P L�
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            �i?u Kho?n S? D?ng D?ch V?
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
            C�c quy d?nh ph�p l� v� di?u ki?n r�ng bu?c gi?a kh�ch h�ng s? d?ng v� ban qu?n tr? PlatformBDS.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-lg shadow-sm font-sans text-xs sm:text-sm leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>1. B?n quy?n m� ngu?n giao di?n</span>
            </h2>
            <p className="text-slate-600">
              �?i v?i h�nh th?c mua d?t Source Code, kh�ch h�ng du?c to�n quy?n s? d?ng, ch?nh s?a v� tri?n khai ph?c v? cho m?c d�ch kinh doanh c� nh�n ho?c doanh nghi?p. Tuy nhi�n, nghi�m c?m tuy?t d?i vi?c chia s? c�ng khai ho?c b�n l?i m� ngu?n cho b�n th? tu khi chua du?c PlatformBDS c?p quy?n thuong m?i b?ng van b?n.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>2. Th?i gian k�ch ho?t v� thanh to�n</span>
            </h2>
            <p className="text-slate-600">
              * <strong>K�ch ho?t:</strong> H? th?ng s? du?c k�ch ho?t t? d?ng ngay sau khi nh?n du?c th�ng b�o chuy?n kho?n th�nh c�ng v?i d�ng m� giao d?ch don h�ng.<br />
              * <strong>D?ch v? thu� th�ng (SaaS):</strong> Kh�ch h�ng ti?n h�nh thanh to�n gia h?n tru?c khi h?t chu k? th�ng d? h? th?ng duy tr� li�n t?c v� kh�ng b? gi�n do?n ho?t d?ng.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>3. Ch�nh s�ch ho�n ti?n 7 ng�y</span>
            </h2>
            <p className="text-slate-600">
              PlatformBDS cam k?t ho�n ti?n 100% trong v�ng 7 ng�y d?u ti�n k? t? th?i di?m k�ch ho?t n?u qu� kh�ch kh�ng h�i l�ng v? ch?t lu?ng d?ch v? ho?c h? th?ng g?p s? c? k? thu?t kh�ng th? kh?c ph?c.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 mb-2">Th�ng tin h? tr? ph�p l� & di?u kho?n</h2>
            <div className="bg-slate-50 p-4 rounded-md border border-slate-200 text-xs text-slate-700 space-y-1.5">
              <p><strong>Hotline:</strong> <a href="tel:0919006030" className="text-blue-600 hover:underline">0919 006 030</a> (24/7)</p>
              <p><strong>Email ti?p nh?n:</strong> <a href="mailto:ntrungz0704@gmail.com" className="text-blue-600 hover:underline">ntrungz0704@gmail.com</a></p>
              <p><strong>�?a ch?:</strong> T�a nh� PlatformBDS, TP. H? Ch� Minh & H� N?i</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

