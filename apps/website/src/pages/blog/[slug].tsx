import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Phone, Mail, Calendar, User, Share2, 
  ArrowRight, BookOpen, Send, CheckCircle2 
} from 'lucide-react';
import { demoBlogs } from '../../utils/demoData';

interface BlogDetailProps {
  company: any;
  post?: any;
  blogSlug: string;
  tenantSlug: string;
  error?: string;
}

export default function PublicBlogDetail({ company, post, blogSlug, tenantSlug, error }: BlogDetailProps) {
  // Use real post from API if available, otherwise find in mock or show error
  const blog = post || demoBlogs.find((b) => b.slug === blogSlug) || demoBlogs[0];

  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const primaryColor = '#C5A572'; // Luxury color

  const relatedBlogs = demoBlogs
    .filter((b) => b.slug !== blog?.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8F6F3] text-slate-900 pb-12 font-sans">
      <Head>
        <title>{blog?.title || 'Bài viết'} | Góc tin tức BĐS</title>
        <meta name="description" content={blog?.summary || blog?.title || ''} />
      </Head>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-8 py-4 shadow-sm text-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href={`/?tenant=${tenantSlug}`} className="text-xl font-extrabold tracking-wider" style={{ color: primaryColor }}>
            {company?.name ? company.name : 'PLATFORMBDS LAND'}
          </Link>
          <nav className="flex space-x-8 text-xs font-bold uppercase text-slate-600">
            <Link href={`/?tenant=${tenantSlug}`} className="hover:opacity-85">Trang chủ</Link>
            <Link href={`/?tenant=${tenantSlug}#projects`} className="hover:opacity-85">Dự án</Link>
            <Link href={`/?tenant=${tenantSlug}#contact`} className="hover:opacity-85">Liên hệ</Link>
          </nav>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        
        {/* BREADCRUMB */}
        <div className="mb-6 text-left">
          <Link href={`/?tenant=${tenantSlug}`} className="text-xs font-bold text-slate-400 hover:text-slate-600">
            ← Quay lại trang chủ
          </Link>
          <h1 className="text-3xl font-bold text-slate-950 mt-3 font-serif leading-tight">{blog.title}</h1>
          <div className="flex items-center gap-4 text-xs text-slate-400 mt-3">
            <span className="bg-[#C5A572]/10 text-[#C5A572] px-2.5 py-0.5 rounded-full font-bold">{blog.category}</span>
            <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> <span>{blog.date}</span></div>
            <div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> <span>{blog.author}</span></div>
          </div>
        </div>

        {/* IMAGE BANNER */}
        <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-sm mb-10 bg-slate-200">
          <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: POST CONTENT (8 cols) */}
          <div className="lg:col-span-8 space-y-8 text-left">
            
            {/* Table of Contents */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C5A572]" />
                <span>MỤC LỤC CHI TIẾT BÀI VIẾT</span>
              </h3>
              <ul className="text-xs font-bold text-[#C5A572] space-y-2">
                <li><a href="#section-1" className="hover:underline">1. Tổng quan tình hình thị trường bất động sản quý 2 năm 2026</a></li>
                <li><a href="#section-2" className="hover:underline">2. Tại sao nên chú trọng yếu tố pháp lý hơn là giá bán?</a></li>
                <li><a href="#section-3" className="hover:underline">3. Cách đối chiếu quy hoạch đất đai tại địa phương nhanh nhất</a></li>
                <li><a href="#section-4" className="hover:underline">4. Lời khuyên tối ưu hóa đòn bẩy tài chính ngân hàng</a></li>
              </ul>
            </div>

            {/* Content Body */}
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {blog.content}
              </p>
            </div>

            {/* Author Box */}
            <div className="rounded-3xl border border-slate-100 bg-[#FAF8FD] p-6 shadow-sm flex items-center gap-5">
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border bg-slate-100">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" alt="Author avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">BIÊN SOẠN BỞI</span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">{blog.author}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                  Chuyên gia phân tích tài chính bất động sản với hơn 10 năm kinh nghiệm dẫn dắt các quỹ đầu tư lớn.
                </p>
              </div>
            </div>

            {/* Related Posts */}
            <div>
              <h2 className="text-lg font-bold font-serif text-slate-950 mb-6 text-left">Bài Viết Liên Quan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((rb) => (
                  <div key={rb.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group">
                    <img src={rb.thumbnail} alt={rb.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform" />
                    <div className="p-4 text-left">
                      <span className="text-[9px] font-bold text-[#C5A572] uppercase tracking-wider">{rb.category}</span>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1 mt-1">{rb.title}</h4>
                      <Link href={`/blog/${rb.slug}?tenant=${tenantSlug}`} className="inline-flex items-center gap-1 text-[10px] font-bold text-[#C5A572] hover:underline mt-4">
                        <span>Đọc tiếp →</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: NEWSLETTER & SHARE SIDEBAR (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              {/* Newsletter Form */}
              <div className="rounded-3xl border border-slate-100 bg-[#0F172A] text-white p-6 shadow-md text-left">
                <h3 className="text-base font-bold font-serif mb-2 flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#C5A572]" />
                  <span>Bản Tin Phong Thủy</span>
                </h3>
                <p className="text-[11px] text-slate-400 leading-normal mb-6">Đăng ký để nhận thông báo thị trường sốt đất và kiến thức phong thủy nhà ở VIP hàng tuần hoàn toàn miễn phí.</p>
                
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã đăng ký nhận bản tin thị trường!'); }}>
                  <input 
                    type="email" 
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 text-white px-3 py-2 text-xs focus:outline-none focus:border-[#C5A572]" 
                    placeholder="nguyenvana@gmail.com" 
                    required 
                  />
                  <button type="submit" className="w-full text-[#0F172A] font-extrabold uppercase py-3 rounded-xl text-xs tracking-wider transition-all bg-[#C5A572] hover:bg-amber-600">
                    Đăng Ký Bản Tin
                  </button>
                </form>
              </div>

              {/* Share */}
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm flex items-center justify-between text-slate-900">
                <span className="text-xs font-bold">Chia sẻ tin tức:</span>
                <button 
                  onClick={copyLink}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-[#C5A572] transition-colors"
                >
                  <Share2 className="w-4 h-4 text-slate-600" />
                </button>
                {copied && <span className="text-[10px] text-green-600 font-bold">Đã sao chép!</span>}
              </div>

            </div>
          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-8 text-slate-500 text-xs border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} PLATFORMBDS.vn. Vận hành bởi Antigravity AI.</p>
        </div>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const queryTenant = context.query.tenant as string;
  const host = context.req.headers.host || '';
  let tenantSlug = (context.req.headers['x-tenant-slug'] as string) || '';
  
  if (!tenantSlug || tenantSlug === 'localhost:3003' || tenantSlug === 'localhost') {
    const isDev = process.env.NODE_ENV !== 'production';
    if (isDev) {
      tenantSlug = (context.query.tenant as string) || 'hoanggialand';
    } else {
      tenantSlug = '_notfound';
    }
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  try {
    const [compRes, themeRes, postRes] = await Promise.allSettled([
      axios.get(`${API_URL}/api/website/${tenantSlug}/company-info`, { timeout: 3000 }),
      axios.get(`${API_URL}/api/website/${tenantSlug}/theme`, { timeout: 3000 }),
      axios.get(`${API_URL}/api/website/${tenantSlug}/posts/${slug}`, { timeout: 3000 }),
    ]);
    const company = compRes.status === 'fulfilled' ? compRes.value.data.data : null;
    const theme = themeRes.status === 'fulfilled' ? themeRes.value.data.data : null;
    const post = postRes.status === 'fulfilled' ? postRes.value.data.data : null;
    const fallback = { name: tenantSlug.toUpperCase().replace(/-/g, ' ') + ' LAND', phone: '0983 312 219', email: `contact@${tenantSlug}.vn` };
    return {
      props: {
        company: company || fallback,
        post: post || null,
        blogSlug: slug,
        tenantSlug,
        theme: theme || null,
      },
    };
  } catch (error: any) {
    console.error('[SSR] Blog detail error:', error.message);
    return {
      props: {
        company: { name: tenantSlug.toUpperCase().replace(/-/g, ' ') + ' LAND', phone: '0983 312 219', email: `contact@${tenantSlug}.vn` },
        post: null,
        blogSlug: slug,
        tenantSlug,
        theme: null,
      },
    };
  }
};
