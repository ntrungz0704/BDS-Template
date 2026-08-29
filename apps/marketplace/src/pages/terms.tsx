import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100/70 text-slate-900 antialiased font-sans">
      <Head>
        <title>Điều Khoản Dịch Vụ | TEMPLATES BDS</title>
        <meta name="description" content="Quy định sử dụng dịch vụ khởi tạo và quản trị website bất động sản tại TEMPLATES BDS" />
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
            Điều Khoản Sử Dụng Dịch Vụ
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Các quy định pháp lý và điều kiện ràng buộc giữa khách hàng sử dụng và ban quản trị TEMPLATES BDS.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-lg shadow-sm font-sans text-xs sm:text-sm leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>1. Bản quyền mã nguồn giao diện</span>
            </h2>
            <p className="text-slate-600">
              Đối với hình thức mua đứt Source Code, khách hàng được toàn quyền sử dụng, chỉnh sửa và triển khai phục vụ cho mục đích kinh doanh cá nhân hoặc doanh nghiệp. Tuy nhiên, nghiêm cấm tuyệt đối việc chia sẻ công khai hoặc bán lại mã nguồn cho bên thứ ba khi chưa được TEMPLATES BDS cấp quyền thương mại bằng văn bản.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>2. Thời gian kích hoạt và thanh toán</span>
            </h2>
            <p className="text-slate-600">
              * <strong>Kích hoạt:</strong> Hệ thống sẽ được kích hoạt tự động ngay sau khi nhận được thông báo chuyển khoản thành công với đúng mã giao dịch đơn hàng.<br />
              * <strong>Dịch vụ thuê tháng (SaaS):</strong> Khách hàng tiến hành thanh toán gia hạn trước khi hết chu kỳ tháng để hệ thống duy trì liên tục và không bị gián đoạn hoạt động.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>3. Chính sách hoàn tiền 7 ngày</span>
            </h2>
            <p className="text-slate-600">
              TEMPLATES BDS cam kết hoàn tiền 100% trong vòng 7 ngày đầu tiên kể từ thời điểm kích hoạt nếu quý khách không hài lòng về chất lượng dịch vụ hoặc hệ thống gặp sự cố kỹ thuật không thể khắc phục.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 mb-2">Thông tin hỗ trợ pháp lý & điều khoản</h2>
            <div className="bg-slate-50 p-4 rounded-md border border-slate-200 text-xs text-slate-700 space-y-1.5">
              <p><strong>Hotline:</strong> <a href="tel:0919006030" className="text-blue-600 hover:underline">0919 006 030</a> (24/7)</p>
              <p><strong>Email tiếp nhận:</strong> <a href="mailto:ntrungz0704@gmail.com" className="text-blue-600 hover:underline">ntrungz0704@gmail.com</a></p>
              <p><strong>Địa chỉ:</strong> Tòa nhà TEMPLATES BDS, TP. Hồ Chí Minh & Hà Nội</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
