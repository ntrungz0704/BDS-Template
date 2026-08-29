import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Plus, Image as ImageIcon, Globe, Key, CheckCircle2, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CMSGuidePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100/70 text-slate-900 antialiased font-sans">
      <Head>
        <title>Hướng Dẫn Quản Trị Hệ Thống CMS Website BĐS | PLATFORMBDS</title>
        <meta name="description" content="Hướng dẫn sử dụng hệ thống quản trị CMS để đăng bài dự án bất động sản, chỉnh sửa thông tin giao diện và kết nối domain tại PlatformBDS" />
      </Head>

      <Header />

      <main className="flex-grow max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Breadcrumbs / Header */}
        <div className="max-w-[800px] mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-3">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại Trang chủ</span>
          </Link>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 inline-block mb-2">
              HƯỚNG DẪN VẬN HÀNH
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Quản Trị Website & CMS BĐS Siêu Đơn Giản
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Bạn không cần biết lập trình hay kỹ thuật phức tạp. Hệ thống CMS của PlatformBDS được tối ưu hóa trực quan, giúp bạn cập nhật dự án, bảng giá và bài viết chỉ trong 1 phút.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sticky navigation */}
          <aside className="lg:col-span-4 bg-white border border-slate-200 p-6 rounded-lg shadow-sm space-y-4 lg:sticky lg:top-24 font-sans">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Nội Dung Hướng Dẫn</span>
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="#quickstart" className="block text-blue-600 hover:underline">
                  1. Khởi tạo & Kích hoạt Website trong 30s
                </a>
              </li>
              <li>
                <a href="#projects" className="block text-slate-700 hover:text-blue-600">
                  2. Đăng tin dự án và sản phẩm BĐS
                </a>
              </li>
              <li>
                <a href="#media" className="block text-slate-700 hover:text-blue-600">
                  3. Quản lý hình ảnh và banner trình chiếu
                </a>
              </li>
              <li>
                <a href="#leads" className="block text-slate-700 hover:text-blue-600">
                  4. Thu thập và quản lý khách hàng tiềm năng (Leads)
                </a>
              </li>
              <li>
                <a href="#domain" className="block text-slate-700 hover:text-blue-600">
                  5. Cấu hình tên miền riêng (.vn / .com)
                </a>
              </li>
            </ul>

            <div className="pt-3 border-t border-slate-100">
              <Link
                href="/templates"
                className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Khám phá Kho Mẫu Website</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>

          {/* Right Main Content */}
          <div className="lg:col-span-8 bg-white border border-slate-200 p-6 sm:p-8 rounded-lg shadow-sm space-y-8 font-sans text-xs sm:text-sm leading-relaxed">
            {/* 1. Quickstart */}
            <section id="quickstart" className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Key className="w-4 h-4 text-blue-600" />
                <span>1. Khởi tạo Website trong 30s</span>
              </h2>
              <p className="text-slate-600">
                Sau khi hoàn tất đăng ký tài khoản trên PlatformBDS, hệ thống tự động khởi tạo cho bạn một website demo riêng biệt. Bạn có thể đăng nhập vào trang CMS Quản Trị bằng tài khoản của mình bất cứ lúc nào.
              </p>
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-md text-xs text-slate-700 space-y-1">
                <p>✅ Truy cập nhanh CMS: <strong className="text-blue-600 font-mono">{process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}</strong> (hoặc subdomain của bạn)</p>
                <p>✅ Đăng nhập bằng Email & Mật khẩu bạn đã tạo trên Marketplace.</p>
              </div>
            </section>

            {/* 2. Projects */}
            <section id="projects" className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" />
                <span>2. Đăng tin dự án và sản phẩm BĐS</span>
              </h2>
              <p className="text-slate-600">
                Tại menu bên trái của CMS, nhấn chọn <strong>"Dự án"</strong> hoặc <strong>"Sản phẩm"</strong> ➔ bấm <strong>"Thêm mới"</strong>.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Nhập tên dự án, vị trí, chủ đầu tư, diện tích và mức giá.</li>
                <li>Tải lên hình ảnh sắc nét hoặc chọn từ thư viện media.</li>
                <li>Hệ thống tự động đồng bộ ra giao diện người dùng ngay lập tức.</li>
              </ul>
            </section>

            {/* 3. Media */}
            <section id="media" className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                <span>3. Quản lý hình ảnh và banner</span>
              </h2>
              <p className="text-slate-600">
                Trình quản lý Media cho phép bạn kéo thả nhiều hình ảnh cùng một lúc, tự động nén dung lượng WebP chuẩn SEO giúp website tải siêu nhanh dưới 1 giây.
              </p>
            </section>

            {/* 4. Leads */}
            <section id="leads" className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>4. Quản lý khách hàng tiềm năng (Leads)</span>
              </h2>
              <p className="text-slate-600">
                Mỗi khi có khách hàng để lại thông tin trên form liên hệ của website, thông báo sẽ được gửi ngay đến bạn và lưu trữ an toàn trong mục <strong>"Khách hàng & Leads"</strong> của CMS.
              </p>
            </section>

            {/* 5. Domain */}
            <section id="domain" className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-600" />
                <span>5. Cấu hình tên miền riêng</span>
              </h2>
              <p className="text-slate-600">
                Bạn có thể trỏ tên miền cá nhân (ví dụ: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">tuannhadat.vn</code>) vào website thông qua bản ghi DNS CNAME hoặc liên hệ đội ngũ kỹ thuật <a href="mailto:ntrungz0704@gmail.com" className="text-blue-600 hover:underline font-semibold">ntrungz0704@gmail.com</a> / Hotline <strong className="text-slate-900 font-mono">0919 006 030</strong> để được hỗ trợ trỏ tên miền miễn phí!
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

