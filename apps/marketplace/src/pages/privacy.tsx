import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased font-sans">
      <Head>
        <title>Chính Sách Bảo Mật Thông Tin - PlatformBDS</title>
        <meta name="description" content="Chính sách bảo mật thông tin khách hàng và dữ liệu vận hành website bất động sản tại PlatformBDS" />
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
            Chính Sách <span className="text-[#2563EB]">Bảo Mật</span>
          </h1>
          <p className="text-[#64748B] text-[16px] font-medium leading-[1.7]">
            Cam kết bảo vệ dữ liệu thông tin cá nhân của các đối tác môi giới và chủ đầu tư trên toàn hệ thống PlatformBDS.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[24px] shadow-sm max-w-4xl animate-fade-up font-sans text-[16px] leading-[1.7] text-left space-y-8">
          <section className="space-y-3">
            <h2 className="text-[32px] font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#2563EB]" />
              <span>1. Thu thập thông tin cá nhân</span>
            </h2>
            <p className="text-[#64748B] font-medium">
              Chúng tôi chỉ tiến hành thu thập các trường thông tin cần thiết phục vụ cho quá trình đăng ký tài khoản, liên kết tên miền riêng và quản lý dịch vụ bao gồm: Họ tên, số điện thoại, địa chỉ email và địa chỉ liên lạc.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[32px] font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#2563EB]" />
              <span>2. Mục đích sử dụng dữ liệu</span>
            </h2>
            <p className="text-[#64748B] font-medium">
              Các thông tin được thu thập chỉ được phục vụ trong các công tác vận hành sau:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#64748B] font-medium">
              <li>Xác nhận đăng ký sở hữu mã nguồn giao diện BĐS.</li>
              <li>Tự động cấu hình tài khoản và phân quyền quản trị hệ thống CMS.</li>
              <li>Hỗ trợ xử lý nhanh các sự cố kỹ thuật liên quan đến Hosting/SSL và kết nối Domain.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-[32px] font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#2563EB]" />
              <span>3. Cam kết bảo mật tuyệt đối</span>
            </h2>
            <p className="text-[#64748B] font-medium">
              PlatformBDS cam kết tuyệt đối không bán, trao đổi hoặc chia sẻ thông tin dữ liệu của khách hàng cho bất kỳ bên thứ ba nào khác ngoài mục đích thực hiện giao dịch hoặc được sự đồng ý bằng văn bản của chính khách hàng.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
