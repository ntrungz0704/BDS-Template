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
    label: 'Khách Hàng',
    href: '/leads',
    icon: <Users className="w-4 h-4" />,
    dividerBefore: true,
  },
  {
    label: 'Domain',
    href: '/domain',
    icon: <Globe className="w-4 h-4" />,
  },
  {
    label: 'Cài Đặt',
    href: '/settings',
    icon: <Settings className="w-4 h-4" />,
  },
  {
    label: 'Gói Dịch Vụ',
    href: '/billing',
    icon: <Zap className="w-4 h-4" />,
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
  return (
    <>
      {item.dividerBefore && (
        <div className={`mx-3 my-2 border-t border-white/10 ${collapsed ? 'mx-2' : ''}`} />
      )}
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
    </>
  );
}

// ─── Main Layout Component ────────────────────────────────────────────────────

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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
      // Kiểm tra nhanh cookie is_logged_in trước khi gọi API
      const isLoggedInCookie = document.cookie.includes('is_logged_in=true');
      if (!isLoggedInCookie) {
        router.replace('/login');
        return;
      }
      try {
        const res = await axios.get(`${API_URL}/api/auth/me`, { withCredentials: true });
        const user = res.data?.data?.user;
        if (!user) {
          router.replace('/login');
          return;
        }
        // Chỉ cho phép TENANT_OWNER, EDITOR, SUPER_ADMIN vào CMS
        const allowedRoles = ['TENANT_OWNER', 'EDITOR', 'SUPER_ADMIN'];
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
  const tenantSlug = activeTenant?.slug || domainData?.subdomain || '';
  const tenantName = activeTenant?.name || domainData?.companyName || 'My Tenant';
  const PLATFORM_DOMAIN = process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'platformbds.vn';

  const buildPublicUrl = () => {
    if (!tenantSlug) return 'http://localhost:3003';
    if (domainData.customDomain && domainData.dnsVerified && domainData.sslStatus === 'ACTIVE') {
      return `https://${domainData.customDomain}`;
    }
    if (typeof window !== 'undefined' && (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1'))) {
      return `http://${tenantSlug}.localhost:3003`;
    }
    return `https://${tenantSlug}.${PLATFORM_DOMAIN}`;
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
              <div className="text-sm font-black text-white tracking-tight">PlatformBDS</div>
              <div className="text-[10px] text-white/40 font-medium uppercase tracking-wider">CMS Builder</div>
            </div>
          )}
        </div>

        {/* Tenant Switcher (Multi-site support) */}
        {!collapsed && (
          <div className="mx-3 mt-3 mb-1 p-2 rounded-lg bg-white/5 border border-white/10 flex flex-col relative">
            <div 
              className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded transition-colors"
              onClick={() => setSwitcherOpen(!switcherOpen)}
            >
              <div className="w-6 h-6 rounded bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[10px] font-black shrink-0">
                {tenantName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-semibold text-white truncate">{tenantName}</div>
                <div className="text-[10px] text-white/40 truncate">
                  {domainData?.customDomain || `${tenantSlug}.${PLATFORM_DOMAIN}`}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-white/40 shrink-0" />
            </div>

            {/* Dropdown list of tenants */}
            {switcherOpen && userTenants && userTenants.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden py-1 max-h-48 overflow-y-auto">
                <div className="px-2 py-1 text-[9px] font-bold text-white/40 uppercase tracking-wider">
                  Chọn Website
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
                    className={`px-3 py-1.5 text-xs font-medium cursor-pointer flex items-center justify-between transition-colors ${
                      t.id === domainData?.tenantId
                        ? 'bg-violet-600 text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate">{t.name}</div>
                      <div className="text-[9px] text-white/40 truncate">{t.slug}.localhost</div>
                    </div>
                    {t.id === domainData?.tenantId && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 ml-2" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10">
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
                    await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
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
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-[60px] bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm px-4 lg:px-6 flex items-center justify-between gap-4">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors lg:hidden"
          >
            <PanelLeft className="w-5 h-5" />
          </button>

          {/* Website Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-sm font-bold text-slate-800">{tenantName}</span>
              <ChevronDown className="w-4 h-4 text-slate-500 ml-1" />
            </div>
            <div className="hidden md:flex items-center text-xs text-slate-500 font-medium ml-2">
              <Globe className="w-3.5 h-3.5 mr-1" />
              {tenantSlug}.platformbds.vn
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 shrink-0">
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
