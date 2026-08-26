import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Section {
  id: string;
  name: string;
  type: string;
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    [key: string]: any;
  };
}

interface PageConfig {
  slug: string;
  name: string;
  sections: Section[];
}

const DEFAULT_PAGES: PageConfig[] = [
  {
    slug: 'home',
    name: 'Trang Chủ',
    sections: [
      { id: 'hero', name: 'Hero Banner', type: 'hero', content: { title: 'DINH THỰ HOÀNG GIA BÊN DÒNG SÔNG NGỌC', subtitle: 'Kiệt tác kiến trúc Ý độc tôn dành cho giới tinh hoa' } },
      { id: 'stats', name: 'Thông Số Nổi Bật', type: 'stats', content: { title: 'QUY MÔ VÀ ĐẲNG CẤP', subtitle: 'Tổng diện tích 25ha | 18 Biệt thự siêu sang | Bến du thuyền riêng' } },
      { id: 'about', name: 'Giới Thiệu Dự Án', type: 'about', content: { title: 'TỔNG QUAN DỰ ÁN', description: 'Được quy hoạch đồng bộ với tiêu chuẩn quốc tế và quản lý vận hành 5 sao.' } },
      { id: 'projects', name: 'Sản Phẩm Mở Bán', type: 'projects', content: { title: 'DANH MỤC BIỆT THỰ & DINH THỰ' } },
      { id: 'amenities', name: 'Tiện Ích 5 Sao', type: 'amenities', content: { title: 'HỆ THỐNG TIỆN ÍCH ĐẶC QUYỀN' } },
      { id: 'contact', name: 'Form Đăng Ký Tư Vấn', type: 'contact', content: { title: 'NHẬN BẢNG GIÁ VÀ THAM QUAN' } }
    ]
  },
  {
    slug: 'about',
    name: 'Giới Thiệu',
    sections: [
      { id: 'about-hero', name: 'Banner Giới Thiệu', type: 'hero', content: { title: 'VỀ CHỦ ĐẦU TƯ' } },
      { id: 'about-details', name: 'Tầm Nhìn & Sứ Mệnh', type: 'about', content: { title: 'TẦM NHÌN PHÁT TRIỂN' } }
    ]
  },
  {
    slug: 'contact',
    name: 'Liên Hệ',
    sections: [
      { id: 'contact-main', name: 'Thông Tin & Bản Đồ', type: 'contact', content: { title: 'LIÊN HỆ PHÒNG KINH DOANH' } }
    ]
  }
];

export default function TemplateStudio() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;

  // ── State Management ──────────────────────────────────
  const [activeTab, setActiveTab] = useState<'content' | 'theme' | 'typography' | 'spacing' | 'versions'>('content');
  const [activePage, setActivePage] = useState<string>('home');
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const [saveStatus, setSaveStatus] = useState<string>('');

  // Version manager UI states
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);
  const [updateNotes, setUpdateNotes] = useState<string>('');
  const [compareV1, setCompareV1] = useState<string>('');
  const [compareV2, setCompareV2] = useState<string>('');
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);
  const [targetMigrationVersion, setTargetMigrationVersion] = useState<number>(11);

  // Local configurations state (synced with draft)
  const [themeConfig, setThemeConfig] = useState({
    primaryColor: '#2563EB',
    secondaryColor: '#64748B',
    accentColor: '#F59E0B',
    backgroundColor: '#FFFFFF',
    textColor: '#0F172A',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Inter',
    borderRadius: '8px',
    shadow: 'md'
  });

  const [layoutConfig, setLayoutConfig] = useState<{ pages: PageConfig[] }>({
    pages: DEFAULT_PAGES
  });

  const [featureFlags, setFeatureFlags] = useState({
    enableCrm: true,
    enableBlog: true,
    enableProjects: true
  });

  const [components, setComponents] = useState<any>({});

  // ── Load Template Info & Draft ────────────────────────
  const { data: templateRes, isLoading: loadingTemplate } = useQuery({
    queryKey: ['adminTemplateDetail', id],
    queryFn: async () => {
      if (!id) return null;
      const res = await axios.get(`${API_URL}/api/admin/templates`, { withCredentials: true });
      const list = res.data?.data || [];
      return list.find((t: any) => t.id === id) || null;
    },
    enabled: !!id
  });

  const { data: draftRes, isLoading: loadingDraft } = useQuery({
    queryKey: ['templateDraft', id],
    queryFn: async () => {
      if (!id) return null;
      const res = await axios.get(`${API_URL}/api/admin/templates/${id}/draft`, { withCredentials: true });
      return res.data?.data || null;
    },
    enabled: !!id
  });

  // ── Load Versions List ────────────────────────────────
  const { data: versionsRes } = useQuery({
    queryKey: ['templateVersions', id],
    queryFn: async () => {
      if (!id) return [];
      const res = await axios.get(`${API_URL}/api/admin/templates/${id}/versions`, { withCredentials: true });
      return res.data?.data || [];
    },
    enabled: !!id
  });
  const versions = versionsRes || [];

  // Compare query
  const { data: compareRes, refetch: fetchCompare } = useQuery({
    queryKey: ['compareVersions', compareV1, compareV2],
    queryFn: async () => {
      if (!compareV1 || !compareV2) return null;
      const res = await axios.get(
        `${API_URL}/api/admin/templates/${id}/versions/compare?v1=${compareV1}&v2=${compareV2}`,
        { withCredentials: true }
      );
      return res.data?.data || null;
    },
    enabled: false
  });

  useEffect(() => {
    if (showCompareModal && compareV1 && compareV2) {
      fetchCompare();
    }
  }, [showCompareModal, compareV1, compareV2]);

  // Sync draft configurations to state on load
  useEffect(() => {
    if (draftRes) {
      if (draftRes.themeConfig) setThemeConfig(draftRes.themeConfig);
      if (draftRes.layoutConfig?.pages && draftRes.layoutConfig.pages.length > 0) {
        setLayoutConfig(draftRes.layoutConfig);
      }
      if (draftRes.featureFlags) setFeatureFlags(draftRes.featureFlags);
      if (draftRes.components) setComponents(draftRes.components);
    }
  }, [draftRes]);

  // ── Save Draft Mutation ──────────────────────────────
  const saveDraftMutation = useMutation({
    mutationFn: async () => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      await axios.put(
        `${API_URL}/api/admin/templates/${id}/draft`,
        { themeConfig, layoutConfig, featureFlags, components },
        {
          headers: { 'X-CSRF-Token': csrfToken || '' },
          withCredentials: true
        }
      );
    },
    onSuccess: () => {
      const now = new Date().toLocaleTimeString('vi-VN');
      setSaveStatus(`Đã lưu nháp lúc ${now}`);
      queryClient.invalidateQueries({ queryKey: ['templateDraft', id] });
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Có lỗi xảy ra khi lưu nháp.');
    }
  });

  // ── Publish Version Mutation ──────────────────────────
  const publishMutation = useMutation({
    mutationFn: async (notes: string) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.post(
        `${API_URL}/api/admin/templates/${id}/publish`,
        { updateNotes: notes },
        {
          headers: { 'X-CSRF-Token': csrfToken || '' },
          withCredentials: true
        }
      );
      return res.data;
    },
    onSuccess: (resData) => {
      alert(resData.message || 'Đã xuất bản phiên bản mới thành công!');
      setShowPublishModal(false);
      setUpdateNotes('');
      queryClient.invalidateQueries({ queryKey: ['templateVersions', id] });
      queryClient.invalidateQueries({ queryKey: ['adminTemplateDetail', id] });
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Có lỗi xảy ra khi xuất bản.');
    }
  });

  // ── Rollback Mutation ──────────────────────────
  const rollbackMutation = useMutation({
    mutationFn: async (versionId: string) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.post(
        `${API_URL}/api/admin/templates/${id}/versions/${versionId}/rollback`,
        {},
        {
          headers: { 'X-CSRF-Token': csrfToken || '' },
          withCredentials: true
        }
      );
      return res.data;
    },
    onSuccess: (resData) => {
      alert(resData.message || 'Đã rollback thành công!');
      queryClient.invalidateQueries({ queryKey: ['templateDraft', id] });
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Có lỗi xảy ra khi rollback.');
    }
  });

  // ── Archive Version Mutation ───────────────────────
  const archiveMutation = useMutation({
    mutationFn: async (versionId: string) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.put(
        `${API_URL}/api/admin/templates/${id}/versions/${versionId}/archive`,
        {},
        {
          headers: { 'X-CSRF-Token': csrfToken || '' },
          withCredentials: true
        }
      );
      return res.data;
    },
    onSuccess: () => {
      alert('Đã lưu trữ phiên bản thành công!');
      queryClient.invalidateQueries({ queryKey: ['templateVersions', id] });
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Có lỗi xảy ra khi lưu trữ.');
    }
  });

  // ── Migrate Tenants Mutation ───────────────────────
  const migrateTenantsMutation = useMutation({
    mutationFn: async (targetVer: number) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.post(
        `${API_URL}/api/admin/templates/${id}/migrate-tenants`,
        { targetVersion: targetVer },
        {
          headers: { 'X-CSRF-Token': csrfToken || '' },
          withCredentials: true
        }
      );
      return res.data;
    },
    onSuccess: (resData) => {
      alert(resData.message || 'Đã cập nhật hàng loạt thành công!');
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Có lỗi xảy ra khi cập nhật.');
    }
  });

  // Helper values
  const activePageData = layoutConfig.pages?.find(p => p.slug === activePage);
  const activeSection = activePageData?.sections?.find(s => s.id === activeSectionId);

  // Inspector property handlers
  const handleContentChange = (field: string, val: string) => {
    if (!activePageData || !activeSection) return;
    const updatedPages = layoutConfig.pages.map(p => {
      if (p.slug === activePage) {
        return {
          ...p,
          sections: p.sections.map(s => {
            if (s.id === activeSectionId) {
              return {
                ...s,
                content: {
                  ...s.content,
                  [field]: val
                }
              };
            }
            return s;
          })
        };
      }
      return p;
    });
    setLayoutConfig({ pages: updatedPages });
  };

  if (loadingTemplate || loadingDraft) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F6F3]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-sm font-semibold text-slate-500">Đang khởi tạo Template Studio...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6] text-slate-900 font-sans antialiased overflow-hidden">
      {/* ─── Top Studio Bar ───────────────────────────────── */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 text-white flex items-center justify-between px-6 shrink-0 shadow-lg">
        <div className="flex items-center gap-4">
          <Link href="/templates" className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại
          </Link>
          <span className="h-4 w-px bg-slate-700"></span>
          <div>
            <h1 className="text-sm font-black tracking-wide text-white uppercase">{templateRes?.name || 'Luxury Gold'}</h1>
            <p className="text-[10px] text-indigo-400 font-bold font-mono uppercase mt-0.5">Studio Workspace · Active Version: v{(templateRes?.version || 10) / 10}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {saveStatus && <span className="text-xs text-slate-400 font-medium">{saveStatus}</span>}
          <button
            onClick={() => saveDraftMutation.mutate()}
            disabled={saveDraftMutation.isPending}
            className="px-4 py-2 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white text-xs font-bold rounded-lg transition-all"
          >
            {saveDraftMutation.isPending ? 'Đang lưu...' : 'Lưu nháp'}
          </button>
          <button
            onClick={() => setShowPublishModal(true)}
            disabled={publishMutation.isPending}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-all shadow-md"
          >
            {publishMutation.isPending ? 'Đang xuất bản...' : 'Xuất bản (Publish)'}
          </button>
        </div>
      </header>

      {/* ─── Main Columns Container ───────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        {/* 1. NAVIGATOR (Left Column) */}
        <aside className="w-[280px] bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto">
          {/* Pages navigator */}
          <div className="p-4 border-b border-slate-100 text-left">
            <h3 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-3">Pages</h3>
            <div className="flex flex-col gap-1">
              {layoutConfig.pages?.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => {
                    setActivePage(p.slug);
                    if (p.sections?.length > 0) setActiveSectionId(p.sections[0].id);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                    activePage === p.slug ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <span>{p.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">/{p.slug}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sections navigator */}
          <div className="p-4 border-b border-slate-100 flex-1 text-left">
            <h3 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-3">Sections</h3>
            <div className="flex flex-col gap-1">
              {activePageData?.sections?.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSectionId(s.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
                    activeSectionId === s.id ? 'bg-slate-100 text-slate-900 border border-slate-200' : 'hover:bg-slate-50 text-slate-500'
                  }`}
                >
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0"></span>
                  <div>
                    <p className="font-semibold text-[12px]">{s.name}</p>
                    <p className="text-[9px] text-slate-400 font-mono mt-0.5 uppercase">{s.type}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Components navigator */}
          <div className="p-4 bg-slate-50/50 text-left">
            <h3 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-2">Active Components</h3>
            <p className="text-[10px] text-slate-400 leading-relaxed mb-3">Thành phần phụ thuộc trong phân đoạn đang chỉnh sửa.</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] font-bold bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg">Header Navigation</span>
              <span className="text-[10px] font-bold bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg">Footer Socials</span>
              <span className="text-[10px] font-bold bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg">Lead Form API</span>
            </div>
          </div>
        </aside>

        {/* 2. CANVAS (Middle Column - Live Preview Simulation) */}
        <main className="flex-1 bg-slate-100 p-8 overflow-y-auto flex flex-col items-center">
          {/* Canvas Area Container */}
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 flex flex-col min-h-[700px] transition-all">
            {/* Simulation Header */}
            <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center justify-between px-4 shrink-0">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                <span className="w-3 h-3 bg-amber-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono font-bold tracking-wide">PREVIEW IN REALTIME</span>
              <span className="text-[10px] text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-md uppercase font-bold">100% Responsive</span>
            </div>

            {/* Dynamic Rendering of Template preview using current configurations */}
            <div 
              className="flex-1 p-6 md:p-10 space-y-12 transition-all duration-350"
              style={{
                backgroundColor: themeConfig.backgroundColor,
                color: themeConfig.textColor,
                fontFamily: themeConfig.fontBody,
              }}
            >
              {/* Navbar simulation */}
              <header className="flex justify-between items-center pb-4 border-b" style={{ borderColor: themeConfig.textColor + '20' }}>
                <span className="text-lg font-black tracking-wide" style={{ fontFamily: themeConfig.fontHeading, color: themeConfig.primaryColor }}>
                  LUXURY ESTATE
                </span>
                <nav className="flex gap-4 text-xs font-bold text-slate-500">
                  <span className="text-indigo-600 cursor-pointer">Trang chủ</span>
                  <span className="cursor-pointer">Giới thiệu</span>
                  <span className="cursor-pointer">Dự án</span>
                  <span className="cursor-pointer">Liên hệ</span>
                </nav>
              </header>

              {/* Render Sections mock dynamically */}
              {activePageData?.sections?.map((sec) => {
                const isActive = sec.id === activeSectionId;
                
                // Styles mapping
                const headingStyle = {
                  fontFamily: themeConfig.fontHeading,
                  color: isActive ? themeConfig.primaryColor : undefined
                };

                const shadowClass = 
                  themeConfig.shadow === 'sm' ? 'shadow-sm' :
                  themeConfig.shadow === 'md' ? 'shadow-md' :
                  themeConfig.shadow === 'lg' ? 'shadow-lg' : 'shadow-none';

                const radiusClass = 
                  themeConfig.borderRadius === '4px' ? 'rounded' :
                  themeConfig.borderRadius === '8px' ? 'rounded-lg' :
                  themeConfig.borderRadius === '12px' ? 'rounded-xl' :
                  themeConfig.borderRadius === '16px' ? 'rounded-2xl' : 'rounded-none';

                if (sec.type === 'hero') {
                  return (
                    <div 
                      key={sec.id}
                      onClick={() => setActiveSectionId(sec.id)}
                      className={`p-10 text-center space-y-4 border-2 transition-all cursor-pointer ${
                        isActive ? 'border-indigo-600 bg-indigo-50/20' : 'border-transparent hover:border-slate-300'
                      }`}
                      style={{
                        borderRadius: themeConfig.borderRadius
                      }}
                    >
                      <h2 className="text-3xl font-extrabold" style={headingStyle}>
                        {sec.content?.title || 'Tìm Kiếm Không Gian Sống Mơ Ước'}
                      </h2>
                      <p className="text-sm opacity-80 max-w-xl mx-auto">
                        {sec.content?.subtitle || 'Hơn 10,000+ bất động sản cao cấp đang chờ bạn khám phá.'}
                      </p>
                      <button 
                        className={`px-6 py-2.5 text-white font-bold text-xs uppercase tracking-wide transition-all ${shadowClass} ${radiusClass}`}
                        style={{ backgroundColor: themeConfig.primaryColor }}
                      >
                        Đăng ký tư vấn
                      </button>
                    </div>
                  );
                }

                if (sec.type === 'stats') {
                  return (
                    <div 
                      key={sec.id}
                      onClick={() => setActiveSectionId(sec.id)}
                      className={`p-6 border-2 transition-all cursor-pointer ${
                        isActive ? 'border-indigo-600 bg-indigo-50/20' : 'border-transparent hover:border-slate-300'
                      }`}
                      style={{ borderRadius: themeConfig.borderRadius }}
                    >
                      <h3 className="text-center font-bold text-lg mb-6 uppercase tracking-wider" style={headingStyle}>
                        {sec.content?.title || 'Thống kê nổi bật'}
                      </h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                          <p className="text-2xl font-black" style={{ color: themeConfig.primaryColor }}>1,200+</p>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Dự án đã bàn giao</p>
                        </div>
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                          <p className="text-2xl font-black" style={{ color: themeConfig.primaryColor }}>98%</p>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Khách hài lòng</p>
                        </div>
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                          <p className="text-2xl font-black" style={{ color: themeConfig.primaryColor }}>4.9★</p>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Đánh giá chung</p>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (sec.type === 'projects') {
                  return (
                    <div 
                      key={sec.id}
                      onClick={() => setActiveSectionId(sec.id)}
                      className={`p-6 border-2 transition-all cursor-pointer ${
                        isActive ? 'border-indigo-600 bg-indigo-50/20' : 'border-transparent hover:border-slate-300'
                      }`}
                      style={{ borderRadius: themeConfig.borderRadius }}
                    >
                      <h3 className="text-center font-bold text-lg mb-6 uppercase tracking-wider" style={headingStyle}>
                        {sec.content?.title || 'Dự án nổi bật'}
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                        {[1, 2].map(n => (
                          <div key={n} className={`border bg-white overflow-hidden ${shadowClass} ${radiusClass}`}>
                            <div className="aspect-video bg-slate-100 relative">
                              <span className="absolute top-2 left-2 bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">CĂN HỘ CAO CẤP</span>
                            </div>
                            <div className="p-4 text-left">
                              <h4 className="font-bold text-sm">Vinhomes Golden River Luxury v{n}</h4>
                              <p className="text-xs text-slate-400 mt-1">Quận 1, TP. Hồ Chí Minh</p>
                              <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-xs font-bold">
                                <span style={{ color: themeConfig.primaryColor }}>8.5 Tỷ</span>
                                <span>120 m²</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                // Default layout fallback preview
                return (
                  <div 
                    key={sec.id}
                    onClick={() => setActiveSectionId(sec.id)}
                    className={`p-6 border-2 border-dashed rounded-xl transition-all cursor-pointer ${
                      isActive ? 'border-indigo-600 bg-indigo-50/20' : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <p className="text-center text-xs font-bold text-slate-400">{sec.name} ({sec.type})</p>
                  </div>
                );
              })}

              {/* Footer simulation */}
              <footer className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
                <span>© 2026 LUXURY ESTATE. Powered by PlatformBDS.</span>
                <div className="flex gap-4">
                  <span>Điều khoản</span>
                  <span>Bảo mật</span>
                </div>
              </footer>
            </div>
          </div>
        </main>

        {/* 3. INSPECTOR (Right Column) */}
        <aside className="w-[340px] bg-white border-l border-slate-200 flex flex-col shrink-0 overflow-y-auto">
          {/* Tabs header */}
          <div className="flex border-b border-slate-200 shrink-0">
            {[
              { id: 'content', label: 'Content' },
              { id: 'theme', label: 'Theme' },
              { id: 'typography', label: 'Fonts' },
              { id: 'spacing', label: 'Layout' },
              { id: 'versions', label: 'Versions' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex-1 text-center py-3 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === t.id ? 'border-indigo-600 text-indigo-600 bg-indigo-50/10' : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab contents */}
          <div className="p-5 flex-1 text-left">
            {/* CONTENT TAB */}
            {activeTab === 'content' && (
              <div className="space-y-5">
                <div className="bg-indigo-50 border border-indigo-100 p-3.5 rounded-xl text-xs text-indigo-700 font-medium">
                  Chọn phân đoạn ở cột trái hoặc bấm trực tiếp vào Canvas để biên tập nội dung.
                </div>
                
                {activeSection ? (
                  <div className="space-y-4">
                    <div className="border-b border-slate-100 pb-2 mb-2">
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-extrabold uppercase px-2 py-0.5 rounded font-mono">
                        {activeSection.type}
                      </span>
                      <h4 className="text-xs font-extrabold text-slate-900 mt-1">{activeSection.name}</h4>
                    </div>

                    {activeSection.content && Object.keys(activeSection.content).map((field) => {
                      if (typeof activeSection.content[field] === 'string') {
                        return (
                          <div key={field} className="space-y-1.5">
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">{field}</label>
                            {field === 'description' || field === 'subtitle' ? (
                              <textarea
                                value={activeSection.content[field] || ''}
                                onChange={(e) => handleContentChange(field, e.target.value)}
                                className="w-full h-20 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-600 transition-colors"
                              />
                            ) : (
                              <input
                                type="text"
                                value={activeSection.content[field] || ''}
                                onChange={(e) => handleContentChange(field, e.target.value)}
                                className="w-full h-11 border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-indigo-600 transition-colors font-bold text-slate-800"
                              />
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic text-center py-10">Không có phân đoạn nào đang hoạt động.</p>
                )}
              </div>
            )}

            {/* THEME COLOR TAB */}
            {activeTab === 'theme' && (
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-2">Bảng màu sắc thương hiệu</h4>
                
                <div className="space-y-3.5">
                  {[
                    { key: 'primaryColor', label: 'Primary Color (Chủ đạo)' },
                    { key: 'secondaryColor', label: 'Secondary Color (Phụ)' },
                    { key: 'accentColor', label: 'Accent Color (Điểm nhấn)' },
                    { key: 'backgroundColor', label: 'Background Color (Nền)' },
                    { key: 'textColor', label: 'Text Color (Chữ)' },
                  ].map(c => (
                    <div key={c.key} className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">{c.label}</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={(themeConfig as any)[c.key]}
                          onChange={(e) => setThemeConfig({ ...themeConfig, [c.key]: e.target.value })}
                          className="w-11 h-11 border border-slate-200 rounded-xl p-0.5 cursor-pointer shrink-0"
                        />
                        <input
                          type="text"
                          value={(themeConfig as any)[c.key]}
                          onChange={(e) => setThemeConfig({ ...themeConfig, [c.key]: e.target.value })}
                          className="flex-1 h-11 border border-slate-200 rounded-xl px-4 text-xs font-mono font-bold text-slate-700 uppercase"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TYPOGRAPHY TAB */}
            {activeTab === 'typography' && (
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-2">Kiểu chữ thiết kế</h4>
                
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Font Tiêu đề (Heading Font)</label>
                    <select
                      value={themeConfig.fontHeading}
                      onChange={(e) => setThemeConfig({ ...themeConfig, fontHeading: e.target.value })}
                      className="w-full h-11 border border-slate-200 rounded-xl px-4 text-xs font-bold text-slate-700 focus:outline-none"
                    >
                      <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                      <option value="Playfair Display">Playfair Display (Quý phái)</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Outfit">Outfit</option>
                      <option value="Inter">Inter</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Font Nội dung (Body Font)</label>
                    <select
                      value={themeConfig.fontBody}
                      onChange={(e) => setThemeConfig({ ...themeConfig, fontBody: e.target.value })}
                      className="w-full h-11 border border-slate-200 rounded-xl px-4 text-xs font-bold text-slate-700 focus:outline-none"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Nunito">Nunito</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* SPACING TAB */}
            {activeTab === 'spacing' && (
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-2">Bố cục & Cấu trúc</h4>
                
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Bo góc (Border Radius)</label>
                    <select
                      value={themeConfig.borderRadius}
                      onChange={(e) => setThemeConfig({ ...themeConfig, borderRadius: e.target.value })}
                      className="w-full h-11 border border-slate-200 rounded-xl px-4 text-xs font-bold text-slate-700 focus:outline-none"
                    >
                      <option value="0px">Vuông vức (0px)</option>
                      <option value="4px">Góc nhỏ (4px)</option>
                      <option value="8px">Mặc định (8px)</option>
                      <option value="12px">Bo mềm (12px)</option>
                      <option value="16px">Tròn nhiều (16px)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Độ đổ bóng (Box Shadow)</label>
                    <select
                      value={themeConfig.shadow}
                      onChange={(e) => setThemeConfig({ ...themeConfig, shadow: e.target.value })}
                      className="w-full h-11 border border-slate-200 rounded-xl px-4 text-xs font-bold text-slate-700 focus:outline-none"
                    >
                      <option value="none">Không đổ bóng</option>
                      <option value="sm">Bóng mờ nhẹ (sm)</option>
                      <option value="md">Trung bình (md)</option>
                      <option value="lg">Đậm nét (lg)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* VERSIONS TAB */}
            {activeTab === 'versions' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-2">
                  <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Lịch sử Phiên bản</h4>
                  <button 
                    onClick={() => {
                      if (!compareV1 || !compareV2) {
                        alert("Vui lòng chọn 2 phiên bản để so sánh.");
                        return;
                      }
                      setShowCompareModal(true);
                    }}
                    className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded"
                  >
                    So sánh 2 bản
                  </button>
                </div>

                {/* Versions List */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {versions.length === 0 ? (
                    <p className="text-xs text-slate-400 italic text-center py-6">Chưa xuất bản phiên bản nào.</p>
                  ) : (
                    versions.map((v: any) => {
                      const isSelectedForCompare = compareV1 === v.id || compareV2 === v.id;
                      return (
                        <div key={v.id} className="p-3 border border-slate-200 rounded-xl bg-slate-50 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <input 
                                type="checkbox"
                                checked={isSelectedForCompare}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    if (!compareV1) setCompareV1(v.id);
                                    else if (!compareV2) setCompareV2(v.id);
                                    else {
                                      setCompareV1(compareV2);
                                      setCompareV2(v.id);
                                    }
                                  } else {
                                    if (compareV1 === v.id) setCompareV1('');
                                    if (compareV2 === v.id) setCompareV2('');
                                  }
                                }}
                                className="w-3.5 h-3.5 rounded text-indigo-600"
                              />
                              <span className="font-bold text-slate-800">v{v.version / 10}</span>
                            </div>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                              v.status === 'ARCHIVED' ? 'bg-slate-200 text-slate-600' : 'bg-green-100 text-green-700'
                            }`}>
                              {v.status === 'ARCHIVED' ? 'Đã Lưu Trữ' : 'Hoạt Động'}
                            </span>
                          </div>

                          {v.updateNotes && (
                            <p className="text-[11px] text-slate-600 bg-white border border-slate-100 p-2 rounded-lg font-medium italic">
                              &ldquo;{v.updateNotes}&rdquo;
                            </p>
                          )}

                          <div className="text-[9px] text-slate-400 font-mono flex flex-col gap-0.5">
                            <span>Bởi: {v.publishedBy || 'Super Admin'}</span>
                            <span>Lúc: {new Date(v.publishedAt).toLocaleString('vi-VN')}</span>
                          </div>

                          <div className="flex gap-2 pt-1 border-t border-slate-200/50">
                            <button
                              onClick={() => {
                                if (confirm(`Bạn có chắc chắn muốn rollback thiết kế về phiên bản v${v.version / 10}?`)) {
                                  rollbackMutation.mutate(v.id);
                                }
                              }}
                              className="flex-1 text-center py-1 bg-white border border-slate-200 text-[10px] font-bold rounded hover:bg-slate-50"
                            >
                              Rollback
                            </button>
                            {v.status === 'PUBLISHED' && (
                              <button
                                onClick={() => {
                                  if (confirm("Lưu trữ phiên bản này?")) {
                                    archiveMutation.mutate(v.id);
                                  }
                                }}
                                className="flex-1 text-center py-1 bg-white border border-red-100 text-red-600 text-[10px] font-bold rounded hover:bg-red-50"
                              >
                                Archive
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Migrate Tenants Section */}
                <div className="border-t border-slate-200 pt-4 mt-4 space-y-3">
                  <h4 className="text-xs font-extrabold uppercase text-slate-800 tracking-wider">Di Cư Khách Thuê</h4>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Nâng cấp hàng loạt cấu hình của toàn bộ Khách thuê (Tenants) sử dụng mẫu này lên phiên bản đích thông qua Registry.
                  </p>
                  
                  <div className="space-y-2">
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase">Phiên bản đích (Target Version)</label>
                    <select
                      value={targetMigrationVersion}
                      onChange={(e) => setTargetMigrationVersion(Number(e.target.value))}
                      className="w-full h-10 border border-slate-200 rounded-xl px-3 text-xs font-bold text-slate-700"
                    >
                      {versions.map((v: any) => (
                        <option key={v.id} value={v.version}>v{v.version / 10}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Bạn chắc chắn muốn nâng cấp tất cả tenants lên phiên bản v${targetMigrationVersion / 10}?`)) {
                        migrateTenantsMutation.mutate(targetMigrationVersion);
                      }
                    }}
                    disabled={migrateTenantsMutation.isPending}
                    className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow"
                  >
                    {migrateTenantsMutation.isPending ? 'Đang di cư...' : 'Nâng cấp Khách thuê (Migrate)'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* ─── Publish Modal ─────────────────────────────────── */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 text-left border">
            <h3 className="text-base font-black text-slate-900 uppercase tracking-wide">Xuất bản Phiên bản Mới</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Vui lòng cung cấp ghi chú cập nhật/nhật ký thay đổi (Release notes) để lưu giữ lịch sử.
            </p>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nhật ký cập nhật</label>
              <textarea
                value={updateNotes}
                onChange={(e) => setUpdateNotes(e.target.value)}
                placeholder="Ví dụ: Cập nhật font chữ Outfit và sửa đổi bảng màu Luxury mới."
                className="w-full h-24 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-600 transition-colors"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowPublishModal(false)}
                className="flex-1 h-10 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold rounded-xl transition-all"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => publishMutation.mutate(updateNotes)}
                disabled={publishMutation.isPending}
                className="flex-1 h-10 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                {publishMutation.isPending ? 'Đang gửi...' : 'Xác nhận xuất bản'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Compare Modal ─────────────────────────────────── */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 shadow-2xl space-y-4 text-left border flex flex-col max-h-[85vh]">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-base font-black text-slate-900 uppercase tracking-wide">So Sánh Phiên Bản</h3>
              <button 
                onClick={() => setShowCompareModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 py-2 text-xs">
              {!compareRes ? (
                <p className="text-center text-slate-400 py-10">Đang tải dữ liệu so sánh...</p>
              ) : (
                <div className="grid grid-cols-2 gap-6">
                  {/* Version 1 details */}
                  <div className="p-4 bg-slate-50 border rounded-xl space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-bold text-slate-800 text-sm">v{compareRes.v1.version / 10}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{new Date(compareRes.v1.publishedAt).toLocaleString('vi-VN')}</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase text-[9px] tracking-wide mb-1">Ghi chú phát hành</p>
                      <p className="font-semibold text-slate-700 italic">&ldquo;{compareRes.v1.updateNotes || 'Không có ghi chú.'}&rdquo;</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase text-[9px] tracking-wide mb-1">Bảng màu Theme</p>
                      <pre className="p-2.5 bg-white border border-slate-100 rounded-lg text-[10px] font-mono text-slate-600 overflow-x-auto">
                        {JSON.stringify(compareRes.v1.themeConfig, null, 2)}
                      </pre>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase text-[9px] tracking-wide mb-1">Feature Flags</p>
                      <pre className="p-2.5 bg-white border border-slate-100 rounded-lg text-[10px] font-mono text-slate-600 overflow-x-auto">
                        {JSON.stringify(compareRes.v1.featureFlags, null, 2)}
                      </pre>
                    </div>
                  </div>

                  {/* Version 2 details */}
                  <div className="p-4 bg-slate-50 border rounded-xl space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-bold text-slate-800 text-sm">v{compareRes.v2.version / 10}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{new Date(compareRes.v2.publishedAt).toLocaleString('vi-VN')}</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase text-[9px] tracking-wide mb-1">Ghi chú phát hành</p>
                      <p className="font-semibold text-slate-700 italic">&ldquo;{compareRes.v2.updateNotes || 'Không có ghi chú.'}&rdquo;</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase text-[9px] tracking-wide mb-1">Bảng màu Theme</p>
                      <pre className="p-2.5 bg-white border border-slate-100 rounded-lg text-[10px] font-mono text-slate-600 overflow-x-auto">
                        {JSON.stringify(compareRes.v2.themeConfig, null, 2)}
                      </pre>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase text-[9px] tracking-wide mb-1">Feature Flags</p>
                      <pre className="p-2.5 bg-white border border-slate-100 rounded-lg text-[10px] font-mono text-slate-600 overflow-x-auto">
                        {JSON.stringify(compareRes.v2.featureFlags, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2 border-t">
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow"
              >
                Đóng hộp thoại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
