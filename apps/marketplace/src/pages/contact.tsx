import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import { ALL_TEMPLATES } from '../data/templatesData';
import ZaloIcon from '../components/icons/ZaloIcon';
import { useAuth } from '../context/AuthContext';

export default function ContactPage() {
  const { showToast } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    selectedTemplateSlug: 'luxury-gold',
    packageInterest: 'ready',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const getPackageName = (pkg: string) => {
    switch (pkg) {
      case 'ready': return 'Thiết kế Website Chuyên Nghiệp (3.900.000đ)';
      case 'saas': return 'Thuê Website SaaS (490.000đ / tháng)';
      case 'sourcecode': return 'Mua Trọn Gói Source Code (14.900.000đ)';
      case 'maintenance': return 'Dịch vụ Bảo trì Website (299.000đ / tháng)';
      case 'hosting': return 'Hạ tầng Hosting & Domain (799.000đ / năm)';
      default: return 'Tư vấn giải pháp riêng';
    }
  };

  const getTemplateName = (slug: string) => {
    const found = ALL_TEMPLATES.find(t => t.slug === slug);
    return found ? found.name : slug;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      showToast('Vui lòng nhập họ tên và số điện thoại liên hệ!', 'error');
      return;
    }
    
    setSubmitted(true);
    showToast('Đã gửi thông tin tư vấn thành công! Vui lòng bấm nút Zalo bên dưới để liên hệ trực tiếp.', 'success');
    
    // Lưu vào clipboard để khách tiện gửi
    const templateName = getTemplateName(formData.selectedTemplateSlug);
    const packageName = getPackageName(formData.packageInterest);
    const zaloMsg = `Xin chào PlatformBDS! Tôi tên là ${formData.fullName} (SĐT: ${formData.phone}). Tôi đăng ký tư vấn mẫu website "${templateName}" và gói dịch vụ "${packageName}".${formData.message ? ` Ghi chú: ${formData.message}` : ''}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(zaloMsg).catch(() => {});
    }
  };

  const templateName = getTemplateName(formData.selectedTemplateSlug);
  const packageName = getPackageName(formData.packageInterest);
  const zaloMsg = `Xin chào PlatformBDS! Tôi tên là ${formData.fullName} (SĐT: ${formData.phone}). Tôi đăng ký tư vấn mẫu website "${templateName}" và gói dịch vụ "${packageName}".${formData.message ? ` Ghi chú: ${formData.message}` : ''}`;

  return (
    <>
      <Head>
        <title>Liên Hệ & Tư Vấn Kỹ Thuật Trực Tiếp | PLATFORMBDS</title>
        <meta name="description" content="Kết nối trực tiếp với đội ngũ chuyên gia của PlatformBDS qua Hotline, Zalo VIP để được tư vấn chọn mẫu website phù hợp nhất." />
      </Head>

      <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans">
        <Header />

        <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-3">
              <Phone className="w-3.5 h-3.5 text-blue-600" /> Hỗ Trợ Khách Hàng 24/7
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
              Liên Hệ Đội Ngũ PlatformBDS
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Bạn cần tư vấn chọn mẫu website phù hợp với phân khúc dự án hoặc muốn triển khai giải pháp riêng? Hãy gửi yêu cầu cho chúng tôi hoặc gọi trực tiếp Hotline Zalo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            {/* Contact Info Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 rounded-lg p-6 sm:p-8 text-white shadow-sm border border-slate-800">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Kênh hỗ trợ chính thức</span>
                </div>
                <h2 className="text-xl font-bold mb-2">Hotline Kỹ Thuật & Sales VIP</h2>
                <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                  Hỗ trợ cấu hình tên miền, hướng dẫn sử dụng CMS và xử lý sự cố trong vòng 5 phút.
                </p>
                
                <a
                  href="tel:0919006030"
                  className="flex items-center gap-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md p-4 transition-colors mb-3"
                >
                  <div className="w-10 h-10 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Gọi điện trực tiếp</p>
                    <p className="text-lg font-black tracking-wide font-mono">0919 006 030</p>
                  </div>
                </a>

                <a
                  href="mailto:ntrungz0704@gmail.com"
                  className="flex items-center gap-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md p-4 transition-colors mb-4"
                >
                  <div className="w-10 h-10 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Email hỗ trợ</p>
                    <p className="text-sm font-bold tracking-wide">ntrungz0704@gmail.com</p>
                  </div>
                </a>

                <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Thời gian làm việc: 08:00 - 22:00 (Tất cả các ngày trong tuần)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Hệ sinh thái Bất Động Sản PlatformBDS (Hà Nội & TP. HCM)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                <h3 className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Cam Kết Bảo Mật Thông Tin
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thông tin liên hệ của bạn được mã hóa và bảo mật 100%. Chúng tôi cam kết không chia sẻ với bên thứ ba hoặc gọi điện làm phiền ngoài giờ hành chính.
                </p>
              </div>
            </div>

            {/* Consultation Form (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Gửi Yêu Cầu Thành Công!</h2>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mb-5 leading-relaxed">
                    Cảm ơn <span className="font-bold text-slate-900">{formData.fullName}</span> đã đăng ký tư vấn gói <span className="font-bold text-blue-600">{packageName}</span>.<br />
                    Hệ thống đang mở cửa sổ kết nối trực tiếp đến Zalo CSKH <strong className="font-mono text-slate-900">0919 006 030</strong>...
                  </p>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-md p-3.5 mb-5 text-left max-w-md mx-auto">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Nội dung tin nhắn:</p>
                    <p className="text-xs text-slate-700 italic">"{zaloMsg}"</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href="https://zalo.me/0919006030"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-2.5 bg-[#0068FF] hover:bg-blue-600 text-white font-semibold rounded-md text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <ZaloIcon className="w-4 h-4" />
                      <span>Mở Chat Zalo Ngay</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md text-xs transition-colors"
                    >
                      Gửi Yêu Cầu Khác
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 mb-2">
                    <h3 className="text-base font-bold text-slate-900">Đăng Ký Tư Vấn & Chọn Mẫu Miễn Phí</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Điền form dưới đây để nhận Demo thử nghiệm và báo giá chi tiết.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Họ & tên của bạn <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="VD: Nguyễn Văn Tuấn"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-md text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Số điện thoại / Zalo <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="VD: 0919 006 030"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-md text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mẫu giao diện quan tâm
                      </label>
                      <select
                        value={formData.selectedTemplateSlug}
                        onChange={(e) => setFormData({ ...formData, selectedTemplateSlug: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-md text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                      >
                        {ALL_TEMPLATES.map((tpl) => (
                          <option key={tpl.slug} value={tpl.slug}>
                            {tpl.name} {(tpl as any).tagline ? `(${(tpl as any).tagline})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Gói giải pháp dự kiến
                      </label>
                      <select
                        value={formData.packageInterest}
                        onChange={(e) => setFormData({ ...formData, packageInterest: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-md text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                      >
                        <option value="ready">Gói Thiết Kế Website Chuyên Nghiệp (3.900.000đ)</option>
                        <option value="saas">Gói Thuê Website SaaS (490.000đ / tháng)</option>
                        <option value="sourcecode">Gói Mua Full Source Code & Bản Quyền (14.900.000đ)</option>
                        <option value="maintenance">Gói Dịch Vụ Bảo Trì Website (299.000đ / tháng)</option>
                        <option value="hosting">Gói Hạ Tầng Hosting & Domain (799.000đ / năm)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ghi chú / Yêu cầu thêm (nếu có)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="VD: Mình bán dự án biệt thự biển Vinhomes, cần tên miền riêng..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-md text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi Yêu Cầu & Nhận Tư Vấn Ngay</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
