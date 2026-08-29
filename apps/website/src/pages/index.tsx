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
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';
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
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100 p-4">
        <div className="text-center bg-slate-900/90 p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl max-w-lg">
          <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-5 text-xl font-black">
            404
          </div>
          <h1 className="text-2xl font-black text-white">Website Không Tồn Tại</h1>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Địa chỉ website này chưa được tạo hoặc chưa liên kết với bất kỳ mẫu giao diện nào trong hệ thống CloneCraft.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://templates.aireviewbds.com"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-blue-600/20"
            >
              Xem Sàn Mẫu Website
            </a>
            <a
              href="https://cms.aireviewbds.com"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm rounded-xl border border-slate-700 transition"
            >
              Đăng Nhập CMS
            </a>
          </div>
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

  // Đọc template slug thực tế từ thông tin tenant trả về từ API hoặc fallback
  const templateSlug = company?.tenant?.template?.slug || company?.tenant?.templateId || company?.templateSlug || 'luxury-gold';

  return (
    <>
      <Head>
        <title>{company?.name || 'AI Review BĐS — Hệ Thống Website Bất Động Sản'}</title>
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
        pageContent={pageContent}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const initialPage = (context.query.page as string) || 'home';
  
  let tenantSlug = (context.req.headers['x-tenant-slug'] as string) || '';

  if (tenantSlug === '_notfound' || tenantSlug === 'bds-template-website' || tenantSlug === 'website' || tenantSlug === 'localhost:3003' || tenantSlug === 'localhost') {
    tenantSlug = '';
  }

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';
    const [compRes, themeRes, pageRes, projRes, postRes, statusRes] = await Promise.all([
      axios.get(`${API_URL}/api/website/${tenantSlug}/company-info`).catch(() => ({ data: { data: null } })),
      axios.get(`${API_URL}/api/website/${tenantSlug}/theme`).catch(() => ({ data: { data: null } })),
      axios.get(`${API_URL}/api/website/${tenantSlug}/pages/home`).catch(() => ({ data: { data: null } })),
      axios.get(`${API_URL}/api/website/${tenantSlug}/projects?limit=6`).catch(() => ({ data: { data: [] } })),
      axios.get(`${API_URL}/api/website/${tenantSlug}/posts?limit=3`).catch(() => ({ data: { data: [] } })),
      axios.get(`${API_URL}/api/website/${tenantSlug}/status`).catch(() => ({ data: { data: { isAccessible: true } } })),
    ]);

    const defaultProjects = [
      {
        id: 'p1',
        name: 'The Grand Manhattan Diamond',
        slug: 'the-grand-manhattan-diamond',
        price: '18.5 Tỷ',
        location: 'Quận 1, TP. Hồ Chí Minh',
        area: '145m²',
        bedrooms: 3,
        bathrooms: 3,
        thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        status: 'FOR_SALE',
        featured: true,
        description: 'Căn hộ Duplex siêu sang giữa lòng Quận 1, tầm nhìn panorama trọn vẹn sông Sài Gòn và trung tâm tài chính.',
      },
      {
        id: 'p2',
        name: 'Villa Rivera Royal Gold',
        slug: 'villa-rivera-royal-gold',
        price: '45.0 Tỷ',
        location: 'Thảo Điền, TP. Thủ Đức',
        area: '450m²',
        bedrooms: 5,
        bathrooms: 6,
        thumbnail: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
        status: 'FOR_SALE',
        featured: true,
        description: 'Dinh thự ven sông Thảo Điền với hồ bơi vô cực dát vàng, sân vườn nhiệt đới và bến du thuyền riêng biệt.',
      },
      {
        id: 'p3',
        name: 'Eco Green Smart Penthouse',
        slug: 'eco-green-smart-penthouse',
        price: '28.0 Tỷ',
        location: 'Quận 7, TP. Hồ Chí Minh',
        area: '280m²',
        bedrooms: 4,
        bathrooms: 4,
        thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        status: 'FOR_SALE',
        featured: true,
        description: 'Penthouse kính tràn viền 360 độ, kiến trúc sinh thái xanh và hệ thống nhà thông minh chuẩn quốc tế.',
      },
    ];

    const defaultPosts = [
      {
        id: 'b1',
        title: 'Xu hướng đầu tư Bất Động Sản Hạng Sang 2026',
        slug: 'xu-huong-dau-tu-bds-hang-sang-2026',
        excerpt: 'Phân tích các yếu tố cốt lõi giúp phân khúc BĐS hàng hiệu tăng trưởng bền vững vượt trội.',
        thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600',
        createdAt: new Date().toISOString(),
        author: 'Ban Nghiên Cứu Thị Trường',
      },
      {
        id: 'b2',
        title: 'Cẩm nang pháp lý và bảo mật quyền sở hữu tài sản',
        slug: 'cam-nang-phap-ly-va-bao-mat-tai-san',
        excerpt: 'Những điều nhà đầu tư sành sỏi cần lưu ý trước khi giải ngân vào các siêu dự án nghỉ dưỡng.',
        thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
        createdAt: new Date().toISOString(),
        author: 'Chuyên Gia Pháp Lý BĐS',
      },
    ];

    if (!compRes.data?.data) {
      return {
        props: {
          company: {
            name: 'AI Review BĐS — Hệ Thống Website Bất Động Sản Cao Cấp',
            slogan: 'Nâng Tầm Vị Thế Doanh Nghiệp Bất Động Sản',
            phone: '0983 312 219',
            hotline: '0919 006 030',
            email: 'contact@aireviewbds.com',
            address: 'Tòa nhà Landmark 81, TP. Hồ Chí Minh',
            workingHours: '8:00 - 18:00 (Thứ 2 - Thứ 7)',
            aboutContent: 'Hệ thống nền tảng cung cấp giải pháp chuyển đổi số toàn diện cho doanh nghiệp và nhà môi giới bất động sản hàng đầu Việt Nam.',
            logo: '',
            tenant: {
              id: 'showcase-tenant',
              name: 'AI Review BĐS',
              slug: 'luxury-gold',
              template: {
                id: 'template-luxury-gold',
                slug: 'luxury-gold',
                name: 'Luxury Gold Style',
              },
            },
          },
          theme: themeRes.data?.data || {
            primaryColor: '#2563EB',
            secondaryColor: '#1E293B',
            accentColor: '#F59E0B',
            fontHeading: 'Plus Jakarta Sans',
            fontBody: 'Inter',
          },
          pageContent: pageRes.data?.data || null,
          projects: (projRes.data?.data && projRes.data.data.length > 0) ? projRes.data.data : defaultProjects,
          posts: (postRes.data?.data && postRes.data.data.length > 0) ? postRes.data.data : defaultPosts,
          tenantSlug: tenantSlug || 'showcase',
          initialPage,
          tenantStatus: { isAccessible: true },
        },
      };
    }

    return {
      props: {
        company: compRes.data.data,
        theme: themeRes.data?.data || null,
        pageContent: pageRes.data?.data || null,
        projects: projRes.data?.data || [],
        posts: postRes.data?.data || [],
        tenantSlug,
        initialPage,
        tenantStatus: statusRes.data?.data || { isAccessible: true },
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


