import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowLeft, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CustomPageProps {
  company: any;
  theme: any;
  page?: any;
  slug: string;
  tenantSlug: string;
  error?: string;
}

export default function CustomPublicPage({ company, theme, page, slug, tenantSlug, error }: CustomPageProps) {
  const primaryColor = theme?.primaryColor || '#C5A572';
  const pageTitle = page?.title || 'Trang thông tin';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      <Head>
        <title>{pageTitle} | {company?.name || 'Bất Động Sản Hoàng Gia'}</title>
      </Head>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 h-18 flex items-center justify-between">
          <Link href={`/?tenant=${tenantSlug}`} className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm"
              style={{ backgroundColor: primaryColor }}
            >
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight block text-slate-900">
                {company?.name || 'Bất Động Sản Hoàng Gia'}
              </span>
              <span className="text-[11px] text-slate-400 font-medium block">
                {company?.slogan || 'Nâng tầm không gian sống thượng lưu'}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={`/?tenant=${tenantSlug}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Về Trang Chủ
            </Link>
            <a
              href={`tel:${company?.phone || '0919006030'}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all"
              style={{ backgroundColor: primaryColor }}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{company?.phone || '0919 006 030'}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-10 w-full flex-1">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
          <Link href={`/?tenant=${tenantSlug}`} className="hover:text-slate-700 transition-colors">
            Trang Chủ
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">{pageTitle}</span>
        </div>

        {/* Page Container */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 shadow-xs border border-slate-100">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 tracking-tight">
            {pageTitle}
          </h1>
          <div className="w-16 h-1 rounded-full mb-8" style={{ backgroundColor: primaryColor }} />

          {/* Render Rich Text Content */}
          <div
            className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4"
            dangerouslySetInnerHTML={{
              __html: page?.description || page?.content || '<p>Nội dung trang đang được cập nhật...</p>',
            }}
          />
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 mt-16 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <p className="font-bold text-white text-sm mb-1">{company?.name || 'Bất Động Sản Hoàng Gia'}</p>
            <p>{company?.address || 'Diamond Plaza, 34 Lê Duẩn, Quận 1, TP. HCM'}</p>
          </div>
          <div className="text-center sm:text-right">
            <p>© {new Date().getFullYear()} {company?.name || 'Bất Động Sản Hoàng Gia'}. Tất cả quyền được bảo lưu.</p>
            <p className="text-slate-500 mt-0.5">Vận hành trên nền tảng PlatformBDS SaaS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params || {};
  const tenantSlug = (context.query.tenant as string) || 'hoanggialand';
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  try {
    const [compRes, themeRes, pageRes] = await Promise.allSettled([
      axios.get(`${API_URL}/api/website/${tenantSlug}/company-info`),
      axios.get(`${API_URL}/api/website/${tenantSlug}/theme`),
      axios.get(`${API_URL}/api/website/${tenantSlug}/pages/${slug}`),
    ]);

    const company = compRes.status === 'fulfilled' ? compRes.value.data.data : null;
    const theme = themeRes.status === 'fulfilled' ? themeRes.value.data.data : null;
    const page = pageRes.status === 'fulfilled' ? pageRes.value.data.data : null;

    return {
      props: {
        company,
        theme,
        page: page || { title: (slug as string)?.replace(/-/g, ' ').toUpperCase(), description: '' },
        slug: slug as string,
        tenantSlug,
      },
    };
  } catch (err: any) {
    return {
      props: {
        company: null,
        theme: null,
        slug: slug as string,
        tenantSlug,
        error: err.message,
      },
    };
  }
};
