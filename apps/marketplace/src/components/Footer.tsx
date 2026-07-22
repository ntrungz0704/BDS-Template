import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Youtube, Send, Twitter, ExternalLink, Zap, MessageCircle } from 'lucide-react';

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={props.className}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95 1.2 2.27 2 3.76 2.27v3.91a8.16 8.16 0 0 1-5.18-1.89c-.61-.47-1.16-1.04-1.63-1.68V16.7a7.71 7.71 0 0 1-.82 3.49c-1.39 2.52-4.21 4-7.08 3.73-3.41-.33-6.19-3.23-6.39-6.66-.28-4.78 3.7-8.79 8.48-8.49v3.95a4.42 4.42 0 0 0-3.52 3.49c-.43 1.9.52 3.91 2.27 4.67 1.76.76 3.92.17 5.01-1.39.38-.55.59-1.2.62-1.87V.02z"/>
  </svg>
);

const FOOTER_LINKS = {
  marketplace: {
    title: 'Marketplace',
    links: [
      { label: '16 Mẫu Template', href: '/templates' },
      { label: 'Xem Demo Live', href: '/templates' },
      { label: 'Bảng giá', href: '/pricing' },
      { label: 'Changelog', href: '/pricing#faq' },
      { label: 'Roadmap', href: '/pricing#faq' },
    ],
  },
  resources: {
    title: 'Tài nguyên',
    links: [
      { label: 'Hướng dẫn sử dụng CMS', href: '/contact' },
      { label: 'API Documentation', href: '/contact' },
      { label: 'Video Tutorial', href: '/contact' },
      { label: 'Blog & Tin tức', href: '/pricing#faq' },
      { label: 'Status Page', href: '/contact' },
    ],
  },
  services: {
    title: 'Dịch vụ',
    links: [
      { label: 'SaaS (Thuê tháng)', href: '/pricing' },
      { label: 'Mua mã nguồn', href: '/pricing' },
      { label: 'Tư vấn miễn phí', href: '/contact' },
      { label: 'Enterprise', href: '/contact' },
      { label: 'White Label', href: '/contact' },
    ],
  },
  company: {
    title: 'Công ty',
    links: [
      { label: 'Về PlatformBDS', href: '/why-choose' },
      { label: 'Hỗ trợ kỹ thuật', href: '/contact' },
      { label: 'Chính sách bảo mật', href: '/privacy' },
      { label: 'Điều khoản dịch vụ', href: '/terms' },
      { label: 'Hoàn tiền 7 ngày', href: '/pricing#faq' },
    ],
  },
};

const TRUST_BADGES = [
  { label: '99.9% Uptime', color: '#10B981' },
  { label: 'SSL Miễn phí', color: '#2563EB' },
  { label: 'Hoàn tiền 7 ngày', color: '#F59E0B' },
  { label: 'GDPR Ready', color: '#8B5CF6' },
];

export default function Footer() {
  return (
    <footer id="footer" className="w-full bg-[#080F1E] text-white">
      {/* ── Trust strip ── */}
      <div className="border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: b.color }} />
              {b.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand col (2/6) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div>
              <span className="text-[22px] font-black tracking-tight">
                <span className="text-[#2563EB]">Platform</span>
                <span className="text-white">BDS</span>
              </span>
              <p className="mt-4 text-small text-slate-400 max-w-[280px]">
                Hệ sinh thái thiết kế website BĐS chuyên nghiệp hàng đầu Việt Nam — giúp môi giới và doanh nghiệp thu hút khách hàng & chốt giao dịch mỗi ngày.
              </p>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-2.5 text-[12px] text-slate-400">
              <a href="tel:0919006030" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
                <span className="font-semibold text-white font-mono">0919 006 030</span>
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-2">
              {[
                { Icon: MessageCircle, href: 'https://zalo.me/g/zdpu2usi7cqzgszqww6z?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExbWhnN2lNWUowRFlzS1FzQXNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR7QMsrcPeek91LzZxKT5iRqJ9CMpW3Me907HNOhPR2it0q0NknAoTOCZIvYWg_aem_husySjD6qvyKXUeqI5ai5Q', label: 'Zalo Group' },
                { Icon: Facebook, href: 'https://www.facebook.com/groups/847532091275214', label: 'Facebook Group' },
                { Icon: Youtube, href: 'https://www.youtube.com/@tungchuofficial', label: 'Youtube Channel' },
                { Icon: TiktokIcon, href: 'https://www.tiktok.com/@editnhadat?lang=vi-VN&fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExbWhnN2lNWUowRFlzS1FzQXNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR6WVtAS74iXoPuyWz1xmFOoJoASsomUFhJZ1gMXLzcN68lFlfLiF6mqbGbYWg_aem_IGXS8SXwpcFRmrYQ7s-FZw', label: 'Tiktok Channel' },
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#2563EB] flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols (4/6) */}
          {Object.values(FOOTER_LINKS).map((col) => (
            <div key={col.title}>
              <h5 className="text-subtitle text-white mb-6">
                {col.title}
              </h5>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-small font-medium text-slate-400 hover:text-white transition-colors"
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
        <div className="mt-14 pt-7 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} AI REVIEW BĐS. Bảo lưu mọi quyền.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Tất cả hệ thống hoạt động bình thường
            </span>
            <span>|</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#2563EB]" />
              Powered by Antigravity AI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
