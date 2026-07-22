import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Trophy, Star, ArrowRight } from 'lucide-react';

export default function WhyChoosePage() {
  const pledges = [
    {
      id: "01",
      title: "Thiết Kế Độc Quyền Theo Phân Khúc BĐS",
      desc: "Không dùng giao diện đa ngành dập khuôn. Mỗi mẫu website được thiết kế theo hành vi tìm kiếm của khách hàng mua Biệt thự, Chung cư hay Đất nền nghỉ dưỡng."
    },
    {
      id: "02",
      title: "Tốc Độ Tải Trang Siêu Tốc < 1s",
      desc: "Tối ưu hóa hình ảnh SSD NVMe và mã nguồn Next.js 14 mới nhất. Đảm bảo trải nghiệm lướt mượt mà không bị giật lag trên mọi dòng điện thoại di động."
    },
    {
      id: "03",
      title: "Tích Hợp Sẵn Zalo OA & Hotline Gọi Nhanh",
      desc: "Khách hàng truy cập chỉ cần bấm 1 chạm là kết nối ngay đến Zalo hoặc số điện thoại của bạn mà không phải copy số hay thao tác rườm rà."
    },
    {
      id: "04",
      title: "Công Cụ Tính Dòng Tiền & ROI Đầu Tư",
      desc: "Tích hợp bộ công cụ tính toán lãi suất vay ngân hàng và dòng tiền cho thuê sinh lời tự động, giúp thuyết phục nhà đầu tư ra quyết định nhanh hơn."
    },
    {
      id: "05",
      title: "Hỗ Trợ Nhúng Tour Ảo 3D & Floor Plan",
      desc: "Cho phép nhúng trực tiếp Tour thực tế ảo 360/Matterport và sơ đồ mặt bằng tương tác từng phòng, khách hàng trải nghiệm thực tế từ xa."
    },
    {
      id: "06",
      title: "Quản Lý Tin Đăng CMS Siêu Đơn Giản",
      desc: "Giao diện quản trị bằng tiếng Việt trực quan giống như viết bài trên Facebook. Bạn có thể tự cập nhật giá, hình ảnh dự án chỉ trong 2 phút."
    },
    {
      id: "07",
      title: "Chuẩn SEO Google & Tối Ưu Chạy Ads",
      desc: "Cấu trúc HTML5 ngữ nghĩa, thẻ Meta OpenGraph chia sẻ Zalo/Facebook hiển thị hình ảnh cực đẹp. Tối ưu điểm số chất lượng khi chạy quảng cáo."
    },
    {
      id: "08",
      title: "Bảo Mật Tối Đa & Backup Tự Động Mỗi Đêm",
      desc: "Hệ thống tường lửa đám mây chống tấn công DDoS và sao lưu dữ liệu tự động hằng ngày, bảo đảm website hoạt động ổn định 99.99%."
    },
    {
      id: "09",
      title: "Bảo Hành Kỹ Thuật Trọn Đời",
      desc: "Chúng tôi luôn đồng hành cùng sự thành công của bạn. Mọi thắc mắc kỹ thuật hay hỗ trợ cấu hình tên miền đều được giải quyết siêu nhanh qua Zalo."
    },
    {
      id: "10",
      title: "Hoàn Tiền 100% Trong 7 Ngày Nếu Không Hài Lòng",
      desc: "Cam kết sự hài lòng tuyệt đối. Nếu trong 7 ngày đầu trải nghiệm dịch vụ bạn không hài lòng về chất lượng, chúng tôi hoàn lại 100% chi phí!"
    }
  ];

  return (
    <>
      <Head>
        <title>Vì Sao Chọn PLATFORMBDS? 10 Cam Kết Vàng Cho Môi Giới | PLATFORMBDS</title>
        <meta name="description" content="Khám phá lý do 500+ sàn giao dịch và môi giới BĐS tin dùng nền tảng của chúng tôi để gia tăng uy tín và chốt giao dịch mỗi ngày." />
      </Head>

      <Header 
        onSearch={() => {}} 
        onOpenConsultation={() => alert('Vui lòng gọi hotline 0919 006 030 để được tư vấn chi tiết!')} 
        onOpenAuth={() => alert('Vui lòng đăng nhập tại trang chủ!')} 
      />

      <main className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-24 pt-12 px-5 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          {/* Hero Banner */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-4 shadow-sm">
              <Trophy className="w-3.5 h-3.5 text-blue-600" /> Nền tảng chuyên biệt số 1 Việt Nam
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 mb-4">
              Tại Sao <span className="text-[#2563EB]">500+ Môi Giới & Sàn BĐS</span> Chọn Chúng Tôi?
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Chúng tôi không phải công ty làm website đa ngành. Chúng tôi sinh ra từ thấu hiểu thị trường bất động sản thực chiến — mang lại công cụ đắc lực nhất giúp bạn thu hút lead chất lượng cao và xây dựng thương hiệu cá nhân vượt trội.
            </p>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 mb-20 text-center shadow-lg shadow-slate-100">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 mb-1">1.200+</p>
              <p className="text-xs font-bold text-slate-500 uppercase">Website đã tạo</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-[#2563EB] mb-1">12+</p>
              <p className="text-xs font-bold text-slate-500 uppercase">Mẫu độc quyền</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-emerald-600 mb-1">30 Giây</p>
              <p className="text-xs font-bold text-slate-500 uppercase">Khởi tạo tự động</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-amber-500 mb-1">4.9/5</p>
              <p className="text-xs font-bold text-slate-500 uppercase">Đánh giá hài lòng</p>
            </div>
          </div>

          {/* 10 Golden Pledges Grid */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-4xl font-bold mb-3 text-slate-900">10 Cam Kết Vàng Về Chất Lượng Dịch Vụ</h2>
              <p className="text-slate-600 text-sm font-medium">Sự khác biệt rõ rệt giữa PlatformBDS và các dịch vụ thiết kế web thông thường.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pledges.map((p, i) => (
                <div 
                  key={i}
                  className="bg-white border border-slate-200/80 rounded-3xl p-7 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 flex items-start gap-5 shadow-sm"
                >
                  <span className="text-2xl font-black text-[#2563EB] font-mono shrink-0 bg-blue-50 px-3.5 py-1.5 rounded-2xl border border-blue-100">
                    {p.id}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 mb-20 shadow-lg shadow-slate-100">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                💬 Ý Kiến Khách Hàng Thực Tế
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-3 text-slate-900">Được sự tin tưởng của các Giám đốc sàn & Sale top đầu</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name:'Trần Thị Hoa', role:'Giám đốc Hoàng Gia Land', review:'Giao diện Luxury Gold cực kỳ ấn tượng. Khi gửi đường link cho khách hàng mua biệt thự Vinhomes, họ đánh giá uy tín của văn phòng lên hẳn một tầm cao mới.', rating:5 },
                { name:'Nguyễn Minh Tuấn', role:'Môi giới tự do tại Hà Nội', review:'Trước đây mình tự mò làm web bằng Wordpress rất hay bị lỗi cache và chậm. Chuyển qua dịch vụ thiết kế Website của PlatformBDS vừa siêu nhanh vừa có Zalo OA gọi ngay.', rating:5 },
                { name:'Lê Văn Đức', role:'Trưởng phòng Marketing, Sun Land', review:'Sự khác biệt lớn nhất là bộ CMS quản lý dự án rất nhàn. Anh em trong team ai cũng có thể tự đăng bài mà không cần phải gọi kỹ thuật hỗ trợ như trước nữa.', rating:5 },
              ].map((t, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6 font-medium">&ldquo;{t.review}&rdquo;</p>
                  </div>
                  <div className="border-t border-slate-200 pt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center font-bold text-white text-sm shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-500 font-semibold">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center max-w-xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-lg">
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Trải nghiệm ngay 7 ngày miễn phí 0đ</h3>
            <p className="text-slate-600 text-sm mb-8 font-medium">Không cần thẻ tín dụng, chọn mẫu ngay và sở hữu website trong 30 giây.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/templates"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/20"
              >
                <span>Khám Phá 12 Mẫu Ngay</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all border border-slate-200"
              >
                <span>Xem Bảng Giá</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
