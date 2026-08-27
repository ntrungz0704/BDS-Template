import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ExternalLink, Zap } from 'lucide-react';
import ZaloIcon from './icons/ZaloIcon';
import { FacebookIcon, TiktokIcon, YoutubeIcon } from './icons/SocialIcons';

const FOOTER_LINKS = {
  marketplace: {
    title: 'Marketplace',
    links: [
      { label: '16 Mẫu Template BĐS', href: '/templates' },
      { label: 'Xem Demo Trực Tiếp', href: '/templates' },
      { label: 'Bảng Giá & Gói Dịch Vụ', href: '/pricing' },
      { label: 'Tư Vấn Chọn Mẫu Nhanh', href: '/contact' },
    ],
  },
  resources: {
    title: 'Tài nguyên',
    links: [
      { label: 'Hướng dẫn quản trị CMS', href: '/guides/cms' },
      { label: 'Hướng dẫn Hosting & Deploy', href: '/guides/hosting' },
      { label: '10 Cam kết chất lượng', href: '/why-choose' },
      { label: 'Đăng ký tài khoản mới', href: '/register' },
    ],
  },
  services: {
    title: 'Dịch vụ',
    links: [
      { label: 'SaaS Thuê Website Tháng', href: '/pricing' },
      { label: 'Mua Trọn Gói Source Code', href: '/pricing' },
      { label: 'Bảo Trì & Hạ Tầng Cloud', href: '/pricing' },
      { label: 'Thiết Kế Giao Diện Riêng', href: '/contact' },
    ],
  },
  company: {
    title: 'Công ty & Pháp lý',
    links: [
      { label: 'Về PlatformBDS', href: '/why-choose' },
      { label: 'Hỗ Trợ Kỹ Thuật 24/7', href: '/contact' },
      { label: 'Chính Sách Bảo Mật', href: '/privacy' },
      { label: 'Điều Khoản Dịch Vụ', href: '/terms' },
    ],
  },
};

const TRUST_BADGES = [
  { label: '99.9% Uptime Cam Kết', color: '#10B981' },
  { label: 'SSL Bảo Mật 256-Bit Miễn Phí', color: '#2563EB' },
  { label: 'Hỗ Trợ Kỹ Thuật Trọn Đời', color: '#F59E0B' },
  { label: 'Bàn Giao & Kích Hoạt 30s', color: '#8B5CF6' },
];

export default function Footer() {
  return (
    <footer id="footer" className="w-full bg-[#080F1E] text-white font-sans border-t border-slate-800">
      {/* ── Trust strip ── */}
      <div className="border-b border-white/5 bg-[#050A14]">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-wrap items-center justify-center sm:justify-between gap-4">
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: b.color }} />
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-[1280px] mx-auto px-6 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand col (2/6) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div>
              <span className="text-2xl font-black tracking-tight">
                <span className="text-[#2563EB]">TEMPLATES</span>
                <span className="text-white">BDS</span>
              </span>
              <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-[320px]">
                Kho mẫu website bất động sản cao cấp số 1 Việt Nam. Tối ưu chuyển đổi, chuẩn SEO và tích hợp hệ thống CMS quản trị đa kênh.
              </p>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-2 text-xs text-slate-300 pt-1">
              <a href="tel:0919006030" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Hotline 1: <strong className="text-white font-mono">0919 006 030</strong></span>
              </a>
              <a href="tel:0983312219" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Hotline 2: <strong className="text-white font-mono">0983 312 219</strong> (24/7)</span>
              </a>
              <a href="mailto:ntrungz0704@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Email: <strong className="text-white">ntrungz0704@gmail.com</strong></span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://zalo.me/0919006030"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat Zalo CSKH (0919 006 030)"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#0068FF] border border-white/10 flex items-center justify-center p-1.5 transition-all duration-200"
              >
                <ZaloIcon className="w-full h-full" />
              </a>
              <a
                href="https://www.facebook.com/groups/847532091275214"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook Group"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#1877F2] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@tungchuofficial"
                target="_blank"
                rel="noopener noreferrer"
                title="Youtube Channel"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#FF0000] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@editnhadat"
                target="_blank"
                rel="noopener noreferrer"
                title="Tiktok Channel"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
              >
                <TiktokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link cols (4/6) */}
          {Object.values(FOOTER_LINKS).map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 border-b border-white/10 pb-2">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs font-medium text-slate-400 hover:text-white transition-colors hover:translate-x-0.5 inline-block duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} TEMPLATES BDS. Toàn bộ bản quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Máy chủ ổn định 100%
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              Bất Động Sản Cao Cấp
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
