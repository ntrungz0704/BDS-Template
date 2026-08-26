import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Mail, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100/70 text-slate-900 antialiased font-sans">
      <Head>
        <title>Chính Sách Bảo Mật Thông Tin | PLATFORMBDS</title>
        <meta name="description" content="Chính sách bảo mật thông tin khách hàng và dữ liệu vận hành website bất động sản tại PlatformBDS" />
      </Head>

      <Header />

      <main className="flex-grow max-w-[1000px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header Section */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-3">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại Trang chủ</span>
          </Link>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 inline-block mb-2">
              VĂN BẢN PHÁP LÝ
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Chính Sách Bảo Mật Thông Tin
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Cam kết bảo vệ dữ liệu thông tin cá nhân của các đối tác môi giới, sàn giao dịch và doanh nghiệp trên toàn hệ thống PlatformBDS.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-lg shadow-sm font-sans text-xs sm:text-sm leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>1. Thu thập thông tin cá nhân</span>
            </h2>
            <p className="text-slate-600">
              Chúng tôi chỉ tiến hành thu thập các trường thông tin cần thiết phục vụ cho quá trình đăng ký tài khoản, liên kết tên miền riêng và quản lý dịch vụ bao gồm: Họ tên, số điện thoại, địa chỉ email (<strong className="text-slate-800">ntrungz0704@gmail.com</strong>) và địa chỉ liên lạc.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>2. Mục đích sử dụng dữ liệu</span>
            </h2>
            <p className="text-slate-600">
              Các thông tin được thu thập chỉ được phục vụ trong các công tác vận hành sau:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Xác nhận đăng ký sở hữu mã nguồn giao diện BĐS và phân quyền tài khoản CMS.</li>
              <li>Tự động cấu hình hệ thống website, tên miền riêng và chứng chỉ bảo mật SSL.</li>
              <li>Hỗ trợ xử lý nhanh các sự cố kỹ thuật và nâng cấp tính năng.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>3. Cam kết bảo mật tuyệt đối</span>
            </h2>
            <p className="text-slate-600">
              PlatformBDS cam kết tuyệt đối không bán, trao đổi hoặc chia sẻ thông tin dữ liệu của khách hàng cho bất kỳ bên thứ ba nào khác ngoài mục đích thực hiện giao dịch hoặc được sự đồng ý bằng văn bản của chính khách hàng.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 mb-2">Thông tin liên hệ khiếu nại & hỗ trợ bảo mật</h2>
            <div className="bg-slate-50 p-4 rounded-md border border-slate-200 text-xs text-slate-700 space-y-1.5">
              <p><strong>Hotline:</strong> <a href="tel:0919006030" className="text-blue-600 hover:underline">0919 006 030</a> (24/7)</p>
              <p><strong>Email:</strong> <a href="mailto:ntrungz0704@gmail.com" className="text-blue-600 hover:underline">ntrungz0704@gmail.com</a></p>
              <p><strong>Địa chỉ:</strong> Tòa nhà PlatformBDS, TP. Hồ Chí Minh & Hà Nội</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
