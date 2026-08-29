import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Trophy, Star, ArrowRight, CheckCircle2, ShieldCheck, Zap, PhoneCall } from 'lucide-react';

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
      desc: "Tối ưu hóa hình ảnh SSD NVMe và mã nguồn Next.js mới nhất. Đảm bảo trải nghiệm lướt mượt mà không bị giật lag trên mọi dòng điện thoại di động."
    },
    {
      id: "03",
      title: "Tích Hợp Sẵn Zalo Official & Hotline Gọi Nhanh",
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
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      <Head>
        <title>Vì Sao Chọn TEMPLATES BDS? 10 Cam Kết Vàng Cho Môi Giới | TEMPLATES BDS</title>
        <meta name="description" content="Khám phá lý do 500+ sàn giao dịch và môi giới BĐS tin dùng nền tảng của chúng tôi để gia tăng uy tín và chốt giao dịch mỗi ngày." />
      </Head>

      <Header />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Hero Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5 text-blue-600" /> Nền tảng chuyên biệt số 1 Việt Nam
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            Tại Sao 500+ Môi Giới & Sàn BĐS Chọn Chúng Tôi?
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Chúng tôi không phải công ty làm website đa ngành. Chúng tôi sinh ra từ thấu hiểu thị trường bất động sản thực chiến — mang lại công cụ đắc lực nhất giúp bạn thu hút lead chất lượng cao và xây dựng thương hiệu cá nhân vượt trội.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-slate-200 rounded-lg p-6 mb-12 text-center shadow-sm">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-0.5">1.200+</p>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Website đã tạo</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 mb-0.5">16+</p>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Mẫu độc quyền</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mb-0.5">30 Giây</p>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Khởi tạo tự động</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-500 mb-0.5">4.9 / 5.0</p>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Đánh giá hài lòng</p>
          </div>
        </div>

        {/* 10 Golden Pledges Grid */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-3xl font-bold mb-2 text-slate-900">10 Cam Kết Vàng Về Chất Lượng Dịch Vụ</h2>
            <p className="text-slate-600 text-xs sm:text-sm">Sự khác biệt rõ rệt giữa PlatformBDS và các dịch vụ thiết kế web thông thường.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pledges.map((p, i) => (
              <div 
                key={i}
                className="bg-white border border-slate-200 rounded-lg p-5 hover:border-slate-400 transition-colors flex items-start gap-4 shadow-sm"
              >
                <span className="text-lg font-black text-blue-600 font-mono shrink-0 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                  {p.id}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 mb-16 shadow-sm">
          <div className="text-center mb-8">
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
              💬 Ý Kiến Khách Hàng Thực Tế
            </span>
            <h2 className="text-xl sm:text-2xl font-bold mt-2 text-slate-900">Được sự tin tưởng của các Giám đốc sàn & Môi giới hàng đầu</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name:'Trần Thị Hoa', role:'Giám đốc Hoàng Gia Land', review:'Giao diện Luxury Gold cực kỳ ấn tượng. Khi gửi đường link cho khách hàng mua biệt thự Vinhomes, họ đánh giá uy tín của văn phòng lên hẳn một tầm cao mới.', rating:5 },
              { name:'Nguyễn Minh Tuấn', role:'Môi giới tự do tại Hà Nội', review:'Trước đây mình tự mò làm web bằng Wordpress rất hay bị lỗi cache và chậm. Chuyển qua dịch vụ thiết kế Website của PlatformBDS vừa siêu nhanh vừa có Zalo gọi ngay.', rating:5 },
              { name:'Lê Văn Đức', role:'Trưởng phòng Marketing, Sun Land', review:'Sự khác biệt lớn nhất là bộ CMS quản lý dự án rất nhàn. Anh em trong team ai cũng có thể tự đăng bài mà không cần phải gọi kỹ thuật hỗ trợ như trước nữa.', rating:5 },
            ].map((t, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-3">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed mb-4">&ldquo;{t.review}&rdquo;</p>
                </div>
                <div className="border-t border-slate-200 pt-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center font-bold text-white text-xs shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{t.name}</p>
                    <p className="text-[11px] text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center max-w-xl mx-auto bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm">
          <h3 className="text-xl font-bold mb-2 text-slate-900">Sở hữu website BĐS chuyên nghiệp ngay hôm nay</h3>
          <p className="text-slate-600 text-xs sm:text-sm mb-6">Trải nghiệm kho mẫu website độc quyền, kích hoạt và bàn giao trong 30 giây.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
            >
              <span>Khám Phá Toàn Bộ Mẫu Ngay</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-colors border border-slate-300"
            >
              <span>Xem Bảng Giá</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

