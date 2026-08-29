'use client';
import React, { useState } from 'react';
import { Send, Phone, ArrowUp, CheckCircle } from 'lucide-react';

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
  zaloPhone,
  hotlinePhone,
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

  const defaultFooterCols: FooterColumn[] = [
    {
      title: 'Thông tin liên hệ',
      items: [
        { label: `📍 Địa chỉ: ${company?.address || '180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội'}`, isInfo: true },
        { label: `📞 Hotline: ${company?.phone || hotlinePhone || '0905.56.xxxx'}`, isInfo: true },
        { label: `✉️ Email: ${company?.email || 'hotro@templatebds.com'}`, isInfo: true },
        { label: '⏰ Giờ làm việc: 8:00 - 20:00 (T2 - CN)', isInfo: true },
      ],
    },
    {
      title: 'Về chúng tôi',
      items: [
        { label: 'Trang chủ', page: 'home' },
        { label: 'Giới thiệu', page: 'about' },
        { label: 'Tin tức & Cẩm nang', page: 'news' },
        { label: 'Ký gửi nhà đất', page: 'ky-gui' },
        { label: 'Liên hệ tư vấn', page: 'contact' },
      ],
    },
    {
      title: 'Dự án mới nhất',
      items: [
        { label: 'Căn hộ chung cư', page: 'can-ho' },
        { label: 'Nhà phố thương mại', page: 'nha-pho' },
        { label: 'Biệt thự sân vườn', page: 'biet-thu' },
        { label: 'Chung cư cao cấp', page: 'chung-cu' },
        { label: 'Văn phòng cho thuê', page: 'van-phong' },
      ],
    },
    {
      title: 'Chính sách & Quy định',
      items: [
        { label: 'Chính sách bán hàng & hoa hồng', page: 'about' },
        { label: 'Điều khoản sử dụng dịch vụ', page: 'about' },
        { label: 'Quy trình ký gửi & mua bán', page: 'ky-gui' },
        { label: 'Chính sách bảo mật thông tin', page: 'about' },
        { label: 'Câu hỏi thường gặp (FAQ)', page: 'contact' },
      ],
    },
  ];

  const footerCols: FooterColumn[] = company?.footerColumns || defaultFooterCols;
  const activeHotline = company?.phone || hotlinePhone || '0905.56.xxxx';
  const activeZalo = company?.zalo || zaloPhone || '0905560000';

  return (
    <footer className="w-full relative bg-[#0B192C]">
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle size={16} /> {toastMessage}
        </div>
      )}

      <div className="w-full bg-[#1E60B8] py-6 px-4 text-white">
        <div className={`${MAX_W} mx-auto flex flex-col md:flex-row justify-between items-center gap-4`}>
          <div>
            <h3 className="text-sm md:text-base font-black">Đăng ký nhận thông tin từ chúng tôi</h3>
            <p className="text-xs text-blue-100">Chúng tôi sẽ gửi bạn những thông tin bất động sản mới nhất</p>
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
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs px-5 py-2.5 rounded-lg whitespace-nowrap transition flex items-center gap-1 cursor-pointer"
            >
              <Send size={12} /> Đăng ký ngay
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#0B192C] text-slate-400 text-xs py-10 px-4">
        <div className={`${MAX_W} mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8`}>
          {footerCols.map((col, idx) => (
            <div key={idx} className="space-y-2.5">
              <div className="text-sm font-black text-white tracking-wide uppercase">{col.title}</div>
              <ul className="space-y-1.5">
                {col.items.map((item, i) => (
                  <li key={i}>
                    {item.isInfo ? (
                      <span className="text-[11px] text-slate-300 leading-relaxed block">{item.label}</span>
                    ) : (
                      <div
                        onClick={() => handleLinkClick(item.page)}
                        className="hover:text-white cursor-pointer transition text-[11px] flex items-center gap-1.5"
                      >
                        <span className="text-blue-500">•</span> {item.label}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-[#07101E] border-t border-slate-800/80">
        <div className={`${MAX_W} mx-auto text-slate-400 text-[11px] py-4 px-4 flex flex-col sm:flex-row justify-between items-center gap-2`}>
          <div>
            © Bản quyền thuộc về <strong className="text-white font-black">TEMPLATEBDS</strong> — Nền tảng phân phối & Thiết kế Website Bất Động Sản Chuyên Nghiệp.
          </div>
          <div className="text-[10px] text-slate-500">
            Mẫu Giao Diện: <strong>{templateName}</strong>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-center gap-3">
        <a
          href={`https://zalo.me/${activeZalo.replace(/[^0-9]/g, '') || '0905560000'}`}
          target="_blank"
          rel="noreferrer"
          title="Chat Zalo Tư Vấn"
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition animate-pulse"
        >
          <span className="text-[10px] font-black tracking-tighter">ZALO</span>
        </a>

        <a
          href={`tel:${activeHotline.replace(/[^0-9]/g, '') || '0905560000'}`}
          title="Gọi Hotline Ngay"
          className="w-12 h-12 rounded-full bg-amber-700 hover:bg-amber-800 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition"
        >
          <Phone size={20} />
        </a>

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
