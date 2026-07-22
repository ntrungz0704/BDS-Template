import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased font-sans">
      <Head>
        <title>Điều Khoản Sử Dụng Dịch Vụ - PlatformBDS</title>
        <meta name="description" content="Quy định sử dụng dịch vụ khởi tạo và quản trị website bất động sản tại PlatformBDS" />
      </Head>

      <Header 
        onSearch={() => {}} 
        onOpenConsultation={() => alert('Đội ngũ tư vấn sẽ liên hệ bạn qua hotline 0919 006 030!')} 
        onOpenAuth={() => {}}
      />

      <main className="flex-grow max-w-[1280px] w-full mx-auto px-6 py-[120px]">
        {/* Header Section */}
        <div className="max-w-[700px] mb-12 space-y-4 animate-fade-up">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#64748B] hover:text-[#2563EB] transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Trang chủ</span>
          </Link>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#F59E0B] bg-amber-50 px-3.5 py-1 rounded-full border border-amber-100/50 inline-block">VĂN BẢN PHÁP LÝ</span>
          <h1 className="text-slate-900 tracking-tight leading-[1.15] text-[56px] font-bold">
            Điều Khoản <span className="text-[#2563EB]">Dịch Vụ</span>
          </h1>
          <p className="text-[#64748B] text-[16px] font-medium leading-[1.7]">
            Các quy định pháp lý và điều kiện ràng buộc giữa khách hàng sử dụng và ban quản trị PlatformBDS.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[24px] shadow-sm max-w-4xl animate-fade-up font-sans text-[16px] leading-[1.7] text-left space-y-8">
          <section className="space-y-3">
            <h2 className="text-[32px] font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#2563EB]" />
              <span>1. Bản quyền mã nguồn giao diện</span>
            </h2>
            <p className="text-[#64748B] font-medium">
              Đối với hình thức mua đứt Source Code, khách hàng được toàn quyền sử dụng, chỉnh sửa và sao chép phục vụ cho mục đích kinh doanh cá nhân. Tuy nhiên, nghiêm cấm tuyệt đối việc chia sẻ công khai hoặc bán lại mã nguồn cho bên thứ tư khi chưa được PlatformBDS cấp quyền thương mại bằng văn bản.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[32px] font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#2563EB]" />
              <span>2. Thời gian kích hoạt và thanh toán</span>
            </h2>
            <p className="text-[#64748B] font-medium">
              *   **Kích hoạt:** Hệ thống sẽ được kích hoạt tự động ngay sau khi nhận được thông báo chuyển khoản thành công với đúng mã giao dịch (Order Number).
              *   **Dịch vụ thuê tháng (SaaS):** Khách hàng cần tiến hành thanh toán gia hạn trước ít nhất 3 ngày khi hết chu kỳ tháng để tránh hệ thống tự động khóa tạm thời dịch vụ subdomain.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[32px] font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#2563EB]" />
              <span>3. Quyền hạn từ chối cung cấp dịch vụ</span>
            </h2>
            <p className="text-[#64748B] font-medium">
              PlatformBDS có quyền từ chối cung cấp dịch vụ hoặc khóa vĩnh viễn website mà không cần hoàn tiền nếu phát hiện khách hàng sử dụng website để đăng tải thông tin lừa đảo, bất hợp pháp, vi phạm thuần phong mỹ tục Việt Nam hoặc các hoạt động rửa tiền trá hình.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
