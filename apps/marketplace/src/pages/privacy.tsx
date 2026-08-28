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
        <title>Ch�nh S�ch B?o M?t Th�ng Tin | PLATFORMBDS</title>
        <meta name="description" content="Ch�nh s�ch b?o m?t th�ng tin kh�ch h�ng v� d? li?u v?n h�nh website b?t d?ng s?n t?i PlatformBDS" />
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
            Ch�nh S�ch B?o M?t Th�ng Tin
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Cam k?t b?o v? d? li?u th�ng tin c� nh�n c?a c�c d?i t�c m�i gi?i, s�n giao d?ch v� doanh nghi?p tr�n to�n h? th?ng PlatformBDS.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-lg shadow-sm font-sans text-xs sm:text-sm leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>1. Thu th?p th�ng tin c� nh�n</span>
            </h2>
            <p className="text-slate-600">
              Ch�ng t�i ch? ti?n h�nh thu th?p c�c tru?ng th�ng tin c?n thi?t ph?c v? cho qu� tr�nh dang k� t�i kho?n, li�n k?t t�n mi?n ri�ng v� qu?n l� d?ch v? bao g?m: H? t�n, s? di?n tho?i, d?a ch? email (<strong className="text-slate-800">ntrungz0704@gmail.com</strong>) v� d?a ch? li�n l?c.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>2. M?c d�ch s? d?ng d? li?u</span>
            </h2>
            <p className="text-slate-600">
              C�c th�ng tin du?c thu th?p ch? du?c ph?c v? trong c�c c�ng t�c v?n h�nh sau:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>X�c nh?n dang k� s? h?u m� ngu?n giao di?n B�S v� ph�n quy?n t�i kho?n CMS.</li>
              <li>T? d?ng c?u h�nh h? th?ng website, t�n mi?n ri�ng v� ch?ng ch? b?o m?t SSL.</li>
              <li>H? tr? x? l� nhanh c�c s? c? k? thu?t v� n�ng c?p t�nh nang.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>3. Cam k?t b?o m?t tuy?t d?i</span>
            </h2>
            <p className="text-slate-600">
              PlatformBDS cam k?t tuy?t d?i kh�ng b�n, trao d?i ho?c chia s? th�ng tin d? li?u c?a kh�ch h�ng cho b?t k? b�n th? ba n�o kh�c ngo�i m?c d�ch th?c hi?n giao d?ch ho?c du?c s? d?ng � b?ng van b?n c?a ch�nh kh�ch h�ng.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 mb-2">Th�ng tin li�n h? khi?u n?i & h? tr? b?o m?t</h2>
            <div className="bg-slate-50 p-4 rounded-md border border-slate-200 text-xs text-slate-700 space-y-1.5">
              <p><strong>Hotline:</strong> <a href="tel:0919006030" className="text-blue-600 hover:underline">0919 006 030</a> (24/7)</p>
              <p><strong>Email:</strong> <a href="mailto:ntrungz0704@gmail.com" className="text-blue-600 hover:underline">ntrungz0704@gmail.com</a></p>
              <p><strong>�?a ch?:</strong> T�a nh� PlatformBDS, TP. H? Ch� Minh & H� N?i</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

