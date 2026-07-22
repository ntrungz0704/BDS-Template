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
  error?: string;
}

export default function TenantHome({ company, theme, pageContent, projects, posts, tenantSlug, error }: HomeProps) {
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
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const host = context.req.headers.host || '';
  let tenantSlug = (context.req.headers['x-tenant-slug'] as string) || '';
  
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
    const [compRes, themeRes, pageRes, projRes, postRes] = await Promise.all([
      axios.get(`${API_URL}/api/website/${tenantSlug}/company-info`),
      axios.get(`${API_URL}/api/website/${tenantSlug}/theme`),
      axios.get(`${API_URL}/api/website/${tenantSlug}/pages/home`),
      axios.get(`${API_URL}/api/website/${tenantSlug}/projects?limit=6`),
      axios.get(`${API_URL}/api/website/${tenantSlug}/posts?limit=3`),
    ]);

    return {
      props: {
        company: compRes.data.data,
        theme: themeRes.data.data,
        pageContent: pageRes.data.data,
        projects: projRes.data.data,
        posts: postRes.data.data,
        tenantSlug,
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
        error: 'Không thể nạp cấu hình Website. Vui lòng kiểm tra API Server hoặc Subdomain.',
      },
    };
  }
};
