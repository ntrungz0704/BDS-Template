import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Plus, Image as ImageIcon, Globe, Key } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CMSGuidePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased font-sans">
      <Head>
        <title>Hướng Dẫn Quản Trị Hệ Thống CMS Website BĐS - PlatformBDS</title>
        <meta name="description" content="Hướng dẫn sử dụng hệ thống quản trị CMS để đăng bài dự án bất động sản, chỉnh sửa thông tin giao diện và kết nối domain tại PlatformBDS" />
      </Head>

      <Header 
        onSearch={() => {}} 
        onOpenConsultation={() => alert('Đội ngũ tư vấn sẽ liên hệ bạn qua hotline 0919 006 030!')} 
        onOpenAuth={() => {}}
      />

      <main className="flex-grow max-w-[1280px] w-full mx-auto px-6 py-[120px]">
        {/* Breadcrumbs / Header */}
        <div className="max-w-[700px] mb-12 space-y-4 animate-fade-up">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#64748B] hover:text-[#2563EB] transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Trang chủ</span>
          </Link>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#F59E0B] bg-amber-50 px-3.5 py-1 rounded-full border border-amber-100/50 inline-block">HƯỚNG DẪN VẬN HÀNH</span>
          <h1 className="text-slate-900 tracking-tight leading-[1.15] text-[56px] font-bold">
            Quản Trị Giao Diện <br />
            <span className="text-[#2563EB]">Sàn BĐS Siêu Đơn Giản</span>
          </h1>
          <p className="text-[#64748B] text-[16px] font-medium leading-[1.7]">
            Bạn không cần biết code. Hệ thống CMS của chúng tôi được tối ưu hóa trực quan tuyệt đối, giúp bạn đăng tải thông tin nhà đất chỉ trong 1 phút.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-up">
          {/* Left Sticky navigation */}
          <aside className="lg:col-span-4 bg-white border border-slate-100 p-8 rounded-[24px] shadow-sm space-y-6 sticky top-28 font-sans">
            <h3 className="text-[24px] font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#2563EB]" />
              <span>Các Mục Hướng Dẫn</span>
            </h3>
            <ul className="space-y-4 text-xs font-semibold">
              <li>
                <a href="#quickstart" className="block text-[#2563EB] hover:text-[#1D4ED8] transition-colors">
                  1. Khởi tạo Website trong 30s
                </a>
              </li>
              <li>
                <a href="#projects" className="block text-slate-600 hover:text-[#2563EB] transition-colors">
                  2. Đăng tin dự án và sản phẩm
                </a>
              </li>
              <li>
                <a href="#media" className="block text-slate-600 hover:text-[#2563EB] transition-colors">
                  3. Quản lý hình ảnh và banner
                </a>
              </li>
              <li>
                <a href="#domain" className="block text-slate-600 hover:text-[#2563EB] transition-colors">
                  4. Kết nối tên miền riêng
                </a>
              </li>
            </ul>
          </aside>

          {/* Right Contents */}
          <article className="lg:col-span-8 bg-white border border-slate-100 p-8 md:p-10 rounded-[24px] shadow-sm space-y-12 font-sans text-[16px] leading-[1.7] text-left">
            {/* Sec 1 */}
            <section id="quickstart" className="space-y-4">
              <h2 className="text-[32px] font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Key className="w-6 h-6 text-[#2563EB]" />
                <span>1. Khởi tạo Website trong 30s</span>
              </h2>
              <p className="text-[#64748B] font-medium leading-[1.7]">
                Sau khi bấm **Đăng ký sở hữu** giao diện tại PlatformBDS, bạn sẽ nhận được thông tin đăng nhập trang CMS quản trị và link subdomain tạm thời dạng `tên-thương-hiệu.myplatform.com` qua email/Zalo của mình.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[14px] text-[#64748B] leading-[1.7]">
                <strong>💡 Lưu ý quan trọng:</strong> Vui lòng lưu thông tin mật khẩu đăng nhập CMS của bạn ở nơi bảo mật. Bạn có thể thay đổi lại mật khẩu trong bảng điều khiển thành viên.
              </div>
            </section>

            {/* Sec 2 */}
            <section id="projects" className="space-y-4">
              <h2 className="text-[32px] font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Plus className="w-6 h-6 text-[#2563EB]" />
                <span>2. Đăng tin dự án và sản phẩm</span>
              </h2>
              <p className="text-[#64748B] font-medium leading-[1.7]">
                Để thêm bài viết giới thiệu biệt thự, căn hộ chung cư mới phân phối:
              </p>
              <ol className="list-decimal pl-5 space-y-2.5 text-[#64748B] font-medium">
                <li>Truy cập vào menu <strong>Quản lý sản phẩm</strong> trong thanh điều hướng bên trái CMS.</li>
                <li>Bấm chọn nút <strong>Thêm dự án mới</strong> ở góc trên bên phải.</li>
                <li>Điền đầy đủ thông tin chi tiết: Tiêu đề sản phẩm, mô tả tổng quan, vị trí, diện tích, giá bán, tiện ích nội ngoại khu.</li>
                <li>Click chọn thẻ <strong>Tự động tối ưu SEO</strong> giúp Google index nhanh bài viết.</li>
              </ol>
            </section>

            {/* Sec 3 */}
            <section id="media" className="space-y-4">
              <h2 className="text-[32px] font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-[#2563EB]" />
                <span>3. Quản lý hình ảnh và banner</span>
              </h2>
              <p className="text-[#64748B] font-medium leading-[1.7]">
                Ảnh chụp tiện ích thực tế và sơ đồ mặt bằng (floor plan) là chìa khóa để thu hút khách hàng liên hệ:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#64748B] font-medium">
                <li>Sử dụng chức năng kéo thả ảnh tại khung tải lên (hỗ trợ định dạng `.png`, `.jpg`, `.webp`).</li>
                <li>Nên tối ưu dung lượng ảnh dưới 1.5MB để đảm bảo website load siêu mượt và chuẩn chỉ SEO.</li>
              </ul>
            </section>

            {/* Sec 4 */}
            <section id="domain" className="space-y-4">
              <h2 className="text-[32px] font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Globe className="w-6 h-6 text-[#2563EB]" />
                <span>4. Kết nối tên miền riêng</span>
              </h2>
              <p className="text-[#64748B] font-medium leading-[1.7]">
                Đối với các đại lý hoặc cá nhân sử dụng gói **Professional / Business**, bạn có thể trỏ tên miền chính thức của mình:
              </p>
              <p className="text-[#64748B] font-medium leading-[1.7]">
                Vào nhà cung cấp domain (Mắt Bão, Pavietnam, Cloudflare...) cấu hình bản ghi **CNAME** trỏ về địa chỉ `cname.myplatform.com`. Sau đó gửi thông tin domain cho bộ phận hỗ trợ của PlatformBDS để kích hoạt kết nối SSL bảo mật miễn phí.
              </p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
