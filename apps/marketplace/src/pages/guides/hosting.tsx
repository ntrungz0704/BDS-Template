import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Server, Globe, Shield, Terminal, Upload, CheckCircle2, Zap, HardDrive, Cloud } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function HostingGuidePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100/70 text-slate-900 antialiased font-sans">
      <Head>
        <title>Hướng Dẫn Hosting & Đưa Website Lên Online | PLATFORMBDS</title>
        <meta name="description" content="Hướng dẫn chi tiết cách đưa website BĐS lên hosting, kết nối domain, cài đặt SSL và vận hành website chuyên nghiệp." />
      </Head>

      <Header />

      <main className="flex-grow max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="max-w-[800px] mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-3">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại Trang chủ</span>
          </Link>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 inline-block mb-2">
              HƯỚNG DẪN HOSTING & TRIỂN KHAI
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Đưa Website BĐS Lên Online Trong 15 Phút
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Bạn có 2 cách để đưa website lên online: sử dụng nền tảng SaaS của PlatformBDS (không cần kỹ thuật) hoặc tự host trên VPS/Hosting riêng (dành cho developer).
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sticky navigation */}
          <aside className="lg:col-span-4 bg-white border border-slate-200 p-6 rounded-lg shadow-sm space-y-4 lg:sticky lg:top-24 font-sans">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Nội Dung Hướng Dẫn</span>
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#option1" className="block text-emerald-600 hover:underline">🚀 Cách 1: Dùng PlatformBDS (Đơn giản nhất)</a></li>
              <li><a href="#option2" className="block text-blue-600 hover:underline">💻 Cách 2: Self-Host trên VPS riêng</a></li>
              <li><a href="#domain" className="block text-indigo-600 hover:underline">🌐 Kết nối Domain riêng (.vn / .com)</a></li>
              <li><a href="#ssl" className="block text-purple-600 hover:underline">🔒 Cài đặt SSL (HTTPS)</a></li>
              <li><a href="#vercel" className="block text-slate-600 hover:underline">▲ Deploy lên Vercel (Miễn phí)</a></li>
              <li><a href="#support" className="block text-rose-600 hover:underline">📞 Hỗ trợ kỹ thuật</a></li>
            </ul>
          </aside>

          {/* Right Content */}
          <div className="lg:col-span-8 space-y-8">

            {/* Option 1: PlatformBDS SaaS */}
            <section id="option1" className="bg-white border border-slate-200 p-6 sm:p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Cloud className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-bold text-slate-900">Cách 1: Dùng Nền Tảng PlatformBDS</h2>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">ĐỀ XUẤT</span>
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Đây là cách đơn giản nhất — bạn <strong>không cần biết kỹ thuật</strong>. Khi admin duyệt đơn hàng, hệ thống tự động tạo website cho bạn.
              </p>
              <div className="space-y-3">
                {[
                  { step: '1', title: 'Chọn mẫu & đặt hàng', desc: 'Duyệt kho template, thêm vào giỏ hàng và gửi yêu cầu qua Zalo.' },
                  { step: '2', title: 'Thanh toán qua chuyển khoản', desc: 'Chuyển khoản theo hướng dẫn. Admin sẽ xác nhận và duyệt đơn.' },
                  { step: '3', title: 'Nhận tài khoản CMS', desc: 'Hệ thống tự động tạo website + gửi email/password cho bạn.' },
                  { step: '4', title: 'Đăng nhập CMS & quản lý', desc: 'Truy cập CMS để đăng bài, sửa giao diện, cập nhật thông tin dự án.' },
                  { step: '5', title: 'Kết nối domain riêng', desc: 'Vào CMS → Domain → Nhập tên miền của bạn → Trỏ DNS theo hướng dẫn.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3 items-start">
                    <div className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-xs font-black shrink-0">{item.step}</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                <p className="text-[11px] text-emerald-800 font-medium">
                  ✅ <strong>Bao gồm:</strong> Hosting, SSL, backup, cập nhật bảo mật, hỗ trợ kỹ thuật 24/7. Bạn chỉ cần tập trung kinh doanh!
                </p>
              </div>
            </section>

            {/* Option 2: Self-Host */}
            <section id="option2" className="bg-white border border-slate-200 p-6 sm:p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Server className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-slate-900">Cách 2: Tự Host Trên VPS Riêng</h2>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">CHO DEVELOPER</span>
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Dành cho ai muốn toàn quyền kiểm soát. Yêu cầu kiến thức cơ bản về Node.js, Linux và quản trị server.
              </p>

              <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-blue-500" />
                Yêu cầu hệ thống
              </h3>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4 text-[11px] text-slate-700 space-y-1">
                <p>• <strong>VPS:</strong> Ubuntu 22.04+ / Tối thiểu 2GB RAM, 1 vCPU</p>
                <p>• <strong>Node.js:</strong> v18+ (khuyến nghị v20 LTS)</p>
                <p>• <strong>Database:</strong> PostgreSQL 15+</p>
                <p>• <strong>Package Manager:</strong> pnpm hoặc npm</p>
                <p>• <strong>Hosting gợi ý:</strong> DigitalOcean, Vultr, AWS Lightsail, Tinohost</p>
              </div>

              <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-500" />
                Các bước triển khai
              </h3>
              <div className="bg-slate-900 rounded-xl p-4 text-[11px] font-mono text-emerald-400 space-y-2 overflow-x-auto">
                <p className="text-slate-500"># 1. Upload source code lên VPS</p>
                <p>scp -r ./source-code user@your-server:/var/www/bds</p>
                <p className="text-slate-500 mt-3"># 2. Cài đặt dependencies</p>
                <p>cd /var/www/bds</p>
                <p>npm install</p>
                <p className="text-slate-500 mt-3"># 3. Cấu hình biến môi trường</p>
                <p>cp .env.example .env</p>
                <p>nano .env  <span className="text-slate-500"># Sửa DATABASE_URL, API keys...</span></p>
                <p className="text-slate-500 mt-3"># 4. Khởi tạo database</p>
                <p>npx prisma migrate deploy</p>
                <p>npx prisma db seed</p>
                <p className="text-slate-500 mt-3"># 5. Build production</p>
                <p>npm run build</p>
                <p className="text-slate-500 mt-3"># 6. Chạy với PM2 (auto-restart)</p>
                <p>npm install -g pm2</p>
                <p>pm2 start npm --name &quot;bds-web&quot; -- start</p>
                <p>pm2 save && pm2 startup</p>
              </div>
            </section>

            {/* Domain Setup */}
            <section id="domain" className="bg-white border border-slate-200 p-6 sm:p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">Kết Nối Domain Riêng</h2>
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Để website hiển thị với tên miền riêng (ví dụ: <strong>batdongsan.vn</strong>), bạn cần cấu hình DNS.
              </p>
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold">
                    <tr>
                      <th className="px-4 py-2 text-left">Loại</th>
                      <th className="px-4 py-2 text-left">Tên</th>
                      <th className="px-4 py-2 text-left">Giá trị</th>
                      <th className="px-4 py-2 text-left">TTL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-2 font-bold text-blue-600">A</td>
                      <td className="px-4 py-2 font-mono">@</td>
                      <td className="px-4 py-2 font-mono">IP server của bạn</td>
                      <td className="px-4 py-2 text-slate-500">Auto</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold text-blue-600">CNAME</td>
                      <td className="px-4 py-2 font-mono">www</td>
                      <td className="px-4 py-2 font-mono">cname.platformbds.vn</td>
                      <td className="px-4 py-2 text-slate-500">Auto</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-slate-500 mt-2">
                💡 Nếu dùng PlatformBDS SaaS, vào CMS → Domain Settings → hệ thống sẽ hướng dẫn chi tiết và tự kiểm tra DNS cho bạn.
              </p>
            </section>

            {/* SSL */}
            <section id="ssl" className="bg-white border border-slate-200 p-6 sm:p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-bold text-slate-900">Cài Đặt SSL (HTTPS Miễn Phí)</h2>
              </div>
              <div className="bg-slate-900 rounded-xl p-4 text-[11px] font-mono text-emerald-400 space-y-1">
                <p className="text-slate-500"># Cài Certbot (Let&apos;s Encrypt)</p>
                <p>sudo apt install certbot python3-certbot-nginx</p>
                <p className="mt-2 text-slate-500"># Cấp chứng chỉ SSL miễn phí</p>
                <p>sudo certbot --nginx -d yourdomain.vn -d www.yourdomain.vn</p>
                <p className="mt-2 text-slate-500"># Auto-renew</p>
                <p>sudo certbot renew --dry-run</p>
              </div>
              <p className="text-[10px] text-slate-500 mt-2">
                ✅ Nếu dùng PlatformBDS SaaS, SSL được cài đặt tự động — bạn không cần làm gì.
              </p>
            </section>

            {/* Vercel Deploy */}
            <section id="vercel" className="bg-white border border-slate-200 p-6 sm:p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-slate-800" />
                <h2 className="text-lg font-bold text-slate-900">Deploy Lên Vercel (Miễn Phí)</h2>
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Vercel là nền tảng deploy Next.js tốt nhất — miễn phí cho dự án cá nhân, tự động SSL, CDN toàn cầu.
              </p>
              <div className="space-y-3">
                {[
                  { step: '1', title: 'Đăng ký Vercel', desc: 'Truy cập vercel.com → Sign Up bằng GitHub.' },
                  { step: '2', title: 'Push code lên GitHub', desc: 'git init → git add . → git commit → git push lên repo.' },
                  { step: '3', title: 'Import Project', desc: 'Vercel Dashboard → New Project → Import GitHub repo → Deploy.' },
                  { step: '4', title: 'Cấu hình Environment Variables', desc: 'Vào Settings → Environment Variables → Thêm DATABASE_URL, API keys...' },
                  { step: '5', title: 'Kết nối Domain', desc: 'Settings → Domains → Thêm domain riêng → Trỏ DNS theo hướng dẫn Vercel.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3 items-start">
                    <div className="w-7 h-7 bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center text-xs font-black shrink-0">{item.step}</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Support */}
            <section id="support" className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 sm:p-8 rounded-xl shadow-lg text-white">
              <h2 className="text-lg font-bold mb-2">Cần Hỗ Trợ Kỹ Thuật?</h2>
              <p className="text-xs opacity-90 mb-4 leading-relaxed">
                Đội ngũ PlatformBDS sẵn sàng hỗ trợ bạn triển khai website 24/7. Liên hệ ngay qua các kênh dưới đây:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a href="https://zalo.me/0983312219" target="_blank" rel="noopener noreferrer"
                  className="bg-white/15 backdrop-blur border border-white/20 rounded-xl p-4 text-center hover:bg-white/25 transition-all">
                  <p className="text-xs font-bold">💬 Zalo</p>
                  <p className="text-[11px] opacity-80 mt-0.5">0983 312 219</p>
                </a>
                <a href="tel:0919006030"
                  className="bg-white/15 backdrop-blur border border-white/20 rounded-xl p-4 text-center hover:bg-white/25 transition-all">
                  <p className="text-xs font-bold">📞 Hotline</p>
                  <p className="text-[11px] opacity-80 mt-0.5">0919 006 030</p>
                </a>
                <a href="mailto:support@platformbds.vn"
                  className="bg-white/15 backdrop-blur border border-white/20 rounded-xl p-4 text-center hover:bg-white/25 transition-all">
                  <p className="text-xs font-bold">📧 Email</p>
                  <p className="text-[11px] opacity-80 mt-0.5">support@platformbds.vn</p>
                </a>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

