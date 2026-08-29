'use client';
import React, { useState } from 'react';
import { Send, Phone, ArrowUp, CheckCircle, MapPin, Mail, Clock } from 'lucide-react';
import { MAX_W } from './design-system';

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
        <div className="fixed bottom-24 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
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

            {/* 4 Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://zalo.me/0919006030"
                target="_blank"
                rel="noreferrer"
                title="Chat Zalo CSKH (0919 006 030)"
                className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center font-black text-[10px] shadow transition"
              >
                ZALO
              </a>
              <a
                href="https://www.facebook.com/groups/847532091275214"
                target="_blank"
                rel="noreferrer"
                title="Facebook Group"
                className="w-9 h-9 rounded-xl bg-blue-800 hover:bg-blue-900 text-white flex items-center justify-center font-bold text-xs shadow transition"
              >
                f
              </a>
              <a
                href="https://www.youtube.com/@tungchuofficial"
                target="_blank"
                rel="noreferrer"
                title="YouTube Channel"
                className="w-9 h-9 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center font-bold text-xs shadow transition"
              >
                ▶
              </a>
              <a
                href="https://www.tiktok.com/@editnhadat"
                target="_blank"
                rel="noreferrer"
                title="TikTok Channel"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-xs shadow transition"
              >
                🎵
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
          className="w-12 h-12 rounded-full bg-[#0084FF] hover:bg-blue-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition animate-pulse"
        >
          <span className="text-[10px] font-black tracking-tighter">ZALO</span>
        </a>

        {/* Hotline Call Button */}
        <a
          href="tel:0919006030"
          title="Gọi Hotline Ngay (0919 006 030)"
          className="w-12 h-12 rounded-full bg-[#E65100] hover:bg-[#F57C00] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition"
        >
          <Phone size={20} />
        </a>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          title="Lên đầu trang"
          className="w-10 h-10 rounded-full bg-slate-900/90 hover:bg-slate-950 text-white flex items-center justify-center shadow-lg hover:scale-105 transition cursor-pointer"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}
