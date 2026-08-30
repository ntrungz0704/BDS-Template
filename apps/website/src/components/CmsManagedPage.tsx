import React, { useState } from 'react';
import Link from 'next/link';

interface CmsManagedPageProps {
  page: any;
  company: any;
  theme: any;
  projects?: any[];
  posts?: any[];
  tenantSlug: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

function text(value: any, fallback = ''): string {
  if (typeof value !== 'string') return fallback;
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || fallback;
}

function heading(content: any, fallback: string): string {
  return text(content?.heading || content?.title, fallback);
}

function description(content: any, fallback = ''): string {
  return text(content?.description || content?.subtitle || content?.subheading || content?.body, fallback);
}

function sectionSpacing(settings: any): string {
  const spacing: Record<string, string> = {
    none: 'py-0', sm: 'py-8', md: 'py-12', lg: 'py-16', xl: 'py-20',
  };
  return spacing[settings?.paddingY] || 'py-16';
}

function SectionTitle({ content, fallback }: { content: any; fallback: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {content?.sectionLabel && <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--cms-primary)]">{text(content.sectionLabel)}</p>}
      <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{heading(content, fallback)}</h2>
      {content?.headingAccent && <p className="mt-1 text-2xl font-black text-[var(--cms-primary)]">{text(content.headingAccent)}</p>}
      {description(content) && <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{description(content)}</p>}
    </div>
  );
}

export default function CmsManagedPage({ page, company, theme, projects = [], posts = [], tenantSlug }: CmsManagedPageProps) {
  const [lead, setLead] = useState({ fullName: '', phone: '', email: '', message: '' });
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const sections = Array.isArray(page?.sections) ? page.sections : [];
  const primary = theme?.primaryColor || '#2563EB';
  const secondary = theme?.secondaryColor || '#0F172A';
  const accent = theme?.accentColor || '#F59E0B';
  const tenantQuery = tenantSlug && tenantSlug !== '_notfound' ? `?tenant=${encodeURIComponent(tenantSlug)}` : '';

  const submitLead = async (event: React.FormEvent<HTMLFormElement>, section: any) => {
    event.preventDefault();
    if (!lead.phone.trim()) return;
    setSubmitState('sending');
    try {
      const response = await fetch(`${API_URL}/api/website/${tenantSlug}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...lead,
          email: lead.email || '',
          message: lead.message || `Yêu cầu tư vấn từ trang ${page?.slug || 'home'}`,
          source: `cms_page_${page?.slug || 'home'}`,
          formId: `cms-${page?.slug || 'home'}-${section.id}`.slice(0, 100),
          sourcePage: page?.slug || 'home',
          sourceUrl: window.location.href,
        }),
      });
      if (!response.ok) throw new Error('submit_failed');
      setSubmitState('success');
      setLead({ fullName: '', phone: '', email: '', message: '' });
    } catch {
      setSubmitState('error');
    }
  };

  const renderSection = (section: any) => {
    const content = section.content || {};
    const settings = section.settings || {};
    const items = Array.isArray(content.items) ? content.items : [];
    const shell = `${sectionSpacing(settings)} px-4 sm:px-6`;

    if (section.sectionKey === 'hero') {
      const backgroundImage = content.backgroundImage;
      return (
        <section
          key={section.id}
          id="hero"
          className="relative isolate overflow-hidden px-4 py-24 text-center text-white sm:py-32"
          style={{ backgroundColor: secondary, backgroundImage: backgroundImage ? `linear-gradient(rgba(15,23,42,.72),rgba(15,23,42,.78)),url(${backgroundImage})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="relative mx-auto max-w-4xl">
            {content.badge && <span className="mb-5 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest">{text(content.badge)}</span>}
            <h1 className="text-4xl font-black leading-tight sm:text-6xl">{heading(content, page?.title || 'Bất động sản cao cấp')}</h1>
            {content.headingAccent && <p className="mt-2 text-3xl font-black" style={{ color: accent }}>{text(content.headingAccent)}</p>}
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">{description(content, company?.slogan || '')}</p>
            {content.ctaText && <a href={content.ctaUrl || '#contact'} className="mt-8 inline-flex rounded-xl px-7 py-4 text-sm font-black text-white shadow-xl" style={{ backgroundColor: primary }}>{text(content.ctaText)}</a>}
          </div>
        </section>
      );
    }

    if (section.sectionKey === 'stats') {
      return (
        <section key={section.id} className={`${shell} bg-slate-950 text-white`}>
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 lg:grid-cols-4">
            {items.slice(0, 6).map((item: any, index: number) => <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"><strong className="block text-3xl font-black" style={{ color: accent }}>{text(item.value, '—')}</strong><span className="mt-2 block text-xs font-bold uppercase tracking-wider text-slate-300">{text(item.label)}</span></div>)}
          </div>
        </section>
      );
    }

    if (['projects', 'featured_projects'].includes(section.sectionKey)) {
      const limit = Number(content.limit || content.maxItems || 6);
      return (
        <section key={section.id} className={`${shell} bg-slate-50`}>
          <div className="mx-auto max-w-7xl"><SectionTitle content={content} fallback="Dự Án Tiêu Biểu" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{projects.slice(0, limit).map((project: any) => <Link href={`/projects/${project.slug}${tenantQuery}`} key={project.id || project.slug} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><img src={project.thumbnail} alt={project.title || project.name} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" /><div className="p-5"><h3 className="text-lg font-black text-slate-900">{project.title || project.name}</h3><p className="mt-2 line-clamp-2 text-sm text-slate-500">{project.shortDescription || project.address}</p><p className="mt-4 font-black" style={{ color: primary }}>{project.price || 'Liên hệ'}</p></div></Link>)}</div>
          </div>
        </section>
      );
    }

    if (section.sectionKey === 'posts') {
      const limit = Number(content.limit || 6);
      return (
        <section key={section.id} className={`${shell} bg-white`}><div className="mx-auto max-w-7xl"><SectionTitle content={content} fallback="Tin Tức Mới Nhất" /><div className="grid gap-6 md:grid-cols-3">{posts.slice(0, limit).map((post: any) => <Link href={`/blog/${post.slug}${tenantQuery}`} key={post.id || post.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><img src={post.thumbnail} alt={post.title} className="h-48 w-full object-cover" /><div className="p-5"><h3 className="font-black text-slate-900">{post.title}</h3><p className="mt-2 line-clamp-3 text-sm text-slate-500">{post.summary || post.excerpt}</p></div></Link>)}</div></div></section>
      );
    }

    if (section.sectionKey === 'gallery') {
      return <section key={section.id} className={`${shell} bg-slate-950 text-white`}><div className="mx-auto max-w-7xl"><SectionTitle content={content} fallback="Thư Viện Hình Ảnh" /><div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{items.slice(0, 8).map((item: any, index: number) => <figure key={index} className="overflow-hidden rounded-2xl"><img src={typeof item === 'string' ? item : item.url || item.img} alt={text(item.title, `Hình ảnh ${index + 1}`)} className="aspect-[4/3] h-full w-full object-cover" /></figure>)}</div></div></section>;
    }

    if (section.sectionKey === 'faq') {
      return <section key={section.id} className={`${shell} bg-slate-50`}><div className="mx-auto max-w-4xl"><SectionTitle content={content} fallback="Câu Hỏi Thường Gặp" /><div className="space-y-3">{items.slice(0, 8).map((item: any, index: number) => <details key={index} className="rounded-2xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer font-black text-slate-900">{text(item.q || item.title)}</summary><p className="mt-3 text-sm leading-7 text-slate-600">{text(item.a || item.desc)}</p></details>)}</div></div></section>;
    }

    if (section.sectionKey === 'contact') {
      return (
        <section key={section.id} id="contact" className={`${shell} bg-slate-950 text-white`}><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2"><div><p className="text-xs font-black uppercase tracking-[0.22em]" style={{ color: accent }}>TƯ VẤN 24/7</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">{heading(content, 'Nhận Bảng Giá & Tư Vấn')}</h2><p className="mt-4 text-sm leading-7 text-slate-300">{description(content, 'Chuyên viên sẽ liên hệ, xác nhận nhu cầu và gửi tài liệu phù hợp.')}</p><div className="mt-7 space-y-2 text-sm"><p>Hotline: <strong>{company?.phone || '0919 006 030'}</strong></p><p>Email: <strong>{company?.email || 'contact@templatebds.com'}</strong></p><p>{company?.address}</p></div></div>
          <form data-crm-managed="true" onSubmit={(event) => submitLead(event, section)} className="space-y-3 rounded-2xl bg-white p-6 text-slate-900"><input name="fullName" value={lead.fullName} onChange={(e) => setLead({ ...lead, fullName: e.target.value })} required placeholder="Họ và tên" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" /><input name="phone" type="tel" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} required placeholder="Số điện thoại / Zalo" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" /><input name="email" type="email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} placeholder="Email (không bắt buộc)" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" /><textarea name="message" value={lead.message} onChange={(e) => setLead({ ...lead, message: e.target.value })} placeholder="Nhu cầu của bạn" className="min-h-24 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" /><button disabled={submitState === 'sending'} className="w-full rounded-xl px-5 py-3.5 text-sm font-black text-white disabled:opacity-60" style={{ backgroundColor: primary }}>{submitState === 'sending' ? 'Đang gửi...' : text(content.submitText, 'Gửi Yêu Cầu Tư Vấn')}</button>{submitState === 'success' && <p className="text-sm font-bold text-emerald-600">Gửi thành công. Chuyên viên sẽ liên hệ sớm.</p>}{submitState === 'error' && <p className="text-sm font-bold text-red-600">Chưa thể gửi. Vui lòng thử lại hoặc gọi hotline.</p>}</form></div></section>
      );
    }

    if (section.sectionKey === 'cta') {
      return <section key={section.id} className={`${shell} px-4 text-center text-white`} style={{ backgroundColor: primary }}><div className="mx-auto max-w-3xl"><h2 className="text-3xl font-black">{heading(content, 'Nhận Tư Vấn Ngay Hôm Nay')}</h2><p className="mt-4 text-white/80">{description(content)}</p><a href={content.ctaUrl || '#contact'} className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-black" style={{ color: primary }}>{text(content.ctaText, 'Liên hệ ngay')}</a></div></section>;
    }

    if (section.sectionKey === 'map') {
      return <section key={section.id} className={`${shell} bg-white`}><div className="mx-auto max-w-6xl"><SectionTitle content={content} fallback="Vị Trí Văn Phòng" />{content.embedUrl ? <iframe src={content.embedUrl} title="Bản đồ" className="h-96 w-full rounded-2xl border-0" loading="lazy" /> : <div className="grid h-72 place-items-center rounded-2xl bg-slate-100 text-center text-sm text-slate-500">{text(content.address, company?.address || 'Vui lòng cập nhật đường dẫn Google Maps trong CMS.')}</div>}</div></section>;
    }

    return (
      <section key={section.id} className={`${shell} bg-white`}><div className="mx-auto max-w-7xl"><SectionTitle content={content} fallback={section.label || 'Nội Dung'} />{items.length > 0 && <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.slice(0, 12).map((item: any, index: number) => <article key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-6"><h3 className="text-lg font-black text-slate-900">{text(item.title || item.label || item.name || item.value, `Nội dung ${index + 1}`)}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{text(item.desc || item.description || item.text || item.a)}</p></article>)}</div>}</div></section>
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900" style={{ '--cms-primary': primary, '--cms-secondary': secondary, '--cms-accent': accent, fontFamily: theme?.fontBody || 'Inter, sans-serif' } as React.CSSProperties}>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur"><div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4"><Link href={`/${tenantQuery}`} className="font-black text-slate-950">{company?.name || 'TEMPLATES BĐS'}</Link><nav className="hidden items-center gap-5 text-sm font-bold text-slate-600 md:flex"><Link href={`/${tenantQuery}`}>Trang chủ</Link><Link href={`/projects${tenantQuery}`}>Dự án</Link><Link href={`/blog${tenantQuery}`}>Tin tức</Link><Link href={`/about${tenantQuery}`}>Giới thiệu</Link><Link href={`/contact${tenantQuery}`}>Liên hệ</Link></nav><a href={`tel:${company?.phone || '0919006030'}`} className="rounded-xl px-4 py-2 text-xs font-black text-white" style={{ backgroundColor: primary }}>{company?.phone || '0919 006 030'}</a></div></header>
      <main>{sections.length > 0 ? sections.map(renderSection) : <section className="grid min-h-[60vh] place-items-center px-4 text-center"><div><h1 className="text-3xl font-black">{page?.title || 'Trang đang cập nhật'}</h1><p className="mt-3 text-slate-500">Vui lòng thêm section trong CMS để hiển thị nội dung.</p></div></section>}</main>
      <footer className="bg-slate-950 px-4 py-10 text-center text-sm text-slate-400"><p className="font-black text-white">{company?.name || 'TEMPLATES BĐS'}</p><p className="mt-2">{company?.address}</p><p className="mt-4 text-xs">© {new Date().getFullYear()} · Vận hành bởi PlatformBDS</p></footer>
    </div>
  );
}
