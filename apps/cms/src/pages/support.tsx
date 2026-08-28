import React, { useState } from 'react';
import Head from 'next/head';
import CMSLayout from '../components/layout/CMSLayout';
import {
  HelpCircle,
  BookOpen,
  Phone,
  MessageSquare,
  FileCode2,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Video,
  Sparkles,
  ShieldAlert,
  Zap,
  Globe,
  Palette,
  Building2,
  Users
} from 'lucide-react';

const GUIDES = [
  {
    id: 'theme',
    icon: <Palette className="w-5 h-5 text-amber-500" />,
    title: 'Cách tùy biến màu sắc & giao diện website',
    desc: 'Hướng dẫn chọn bảng màu phong thủy, thay đổi font chữ và xem trước thời gian thực (Live Preview).',
    steps: [
      'Truy cập mục "Giao Diện" trên thanh điều hướng bên trái.',
      'Chọn 1 trong các bảng màu thịnh hành (Hoàng Gia, Tối Giản, Xanh Doanh Nghiệp, Tím Sang Trọng...).',
      'Hoặc tùy chỉnh mã màu HEX riêng biệt cho Màu Chủ Đạo, Màu Điểm Nhấn, Nền...',
      'Bấm nút "Lưu thay đổi" màu xanh góc trên để cập nhật tức thì lên website của bạn.'
    ]
  },
  {
    id: 'projects',
    icon: <Building2 className="w-5 h-5 text-blue-500" />,
    title: 'Đăng & Quản lý Dự Án Bất Động Sản',
    desc: 'Cách thêm mới dự án, upload hình ảnh chất lượng cao, điền giá bán, diện tích và tình trạng mở bán.',
    steps: [
      'Truy cập mục "Dự Án BĐS", bấm nút "+ Thêm Dự Án Mới".',
      'Điền Tiêu đề dự án (VD: Dinh Thự Ven Sông Thảo Điền), Mức giá, Diện tích, Địa chỉ.',
      'Upload ảnh đại diện dự án (hệ thống tự động nén WebP tốc độ cao).',
      'Chọn trạng thái: Đang mở bán (SELLING), Đã bàn giao (SOLD), Sắp mở bán (UPCOMING).',
      'Bấm "Lưu dự án" để dự án hiển thị ngay lập tức lên trang chủ và trang danh mục.'
    ]
  },
  {
    id: 'leads',
    icon: <Users className="w-5 h-5 text-emerald-500" />,
    title: 'Tiếp nhận & Quản lý Khách Hàng (Leads)',
    desc: 'Cách theo dõi thông tin khách hàng điền form liên hệ tư vấn và gửi báo giá từ website.',
    steps: [
      'Mỗi khi khách hàng truy cập website của bạn và bấm "Nhận Báo Giá" hoặc điền form "Liên Hệ", thông tin sẽ tự động đổ về mục "Khách Hàng (Leads)".',
      'Bạn có thể xem Họ tên, Số điện thoại, Email, Dự án quan tâm và Lời nhắn.',
      'Cập nhật trạng thái xử lý: Khách Mới -> Đang liên hệ -> Đã chốt hợp đồng.',
      'Xuất file Excel/CSV danh sách khách hàng để gửi cho đội ngũ kinh doanh (Sale).'
    ]
  },
  {
    id: 'domain',
    icon: <Globe className="w-5 h-5 text-purple-500" />,
    title: 'Gắn Tên Miền Riêng (Custom Domain)',
    desc: 'Hướng dẫn trỏ tên miền (VD: www.tencongty.vn) về website chạy nền tảng PlatformBDS.',
    steps: [
      'Truy cập mục "Domain & Link", nhập tên miền của bạn (VD: batdongsanhoanggia.vn).',
      'Đăng nhập trang quản lý tên miền (nhà cung cấp iNET, Mắt Bão, PA Việt Nam, Cloudflare...).',
      'Tạo bản ghi CNAME hoặc A record theo thông số hiển thị trên màn hình.',
      'Bấm "Kiểm tra DNS" để hệ thống tự động cấp chứng chỉ bảo mật SSL (HTTPS) miễn phí.'
    ]
  }
];

const FAQS = [
  {
    q: 'Làm thế nào để tải toàn bộ mã nguồn website về máy tính cá nhân?',
    a: 'Bạn chỉ cần truy cập trang Sàn Giao Diện (Marketplace) -> Đăng nhập tài khoản -> Vào trang "Quản lý đơn hàng & Source code" để tải file ZIP độc lập chứa đầy đủ code Next.js 15 và file Hướng dẫn cài đặt HUONG_DAN_SUA_DOI.md.'
  },
  {
    q: 'Website của tôi có được bảo mật và sao lưu định kỳ không?',
    a: 'Có. Toàn bộ dữ liệu của bạn được phân tách độc lập (Multi-Tenant Isolation) trên hạ tầng Cloud bảo mật cao cấp, tự động sao lưu dữ liệu hàng ngày và mã hóa SSL an toàn 100%.'
  },
  {
    q: 'Tôi có thể đổi sang template khác sau khi đã dùng một thời gian không?',
    a: 'Hoàn toàn được. Toàn bộ dự án, bài viết và thông tin công ty của bạn vẫn được giữ nguyên vẹn khi bạn chuyển đổi sang giao diện mới.'
  }
];

export default function SupportPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <CMSLayout
      title="Hỗ Trợ & Tài Liệu Hướng Dẫn"
      breadcrumbs={[{ label: 'Tổng Quan', href: '/' }, { label: 'Hỗ Trợ' }]}
    >
      <Head>
        <title>Hỗ Trợ & Tài Liệu | PlatformBDS CMS</title>
      </Head>

      <div className="max-w-6xl mx-auto space-y-8 pb-16">
        {/* Banner Hero */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden border border-indigo-900/50">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Trung Tâm Hỗ Trợ 24/7
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Bạn Cần Hỗ Trợ Gì Hôm Nay?
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-light">
              Khám phá tài liệu hướng dẫn từng bước quản trị website, cách gắn tên miền riêng và kết nối nhanh với đội ngũ chuyên viên kỹ thuật.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://zalo.me/0983312219"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/30"
              >
                <MessageSquare className="w-4 h-4" />
                Chat Zalo Hỗ Trợ Kỹ Thuật
              </a>
              <a
                href="tel:0983312219"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-white/20"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                Hotline: 0983 312 219
              </a>
            </div>
          </div>
        </div>

        {/* Guides Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Hướng Dẫn Sử Dụng Nhanh</h2>
              <p className="text-xs text-slate-500 mt-1">Các bước cơ bản để làm chủ website bất động sản của bạn</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GUIDES.map((guide) => (
              <div
                key={guide.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                    {guide.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{guide.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{guide.desc}</p>
                  
                  <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Các bước thực hiện:</div>
                    {guide.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Câu Hỏi Thường Gặp (FAQ)</h2>
              <p className="text-xs text-slate-500">Giải đáp các thắc mắc phổ biến của khách hàng</p>
            </div>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-4 text-left font-semibold text-slate-800 flex justify-between items-center text-sm hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      activeFaq === index ? 'rotate-90 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info Footer Card */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/30 border border-indigo-500 flex items-center justify-center text-indigo-400 shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold">Cần Hỗ Trợ Trực Tiếp 1-kèm-1?</h4>
              <p className="text-xs text-slate-400 mt-0.5">Đội ngũ kỹ thuật PlatformBDS sẵn sàng hỗ trợ bạn cấu hình tên miền và chỉnh sửa theo yêu cầu.</p>
            </div>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="https://zalo.me/0983312219"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              Zalo Hỗ Trợ
            </a>
            <a
              href="tel:0983312219"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all border border-white/20"
            >
              0983 312 219
            </a>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
}

