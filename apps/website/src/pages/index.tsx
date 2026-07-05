import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

interface HomeProps {
  company: any;
  projects: any[];
  posts: any[];
  tenantSlug: string;
  error?: string;
}

export default function TenantHome({ company, projects, posts, tenantSlug, error }: HomeProps) {
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Lỗi kết nối website</h1>
          <p className="text-gray-500 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  // Nạp động CSS Variables màu sắc từ Theme của Tenant
  const primaryColor = company.tenant?.colorTheme === 'gold' ? '#C5A572' : '#16213E';

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      <Head>
        <title>{company.name} - Bất Động Sản Uy Tín</title>
        <meta name="description" content={company.description} />
        <meta property="og:title" content={company.name} />
        <meta property="og:description" content={company.description} />
        {company.logo && <meta property="og:image" content={company.logo} />}
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5E0D8] px-8 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-2xl font-extrabold tracking-wider" style={{ color: primaryColor }}>
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="h-10 w-auto" />
            ) : (
              company.name.toUpperCase()
            )}
          </Link>
          <nav className="flex space-x-8 text-sm font-semibold text-[#1A1A2E]">
            <Link href="/" className="hover:opacity-80">Trang chủ</Link>
            <Link href="/contact" className="hover:opacity-80">Liên hệ tư vấn</Link>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative bg-[#1A1A2E] py-32 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl sm:text-6xl font-serif font-bold mb-6 leading-tight">
            Khám Phá Không Gian Sống <span style={{ color: primaryColor }}>Thượng Lưu</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">{company.slogan || company.description}</p>
          <Link
            href="/contact"
            className="inline-block rounded-lg px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105"
            style={{ backgroundColor: primaryColor }}
          >
            Đăng Ký Tư Vấn Ngay
          </Link>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="mx-auto max-w-7xl px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A2E] mb-2">Dự Án Nổi Bật</h2>
          <div className="h-1 w-20 mx-auto" style={{ backgroundColor: primaryColor }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.length === 0 ? (
            <div className="col-span-3 text-center text-[#7F7F8F] py-10">Danh sách dự án đang được cập nhật...</div>
          ) : (
            projects.map((proj) => (
              <div key={proj.id} className="rounded-xl border border-[#E5E0D8] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={proj.thumbnail || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600'}
                  alt={proj.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <span className="text-xs font-bold uppercase" style={{ color: primaryColor }}>{proj.type}</span>
                  <h3 className="text-lg font-bold text-[#1A1A2E] mt-2 mb-4 line-clamp-1">{proj.title}</h3>
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-green-600">{proj.price || 'Liên hệ'}</span>
                    <span>{proj.area || 'Chưa rõ diện tích'}</span>
                  </div>
                  <div className="mt-6 border-t border-[#E5E0D8] pt-4 flex justify-between items-center text-xs">
                    <span className="text-[#7F7F8F]">{proj.address}</span>
                    <Link href={`/projects/${proj.slug}`} className="font-bold hover:underline" style={{ color: primaryColor }}>
                      Chi tiết →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A2E] py-12 text-white border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: primaryColor }}>{company.name}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{company.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Thông tin liên hệ</h3>
            <p className="text-sm text-gray-400">Địa chỉ: {company.address}</p>
            <p className="text-sm text-gray-400 mt-2">Hotline: {company.phone || company.hotline}</p>
            <p className="text-sm text-gray-400 mt-2">Email: {company.email}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Kết nối với chúng tôi</h3>
            <p className="text-sm text-gray-400 leading-relaxed">Giờ mở cửa: {company.workingHours || '8h00 - 18h00'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Phân tích host để lấy subdomain slug.
  // Ví dụ: hoanggialand.myplatform.com -> hoanggialand
  const host = context.req.headers.host || '';
  let tenantSlug = host.split('.')[0];
  
  // Localhost fallback để tiện dev và debug
  if (tenantSlug === 'localhost:3003' || tenantSlug === 'localhost') {
    tenantSlug = 'hoanggialand'; 
  }

  try {
    const [compRes, projRes, postRes] = await Promise.all([
      axios.get(`http://localhost:5000/api/website/${tenantSlug}/company-info`),
      axios.get(`http://localhost:5000/api/website/${tenantSlug}/projects?limit=6`),
      axios.get(`http://localhost:5000/api/website/${tenantSlug}/posts?limit=3`),
    ]);

    return {
      props: {
        company: compRes.data.data,
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
        projects: [],
        posts: [],
        tenantSlug,
        error: 'Không thể nạp cấu hình Website. Vui lòng kiểm tra API Server hoặc Subdomain.',
      },
    };
  }
};
