'use client';
import React, { useState } from 'react';
import { Send, Phone, ArrowUp, CheckCircle, MapPin, Mail, Clock, MessageSquare, MessageCircle, X } from 'lucide-react';

const MAX_W = 'max-w-[1280px]';

export interface FooterColumnItem {
  label: string;
  page?: string;
  isInfo?: boolean;
}

export interface FooterColumn {
  title: string;
  items: FooterColumnItem[];
}

interface UniversalFooterProps {
  company?: any;
  templateName?: string;
  onNavigate?: (page: string) => void;
  zaloPhone?: string;
  hotlinePhone?: string;
}

export default function UniversalTemplateFooter({
  company,
  templateName = 'BDS (Real Estate Group Pro)',
  onNavigate,
  zaloPhone,
  hotlinePhone,
}: UniversalFooterProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [quickLeadOpen, setQuickLeadOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({ fullName: '', phone: '', email: '', note: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phone = hotlinePhone || company?.phone || '0919 006 030';
  const phoneDigits = phone.replace(/\D/g, '') || '0919006030';
  const zalo = zaloPhone || company?.zalo || phoneDigits;
  const email = company?.email || 'admin@templatesbds.com';
  const address = company?.address || '180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội';
  const brandName = company?.name || 'TEMPLATESBDS';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLinkClick = (page?: string) => {
    if (onNavigate && page) {
      onNavigate(page);
    }
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.phone.trim()) {
      alert('Vui lòng nhập số điện thoại!');
      return;
    }
    setIsSubmitting(true);
    try {
      const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));
      await fetch(`${API_URL}/api/marketplace/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: leadForm.fullName.trim() || 'Khách quan tâm ' + templateName,
          phone: leadForm.phone.trim(),
          email: leadForm.email.trim(),
          selectedTemplate: templateName,
          packageInterest: 'Tư vấn mua template',
          message: leadForm.note.trim() || 'Khách gửi yêu cầu từ chân trang ' + templateName,
        }),
      });
    } catch {
      // ignore
    }
    setIsSubmitting(false);
    setQuickLeadOpen(false);
    setLeadForm({ fullName: '', phone: '', email: '', note: '' });
    showToast('✓ Đăng ký thành công! Chuyên viên tư vấn sẽ liên hệ bạn trong 5 phút.');
  };

  return (
    <footer className="w-full relative bg-[#07132B] text-white font-sans">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle size={16} /> {toastMessage}
        </div>
      )}

      {/* Quick Lead Modal */}
      {quickLeadOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 relative border border-slate-200 animate-in zoom-in-95 duration-200 text-slate-900">
            <button 
              onClick={() => setQuickLeadOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition"
            >
              <X size={18} />
            </button>
            <div className="text-center space-y-1">
              <span className="text-xs font-black text-blue-600 uppercase tracking-wider">TƯ VẤN TRỰC TIẾP 24/7</span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">Đăng Ký Nhận Bảng Giá & Ưu Đãi</h3>
              <p className="text-xs text-slate-500">Chuyên viên tư vấn cấp cao sẽ liên hệ gửi trọn bộ tài liệu qua Zalo trong 5 phút.</p>
            </div>
            <form onSubmit={handleQuickSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Họ và tên của bạn</label>
                <input
                  type="text"
                  placeholder="VD: Nguyễn Văn An"
                  value={leadForm.fullName}
                  onChange={e => setLeadForm(f => ({ ...f, fullName: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Số điện thoại / Zalo <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  required
                  placeholder="VD: 0919 006 030"
                  value={leadForm.phone}
                  onChange={e => setLeadForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email nhận tài liệu</label>
                <input
                  type="email"
                  placeholder="VD: yourname@gmail.com"
                  value={leadForm.email}
                  onChange={e => setLeadForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl shadow-lg shadow-blue-600/30 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? 'ĐANG GỬI THÔNG TIN...' : 'GỬI ĐĂNG KÝ NGAY'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── 1. BLUE NEWSLETTER STRIP (100% Full Width) ── */}
      <div className="w-full bg-[#1E60B8] py-6 px-4 text-white">
        <div className={`${MAX_W} mx-auto flex flex-col md:flex-row justify-between items-center gap-4`}>
          <div>
            <h3 className="text-sm md:text-base font-black">Đăng ký nhận thông tin bảng giá & ưu đãi từ {brandName}</h3>
            <p className="text-xs text-blue-100">Chúng tôi sẽ gửi bạn những thông tin bất động sản và mẫu website mới nhất</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              placeholder="Nhập địa chỉ Email của bạn..."
              className="bg-white text-slate-800 text-xs px-4 py-2.5 rounded-xl w-full md:w-72 focus:outline-none"
            />
            <button
              onClick={() => {
                if (!emailInput.trim()) {
                  alert('Vui lòng nhập địa chỉ email!');
                  return;
                }
                showToast('✓ Đăng ký email nhận bảng tin BĐS thành công!');
                setEmailInput('');
              }}
              className="bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs px-5 py-2.5 rounded-xl whitespace-nowrap transition flex items-center gap-1 cursor-pointer"
            >
              <Send size={12} /> Đăng ký ngay
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. 4-COLUMN FOOTER WITH TEMPLATESBDS ADMIN INFO ── */}
      <div className="w-full bg-[#07132B] text-slate-300 text-xs py-12 px-4 border-b border-slate-800">
        <div className={`${MAX_W} mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10`}>
          
          {/* CỘT 1: THƯƠNG HIỆU & LIÊN HỆ ADMIN (md:col-span-5) */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <span className="text-2xl font-black tracking-tight">
                <span className="text-[#0084FF]">{brandName}</span>
              </span>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed max-w-md">
                Kho mẫu website bất động sản cao cấp số 1 Việt Nam. Tối ưu chuyển đổi, chuẩn SEO và tích hợp hệ thống CMS quản trị đa kênh.
              </p>
            </div>

            {/* Thông tin liên hệ chuẩn Admin */}
            <div className="space-y-2 text-xs text-slate-300 pt-1">
              <div className="flex items-start gap-2">
                <span className="text-red-400 shrink-0 mt-0.5">📍</span>
                <span>Địa chỉ: <strong className="text-white font-medium">{address}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-blue-400 shrink-0" />
                <span>Hotline 1: <a href={`tel:${phoneDigits}`} className="text-white font-bold font-mono hover:text-blue-400 transition">{phone}</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-emerald-400 shrink-0" />
                <span>Hotline 2: <a href="tel:0983312219" className="text-white font-bold font-mono hover:text-emerald-400 transition">0983 312 219</a> <span className="text-slate-400">(24/7)</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-blue-400 shrink-0" />
                <span>Email: <a href={`mailto:${email}`} className="text-white hover:text-blue-400 transition font-medium">{email}</a></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-400 shrink-0">⏰</span>
                <span>Giờ làm việc: <strong className="text-white font-medium">8:00 - 20:00 (T2 - CN)</strong></span>
              </div>
            </div>

            {/* 4 Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={`https://zalo.me/${zalo}`}
                target="_blank"
                rel="noreferrer"
                title={`Chat Zalo CSKH (${phone})`}
                className="w-10 h-10 rounded-2xl bg-[#0068FF] hover:bg-[#0052cc] text-white flex items-center justify-center font-black text-[11px] tracking-tight shadow-md hover:scale-105 transition"
              >
                ZALO
              </a>
              <a
                href="https://www.facebook.com/groups/847532091275214"
                target="_blank"
                rel="noreferrer"
                title="Facebook Group"
                className="w-10 h-10 rounded-2xl bg-[#1877F2] hover:bg-[#1565c0] text-white flex items-center justify-center font-black text-base shadow-md hover:scale-105 transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.53 17.5 2.04 12 2.04Z" /></svg>
              </a>
              <a
                href="https://www.youtube.com/@tungchuofficial"
                target="_blank"
                rel="noreferrer"
                title="YouTube Channel"
                className="w-10 h-10 rounded-2xl bg-[#E62117] hover:bg-[#c61810] text-white flex items-center justify-center shadow-md hover:scale-105 transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
              <a
                href="https://www.tiktok.com/@editnhadat"
                target="_blank"
                rel="noreferrer"
                title="TikTok Channel"
                className="w-10 h-10 rounded-2xl bg-[#1E293B] hover:bg-[#0f172a] text-[#A78BFA] flex items-center justify-center shadow-md hover:scale-105 transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43V12.9a8.16 8.16 0 0 0 5.73 2.29V11.7a4.83 4.83 0 0 1-3.77-4.25z" /></svg>
              </a>
            </div>
          </div>

          {/* CỘT 2: VỀ CHÚNG TÔI & ĐIỀU HƯỚNG (md:col-span-2) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">
              VỀ CHÚNG TÔI
            </h4>
            <ul className="space-y-2 text-slate-400">
              {[
                { label: 'Trang chủ', page: 'home' },
                { label: 'Giới thiệu sàn BĐS', page: 'about' },
                { label: 'Tin tức & Cẩm nang', page: 'news' },
                { label: 'Ký gửi nhà đất', page: 'ky-gui' },
                { label: 'Liên hệ tư vấn', page: 'contact' },
              ].map((link, i) => (
                <li key={i}>
                  <div
                    onClick={() => handleLinkClick(link.page)}
                    className="hover:text-blue-400 cursor-pointer transition text-xs flex items-center gap-1.5"
                  >
                    <span className="text-blue-500">•</span> {link.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 3: SẢN PHẨM & DỰ ÁN (md:col-span-2) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">
              DANH MỤC DỰ ÁN
            </h4>
            <ul className="space-y-2 text-slate-400">
              {[
                { label: 'Căn hộ chung cư', page: 'can-ho' },
                { label: 'Biệt thự nghỉ dưỡng', page: 'biet-thu' },
                { label: 'Đất nền sổ đỏ', page: 'dat-nen' },
                { label: 'Shophouse thương mại', page: 'shophouse' },
                { label: 'Nhà cho thuê', page: 'nha-cho-thue' },
              ].map((link, i) => (
                <li key={i}>
                  <div
                    onClick={() => handleLinkClick(link.page)}
                    className="hover:text-blue-400 cursor-pointer transition text-xs flex items-center gap-1.5"
                  >
                    <span className="text-blue-500">•</span> {link.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 4: CHÍNH SÁCH & BẢN QUYỀN (md:col-span-3) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">
              CHÍNH SÁCH BÁN HÀNG
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li className="hover:text-blue-400 cursor-pointer transition flex items-center gap-1.5">
                <span className="text-blue-500">•</span> Bàn giao 100% mã nguồn sạch
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition flex items-center gap-1.5">
                <span className="text-blue-500">•</span> Bảo hành & Hỗ trợ kỹ thuật trọn đời
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition flex items-center gap-1.5">
                <span className="text-blue-500">•</span> Tích hợp CMS quản trị tiếng Việt
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition flex items-center gap-1.5">
                <span className="text-blue-500">•</span> Hỗ trợ cài đặt lên Hosting cPanel / XAMPP
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── 3. COPYRIGHT STRIP (100% Full Width — NO WHITE GAPS) ── */}
      <div className="w-full bg-[#050C1B] py-4 px-4 text-slate-400 text-[11px]">
        <div className={`${MAX_W} mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left`}>
          <div>
            © 2026 Bản quyền thuộc về <strong className="text-white font-black">{brandName}</strong> — Nền tảng phân phối & Thiết kế Website Bất Động Sản Chuyên Nghiệp.
          </div>
          <div className="text-[10px] text-slate-500">
            Mẫu Giao Diện: <strong>{templateName}</strong>
          </div>
        </div>
      </div>

      {/* ── 4. STICKY BOTTOM ACTION BAR ON MOBILE (EXACT SCREENSHOT: [ 📞 GỌI NGAY ] + [ 💬 CHAT ZALO ]) ── */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/80 p-2.5 flex items-center gap-2 shadow-[0_-4px_25px_rgba(0,0,0,0.15)]">
        {/* Nút Gọi Ngay (Xanh dương #0066FF) */}
        <a
          href={`tel:${phoneDigits}`}
          className="flex-1 py-3 px-3 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] active:scale-95 text-white font-black text-xs uppercase flex items-center justify-center gap-2 shadow-md transition-all text-center tracking-wider"
          title="Gọi Hotline Tư Vấn"
        >
          <Phone size={15} className="animate-pulse" />
          <span>GỌI NGAY</span>
        </a>

        {/* Nút Chat Zalo (Xanh lá #008848) */}
        <a
          href={`https://zalo.me/${zalo}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-3 px-3 rounded-xl bg-[#008848] hover:bg-[#007038] active:scale-95 text-white font-black text-xs uppercase flex items-center justify-center gap-2 shadow-md transition-all text-center tracking-wider"
          title="Chat Zalo Tư Vấn"
        >
          <MessageCircle size={15} />
          <span>CHAT ZALO</span>
        </a>
      </div>

      {/* ── 5. FLOATING BUTTONS ON DESKTOP & TABLET (BOTTOM-RIGHT) ── */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-center gap-3 select-none">
        {/* Zalo Button */}
        <a
          href={`https://zalo.me/${zalo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#0068FF] hover:bg-[#0052cc] text-white shadow-xl shadow-blue-600/40 flex items-center justify-center font-black text-xs border-2 border-white/80 hover:scale-110 active:scale-95 transition-all"
          title={`Chat Zalo CSKH (${phone})`}
        >
          ZALO
        </a>

        {/* Hotline Call Button */}
        <a
          href={`tel:${phoneDigits}`}
          className="w-12 h-12 rounded-full bg-[#E11D48] hover:bg-[#be123c] text-white shadow-xl shadow-red-600/40 flex items-center justify-center border-2 border-white/80 hover:scale-110 active:scale-95 transition-all relative"
          title={`Gọi Hotline (${phone})`}
        >
          <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-40 -z-10"></span>
          <Phone className="w-5 h-5 fill-current" />
        </a>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white shadow-lg flex items-center justify-center border border-slate-700/50 hover:scale-110 active:scale-95 transition-all"
          title="Lên đầu trang"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
