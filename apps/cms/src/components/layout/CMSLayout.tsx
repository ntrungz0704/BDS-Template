/**
 * CMSLayout — Primary layout for all CMS dashboard pages
 *
 * Features:
 *   - Premium dark sidebar with brand gradient
 *   - Collapsible sidebar (mobile responsive)
 *   - Breadcrumb navigation
 *   - Global notification bell
 *   - User avatar + logout
 *   - Active page highlighting
 */

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TrialStatusBar from '../TrialStatusBar';
import {
  LayoutDashboard,
  Building2,
  FileText,
  Image,
  Menu as MenuIcon,
  Palette,
  Globe,
  Settings,
  Phone,
  Search,
  BarChart3,
  Users,
  ChevronLeft,
  ChevronRight,
  Bell,
  LogOut,
  ExternalLink,
  Layers,
  PanelLeft,
  HelpCircle,
  Zap,
  ChevronDown,
  KanbanSquare,
  Store,
  Plus,
  ShoppingBag,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  badgeColor?: string;
  children?: NavItem[];
  dividerBefore?: boolean;
}

interface CMSLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

// ─── Navigation Config ────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Tổng Quan',
    href: '/',
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    label: 'Giao Diện',
    href: '/theme',
    icon: <Palette className="w-4 h-4" />,
    dividerBefore: true,
  },
  {
    label: 'Trang & Bố Cục',
    href: '/pages',
    icon: <Layers className="w-4 h-4" />,
  },
  {
    label: 'Dự Án BĐS',
    href: '/projects',
    icon: <Building2 className="w-4 h-4" />,
  },
  {
    label: 'Tin Tức / Blog',
    href: '/posts',
    icon: <FileText className="w-4 h-4" />,
  },
  {
    label: 'Thư Viện Ảnh',
    href: '/media',
    icon: <Image className="w-4 h-4" />,
  },
  {
    label: 'Khách Hàng (Leads)',
    href: '/leads',
    icon: <Users className="w-4 h-4" />,
    dividerBefore: true,
  },
  {
    label: 'Cấu Hình SEO',
    href: '/seo',
    icon: <Search className="w-4 h-4" />,
  },
  {
    label: 'Domain & Link',
    href: '/domain',
    icon: <Globe className="w-4 h-4" />,
    dividerBefore: true,
  },
  {
    label: 'Cài Đặt',
    href: '/settings',
    icon: <Settings className="w-4 h-4" />,
  },
];

// ─── Sidebar NavItem Component ────────────────────────────────────────────────

function SidebarNavItem({
  item,
  collapsed,
  isActive,
}: {
  item: NavItem;
  collapsed: boolean;
  isActive: boolean;
}) {
  const isExternal = item.href.startsWith('http');

  return (
    <>
      {item.dividerBefore && (
        <div className={`mx-3 my-2 border-t border-white/10 ${collapsed ? 'mx-2' : ''}`} />
      )}
      {isExternal ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={collapsed ? item.label : undefined}
          className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all duration-150 mx-2 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 ${
            collapsed ? 'justify-center px-2' : ''
          }`}
        >
          <span className="shrink-0 text-amber-400">{item.icon}</span>
          {!collapsed && <span className="truncate flex-1">{item.label}</span>}
          {!collapsed && <ExternalLink className="w-3 h-3 text-amber-400/60" />}
        </a>
      ) : (
        <Link
          href={item.href}
          title={collapsed ? item.label : undefined}
          className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 mx-2 ${
            isActive
              ? 'bg-white/15 text-white shadow-md shadow-black/20'
              : 'text-white/60 hover:text-white hover:bg-white/10'
          } ${collapsed ? 'justify-center px-2' : ''}`}
        >
          <span className={`shrink-0 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
            {item.icon}
          </span>
          {!collapsed && (
            <span className="truncate flex-1">{item.label}</span>
          )}
          {!collapsed && item.badge && (
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor || 'bg-blue-500 text-white'}`}
            >
              {item.badge}
            </span>
          )}
        </Link>
      )}
    </>
  );
}

// ─── Main Layout Component ────────────────────────────────────────────────────

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';

export default function CMSLayout({ children, title, breadcrumbs }: CMSLayoutProps) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [userInfo, setUserInfo] = useState<{ fullName: string; email: string; role: string } | null>(null);
  const [switcherOpen, setSwitcherOpen] = useState(false);

  // ── Auth Guard: xác minh session ──────────────────────────────────────────
  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('platformbds_token');
      const isLoggedInCookie = document.cookie.includes('is_logged_in=true');
      if (!isLoggedInCookie && !token) {
        router.replace('/login');
        return;
      }
      try {
        const headers: Record<string, string> = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        const res = await axios.get(`${API_URL}/api/auth/me`, {
          headers,
          withCredentials: true,
          timeout: 5000,
        });
        const user = res.data?.data?.user;
        if (!user) {
          router.replace('/login');
          return;
        }
        // Cho phép các role hợp lệ vào CMS
        const allowedRoles = ['TENANT_OWNER', 'EDITOR', 'STAFF', 'SUPER_ADMIN', 'ADMIN', 'CUSTOMER', 'CUSTOMER_OWNER', 'USER'];
        if (!allowedRoles.includes(user.role)) {
          router.replace('/login');
          return;
        }
        setUserInfo({ fullName: user.fullName, email: user.email, role: user.role });
        setAuthChecked(true);
      } catch {
        router.replace('/login');
      }
    };
    verifySession();
  }, []);

  // ── Fetch Domain / Subdomain Config ─────────────────────────────────────────
  const { data: domainData } = useQuery({
    queryKey: ['cms_layout_domain'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/builder/domain`, { withCredentials: true });
      return res.data?.data;
    },
    enabled: authChecked,
    retry: false,
  });

  // ── Fetch Company Info ──────────────────────────────────────────────────
  const { data: companyInfo } = useQuery({
    queryKey: ['cms_layout_company'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/builder/company-info`, { withCredentials: true });
      return res.data?.data;
    },
    enabled: authChecked,
    retry: false,
  });

  // ── Fetch User's Tenants list ──────────────────────────────────────────────
  const { data: userTenants } = useQuery({
    queryKey: ['cms_user_tenants'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/auth/tenants`, { withCredentials: true });
      return res.data?.data || [];
    },
    enabled: authChecked,
    retry: false,
  });

  const queryClient = useQueryClient();
  const switchMutation = useMutation({
    mutationFn: async (tenantId: string) => {
      const res = await axios.post(`${API_URL}/api/auth/switch-tenant`, { tenantId }, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.clear();
      window.location.reload();
    },
  });

  const activeTenant = userTenants?.find((t: any) => t.id === domainData?.tenantId) || userTenants?.[0];
  const tenantSlug = domainData?.subdomain || activeTenant?.slug || 'hoanggialand';
  const tenantName = companyInfo?.name || activeTenant?.name || 'Hoàng Gia Land';
  const PLATFORM_DOMAIN = process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'aireviewbds.com';

  const buildPublicUrl = () => {
    if (!tenantSlug) return `https://bds-template-website.aireviewbds.com/?tenant=hoanggialand`;
    if (domainData?.customDomain && domainData?.dnsVerified && domainData?.sslStatus === 'ACTIVE') {
      return `https://${domainData.customDomain}`;
    }
    return `https://bds-template-website.aireviewbds.com/?tenant=${tenantSlug}`;
  };

  const websiteUrl = buildPublicUrl();

  const isActive = useCallback(
    (href: string) => {
      if (href === '/') return router.pathname === '/';
      return router.pathname.startsWith(href);
    },
    [router.pathname]
  );

  const sidebarWidth = collapsed ? 'w-[60px]' : 'w-[240px]';

  // Hiển thị màn hình loading trong khi kiểm tra auth
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium">Đang xác thực phiên làm việc...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ── Mobile Overlay ──────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────────── */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-all duration-200 ease-in-out bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 shadow-2xl ${sidebarWidth} ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo / Brand */}
        <div className={`flex items-center gap-3 px-4 py-4 border-b border-white/10 min-h-[60px] ${collapsed ? 'justify-center px-2' : ''}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-md">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-sm font-black text-white tracking-tight">TEMPLATES BDS</div>
              <div className="text-[10px] text-white/40 font-medium uppercase tracking-wider">Website của tôi</div>
            </div>
          )}
        </div>

        {/* Tenant Switcher (Multi-site support) */}
        {!collapsed && (
          <div className="mx-3 mt-3 mb-1 p-2 rounded-xl bg-white/5 border border-white/10 flex flex-col relative">
            <div 
              className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded-lg transition-colors"
              onClick={() => setSwitcherOpen(!switcherOpen)}
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[11px] font-black shrink-0 shadow-xs">
                {tenantName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white truncate">{tenantName}</span>
                  {userTenants && userTenants.length > 1 && (
                    <span className="text-[9px] bg-blue-500/20 text-blue-300 font-extrabold px-1.5 py-0.2 rounded-full border border-blue-500/30">
                      {userTenants.length} web
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-white/40 truncate">
                  {domainData?.customDomain || `${tenantSlug}.${PLATFORM_DOMAIN}`}
                </div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-white/40 shrink-0 transition-transform ${switcherOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown list of tenants */}
            {switcherOpen && userTenants && userTenants.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-800/95 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden py-1 max-h-56 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden animate-fadeIn">
                <div className="px-3 py-1.5 text-[9px] font-bold text-white/40 uppercase tracking-wider flex items-center justify-between border-b border-white/5">
                  <span>Chuyển Website ({userTenants.length})</span>
                  <span className="text-[9px] text-emerald-400 font-normal">Đang sở hữu</span>
                </div>
                {userTenants.map((t: any) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setSwitcherOpen(false);
                      if (t.id !== domainData?.tenantId) {
                        switchMutation.mutate(t.id);
                      }
                    }}
                    className={`px-3 py-2 text-xs font-medium cursor-pointer flex items-center justify-between transition-colors ${
                      t.id === domainData?.tenantId
                        ? 'bg-blue-600/30 text-blue-200 border-l-2 border-blue-500'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold">{t.name}</div>
                      <div className="text-[10px] text-white/40 truncate">{t.slug}.aireviewbds.com</div>
                    </div>
                    {t.id === domainData?.tenantId && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 ml-2 animate-pulse" />
                    )}
                  </div>
                ))}

                <a
                  href={`${process.env.NEXT_PUBLIC_MARKETPLACE_URL || 'https://templates.aireviewbds.com'}/templates`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-xs font-bold text-amber-400 hover:bg-amber-500/15 border-t border-slate-700/80 flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Mua / Tạo Website Mới</span>
                </a>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-2 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.href}
              item={item}
              collapsed={collapsed}
              isActive={isActive(item.href)}
            />
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-white/10 p-2 space-y-1">
          <a
            href={process.env.NEXT_PUBLIC_MARKETPLACE_URL || 'https://templates.aireviewbds.com'}
            target="_blank"
            rel="noopener noreferrer"
            title={collapsed ? 'Sàn Giao Diện' : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-bold text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 transition-all ${collapsed ? 'justify-center px-2' : ''}`}
          >
            <Store className="w-3.5 h-3.5 shrink-0 text-amber-400" />
            {!collapsed && <span>Sàn Giao Diện (Marketplace)</span>}
          </a>

          <Link
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={collapsed ? 'Xem Website' : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-white/50 hover:text-white hover:bg-white/10 transition-all ${collapsed ? 'justify-center px-2' : ''}`}
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            {!collapsed && <span>Xem Website</span>}
          </Link>

          <Link
            href="/support"
            title={collapsed ? 'Hỗ trợ' : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-white/50 hover:text-white hover:bg-white/10 transition-all ${collapsed ? 'justify-center px-2' : ''}`}
          >
            <HelpCircle className="w-3.5 h-3.5 shrink-0" />
            {!collapsed && <span>Hỗ trợ & Tài liệu</span>}
          </Link>

          {/* User row */}
          <div className={`flex items-center gap-2 mt-2 pt-2 border-t border-white/10 ${collapsed ? 'justify-center' : 'px-1'}`}>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {userInfo?.fullName?.charAt(0) || 'U'}
            </div>
            {!collapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-semibold text-white truncate">{userInfo?.fullName || 'Người dùng'}</div>
                  <div className="text-[10px] text-white/40 truncate">{userInfo?.email || 'user@tenant.vn'}</div>
                </div>
                <button
                  onClick={async () => {
                    localStorage.removeItem('platformbds_token');
                    delete axios.defaults.headers.common['Authorization'];
                    try {
                      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
                    } catch {}
                    window.location.href = '/login';
                  }}
                  className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                  title="Đăng xuất"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="absolute -right-3 top-16 w-6 h-6 rounded-full bg-slate-700 border border-slate-600 shadow-md flex items-center justify-center text-white/60 hover:text-white hover:bg-slate-600 transition-colors hidden lg:flex"
          title={collapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {/* ── Main Area ───────────────────────────────────────────────── */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${collapsed ? 'lg:ml-[60px]' : 'lg:ml-[240px]'}`}>
        <TrialStatusBar />
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-[60px] bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm px-4 lg:px-6 flex items-center justify-between gap-4">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors lg:hidden"
          >
            <PanelLeft className="w-5 h-5" />
          </button>

          {/* Website Switcher in Top Header */}
          <div className="relative flex items-center gap-2">
            <button
              onClick={() => setSwitcherOpen((v) => !v)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all shadow-xs"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 animate-pulse"></span>
              <span className="text-sm font-bold text-slate-800 truncate max-w-[180px] sm:max-w-[280px]">{tenantName}</span>
              {userTenants && userTenants.length > 1 && (
                <span className="text-[10px] bg-blue-100 text-blue-700 font-extrabold px-1.5 py-0.5 rounded-md">
                  {userTenants.length} web
                </span>
              )}
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${switcherOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className="hidden lg:flex items-center text-xs text-slate-500 font-medium ml-1">
              <Globe className="w-3.5 h-3.5 mr-1 text-slate-400" />
              <span className="truncate max-w-[220px]">{tenantSlug}.aireviewbds.com</span>
            </div>

            {/* Top Switcher Dropdown Modal */}
            {switcherOpen && userTenants && userTenants.length > 0 && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setSwitcherOpen(false)} 
                />
                <div className="absolute top-full left-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fadeIn p-2">
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-black text-slate-800 uppercase tracking-wide">Website Của Bạn ({userTenants.length})</div>
                      <div className="text-[11px] text-slate-400">Chọn website bạn muốn quản lý nội dung</div>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      Sở hữu trọn đời
                    </span>
                  </div>

                  <div className="py-1 max-h-72 overflow-y-auto space-y-1">
                    {userTenants.map((t: any) => {
                      const isCurrent = t.id === domainData?.tenantId;
                      return (
                        <div
                          key={t.id}
                          onClick={() => {
                            setSwitcherOpen(false);
                            if (!isCurrent) {
                              switchMutation.mutate(t.id);
                            }
                          }}
                          className={`p-3 rounded-xl cursor-pointer transition-all border ${
                            isCurrent
                              ? 'bg-blue-50/80 border-blue-200 ring-2 ring-blue-500/20'
                              : 'bg-white hover:bg-slate-50 border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className={`text-xs font-bold truncate ${isCurrent ? 'text-blue-900' : 'text-slate-800'}`}>{t.name}</span>
                                {isCurrent && (
                                   <span className="text-[9px] bg-blue-600 text-white font-black px-1.5 py-0.2 rounded uppercase">
                                    Đang Quản Trị
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                                <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                                <span className="truncate">{t.slug}.aireviewbds.com</span>
                              </div>
                            </div>
                            <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md shrink-0 uppercase border border-slate-200">
                              {t.templateSlug || 'TEMPLATE'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <a
                      href={`${process.env.NEXT_PUBLIC_MARKETPLACE_URL || 'https://templates.aireviewbds.com'}/templates`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Mua Thêm Template / Mở Website Mới</span>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Marketplace link */}
            <a
              href={process.env.NEXT_PUBLIC_MARKETPLACE_URL || 'https://templates.aireviewbds.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all shadow-2xs"
              title="Quay về sàn giao diện Marketplace để xem hoặc mua thêm các mẫu website khác"
            >
              <Store className="w-3.5 h-3.5 text-amber-600" />
              <span>Sàn Giao Diện</span>
            </a>

            {/* View website */}
            <Link
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Xem Website
            </Link>

            {/* Publish button */}
            <button
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-colors"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              Lưu thay đổi
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

