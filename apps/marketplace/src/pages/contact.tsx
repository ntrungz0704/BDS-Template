import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { ALL_TEMPLATES } from '../data/templatesData';

export default function ContactPage() {
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
      case 'ready': return 'Thiết kế Website Chuyên Nghiệp (499.000đ)';
      case 'maintenance': return 'Dịch vụ Bảo trì Website (299.000đ / tháng)';
      case 'hosting': return 'Hạ tầng Hosting & Domain (799.000đ / năm)';
      default: return 'Tư vấn giải pháp';
    }
  };

  const getTemplateName = (slug: string) => {
    const found = ALL_TEMPLATES.find(t => t.slug === slug);
    return found ? found.name : slug;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Vui lòng nhập họ tên và số điện thoại liên hệ!');
      return;
    }
    
    setSubmitted(true);
    
    // Tạo nội dung tin nhắn soạn sẵn gửi Zalo
    const templateName = getTemplateName(formData.selectedTemplateSlug);
    const packageName = getPackageName(formData.packageInterest);
    const zaloMsg = `Xin chào AI REVIEW BĐS! Tôi tên là ${formData.fullName} (SĐT: ${formData.phone}). Tôi đăng ký tư vấn mẫu website "${templateName}" và gói dịch vụ "${packageName}".${formData.message ? ` Ghi chú: ${formData.message}` : ''}`;
    
    // Lưu vào clipboard để khách tiện gửi nếu muốn
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(zaloMsg).catch(() => {});
    }

    // Tự động mở Zalo chat của admin sau 2 giây
    setTimeout(() => {
      const encodedMsg = encodeURIComponent(zaloMsg);
      // Link mở chat Zalo cá nhân của số điện thoại admin
      const zaloUrl = `https://zalo.me/0919006030`;
      window.open(zaloUrl, '_blank');
    }, 2000);
  };

  const templateName = getTemplateName(formData.selectedTemplateSlug);
  const packageName = getPackageName(formData.packageInterest);
  const zaloMsg = `Xin chào AI REVIEW BĐS! Tôi tên là ${formData.fullName} (SĐT: ${formData.phone}). Tôi đăng ký tư vấn mẫu website "${templateName}" và gói dịch vụ "${packageName}".${formData.message ? ` Ghi chú: ${formData.message}` : ''}`;
  const encodedMsg = encodeURIComponent(zaloMsg);

  return (
    <>
      <Head>
        <title>Liên Hệ & Tư Vấn Kỹ Thuật Trực Tiếp | PLATFORMBDS</title>
        <meta name="description" content="Kết nối trực tiếp với đội ngũ chuyên gia của PlatformBDS qua Hotline, Zalo VIP để được tư vấn chọn mẫu website phù hợp nhất." />
      </Head>
 
      <Header 
        onSearch={() => {}} 
        onOpenConsultation={() => alert('Vui lòng gọi hotline 0919 006 030!')} 
        onOpenAuth={() => alert('Vui lòng đăng nhập tại trang chủ!')} 
      />
 
      <main className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-24 pt-12 px-5 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-4 shadow-sm">
              <Phone className="w-3.5 h-3.5 text-blue-600" /> Hỗ Trợ Khách Hàng 24/7
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 mb-4">
              Liên Hệ <span className="text-[#2563EB]">Đội Ngũ PlatformBDS</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Bạn có thắc mắc về tính năng, cần tư vấn chọn mẫu website theo phân khúc hoặc muốn triển khai riêng cho văn phòng? Hãy gửi yêu cầu cho chúng tôi hoặc gọi trực tiếp Hotline Zalo VIP.
            </p>
          </div>
 
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            {/* Contact Info Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-3xl p-8 text-white shadow-xl shadow-blue-500/15 relative overflow-hidden">
                <h2 className="text-2xl font-bold mb-2">Hotline Kỹ Thuật & Sales VIP</h2>
                <p className="text-blue-100 text-xs mb-6 font-medium">Hỗ trợ trỏ tên miền, hướng dẫn CMS và xử lý sự cố trong vòng 5 phút.</p>
                
                <a href="tel:0919006030" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-4 transition-all mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white text-[#2563EB] flex items-center justify-center font-bold shadow-md">
                    <Phone className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-100 uppercase font-bold">Gọi ngay hotline / Zalo</p>
                    <p className="text-2xl font-black tracking-wider">0919 006 030</p>
                  </div>
                </a>
 
                <div className="space-y-4 pt-4 border-t border-white/15 text-sm text-blue-50 font-medium">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-300 shrink-0" />
                    <span>Giờ làm việc: 08:00 - 22:00 (Tất cả các ngày trong tuần)</span>
                  </div>
                </div>
              </div>
 
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md shadow-slate-100">
                <h3 className="text-base font-bold text-slate-900 mb-2">💡 Cam Kết Bảo Mật Thông Tin</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Thông tin liên hệ và số điện thoại của bạn được mã hóa và bảo mật tuyệt đối 100%. Chúng tôi cam kết không chia sẻ với bên thứ ba hoặc gọi điện làm phiền ngoài giờ hành chính.
                </p>
              </div>
            </div>
 
            {/* Consultation Form (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-100">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200 shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Gửi Yêu Cầu Thành Công!</h2>
                  <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 font-medium leading-relaxed">
                    Cảm ơn <span className="font-bold text-slate-900">{formData.fullName}</span> đã đăng ký tư vấn gói <span className="font-bold text-blue-600">{packageName}</span>.<br />
                    Hệ thống đang chuyển hướng bạn trực tiếp sang Zalo cá nhân của Founder <span className="font-bold text-slate-900">0919 006 030</span> để gửi yêu cầu & nhận demo website tức thì...
                  </p>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 text-left max-w-md mx-auto">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Nội dung đã được copy tự động vào khay nhớ tạm:</p>
                    <p className="text-xs text-slate-700 italic font-medium">"{zaloMsg}"</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href={`https://zalo.me/0919006030`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3.5 bg-[#0068FF] hover:bg-blue-700 text-white font-bold rounded-2xl text-xs transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-4H9v-2h4v6z"/>
                      </svg>
                      <span>Mở Zalo Chat Thủ Công</span>
                    </a>
                    
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ fullName: '', phone: '', email: '', selectedTemplateSlug: 'luxury-gold', packageInterest: 'ready', message: '' });
                      }}
                      className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-all border border-slate-200"
                    >
                      Quay lại Form
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Đăng Ký Tư Vấn & Chọn Mẫu Miễn Phí</h2>
                    <p className="text-xs text-slate-500 font-medium mt-1">Điền form dưới đây để nhận ngay Demo hoạt động thử nghiệm và báo giá trọn gói.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Họ & Tên của bạn <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="VD: Nguyễn Văn Tuấn..."
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium shadow-inner"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Số điện thoại / Zalo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="VD: 0919 006 030..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Mẫu giao diện quan tâm
                      </label>
                      <select
                        value={formData.selectedTemplateSlug}
                        onChange={(e) => setFormData({ ...formData, selectedTemplateSlug: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-bold shadow-sm"
                      >
                        {ALL_TEMPLATES.map((tpl) => (
                          <option key={tpl.id} value={tpl.slug}>
                            {tpl.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Gói giải pháp dự kiến
                      </label>
                      <select
                        value={formData.packageInterest}
                        onChange={(e) => setFormData({ ...formData, packageInterest: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-bold shadow-sm"
                      >
                        <option value="ready">Gói Thiết kế Website Chuyên Nghiệp (499.000đ)</option>
                        <option value="maintenance">Gói Bảo trì Website (299.000đ / tháng)</option>
                        <option value="hosting">Gói Hosting & Domain (799.000đ / năm)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Ghi chú / Yêu cầu thêm (Nếu có)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="VD: Mình bán dự án biệt thự biển Vinhomes, cần tư vấn cài đặt tên miền thương hiệu riêng..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none font-medium shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-14 bg-[#2563EB] hover:bg-blue-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-base transition-all shadow-lg shadow-blue-500/25"
                  >
                    <Send className="w-5 h-5" />
                    <span>Gửi Yêu Cầu & Nhận Tư Vấn Ngay</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
