import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { Phone, Search, ShoppingCart, User, Menu, X, Gift, LogOut, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onOpenConsultation?: () => void;
  onOpenAuth?: () => void;
}

export default function Header({ onSearch, onOpenConsultation, onOpenAuth }: HeaderProps) {
  const { user, openAuthModal, logout, orders, cart } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours countdown in seconds
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
  const path = router.pathname;
  const asPath = router.asPath;

  const navLinks = [
    { label: 'Trang chủ', href: '/', exact: true },
    { label: 'Mẫu Website', href: '/templates', anchor: '#templates' },
    { label: 'Bảng giá', href: '/pricing', exact: false },
    { label: 'Hướng dẫn', href: '/guides/cms', exact: false },
    { label: 'Vì sao chọn', href: '/why-choose', anchor: '#whychoose' },
    { label: 'Liên hệ', href: '/contact', anchor: '#footer' },
  ];

  const isLinkActive = (item: typeof navLinks[0]) => {
    if (item.exact) {
      return path === '/' && !asPath.includes('#');
    }
    if (path.startsWith(item.href)) {
      return true;
    }
    if (item.anchor && (asPath.includes(item.anchor) || (path === '/' && asPath.includes(item.anchor)))) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 7200));
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="w-full z-40 bg-white">
      {/* 1. TOP BAR (Height: 36px) */}
      <div className="w-full bg-[#0F172A] text-white h-[36px] flex items-center px-6 border-b border-slate-800 text-xs">
        <div className="max-w-[1440px] w-full mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#C5A572] tracking-wider">REAL ESTATE TEMPLATE</span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">Sàn giao dịch website BĐS số 1 Việt Nam</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="tel:0919006030" className="flex items-center gap-1.5 hover:text-[#C5A572] transition-colors font-bold font-mono">
              <Phone className="w-3 h-3 text-[#C5A572]" />
              <span>0919 006 030</span>
            </a>
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/customer/dashboard" className="flex items-center gap-1.5 hover:text-[#C5A572] transition-colors font-bold text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded-full border border-slate-200">
                  <User className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span className="max-w-[110px] truncate text-slate-800 font-semibold">{user.fullName || 'Tài khoản VIP'}</span>
                </Link>
                <button
                  onClick={() => logout()}
                  title="Đăng xuất"
                  className="text-slate-400 hover:text-red-500 transition-colors p-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-1.5 hover:text-[#2563EB] transition-colors font-bold text-slate-700 bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200 shadow-sm hover:shadow"
              >
                <User className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Đăng ký / Đăng nhập</span>
              </button>
            )}
            <Link href="/cart" className="relative flex items-center gap-1 hover:text-[#C5A572] transition-colors font-bold" title="Giỏ hàng">
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="absolute -top-2 -right-2 bg-[#2563EB] text-[9px] text-white rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                {cart?.length || 0}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION (Sticky component) */}
      <div className={`w-full bg-white border-b border-slate-100 z-30 transition-all duration-300 ${
        isSticky ? 'fixed top-0 left-0 right-0 shadow-md py-3' : 'py-5'
      }`}>
        <div className="max-w-[1440px] mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-black tracking-widest text-[#0F172A] font-sans">
              PLATFORM<span className="text-[#2563EB]">BDS</span>
            </span>
          </Link>

          {/* Desktop Search Center */}
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-[200px] xl:max-w-[280px] mx-4 hidden md:block">
            <input
              type="text"
              placeholder="Tìm kiếm mẫu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-4 pr-8 py-1.5 text-xs focus:outline-none focus:border-[#2563EB]"
            />
            <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#2563EB]">
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-2 text-body font-medium text-text-secondary whitespace-nowrap">
            {navLinks.map((item) => {
              const active = isLinkActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-all duration-200 py-2 px-4 rounded-[14px] ${
                    active
                      ? 'text-primary font-semibold bg-[#C5A572]/10 shadow-sm'
                      : 'hover:text-primary hover:font-semibold hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block shrink-0">
            <button
              onClick={onOpenConsultation}
              className="rounded-[14px] bg-[#0F172A] hover:bg-[#1E293B] text-white px-6 py-[14px] text-button transition-all duration-200 whitespace-nowrap shadow hover:shadow-md hover:scale-[1.02]"
            >
              Tư vấn miễn phí
            </button>
          </div>

          {/* Mobile Hamburguer */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-[#0F172A] focus:outline-none">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Adjust height spacer when sticky */}
      {isSticky && <div className="h-[68px]"></div>}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-white border-b border-slate-100 px-6 py-4 flex flex-col gap-2 text-body font-medium text-text-primary">
          {navLinks.map((item) => {
            const active = isLinkActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 px-4 rounded-[14px] transition-all ${
                  active
                    ? 'text-primary font-semibold bg-[#C5A572]/10'
                    : 'text-text-secondary hover:text-primary hover:font-semibold hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation();
            }}
            className="w-full py-3 bg-[#2563EB] text-white rounded-xl text-center font-bold shadow-md shadow-blue-500/20 mt-2"
          >
            Tư vấn miễn phí
          </button>
        </div>
      )}

      {/* 3. PROMOTION BAR (Gold style) */}
      <div className="w-full bg-gradient-to-r from-amber-500 via-[#C5A572] to-amber-600 text-white py-2 px-6 shadow-inner">
        <div className="max-w-[1440px] w-full mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-bold">
          <div className="flex items-center gap-2 overflow-hidden w-full sm:w-auto">
            <Gift className="w-4 h-4 shrink-0 animate-bounce" />
            <div className="whitespace-nowrap overflow-hidden">
              <span className="inline-block animate-pulse">
                Khuyến mãi đặc biệt: Giảm 20% các mẫu website trong hôm nay.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span>Thời gian còn lại:</span>
            <span className="bg-[#0F172A] px-2 py-0.5 rounded text-white font-mono shadow">
              {formatTime(timeLeft)}
            </span>
            <button
              onClick={onOpenConsultation}
              className="bg-white text-[#0F172A] px-3 py-1 rounded-lg hover:bg-slate-50 transition-colors text-[10px] font-extrabold uppercase tracking-wider"
            >
              Nhận ưu đãi
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
