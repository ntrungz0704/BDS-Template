import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

interface ProjectDetailProps {
  company: any;
  project: any;
  tenantSlug: string;
  error?: string;
}

export default function PublicProjectDetail({ company, project, tenantSlug, error }: ProjectDetailProps) {
  if (error || !project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Lỗi kết nối dự án</h1>
          <p className="text-gray-500 mt-2">{error || 'Không tìm thấy dự án bất động sản yêu cầu.'}</p>
          <Link href="/" className="mt-4 inline-block text-sm text-[#C5A572] hover:underline">Về trang chủ</Link>
        </div>
      </div>
    );
  }

  const primaryColor = company.tenant?.colorTheme === 'gold' ? '#C5A572' : '#16213E';

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      <Head>
        <title>{project.title} | {company.name}</title>
        <meta name="description" content={project.shortDescription} />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5E0D8] px-8 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-2xl font-extrabold tracking-wider" style={{ color: primaryColor }}>
            {company.name.toUpperCase()}
          </Link>
          <nav className="flex space-x-8 text-sm font-semibold text-[#1A1A2E]">
            <Link href="/" className="hover:opacity-80">Trang chủ</Link>
            <Link href="/contact" className="hover:opacity-80">Liên hệ tư vấn</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="text-xs font-semibold text-[#7F7F8F] hover:underline">← Về danh sách dự án</Link>
          <h1 className="text-4xl font-serif font-bold text-[#1A1A2E] mt-4">{project.title}</h1>
          <p className="text-sm text-[#7F7F8F] mt-2">{project.address}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Image & Details */}
          <div className="lg:col-span-2 space-y-8">
            <img
              src={project.thumbnail || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'}
              alt={project.title}
              className="w-full h-[500px] object-cover rounded-xl border border-[#E5E0D8]"
            />

            <div className="rounded-xl border border-[#E5E0D8] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-4">Thông tin chi tiết</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-[#7F7F8F]">Mức giá:</span>
                  <p className="font-semibold text-green-600">{project.price || 'Liên hệ'}</p>
                </div>
                <div>
                  <span className="text-[#7F7F8F]">Diện tích:</span>
                  <p className="font-semibold">{project.area || 'Chưa rõ'}</p>
                </div>
                <div>
                  <span className="text-[#7F7F8F]">Loại hình:</span>
                  <p className="font-semibold">{project.type}</p>
                </div>
                <div>
                  <span className="text-[#7F7F8F]">Trạng thái:</span>
                  <p className="font-semibold">{project.status}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#E5E0D8] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-4">Mô tả dự án</h2>
              <p className="text-sm text-[#1A1A2E] leading-relaxed whitespace-pre-line">{project.description}</p>
            </div>
          </div>

          {/* Right Column: Contact form box */}
          <div className="space-y-6">
            <div className="sticky top-28 rounded-xl border border-[#E5E0D8] bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">Đăng ký nhận báo giá & tài liệu</h3>
              <p className="text-xs text-[#7F7F8F] mb-6">Để lại thông tin, văn phòng chúng tôi sẽ liên hệ và gửi sơ đồ mặt bằng chi tiết sớm nhất.</p>

              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A2E] mb-2">Họ & tên</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-[#E5E0D8] px-3 py-2 text-sm focus:border-[#C5A572] focus:outline-none"
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A2E] mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border border-[#E5E0D8] px-3 py-2 text-sm focus:border-[#C5A572] focus:outline-none"
                    placeholder="0901234567"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg py-3 text-sm font-semibold text-white transition-colors"
                  style={{ backgroundColor: primaryColor }}
                >
                  Đăng Ký Tư Vấn
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const host = context.req.headers.host || '';
  let tenantSlug = host.split('.')[0];

  if (tenantSlug === 'localhost:3003' || tenantSlug === 'localhost') {
    tenantSlug = 'hoanggialand';
  }

  try {
    const [compRes, projRes] = await Promise.all([
      axios.get(`http://localhost:5000/api/website/${tenantSlug}/company-info`),
      axios.get(`http://localhost:5000/api/website/${tenantSlug}/projects/${slug}`),
    ]);

    return {
      props: {
        company: compRes.data.data,
        project: projRes.data.data,
        tenantSlug,
      },
    };
  } catch (error: any) {
    return {
      props: {
        company: null,
        project: null,
        tenantSlug,
        error: 'Không thể tải chi tiết dự án. Vui lòng kiểm tra lại đường dẫn.',
      },
    };
  }
};
