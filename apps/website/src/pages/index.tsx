import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import TenantRenderer from '../components/TenantRenderer';
import { themeToCSS, themeToGoogleFontsUrl } from '../utils/themeUtils';

interface HomeProps {
  company: any;
  theme: any;
  pageContent: any;
  projects: any[];
  posts: any[];
  tenantSlug: string;
  initialPage?: string;
  error?: string;
  tenantStatus?: {
    isAccessible: boolean;
    status: string;
    trialStatus: string | null;
    trialEndAt: string | null;
    hasActiveSubscription: boolean;
    isSuspended: boolean;
  };
}

export default function TenantHome({ company, theme, pageContent, projects, posts, tenantSlug, error, tenantStatus, initialPage = 'home' }: HomeProps) {
  // Register global submitContactForm helper for all templates
  React.useEffect(() => {
    if (typeof globalThis !== 'undefined') {
      (globalThis as any).submitContactForm = async (formData: any) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_URL}/api/website/${tenantSlug}/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error?.message || 'Gửi yêu cầu thất bại.');
        }
        return result;
      };
    }
  }, [tenantSlug]);

  if (error || !company) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="text-center bg-white p-8 rounded-2xl border border-gray-200 shadow-md max-w-md">
          <h1 className="text-2xl font-bold text-red-600">Lỗi kết nối website</h1>
          <p className="text-gray-500 mt-2">{error || 'Không tìm thấy thông tin Website.'}</p>
          <p className="text-xs text-gray-400 mt-4">Vui lòng kiểm tra lại cấu hình tên miền hoặc liên hệ Admin.</p>
        </div>
      </div>
    );
  }

  // Check if website is expired/locked
  if (tenantStatus && !tenantStatus.isAccessible) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="text-center bg-white p-10 rounded-2xl border border-gray-200 shadow-lg max-w-lg">
          <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          {tenantStatus.isSuspended ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900">Website tạm ngưng hoạt động</h1>
              <p className="text-gray-500 mt-3">Website này đã bị tạm khóa bởi Quản trị viên.</p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900">Website dùng thử đã hết hạn</h1>
              <p className="text-gray-500 mt-3">
                Thời gian dùng thử đã kết thúc. Nội dung website của bạn vẫn được lưu giữ an toàn.
              </p>
              <p className="text-gray-500 mt-1">
                Để tiếp tục sử dụng, vui lòng liên hệ để đăng ký gói sử dụng.
              </p>
            </>
          )}
          <div className="mt-6 space-y-3">
            <a
              href="https://zalo.me/0983312219"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Liên hệ qua Zalo
            </a>
            <p className="text-xs text-gray-400">Powered by PlatformBDS.vn</p>
          </div>
        </div>
      </div>
    );
  }

  // Đọc template slug thực tế từ thông tin tenant trả về từ API
  const templateSlug = company?.tenant?.template?.slug || company?.tenant?.templateId || 'luxury-gold';

  return (
    <>
      <Head>
        <title>{company?.name || 'PlatformBDS Residence'}</title>
        {theme && (
          <>
            <style id="tenant-theme" dangerouslySetInnerHTML={{ __html: themeToCSS(theme) }} />
            <link href={themeToGoogleFontsUrl(theme)} rel="stylesheet" />
          </>
        )}
      </Head>
      <TenantRenderer 
        templateSlug={templateSlug} 
        company={company} 
        theme={theme} 
        projects={projects} 
        posts={posts} 
        initialPage={initialPage}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const host = context.req.headers.host || '';
  let tenantSlug = (context.req.headers['x-tenant-slug'] as string) || '';
  const initialPage = (context.query.page as string) || 'home';
  
  if (!tenantSlug || tenantSlug === 'localhost:3003' || tenantSlug === 'localhost') {
    const isDev = process.env.NODE_ENV !== 'production';
    if (isDev) {
      tenantSlug = (context.query.tenant as string) || 'hoanggialand';
    } else {
      tenantSlug = '_notfound';
    }
  }

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const [compRes, themeRes, pageRes, projRes, postRes, statusRes] = await Promise.all([
      axios.get(`${API_URL}/api/website/${tenantSlug}/company-info`),
      axios.get(`${API_URL}/api/website/${tenantSlug}/theme`),
      axios.get(`${API_URL}/api/website/${tenantSlug}/pages/home`),
      axios.get(`${API_URL}/api/website/${tenantSlug}/projects?limit=6`),
      axios.get(`${API_URL}/api/website/${tenantSlug}/posts?limit=3`),
      axios.get(`${API_URL}/api/website/${tenantSlug}/status`).catch(() => ({ data: { data: { isAccessible: true } } })),
    ]);

    return {
      props: {
        company: compRes.data.data,
        theme: themeRes.data.data,
        pageContent: pageRes.data.data,
        projects: projRes.data.data,
        posts: postRes.data.data,
        tenantSlug,
        initialPage,
        tenantStatus: statusRes.data.data,
      },
    };
  } catch (error: any) {
    console.error('Lỗi SSR load Website Tenant: ' + error.message);
    return {
      props: {
        company: null,
        theme: null,
        pageContent: null,
        projects: [],
        posts: [],
        tenantSlug,
        initialPage,
        error: 'Không thể nạp cấu hình Website. Vui lòng kiểm tra API Server hoặc Subdomain.',
      },
    };
  }
};
