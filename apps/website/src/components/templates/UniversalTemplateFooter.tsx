'use client';
import React, { useState } from 'react';
import { Send, Phone, ArrowUp, CheckCircle, MapPin, Mail, Clock } from 'lucide-react';

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

const MAX_W = 'max-w-7xl';

export default function UniversalTemplateFooter({
  company,
  templateName = 'BDS-01 (Real Estate Group Pro)',
  onNavigate,
  zaloPhone = '0919006030',
  hotlinePhone = '0919 006 030',
}: UniversalFooterProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');

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

  return (
    <footer className="w-full relative bg-[#07132B] text-white">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-sm shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle size={16} /> {toastMessage}
        </div>
      )}

      {/* ── 1. BLUE NEWSLETTER STRIP (100% Full Width) ── */}
      <div className="w-full bg-[#1E60B8] py-6 px-4 text-white">
        <div className={`${MAX_W} mx-auto flex flex-col md:flex-row justify-between items-center gap-4`}>
          <div>
            <h3 className="text-sm md:text-base font-black">Đăng ký nhận thông tin bảng giá & ưu đãi từ TEMPLATEBDS</h3>
            <p className="text-xs text-blue-100">Chúng tôi sẽ gửi bạn những thông tin bất động sản và mẫu website mới nhất</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              placeholder="Nhập địa chỉ Email của bạn..."
              className="bg-white text-slate-800 text-xs px-4 py-2.5 rounded-lg w-full md:w-72 focus:outline-none"
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
              className="bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs px-5 py-2.5 rounded-lg whitespace-nowrap transition flex items-center gap-1 cursor-pointer"
            >
              <Send size={12} /> Đăng ký ngay
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. 4-COLUMN FOOTER WITH TEMPLATESBDS ADMIN INFO ── */}
      <div className="w-full bg-[#07132B] text-slate-300 text-xs py-12 px-4 border-b border-slate-800">
        <div className={`${MAX_W} mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10`}>
          
          {/* CỘT 1: THƯƠNG HIỆU TEMPLATESBDS & LIÊN HỆ ADMIN (md:col-span-5) */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <span className="text-2xl font-black tracking-tight">
                <span className="text-[#0084FF]">TEMPLATES</span>
                <span className="text-white">BDS</span>
              </span>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed max-w-md">
                Kho mẫu website bất động sản cao cấp số 1 Việt Nam. Tối ưu chuyển đổi, chuẩn SEO và tích hợp hệ thống CMS quản trị đa kênh.
              </p>
            </div>

            {/* Thông tin liên hệ chuẩn Admin */}
            <div className="space-y-2 text-xs text-slate-300 pt-1">
              <div className="flex items-start gap-2">
                <span className="text-red-400 shrink-0 mt-0.5">📍</span>
                <span>Địa chỉ: <strong className="text-white font-medium">180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-blue-400 shrink-0" />
                <span>Hotline 1: <a href="tel:0919006030" className="text-white font-bold font-mono hover:text-blue-400 transition">0919 006 030</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-emerald-400 shrink-0" />
                <span>Hotline 2: <a href="tel:0983312219" className="text-white font-bold font-mono hover:text-emerald-400 transition">0983 312 219</a> <span className="text-slate-400">(24/7)</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-blue-400 shrink-0" />
                <span>Email: <a href="mailto:ntrungz0704@gmail.com" className="text-white hover:text-blue-400 transition font-medium">ntrungz0704@gmail.com</a> • <a href="mailto:hotro@templatebds.com" className="text-white hover:text-blue-400 transition font-medium">hotro@templatebds.com</a></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-400 shrink-0">⏰</span>
                <span>Giờ làm việc: <strong className="text-white font-medium">8:00 - 20:00 (T2 - CN)</strong></span>
              </div>
            </div>

            {/* 4 Social Icons (Exact matching screenshot) */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://zalo.me/0919006030"
                target="_blank"
                rel="noreferrer"
                title="Chat Zalo CSKH (0919 006 030)"
                className="w-10 h-10 rounded-sm bg-[#0068FF] hover:bg-[#0052cc] text-white flex items-center justify-center font-black text-[11px] tracking-tight shadow-md hover:scale-105 transition"
              >
                ZALO
              </a>
              <a
                href="https://www.facebook.com/groups/847532091275214"
                target="_blank"
                rel="noreferrer"
                title="Facebook Group"
                className="w-10 h-10 rounded-sm bg-[#1877F2] hover:bg-[#1565c0] text-white flex items-center justify-center font-black text-base shadow-md hover:scale-105 transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.53 17.5 2.04 12 2.04Z" /></svg>
              </a>
              <a
                href="https://www.youtube.com/@tungchuofficial"
                target="_blank"
                rel="noreferrer"
                title="YouTube Channel"
                className="w-10 h-10 rounded-sm bg-[#E62117] hover:bg-[#c61810] text-white flex items-center justify-center shadow-md hover:scale-105 transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
              <a
                href="https://www.tiktok.com/@editnhadat"
                target="_blank"
                rel="noreferrer"
                title="TikTok Channel"
                className="w-10 h-10 rounded-sm bg-[#1E293B] hover:bg-[#0f172a] text-[#A78BFA] flex items-center justify-center shadow-md hover:scale-105 transition"
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
              DANH MỤC BĐS
            </h4>
            <ul className="space-y-2 text-slate-400">
              {[
                { label: 'Đất dự án', page: 'dat-du-an' },
                { label: 'Đất nền phân lô', page: 'dat-nen' },
                { label: 'Biệt thự nghỉ dưỡng', page: 'biet-thu' },
                { label: 'Nhà phố thương mại', page: 'nha-pho' },
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
            © 2026 Bản quyền thuộc về <strong className="text-white font-black">TEMPLATEBDS</strong> — Nền tảng phân phối & Thiết kế Website Bất Động Sản Chuyên Nghiệp.
          </div>
          <div className="text-[10px] text-slate-500">
            Mẫu Giao Diện: <strong>{templateName}</strong>
          </div>
        </div>
      </div>

      {/* ── 4. FLOATING ACTION BUTTONS ON THE RIGHT ── */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-center gap-3">
        {/* Zalo Button */}
        <a
          href="https://zalo.me/0919006030"
          target="_blank"
          rel="noreferrer"
          title="Chat Zalo CSKH (0919 006 030)"
          className="w-12 h-12 rounded-sm bg-[#0084FF] hover:bg-blue-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition animate-pulse"
        >
          <span className="text-[10px] font-black tracking-tighter">ZALO</span>
        </a>

        {/* Hotline Call Button */}
        <a
          href="tel:0919006030"
          title="Gọi Hotline Ngay (0919 006 030)"
          className="w-12 h-12 rounded-sm bg-[#E65100] hover:bg-[#F57C00] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition"
        >
          <Phone size={20} />
        </a>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          title="Lên đầu trang"
          className="w-10 h-10 rounded-sm bg-slate-900/90 hover:bg-slate-950 text-white flex items-center justify-center shadow-lg hover:scale-105 transition cursor-pointer"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}
