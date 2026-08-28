import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

// Reusable UI Components
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';
import DetailsModal from '../components/DetailsModal';
import ProductCard from '../components/ProductCard';
import { ALL_TEMPLATES } from '../data/templatesData';

// Icons
import { 
  Search, RefreshCw, AlertCircle, ShoppingCart, User, Key, Mail, 
  Phone, Play, Check, ChevronRight, Star, Sparkles, Laptop, Tablet, 
  Smartphone, Code, Timer, BarChart3, HelpCircle, CheckCircle2, ChevronDown, Award, Layout, Zap, Building, HelpCircle as HelpIcon, ArrowRight
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';

export default function MarketplaceHome() {
  const { user, openAuthModal, addOrder, addToCart } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);

  // Query marketplace stats
  const { data: statsRes } = useQuery({
    queryKey: ['marketplaceStats'],
    queryFn: async () => {
      try {
        const res = await axios.get(`${API_URL}/api/marketplace/stats`, { timeout: 3000 });
        return res.data;
      } catch (e) {
        return {
          success: true,
          data: {
            totalCustomers: 0,
            totalWebsitesCreated: 0,
            totalTemplates: 0,
            averageRating: 0,
          }
        };
      }
    },
    staleTime: 60000,
  });

  const statsData = statsRes?.data || {
    totalCustomers: 0,
    totalWebsitesCreated: 0,
    totalTemplates: 0,
    averageRating: 0,
  };
  const [activeDetailsTemplate, setActiveDetailsTemplate] = useState<any | null>(null);
  const [orderType, setOrderType] = useState<'BUY' | 'RENT'>('BUY');
  const [isFixedOrderType, setIsFixedOrderType] = useState(false);
  
  // Order Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [note, setNote] = useState('');

  // Filtering states
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // FAQ Accordion State
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const router = useRouter();

  // Handle deep link for ordering
  useEffect(() => {
    if (router.isReady && router.query.order) {
      const slug = router.query.order as string;
      const tpl = ALL_TEMPLATES.find(t => t.slug === slug);
      if (tpl) {
        handleSelectTemplate(tpl, 'BUY');
        // Clear the query param from URL without refreshing
        router.replace('/', undefined, { shallow: true });
      }
    }
  }, [router.isReady, router.query.order]);

  // 1. Query templates from DB (with fallback to avoid skeleton lag)
  const { data: templatesRes, isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      try {
        const res = await axios.get(`${API_URL}/api/marketplace/templates`, { timeout: 3000 });
        return res.data;
      } catch (e) {
        console.warn('API error, falling back to local templates instantly.', e);
        return { data: [] };
      }
    },
    staleTime: 60000, // cache for 1 minute
  });

  // 2. Mutations
  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      try {
        const res = await axios.post(`${API_URL}/api/marketplace/orders`, orderData, { timeout: 3000 });
        return res.data || res;
      } catch (err: any) {
        throw err;
      }
    },
    onSuccess: (data) => {
      const order = data.data || data;
      addOrder(order);
      alert(`Mua hàng thành công! Mã đơn hàng của bạn là: ${order.orderNumber}.\nVui lòng chuyển khoản thanh toán số tiền ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.amount)} hoặc kiểm tra trong mục Đơn Hàng Của Tôi.`);
      setSelectedTemplate(null);
      resetForm();
    },
  });

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setSubdomain('');
    setNote('');
  };

  const handleSelectTemplate = (tpl: any, defaultType?: 'BUY' | 'RENT') => {
    const type = defaultType || 'RENT';
    addToCart(tpl, type);
    if (type === 'BUY') {
      router.push('/cart');
    }
  };



  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Client-side validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Email không hợp lệ. VD: ten@gmail.com');
      return;
    }
    const phoneClean = phone.replace(/\s/g, '');
    if (!phoneClean || !/^(0|\+84)[0-9]{9,10}$/.test(phoneClean)) {
      alert('SĐT phải bắt đầu bằng 0 hoặc +84, từ 10-11 số.');
      return;
    }
    if (!fullName || fullName.trim().length < 2) {
      alert('Họ và tên tối thiểu 2 ký tự.');
      return;
    }
    const data = {
      templateId: selectedTemplate.id,
      type: orderType,
      fullName,
      email,
      phone,
      subdomain: orderType === 'RENT' ? subdomain : undefined,
      note,
    };
    createOrderMutation.mutate(data);
  };

  // Animated counter hook
  const useCountUp = (target: number, duration: number = 1500, startOnView: boolean = true) => {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!startOnView) { setStarted(true); return; }
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { setStarted(true); observer.disconnect(); }
      }, { threshold: 0.5 });
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [startOnView]);

    useEffect(() => {
      if (!started) return;
      let start = 0;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { setCount(target); clearInterval(timer); }
        else setCount(Math.floor(start));
      }, 16);
      return () => clearInterval(timer);
    }, [started, target, duration]);

    return { count, ref };
  };

  // 12 Mock premium templates — each with unique identity
  const mockTemplates = ALL_TEMPLATES;

  const dbTemplates = templatesRes?.data || [];
  const mergedTemplates = [...mockTemplates];
  dbTemplates.forEach((dbTpl: any) => {
    const idx = mergedTemplates.findIndex(m => m.slug === dbTpl.slug);
    if (idx !== -1) {
      const original = mergedTemplates[idx];
      const merged = { ...original, ...dbTpl };
      
      // Khôi phục các trường thông tin chi tiết từ mock nếu DB trống/null
      if (!dbTpl.features || (Array.isArray(dbTpl.features) && dbTpl.features.length === 0)) {
        merged.features = original.features;
      }
      if (!dbTpl.screenshots || (Array.isArray(dbTpl.screenshots) && dbTpl.screenshots.length === 0)) {
        merged.screenshots = original.screenshots;
      }
      if (!dbTpl.targetAudience || (Array.isArray(dbTpl.targetAudience) && dbTpl.targetAudience.length === 0)) {
        merged.targetAudience = original.targetAudience;
      }
      if (!dbTpl.highlights || (Array.isArray(dbTpl.highlights) && dbTpl.highlights.length === 0)) {
        merged.highlights = original.highlights;
      }
      if (!dbTpl.availablePages || (Array.isArray(dbTpl.availablePages) && dbTpl.availablePages.length === 0)) {
        merged.availablePages = original.availablePages;
      }
      if (!dbTpl.modules || (Array.isArray(dbTpl.modules) && dbTpl.modules.length === 0)) {
        merged.modules = original.modules;
      }
      if (!dbTpl.priceBuySource) {
        merged.priceBuySource = (original as any)?.priceBuySource || (original as any)?.price || 799000;
      }
      if (!dbTpl.priceBuy) {
        merged.priceBuy = (original as any)?.priceBuy || (original as any)?.price || 499000;
      }

      mergedTemplates[idx] = merged;
    } else {
      mergedTemplates.push(dbTpl);
    }
  });

  const filteredTemplates = mergedTemplates.filter((tpl: any) => {
    if (searchQuery && !tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) && !tpl.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory !== 'ALL') {
      const slug = tpl.slug;
      const col = tpl.collectionSlug;
      if (selectedCategory === 'BIET_THU' && col !== 'luxury' && col !== 'villa' && col !== 'classic' && slug !== 'luxury-gold' && slug !== 'villa-premium' && slug !== 'classic-elegant' && slug !== 'mega-developer') return false;
      if (selectedCategory === 'CHUNG_CU' && col !== 'apartment' && col !== 'minimal' && slug !== 'urban-city' && slug !== 'modern-corporate' && slug !== 'minimal-white') return false;
      if (selectedCategory === 'NGHI_DUONG' && col !== 'resort' && col !== 'eco' && slug !== 'resort-paradise' && slug !== 'eco-green') return false;
      if (selectedCategory === 'DAT_THUONG_MAI' && col !== 'industrial' && col !== 'investment' && col !== 'retail' && slug !== 'industrial-estate' && slug !== 'investment-pro' && slug !== 'retail-podium') return false;
      if (selectedCategory === 'CA_NHAN' && col !== 'minimal' && col !== 'agency' && col !== 'agent' && slug !== 'minimal-white' && slug !== 'agency-onepage' && slug !== 'personal-agent') return false;
      if (selectedCategory === 'KCN_NHA_XUONG' && col !== 'industrial' && slug !== 'industrial-estate') return false;
      if (selectedCategory === 'CORPORATE' && col !== 'corporate' && col !== 'developer') return false;
    }
    return true;
  });

  // FAQs mock data
  const faqs = [
    { q: "Tôi có cần biết lập trình để sử dụng website không?", a: "Hoàn toàn không cần. Giao diện quản trị CMS được thiết kế cực kỳ trực quan, giúp bạn đăng tin dự án, chỉnh sửa hình ảnh và thông số chỉ trong vài cú click chuột tương tự như soạn thảo văn bản bình thường." },
    { q: "Tôi có thể sử dụng tên miền riêng của mình không?", a: "Có, hệ thống hỗ trợ liên kết tên miền riêng của bạn (ví dụ: hoanggialand.vn) hoàn toàn miễn phí đối với gói Doanh Nghiệp (Professional) hoặc khi mua đứt mã nguồn." },
    { q: "Website có chuẩn SEO và thân thiện với Google không?", a: "Chắc chắn rồi. Toàn bộ mã nguồn đã được cấu hình sẵn các thẻ tiêu chuẩn SEO tự động, tích hợp sitemap và tối ưu hóa tốc độ tải trang cao nhất giúp bài viết phân tích dự án dễ dàng lên top Google tìm kiếm." },
    { q: "Nếu tôi không hài lòng, có được hoàn tiền không?", a: "PlatformBDS cung cấp gói dùng thử và hỗ trợ cam kết hoàn tiền trong 7 ngày nếu dịch vụ phát sinh lỗi kỹ thuật từ hệ thống mà không khắc phục được." },
    { q: "Website có hiển thị tốt trên điện thoại không?", a: "Có, 100% các mẫu giao diện của chúng tôi đều được thiết kế responsive thông minh, tự động tối ưu hiển thị hoàn hảo trên mọi thiết bị di động, máy tính bảng và máy tính để bàn." }

  ];

  // Animated HeroStats component using IntersectionObserver
  const HeroStats = () => {
    const [started, setStarted] = useState(false);
    const [c1, setC1] = useState(0);
    const [c2, setC2] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
      }, { threshold: 0.4 });
      if (ref.current) obs.observe(ref.current);
      return () => obs.disconnect();
    }, []);

    useEffect(() => {
      if (!started) return;
      const animate = (target: number, setter: (v: number) => void, duration = 1200) => {
        if (target <= 0) {
          setter(0);
          return;
        }
        let v = 0;
        const step = target / (duration / 16);
        const t = setInterval(() => {
          v += step;
          if (v >= target) { setter(target); clearInterval(t); }
          else setter(Math.floor(v));
        }, 16);
        return t;
      };
      const t1 = animate(statsData.totalCustomers, setC1);
      const t2 = animate(statsData.totalWebsitesCreated, setC2);
      return () => { 
        if (t1) clearInterval(t1); 
        if (t2) clearInterval(t2); 
      };
    }, [started, statsData.totalCustomers, statsData.totalWebsitesCreated]);

    return (
      <div ref={ref} className="pt-8 mt-4 border-t border-slate-200 grid grid-cols-3 gap-6 text-left max-w-lg">
        <div>
          <h4 className="text-h3 text-text-primary tabular-nums">
            {started ? `${c1}+` : '—'}
          </h4>
          <p className="text-caption text-text-caption mt-1">Khách hàng<br className="hidden sm:block" /> tin tưởng</p>
        </div>
        <div className="border-x border-slate-200 px-6">
          <h4 className="text-h3 text-text-primary tabular-nums">
            {started ? `${c2 >= 1000 ? '1.2K' : c2}+` : '—'}
          </h4>
          <p className="text-caption text-text-caption mt-1">Website<br className="hidden sm:block" /> đã tạo</p>
        </div>
        <div className="pl-6">
          <h4 className="text-h3 text-text-primary tabular-nums">
            {started ? (statsData.averageRating > 0 ? `${statsData.averageRating}★` : '—') : '—'}
          </h4>
          <p className="text-caption text-text-caption mt-1">Đánh giá<br className="hidden sm:block" /> trung bình</p>
        </div>
      </div>
    );
  };

  // Scroll reveal observer
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredTemplates, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased overflow-x-hidden">
      <Head>
        <title>Kho Mẫu Website Bất Động Sản Cao Cấp — TEMPLATES BDS</title>
        <meta name="description" content="16 mẫu website BĐS chuyên nghiệp. Kích hoạt 30 giây. Chuẩn SEO Google. Hỗ trợ 24/7. Hơn 500+ môi giới & doanh nghiệp đã tin dùng." />
        <meta property="og:title" content="TEMPLATES BDS — Sở Hữu Website BĐS Chuyên Nghiệp" />
      </Head>

      <Header
        onSearch={setSearchQuery}
        onOpenConsultation={() => router.push('/contact')}
        onOpenAuth={() => openAuthModal('login')}
      />

      {/* ════════════════════════════════════════════════════
          1. HERO — Premium split layout (pt 120 to give header room)
      ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F0F5FF] via-[#F8FAFC] to-[#F8FAFC] pt-28 pb-24 px-5">
        {/* BG decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-[#2563EB]/5 to-transparent rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-20 right-0 w-64 h-64 bg-blue-400/5 rounded-full blur-[60px] pointer-events-none" />
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{backgroundImage:'radial-gradient(#CBD5E1 1px,transparent 1px)',backgroundSize:'28px 28px'}} />

        <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* LEFT */}
          <div className="animate-fade-up space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/50 border border-blue-100 shadow-sm animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[14px] font-semibold uppercase tracking-widest text-blue-700">Nền tảng BĐS #1 Việt Nam</span>
            </div>

            {/* H1 */}
            <h1 className="text-display-xl max-w-[700px] text-text-primary">
              Sở Hữu Website<br />
              Bất Động Sản<br />
              <span className="relative">
                <span className="text-[#2563EB]">Chuyên Nghiệp</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 10" fill="none">
                  <path d="M2 8 Q75 2 150 6 Q225 10 298 4" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.4"/>
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-body-lg text-text-body max-w-[600px]">
              Giúp bạn <strong className="text-text-primary font-semibold">thu hút khách hàng</strong> và chốt giao dịch mỗi ngày — không cần biết lập trình, không cần thuê agency.
            </p>

            {/* Feature checklist */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 max-w-[500px]">
              {['Kích hoạt trong 30 giây', 'Chuẩn SEO Google Top', 'Quản lý qua CMS dễ dàng', 'Hỗ trợ kỹ thuật 24/7'].map(f => (
                <div key={f} className="flex items-center gap-2.5 text-small text-text-secondary font-medium">
                  <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-blue-600" />
                  </span>
                  {f}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#templates" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white h-12 px-8 rounded-[14px] flex items-center justify-center gap-2 text-[16px] font-semibold transition-all hover:scale-[1.02] shadow-md">
                <Search className="w-4 h-4" />
                Khám phá 16 mẫu website
              </a>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-ghost text-sm flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                Nhận tư vấn miễn phí
              </button>

            </div>

            {/* Stats — animated (HeroStats) */}
            <HeroStats />
          </div>

          {/* RIGHT — 3-device mockup */}
          <div className="relative hidden lg:flex items-center justify-center animate-slide-right h-[520px]">
            {/* Laptop */}
            <div className="absolute top-8 left-0 right-12 animate-float-slow"
              style={{ filter: 'drop-shadow(0 32px 64px rgba(15,23,42,0.18))' }}>
              <div className="bg-[#0F172A] rounded-2xl p-2 pb-0">
                <div className="bg-[#1E293B] rounded-xl p-1.5 pb-0 flex items-center gap-1 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400/80" />
                  <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                  <span className="flex-1 mx-2 bg-[#0F172A] rounded text-[7px] text-slate-500 text-center py-0.5 font-mono">hoanggialand.aireviewbds.com</span>
                </div>
                <div className="rounded-t-xl overflow-hidden aspect-[16/9] bg-slate-900">
                  <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700" alt="Luxury template" className="w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                    <p className="text-white text-[10px] font-bold">The Luxury You Deserve</p>
                    <p className="text-slate-300 text-[8px]">Biệt thự cao cấp từ 15 tỷ</p>
                  </div>
                </div>
              </div>
              {/* Laptop base */}
              <div className="bg-[#0F172A] h-3 rounded-b-lg mx-4 mt-0" />
              <div className="bg-[#1E293B] h-1.5 rounded-full mx-2" />
            </div>

            {/* Mobile */}
            <div className="absolute bottom-4 right-4 w-[110px] animate-float z-20"
              style={{ filter: 'drop-shadow(0 16px 32px rgba(15,23,42,0.25))' }}>
              <div className="bg-[#0F172A] rounded-[20px] p-1.5 border-2 border-slate-700">
                <div className="w-8 h-1 bg-slate-700 rounded-full mx-auto mb-1.5" />
                <div className="rounded-[14px] overflow-hidden aspect-[9/18] bg-slate-900">
                  <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300" alt="Mobile" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Floating trust card */}
            <div className="absolute top-12 right-0 glass rounded-2xl px-4 py-3 z-30 animate-fade-in delay-400"
              style={{ boxShadow:'0 8px 32px rgba(15,23,42,0.12)' }}>
              <div className="flex items-center gap-2.5">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60" alt="" className="w-8 h-8 rounded-full object-cover border border-white" />
                <div>
                  <p className="text-[11px] font-bold text-slate-900">Nguyễn Minh Tuấn</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-1.5 max-w-[150px] leading-snug">&ldquo;Website đẹp, khách hàng liên hệ tăng 3&times;&rdquo;</p>
            </div>

            {/* Activated badge */}
            <div className="absolute bottom-24 left-8 glass rounded-xl px-3 py-2 z-30 animate-fade-in delay-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-700">✅ Vừa kích hoạt bởi Hoàng Gia Land</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. SOCIAL PROOF BAR — Logo marquee (pt 48)
      ════════════════════════════════════════════════════ */}
      <section className="py-12 border-y border-slate-100 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 mb-5 text-center">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.12em]">
            Được tin dùng bởi 500+ doanh nghiệp & môi giới trên toàn quốc
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="marquee-track gap-16 px-8">
            {['Đất Xanh Group', 'Novaland', 'Hưng Thịnh Corp', 'CBRE Vietnam', 'Savills Vietnam', 'Vinhomes', 'Phát Đạt Corp', 'Nam Long Group', 'Sun Group', 'BIM Group', 'Đất Xanh Group', 'Novaland', 'Hưng Thịnh Corp', 'CBRE Vietnam', 'Savills Vietnam', 'Vinhomes', 'Phát Đạt Corp', 'Nam Long Group', 'Sun Group', 'BIM Group'].map((name, i) => (
              <span key={i} className="text-[13px] font-black text-slate-300 uppercase tracking-widest whitespace-nowrap hover:text-slate-500 transition-colors cursor-default">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. TEMPLATES — 60% of page, right after hero
      ════════════════════════════════════════════════════ */}
      <section id="templates" className="pt-24 pb-32 px-5">
        <div className="max-w-[1280px] mx-auto">
          {/* Section header */}
          <div className="text-center mb-14 reveal flex flex-col items-center">
            <span className="text-[12px] uppercase tracking-[0.2em] font-bold text-[#2563EB] mb-3">
              16 Mẫu Website Độc Quyền
            </span>
            <h2 className="text-[52px] font-bold text-text-primary leading-[1.1] tracking-tight mb-5 max-w-[800px]">
              Mỗi template là<br className="sm:hidden" /> <span className="text-[#2563EB]">một sản phẩm riêng</span>
            </h2>
            <p className="text-body-lg text-text-caption max-w-[600px] mx-auto">
              Không phải &ldquo;16 template đổi màu&rdquo; &mdash; mỗi thiết kế phục vụ đúng một phân khúc BĐS khác nhau. Nhìn là biết ngay dành cho mình.
            </p>
          </div>

          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-2 mb-10 reveal">
            {[
              { key: 'ALL', label: 'Tất cả', count: 16 },
              { key: 'BIET_THU', label: 'Biệt thự & Villa', count: 4 },
              { key: 'CHUNG_CU', label: 'Chung cư', count: 3 },
              { key: 'NGHI_DUONG', label: 'Nghỉ dưỡng', count: 2 },
              { key: 'CA_NHAN', label: 'Cá nhân', count: 3 },
              { key: 'KCN_NHA_XUONG', label: 'KCN & Nhà xưởng', count: 1 },
              { key: 'DAT_THUONG_MAI', label: 'Thương mại & Bán lẻ', count: 3 },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-[14px] text-[15px] font-medium transition-all"
                style={{
                  background: selectedCategory === tab.key ? '#2563EB' : 'white',
                  color: selectedCategory === tab.key ? 'white' : '#64748B',
                  border: selectedCategory === tab.key ? '1px solid #2563EB' : '1px solid #E2E8F0',
                }}
              >
                {tab.label}
                <span className="opacity-70 text-[12px] font-semibold">({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTemplates.map((tpl: any, i: number) => (
              <div key={tpl.id} className="reveal" style={{ animationDelay: `${i * 60}ms` }}>
                <ProductCard
                  template={tpl}
                  onSelect={handleSelectTemplate}
                  onOpenDetails={(t) => setActiveDetailsTemplate(t)}
                />
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-semibold">Không tìm thấy mẫu phù hợp</p>
              <button onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }} className="mt-3 text-[#2563EB] text-sm font-bold hover:underline">Xem tất cả</button>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4. TRUST STATS — Animated counters
      ════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-[1280px] mx-auto px-5">
          <TrustStats statsData={statsData} />
          {/* Trust badges */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 reveal">
            {[
              { icon: '🔄', label: 'Hoàn tiền 7 ngày', sub: 'Không hài lòng hoàn 100%' },
              { icon: '🔒', label: 'SSL Miễn phí', sub: 'Chứng chỉ bảo mật tự động' },
              { icon: '💬', label: 'Hỗ trợ 24/7', sub: 'Zalo + Email + Hotline' },
              { icon: '🚀', label: 'Tên miền đi kèm', sub: 'Hoặc dùng domain riêng' },
            ].map(b => (
              <div key={b.label} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#2563EB]/20 hover:shadow-sm transition-all">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <p className="text-[13px] font-700 text-slate-900 font-bold">{b.label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          5. STORY — "Tại sao cần PlatformBDS?" (3 steps)
      ════════════════════════════════════════════════════ */}
      <section className="pt-28 pb-24 px-5">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="section-badge mb-4 inline-flex">Hành trình 3 bước</span>
            <h2 className="text-section-title mt-3 mb-4">
              Từ <span className="text-slate-400 font-normal">0</span> đến website<br />
              <span className="text-[#2563EB]">chuyên nghiệp trong 30 giây</span>
            </h2>
            <p className="text-body max-w-[440px] mx-auto">Không cần thuê agency. Không cần biết code. Không cần đợi hàng tháng.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-[#2563EB]/20 to-transparent" />

            {[
              { step:'01', icon:'🎨', title:'Chọn mẫu phù hợp', desc:'Duyệt 12 mẫu thiết kế chuyên biệt cho từng phân khúc BĐS. Biệt thự, chung cư, resort, hay KCN — đều có sẵn.' },
              { step:'02', icon:'⚡', title:'Kích hoạt tự động', desc:'Điền thông tin công ty, upload logo. Hệ thống tự tạo website, cài CMS, cấu hình SEO và cấp tên miền trong 30 giây.' },
              { step:'03', icon:'📈', title:'Thu hút khách hàng ngay', desc:'Website live ngay ngày đầu tiên. Đăng dự án, quản lý lead, theo dõi traffic — tất cả qua bảng điều khiển đơn giản.' },
            ].map((s, i) => (
              <div key={i} className="relative flex flex-col items-center text-center p-8 reveal" style={{ animationDelay: `${i*120}ms` }}>
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-3xl mb-5 transition-transform hover:scale-110 hover:shadow-lg">
                  {s.icon}
                </div>
                <span className="text-[10px] font-black text-[#2563EB]/40 tracking-[0.2em] uppercase mb-2">Bước {s.step}</span>
                <h3 className="text-[17px] font-700 text-slate-900 mb-3 font-bold">{s.title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed font-normal">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          6. PRICING — Transparent with inclusions
      ════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-24 px-5 bg-[#0F172A] text-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-4">
              💰 Bảng giá bán giải pháp & kết quả
            </span>
            <h2 className="text-[32px] sm:text-[44px] font-bold text-white tracking-tight leading-[1.15] mt-2 mb-3">
              Lựa Chọn Gói Giải Pháp — <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Đột Phá Doanh Số BĐS</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-[620px] mx-auto leading-relaxed font-normal">
              Sở hữu website bất động sản đỉnh cao để thu hút khách hàng tiềm năng, xây dựng thương hiệu uy tín và chốt giao dịch tự động 24/7.
            </p>
          </div>

          {/* 4. PRICING CARDS (Restructured with operation services grouped) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16 max-w-5xl mx-auto reveal">
            {/* LEFT: WEBSITE CHUYÊN NGHIỆP (lg:col-span-5) */}
            <div className="lg:col-span-5 rounded-[24px] bg-white/5 border-2 border-blue-500 p-6 flex flex-col justify-between hover:bg-white/10 transition-all duration-300 relative shadow-lg shadow-blue-500/5">
              <div className="absolute top-3 right-3 bg-blue-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase">🎁 GÓI THIẾT KẾ</div>
              <div>
                <div className="flex items-center justify-between mb-3 mt-1">
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">WEBSITE CHUYÊN NGHIỆP</span>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">499.000đ</span>
                  <span className="text-slate-400 text-xs"> / trọn gói</span>
                </div>
                <p className="text-[12px] text-slate-300 border-b border-white/10 pb-3 mb-4">Thiết kế chuẩn mực, bàn giao nhanh chóng & hướng dẫn vận hành.</p>
                <ul className="space-y-2.5 mb-6 text-xs text-slate-200 font-normal">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-455 shrink-0" /> Thiết kế giao diện theo yêu cầu</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-455 shrink-0" /> Tương thích di động, tablet & PC</li>
                  <li className="flex items-center gap-2 font-bold text-white"><Check className="w-3.5 h-3.5 text-blue-455 shrink-0" /> Chuẩn SEO – Tốc độ tối ưu</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-455 shrink-0" /> Hỗ trợ sửa đổi & bảo hành 30 ngày</li>
                </ul>
              </div>
              <button onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/20">
                Xem mẫu & Thiết kế ngay
              </button>
            </div>

            {/* RIGHT: GROUPED DỊCH VỤ VẬN HÀNH (lg:col-span-7) */}
            <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-[32px] p-6 flex flex-col justify-between hover:bg-white/10 transition-all duration-300">
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5 text-center bg-white/5 rounded-full py-1.5 border border-white/10">
                  ✨ CÁC GÓI DỊCH VỤ VẬN HÀNH & DUY TRÌ WEBSITE (TÙY CHỌN ĐÍNH KÈM)
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 2. BẢO TRÌ WEBSITE */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase">GÓI DỊCH VỤ 01</span>
                      </div>
                      <h4 className="text-sm font-extrabold text-white mb-2">BẢO TRÌ WEBSITE</h4>
                      <div className="mb-4">
                        <span className="text-xl font-bold text-white">299.000đ</span>
                        <span className="text-[9px] text-emerald-450 font-bold">/ tháng</span>
                      </div>
                      <ul className="space-y-2 text-[11px] text-slate-350 font-medium mb-5">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Cập nhật, kiểm tra định kỳ</li>
                        <li className="flex items-center gap-1.5 font-bold text-slate-200"><Check className="w-3.5 h-3.5 text-emerald-500" /> Sao lưu dữ liệu hàng tuần</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Tối ưu tốc độ & bảo mật</li>
                      </ul>
                    </div>
                    <Link href="/pricing" className="w-full h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase tracking-wider rounded flex items-center justify-center gap-1">
                      <span>Đăng ký Bảo trì</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* 3. HOSTING & DOMAIN */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-purple-500/40 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase">GÓI DỊCH VỤ 02</span>
                      </div>
                      <h4 className="text-sm font-extrabold text-white mb-2">HOSTING & DOMAIN</h4>
                      <div className="mb-4">
                        <span className="text-xl font-bold text-white">799.000đ</span>
                        <span className="text-[9px] text-purple-450 font-bold">/ năm</span>
                      </div>
                      <ul className="space-y-2 text-[11px] text-slate-350 font-medium mb-5">
                        <li className="flex items-center gap-1.5 font-bold text-slate-200"><Check className="w-3.5 h-3.5 text-purple-500" /> Hosting tốc độ cao 99.9%</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-500" /> Tên miền riêng thương hiệu</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-500" /> SSL bảo mật HTTPS</li>
                      </ul>
                    </div>
                    <Link href="/pricing" className="w-full h-9 bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] uppercase tracking-wider rounded flex items-center justify-center gap-1">
                      <span>Đăng ký Hạ tầng</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center reveal">
            <Link 
              href="/pricing"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold text-sm hover:bg-blue-50 transition-all shadow-xl shadow-white/10"
            >
              <span>Xem đầy đủ Bảng Giá chi tiết, 10 Cam kết vàng & Dịch vụ nâng cấp</span>
              <ArrowRight className="w-4 h-4 text-[#2563EB]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          7. TESTIMONIAL
      ════════════════════════════════════════════════════ */}
      <section className="py-24 px-5">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14 reveal">
            <span className="section-badge mb-4 inline-flex">💬 Khách hàng nói gì</span>
            <h2 className="text-section-title mt-3">Kết quả thực tế từ người dùng</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
            {[
              { name:'Nguyễn Minh Tuấn', role:'Môi giới cá nhân, Hà Nội', avatar:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', review:'Trước đây tôi không có website, chỉ dùng Zalo và Facebook. Sau khi dùng PlatformBDS, khách hàng từ Google tăng gấp 3 lần chỉ sau 2 tháng.', rating:5 },
              { name:'Trần Thị Hoa', role:'Giám đốc Hoàng Gia Land', avatar:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', review:'Giao diện Luxury Gold rất ăn khớp với phân khúc biệt thự của chúng tôi. Khách VIP nhìn vào website là có cảm giác tin tưởng ngay.', rating:5 },
              { name:'Lê Văn Đức', role:'Trưởng phòng Marketing, Sun Land', avatar:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', review:'Chúng tôi thử nhiều nền tảng nhưng PlatformBDS là duy nhất hỗ trợ đa chi nhánh và có CRM tích hợp sẵn. Tiết kiệm rất nhiều công sức.', rating:5 },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-[13px] text-slate-600 leading-relaxed mb-5 italic">&ldquo;{t.review}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-slate-100" />
                  <div>
                    <p className="text-[13px] font-bold text-slate-900">{t.name}</p>
                    <p className="text-[11px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          8. FAQ
      ════════════════════════════════════════════════════ */}
      <section id="faq" className="pb-24 pt-4 px-5 bg-white border-t border-slate-100">
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-12 reveal">
            <span className="section-badge mb-4 inline-flex">Câu hỏi thường gặp</span>
            <h2 className="text-section-title mt-3">Giải đáp thắc mắc</h2>
          </div>
          <div className="space-y-3 reveal">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden hover:border-[#2563EB]/20 transition-colors">
                <button
                  onClick={() => setOpenFAQIndex(openFAQIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-[14px] font-600 text-slate-900 pr-4 font-semibold">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFAQIndex === idx ? 'rotate-180 text-[#2563EB]' : ''}`} />
                </button>
                {openFAQIndex === idx && (
                  <div className="px-5 pb-5">
                    <p className="text-[13px] text-slate-500 leading-relaxed font-normal">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          9. CTA BANNER — Final conversion
      ════════════════════════════════════════════════════ */}
      <section className="py-20 px-5 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white text-center">
        <div className="max-w-[680px] mx-auto reveal">
          <h2 className="text-[32px] sm:text-[40px] font-extrabold text-white tracking-tight leading-[1.15] mb-4">
            Sẵn sàng sở hữu<br />website BĐS chuyên nghiệp?
          </h2>
          <p className="text-blue-200 text-[15px] mb-8 font-normal">
            Tham gia cùng 500+ môi giới và doanh nghiệp đang phát triển với PlatformBDS.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => {
                if (user) {
                  router.push('/templates?plan=trial');
                } else {
                  router.push('/register');
                }
              }}
              className="h-12 px-8 rounded-xl bg-white text-[#2563EB] font-black text-sm hover:scale-105 transition-transform shadow-lg"
            >
              Dùng thử miễn phí 7 ngày
            </button>
            <a href="#templates" className="h-12 px-8 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors flex items-center">
              Xem mẫu website
            </a>
          </div>
          <p className="text-blue-300 text-[11px] mt-5">Không cần thẻ tín dụng · Hoàn tiền 7 ngày · Hủy bất kỳ lúc nào</p>
        </div>
      </section>

      <Footer />

      {/* ── DETAILS MODAL ── */}
      {activeDetailsTemplate && (
        <DetailsModal
          template={activeDetailsTemplate}
          onClose={() => setActiveDetailsTemplate(null)}
          onSelect={(tpl, type) => { handleSelectTemplate(tpl, type); setActiveDetailsTemplate(null); }}
        />
      )}

      {/* ── ORDER MODAL ── */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={e => e.target === e.currentTarget && setSelectedTemplate(null)}>
          <div className="w-full max-w-[520px] bg-white rounded-2xl p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[17px] font-bold text-slate-900">Đăng ký sử dụng</h3>
                <p className="text-[12px] text-slate-400 mt-0.5">{selectedTemplate.name}</p>
              </div>
              <button onClick={() => setSelectedTemplate(null)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                <ChevronDown className="w-4 h-4 rotate-45" />
              </button>
            </div>
            {!isFixedOrderType ? (
              <div className="flex gap-2 mb-6">
                {(['BUY','RENT'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setOrderType(t)}
                    className="flex-1 py-2.5 rounded-xl text-[12px] font-bold transition-all"
                    style={{ background: orderType === t ? '#2563EB' : '#F1F5F9', color: orderType === t ? 'white' : '#64748B' }}
                  >
                    {t === 'BUY' ? 'Mua mã nguồn' : 'Thuê SaaS theo tháng'}
                  </button>
                ))}
              </div>
            ) : (
              <div className="mb-6 flex items-center justify-center p-3 rounded-xl bg-blue-50 border border-blue-100">
                <span className="text-sm font-semibold text-blue-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Bạn đã chọn hình thức: {orderType === 'BUY' ? 'Mua đứt mã nguồn' : 'Thuê SaaS theo tháng'}
                </span>
              </div>
            )}
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              {[
                { label:'Họ & tên', value:fullName, setter:setFullName, type:'text', placeholder:'Nguyễn Văn A', icon:<User className="w-3.5 h-3.5 text-slate-400" /> },
                { label:'Email', value:email, setter:setEmail, type:'email', placeholder:'email@example.com', icon:<Mail className="w-3.5 h-3.5 text-slate-400" /> },
                { label:'Số điện thoại', value:phone, setter:setPhone, type:'tel', placeholder:'0919006030', icon:<Phone className="w-3.5 h-3.5 text-slate-400" /> },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">{f.label}</label>
                  <div className="relative">
                    <input type={f.type} value={f.value} onChange={e => f.setter(e.target.value)} placeholder={f.placeholder} required
                      className="w-full h-11 rounded-xl border border-slate-200 pl-9 pr-4 text-[13px] font-medium focus:border-[#2563EB] focus:outline-none transition-colors" />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">{f.icon}</span>
                  </div>
                </div>
              ))}
              {orderType === 'RENT' && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Tên subdomain mong muốn</label>
                  <div className="relative flex items-center border border-slate-200 rounded-xl overflow-hidden">
                    <input type="text" value={subdomain} onChange={e => setSubdomain(e.target.value)} placeholder="your-brand" required
                      className="flex-1 h-11 pl-3 pr-2 text-[13px] font-medium focus:outline-none" />
                    <span className="bg-slate-50 border-l border-slate-200 h-11 flex items-center px-3 text-[12px] text-slate-400 font-medium shrink-0">.aireviewbds.com</span>
                  </div>
                </div>
              )}
              <button type="submit" disabled={createOrderMutation.isPending}
                className="w-full h-11 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm rounded-xl transition-colors shadow-md mt-2 disabled:opacity-70">
                {createOrderMutation.isPending ? 'Đang xử lý...' : 'Xác nhận đăng ký'}
              </button>
            </form>
          </div>
        </div>
      )}


    </div>
  );
}

interface TrustStatsProps {
  statsData: {
    totalCustomers: number;
    totalWebsitesCreated: number;
    totalTemplates: number;
    averageRating: number;
  };
}

// ── Animated Trust Stats ────────────────────────────────
function TrustStats({ statsData }: TrustStatsProps) {
  const [started, setStarted] = useState(false);
  const [v1, setV1] = useState(0);
  const [v2, setV2] = useState(0);
  const [v3, setV3] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const run = (target: number, setter: (n: number) => void, dur = 1400) => {
      if (target <= 0) {
        setter(0);
        return;
      }
      let cur = 0; const step = target / (dur / 16);
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) { setter(target); clearInterval(t); }
        else setter(Math.floor(cur));
      }, 16);
      return t;
    };
    const t1 = run(statsData.totalCustomers, setV1);
    const t2 = run(statsData.totalWebsitesCreated, setV2);
    const t3 = run(statsData.totalCustomers > 0 ? 98 : 0, setV3);
    return () => { 
      if (t1) clearInterval(t1); 
      if (t2) clearInterval(t2); 
      if (t3) clearInterval(t3); 
    };
  }, [started, statsData.totalCustomers, statsData.totalWebsitesCreated]);

  const stats = [
    { value: started ? `${v1}+` : '—', label: 'Khách hàng tin tưởng', sub: 'Môi giới & Doanh nghiệp' },
    { value: started ? `${v2 >= 1000 ? '1.2K' : v2}+` : '—', label: 'Website đã tạo', sub: 'Trên toàn quốc' },
    { value: started ? `${v3}%` : '—', label: 'Tỷ lệ gia hạn', sub: 'Khách hàng hài lòng' },
    { value: statsData.averageRating > 0 ? `${statsData.averageRating}★` : '—', label: 'Đánh giá trung bình', sub: 'Trên Google & Zalo' },
  ];

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div key={i} className="text-center reveal" style={{ animationDelay: `${i * 80}ms` }}>
          <div className="text-4xl font-black text-[#2563EB] tabular-nums mb-1">{s.value}</div>
          <div className="text-[14px] font-600 text-slate-800 font-semibold">{s.label}</div>
          <div className="text-[11px] text-slate-400 font-normal mt-0.5">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}

function XIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

