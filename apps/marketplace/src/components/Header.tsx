import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { 
  Phone, Search, ShoppingCart, User, Menu, X, Gift, LogOut, 
  LayoutDashboard, ArrowRight, ChevronDown, ShoppingBag, Download, 
  Settings, Globe, Shield 
} from 'lucide-react';
import { ALL_TEMPLATES, Template } from '../data/templatesData';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onOpenConsultation?: () => void;
  onOpenAuth?: () => void;
}

// Function to highlight matched search terms
const highlightMatch = (text: string, query: string) => {
  if (!query || !query.trim() || !text) return text;
  const escapedQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-amber-300 text-slate-950 font-bold px-0.5 rounded-[2px]"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

export default function Header({ onSearch, onOpenConsultation, onOpenAuth }: HeaderProps) {
  const { user, openAuthModal, logout, orders, cart } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours countdown in seconds
  const [isSticky, setIsSticky] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const path = router.pathname;
  const asPath = router.asPath;

  const navLinks = [
    { label: 'Trang chủ', href: '/', exact: true },
    { label: 'Mẫu Website', href: '/templates', anchor: '#templates' },
    { label: 'Bảng giá', href: '/pricing', exact: false },
    { label: 'Hướng dẫn CMS', href: '/guides/cms', exact: false },
    { label: 'Hosting', href: '/guides/hosting', exact: false },
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

  // Real-time live search filter
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return ALL_TEMPLATES.filter((tpl) => {
      const nameMatch = tpl.name.toLowerCase().includes(q);
      const slugMatch = tpl.slug.toLowerCase().includes(q);
      const collectionMatch = (tpl.collectionName || '').toLowerCase().includes(q);
      const descMatch = (tpl.shortDescription || tpl.description || '').toLowerCase().includes(q);
      const badgeMatch = (tpl.badge || '').toLowerCase().includes(q);
      return nameMatch || slugMatch || collectionMatch || descMatch || badgeMatch;
    }).slice(0, 6);
  }, [searchQuery]);

  // Click outside to close search popover and user dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      router.push(`/templates?search=${encodeURIComponent(searchQuery.trim())}`);
      onSearch?.(searchQuery);
    }
  };

  return (
    <header className="w-full z-40 bg-white">
      {/* 1. TOP BAR */}
      <div className="w-full bg-[#0F172A] text-white min-h-[38px] py-1.5 flex items-center px-3 sm:px-6 border-b border-slate-800 text-xs">
        <div className="max-w-[1440px] w-full mx-auto flex justify-between items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-extrabold text-[#C5A572] tracking-wider text-[11px] sm:text-xs uppercase whitespace-nowrap">TEMPLATES BĐS</span>
            <span className="text-slate-500 hidden md:inline">|</span>
            <span className="text-slate-400 hidden md:inline">Kho mẫu website Bất Động Sản cao cấp</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-2">
              <a href="tel:0919006030" className="flex items-center gap-1 hover:text-[#C5A572] transition-colors font-bold font-mono text-slate-300 text-xs whitespace-nowrap">
                <Phone className="w-3.5 h-3.5 text-[#C5A572]" />
                <span>0919 006 030</span>
              </a>
              <span className="text-slate-600 hidden lg:inline">•</span>
              <a href="tel:0983312219" className="hidden lg:flex items-center gap-1 hover:text-[#C5A572] transition-colors font-bold font-mono text-slate-300 text-xs whitespace-nowrap">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>0983 312 219</span>
              </a>
            </div>
            {user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700/80 rounded-full px-2.5 sm:px-3 py-1 text-xs transition-all font-semibold text-slate-100 shadow-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                    {(user.fullName || user.email || 'U').slice(0, 1).toUpperCase()}
                  </div>
                  <span className="truncate max-w-[100px] xs:max-w-[140px] sm:max-w-[200px] text-[11px] sm:text-xs">{user.fullName || user.email}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Interactive User Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 text-slate-800 animate-fadeIn">
                    {/* User Header */}
                    <div className="p-4 bg-slate-50 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.fullName || 'Khách Hàng'}</p>
                      <p className="text-[11px] text-slate-500 font-mono truncate mt-0.5">{user.email}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-700">
                          {user.role === 'SUPER_ADMIN' ? 'SUPER ADMIN' : 'TÀI KHOẢN KHÁCH HÀNG'}
                        </span>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 space-y-1 text-xs font-semibold">
                      <Link
                        href="/customer/dashboard?tab=orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4 text-blue-600" />
                        <span>Đơn hàng của tôi</span>
                      </Link>

                      <Link
                        href="/customer/dashboard?tab=settings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors"
                      >
                        <User className="w-4 h-4 text-emerald-600" />
                        <span>Thông tin cá nhân & Mật khẩu</span>
                      </Link>

                      <Link
                        href="/customer/dashboard?tab=downloads"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors"
                      >
                        <Download className="w-4 h-4 text-amber-600" />
                        <span>Kho tải Source Code (ZIP)</span>
                      </Link>

                      <div className="border-t border-slate-100 my-1"></div>

                      {user.role === 'SUPER_ADMIN' ? (
                        <a
                          href={process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.aireviewbds.com'}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors font-bold"
                        >
                          <Shield className="w-4 h-4 text-purple-600" />
                          <span>Trang Quản Trị Super Admin</span>
                        </a>
                      ) : (
                        <a
                          href={process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors font-bold"
                        >
                          <LayoutDashboard className="w-4 h-4 text-blue-600" />
                          <span>Vào Quản Trị Website CMS</span>
                        </a>
                      )}

                      <div className="border-t border-slate-100 my-1"></div>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 hover:text-white hover:bg-blue-600 transition-all font-bold text-slate-700 bg-slate-100/95 px-2.5 sm:px-3 py-1 rounded-full border border-slate-200 shadow-xs hover:shadow text-[11px] sm:text-xs shrink-0 whitespace-nowrap"
              >
                <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2563EB]" />
                <span className="hidden sm:inline">Đăng Nhập Khách Hàng</span>
                <span className="sm:hidden font-bold">Đăng nhập</span>
              </Link>
            )}
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-slate-800/80 hover:bg-blue-600/30 border border-slate-700 text-white transition-all font-bold group shrink-0"
              title="Xem giỏ hàng"
            >
              <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400 group-hover:text-white transition-colors" />
              <span className="text-xs font-semibold hidden sm:inline">Giỏ hàng</span>
              {cart && cart.length > 0 ? (
                <span className="bg-[#2563EB] text-white text-[10px] font-black rounded-full h-4 min-w-[16px] px-1.5 flex items-center justify-center shadow-sm animate-pulse">
                  {cart.length}
                </span>
              ) : (
                <span className="bg-slate-700 text-slate-400 text-[9px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
                  0
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION (Sticky component) */}
      <div className={`w-full bg-white border-b border-slate-100 z-30 transition-all duration-300 ${
        isSticky ? 'fixed top-0 left-0 right-0 shadow-md py-2.5' : 'py-3.5'
      }`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <span className="text-xl md:text-2xl font-black tracking-wider text-[#0F172A] font-sans flex items-center gap-1">
              TEMPLATES<span className="text-[#2563EB]">BDS</span>
            </span>
          </Link>

          {/* Desktop Search Center with Real-time Live Dropdown */}
          <div ref={searchRef} className="relative w-full max-w-[200px] xl:max-w-[280px] hidden md:block shrink-0">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm mẫu website..."
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-md pl-3 pr-8 py-1.5 text-xs focus:outline-none focus:border-slate-900 focus:bg-white transition-all font-medium text-slate-900 placeholder-slate-400"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchFocused(false);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                  <Search className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Real-time Results Dropdown with Highlighting */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 top-full mt-2 w-[340px] sm:w-[390px] bg-white border border-slate-200 rounded-lg shadow-2xl overflow-hidden z-50 animate-fadeIn">
                <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <span>Gợi ý mẫu website ({searchResults.length})</span>
                  <span className="text-[10px] text-blue-600 font-normal lowercase">real-time</span>
                </div>

                <div className="max-h-[340px] overflow-y-auto divide-y divide-slate-100">
                  {searchResults.length > 0 ? (
                    searchResults.map((tpl) => (
                      <Link
                        key={tpl.id}
                        href={`/demo/${tpl.slug}`}
                        onClick={() => {
                          setIsSearchFocused(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 p-3 hover:bg-blue-50/70 transition-colors group"
                      >
                        <div className="w-12 h-10 rounded bg-slate-100 overflow-hidden shrink-0 border border-slate-200 shadow-xs">
                          <img
                            src={tpl.thumbnail}
                            alt={tpl.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-xs text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                              {highlightMatch(tpl.name, searchQuery)}
                            </span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                              {highlightMatch(tpl.collectionName, searchQuery)}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5 font-normal">
                            {highlightMatch(tpl.shortDescription || tpl.description, searchQuery)}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs font-black text-blue-600 font-mono">
                              {tpl.priceBuy ? `${tpl.priceBuy.toLocaleString('vi-VN')}đ` : '499.000đ'}
                            </span>
                            <span className="text-[10px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                              Xem demo <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-5 text-center text-xs text-slate-500">
                      <p className="font-medium text-slate-700">Không tìm thấy mẫu phù hợp với "{searchQuery}"</p>
                      <Link
                        href="/templates"
                        onClick={() => setIsSearchFocused(false)}
                        className="inline-block mt-2 font-bold text-blue-600 hover:underline"
                      >
                        Xem tất cả {ALL_TEMPLATES.length} mẫu website →
                      </Link>
                    </div>
                  )}
                </div>

                {searchResults.length > 0 && (
                  <Link
                    href={`/templates?search=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setIsSearchFocused(false)}
                    className="block p-2.5 bg-slate-50 hover:bg-slate-100 text-center text-xs font-bold text-blue-600 border-t border-slate-100 transition-colors"
                  >
                    Xem tất cả kết quả cho "{searchQuery}" →
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600 whitespace-nowrap">
            {navLinks.map((item) => {
              const active = isLinkActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-all duration-200 py-1.5 px-3 rounded-md text-xs xl:text-sm ${
                    active
                      ? 'text-blue-600 font-bold bg-blue-50/80 shadow-xs'
                      : 'hover:text-blue-600 hover:bg-slate-50 font-medium'
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
              onClick={onOpenConsultation || (() => router.push('/contact'))}
              className="rounded-md bg-slate-900 hover:bg-slate-800 text-white px-4 xl:px-5 py-2 text-xs font-bold transition-all duration-200 whitespace-nowrap shadow-sm"
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
        <div className="lg:hidden w-full bg-white border-b border-slate-100 px-6 py-4 flex flex-col gap-3 text-body font-medium text-slate-800 animate-fadeIn">
          {/* Mobile Search Box */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Tìm kiếm mẫu website..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md pl-3 pr-8 py-2 text-xs focus:outline-none focus:border-slate-900 font-medium"
            />
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Mobile real-time search results with Highlighting */}
          {searchQuery.trim().length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-md p-2 max-h-48 overflow-y-auto space-y-1">
              {searchResults.length > 0 ? (
                searchResults.map((tpl) => (
                  <Link
                    key={tpl.id}
                    href={`/demo/${tpl.slug}`}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-2 p-2 hover:bg-white rounded transition-colors text-xs font-semibold text-slate-900"
                  >
                    <img src={tpl.thumbnail} alt={tpl.name} className="w-8 h-6 object-cover rounded shrink-0" />
                    <span className="truncate">{highlightMatch(tpl.name, searchQuery)}</span>
                    <span className="ml-auto text-[10px] text-blue-600 font-bold shrink-0">{tpl.priceBuy ? `${tpl.priceBuy.toLocaleString('vi-VN')}đ` : ''}</span>
                  </Link>
                ))
              ) : (
                <p className="text-xs text-slate-500 p-2 text-center">Không tìm thấy mẫu phù hợp</p>
              )}
            </div>
          )}

          {navLinks.map((item) => {
            const active = isLinkActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-md transition-all text-xs font-semibold ${
                  active
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* User Section in Mobile Drawer */}
          {user ? (
            <div className="border-t border-slate-200 pt-3 mt-1 space-y-1">
              <div className="px-3 py-2 bg-slate-50 rounded-xl mb-2">
                <p className="text-xs font-bold text-slate-900">{user.fullName || 'Khách Hàng'}</p>
                <p className="text-[10px] text-slate-500 font-mono">{user.email}</p>
              </div>

              <Link
                href="/customer/dashboard?tab=orders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 px-3 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <ShoppingBag className="w-4 h-4 text-blue-600" />
                <span>Đơn hàng của tôi</span>
              </Link>

              <Link
                href="/customer/dashboard?tab=settings"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 px-3 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <User className="w-4 h-4 text-emerald-600" />
                <span>Thông tin cá nhân & Mật khẩu</span>
              </Link>

              <Link
                href="/customer/dashboard?tab=downloads"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 px-3 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Download className="w-4 h-4 text-amber-600" />
                <span>Kho tải Source Code (ZIP)</span>
              </Link>

              <a
                href={user.role === 'SUPER_ADMIN' ? (process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.aireviewbds.com') : (process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com')}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 py-2 px-3 rounded-md text-xs font-bold text-indigo-700 bg-indigo-50"
              >
                <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                <span>{user.role === 'SUPER_ADMIN' ? 'Vào Super Admin' : 'Vào Quản Trị Website CMS'}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-2 py-2 px-3 rounded-md text-xs font-semibold text-rose-600 hover:bg-rose-50 text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Đăng xuất</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-md text-xs font-bold text-white bg-blue-600 text-center mt-2 shadow-sm"
            >
              <User className="w-4 h-4" />
              <span>Đăng Nhập CMS</span>
            </Link>
          )}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              router.push('/contact');
            }}
            className="w-full py-2.5 bg-slate-900 text-white rounded-md text-center font-bold text-xs shadow-sm mt-1"
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
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="inline-block animate-pulse text-[11px] sm:text-xs">
                Khuyến mãi đặc biệt: Giảm 50% chỉ từ 399.000đ/mẫu (Giá gốc 799.000đ) trong hôm nay.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span>Thời gian còn lại:</span>
            <span className="bg-[#0F172A] px-2 py-0.5 rounded text-white font-mono shadow">
              {formatTime(timeLeft)}
            </span>
            <button
              onClick={() => router.push('/contact')}
              className="bg-white text-[#0F172A] px-3 py-1 rounded-md hover:bg-slate-50 transition-colors text-[10px] font-extrabold uppercase tracking-wider"
            >
              Nhận ưu đãi
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

