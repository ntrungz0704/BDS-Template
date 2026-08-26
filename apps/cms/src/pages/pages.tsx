/**
 * CMS Pages Manager
 *
 * Manage tenant website pages: home, about, contact, projects, and custom pages.
 *   - List/grid of pages with slug, title, published status, sections count
 *   - System pages (home, about, contact) are locked — cannot be deleted
 *   - Add new page modal with slug, title, description, published toggle
 *   - Edit (pencil), Preview (eye), Delete (trash) actions per row
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
import CMSLayout from '../components/layout/CMSLayout';
import {
  Plus,
  Pencil,
  Eye,
  Trash2,
  Settings,
  Globe,
  FileText,
  Layers,
  X,
  AlertCircle,
  Check,
  LayoutTemplate,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SitePage {
  id: string;
  slug: string;
  title: string;
  description?: string;
  isSystem: boolean;
  published: boolean;
  sortOrder: number;
  sections: number;
}

interface NewPageForm {
  slug: string;
  title: string;
  description: string;
  published: boolean;
}

interface FormErrors {
  slug?: string;
  title?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────



// ─── Helper Components ────────────────────────────────────────────────────────

function PublishedBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
        published
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          : 'bg-slate-100 text-slate-500 border border-slate-200'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${published ? 'bg-emerald-500' : 'bg-slate-400'}`}
      />
      {published ? 'Đã Xuất Bản' : 'Nháp'}
    </span>
  );
}

function SystemBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
      <Settings className="w-2.5 h-2.5" />
      Trang Chính
    </span>
  );
}

// ─── Add Page Modal ────────────────────────────────────────────────────────────

import RichTextEditor from '../components/common/RichTextEditor';

function generateSlug(text: string, existingSlugs: string[] = []): string {
  let slug = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .trim();

  if (!slug) slug = 'trang-moi';

  let finalSlug = slug;
  let counter = 1;
  while (existingSlugs.includes(finalSlug)) {
    counter++;
    finalSlug = `${slug}-${counter}`;
  }
  return finalSlug;
}

// ─── Add Page Modal (Low-Tech Friendly) ─────────────────────────────────────────

import ItemPreviewModal from '../components/common/ItemPreviewModal';

function AddPageModal({
  onClose,
  onAdd,
  existingSlugs = [],
}: {
  onClose: () => void;
  onAdd: (page: SitePage) => void;
  existingSlugs?: string[];
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customSlug, setCustomSlug] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const autoSlug = generateSlug(title, existingSlugs);
  const finalSlug = customSlug.trim() ? generateSlug(customSlug, existingSlugs) : autoSlug;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Vui lòng nhập tên trang.');
      return;
    }
    setError(null);
    setSaving(true);
    const newPage: SitePage = {
      id: String(Date.now()),
      slug: finalSlug,
      title: title.trim(),
      description: content.replace(/<[^>]*>?/gm, '').substring(0, 160),
      isSystem: false,
      published,
      sortOrder: 99,
      sections: content ? 1 : 0,
    };
    onAdd(newPage);
    setSaving(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onClose} />

        {/* Modal */}
        <div className="relative bg-white sm:rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-screen sm:max-h-[92vh] flex flex-col h-full sm:h-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <LayoutTemplate className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Thêm Trang Mới</h2>
                <p className="text-xs text-slate-500">Tạo trang giới thiệu, chính sách, hoặc nội dung tùy ý</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 overflow-y-auto flex-1">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tên Trang <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="VD: Chính Sách Bảo Mật, Giới Thiệu Doanh Nghiệp..."
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  error
                    ? 'border-red-300 focus:ring-red-200 bg-red-50'
                    : 'border-slate-200 focus:ring-blue-200 focus:border-blue-400 bg-white'
                }`}
              />
              {error && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {error}
                </p>
              )}
            </div>

            {/* Visual Content Editor */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nội Dung Trang (Trình Soạn Thảo Trực Quan)
              </label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Nhập nội dung bài viết, chính sách, hoặc thông tin hiển thị trên trang..."
                minHeight="200px"
              />
            </div>

            {/* Published toggle */}
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-sm font-bold text-slate-800">Hiển Thị Trên Website</p>
                <p className="text-xs text-slate-500">Khách truy cập có thể nhìn thấy trang này</p>
              </div>
              <button
                type="button"
                onClick={() => setPublished((p) => !p)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
                  published ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-xs transition-transform duration-200 ${
                    published ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Advanced / Auto-Slug Info */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowAdvanced((v) => !v)}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1"
              >
                <span>{showAdvanced ? '▼ Thu gọn tùy chọn nâng cao' : '▶ Tùy chọn nâng cao (Đường dẫn trang)'}</span>
              </button>
              {showAdvanced && (
                <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <p className="text-slate-500">
                    Đường dẫn trang web tự động: <code className="font-mono text-indigo-600 font-bold bg-white px-2 py-0.5 rounded border">/{finalSlug}</code>
                  </p>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Tự chỉnh đường dẫn (nếu cần):
                    </label>
                    <input
                      type="text"
                      value={customSlug}
                      onChange={(e) => setCustomSlug(e.target.value)}
                      placeholder={autoSlug}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-slate-100 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Hủy Bỏ
              </button>
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700 transition-colors"
              >
                <Eye className="w-4 h-4 text-slate-500" />
                Xem Trước
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white transition-all shadow-md shadow-blue-600/25 disabled:opacity-60"
              >
                {saving ? 'Đang tạo...' : 'Lưu Trang Mới'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showPreview && (
        <ItemPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          type="page"
          data={{
            title: title || 'Tiêu Đề Trang Mới',
            content: content || '<p>Nội dung trang web hiển thị ở đây...</p>',
          }}
        />
      )}
    </>
  );
}

function EditPageModal({
  page,
  onClose,
  onSave,
}: {
  page: SitePage;
  onClose: () => void;
  onSave: (updated: { slug: string; title: string; description: string; published: boolean }) => void;
}) {
  const [title, setTitle] = useState(page.title || '');
  const [content, setContent] = useState(page.description || '');
  const [published, setPublished] = useState(page.published ?? true);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Vui lòng nhập tên trang.');
      return;
    }
    setError(null);
    setSaving(true);
    onSave({
      slug: page.slug,
      title: title.trim(),
      description: content,
      published,
    });
    setSaving(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onClose} />
        <div className="relative bg-white sm:rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-screen sm:max-h-[92vh] flex flex-col h-full sm:h-auto animate-scale-up">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <Pencil className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Chỉnh Sửa Trang</h2>
                <p className="text-xs text-slate-500">Đường dẫn: /{page.slug}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 overflow-y-auto flex-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tên Trang <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError(null);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm text-slate-800 outline-none"
              />
              {error && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {error}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nội Dung Trang (Trình Soạn Thảo Trực Quan)
              </label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Nhập nội dung trang web..."
                minHeight="200px"
              />
            </div>

            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-sm font-bold text-slate-800">Hiển Thị Trên Website</p>
                <p className="text-xs text-slate-500">Khách truy cập có thể nhìn thấy trang này</p>
              </div>
              <button
                type="button"
                onClick={() => setPublished((p) => !p)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
                  published ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-xs transition-transform duration-200 ${
                    published ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-100 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Hủy Bỏ
              </button>
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700 transition-colors"
              >
                <Eye className="w-4 h-4 text-slate-500" />
                Xem Trước
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white transition-all shadow-md shadow-blue-600/25 disabled:opacity-60"
              >
                {saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showPreview && (
        <ItemPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          type="page"
          data={{
            title: title || 'Tiêu Đề Trang',
            content: content || '<p>Nội dung trang web hiển thị ở đây...</p>',
          }}
        />
      )}
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PagesManagerPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: domainData } = useQuery<any>({
    queryKey: ['cms_layout_domain'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/builder/domain`, { withCredentials: true });
      return res.data?.data;
    },
    staleTime: Infinity,
  });
  const activeTenantId = domainData?.tenantId;

  const { data: fetchedPages, isLoading } = useQuery({
    queryKey: ['cms_pages', activeTenantId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/builder/pages`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!activeTenantId,
  });
  
  const TITLE_MAP: Record<string, string> = {
    'home': 'Trang Chủ & Banner',
    'projects': 'Dự Án Bất Động Sản',
    'posts': 'Tin Tức / Thị Trường BĐS',
    'contact': 'Liên Hệ & Bản Đồ Vị Trí',
    'about': 'Giới Thiệu Doanh Nghiệp',
  };

  const pages: SitePage[] = (fetchedPages || []).map((p: any) => ({
    id: p.id,
    slug: p.slug,
    title: TITLE_MAP[p.slug] || p.title,
    description: p.description || (p.slug === 'home' ? 'Trang chủ website chính' : p.slug === 'projects' ? 'Danh mục các dự án đang mở bán' : p.slug === 'posts' ? 'Tin tức & phân tích thị trường BĐS' : 'Thông tin liên hệ và form nhận tư vấn'),
    isSystem: p.isSystem ?? true,
    published: p.published ?? true,
    sortOrder: p.sortOrder ?? 0,
    sections: p._count?.sections ?? (typeof p.sections === 'number' ? p.sections : 1),
  }));

  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState<SitePage | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const addMutation = useMutation({
    mutationFn: async (page: any) => {
      const res = await axios.post(`${API_URL}/api/cms/builder/pages`, {
        slug: page.slug,
        title: page.title,
        description: page.description
      }, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms_pages'] });
      setShowModal(false);
    },
    onError: () => {
      alert('Lỗi tạo trang');
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.put(`${API_URL}/api/cms/builder/pages/${data.slug}`, {
        title: data.title,
        description: data.description,
        published: data.published,
      }, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms_pages'] });
      setEditingPage(null);
    },
    onError: () => {
      alert('Lỗi cập nhật trang');
    }
  });

  const handleAddPage = (page: SitePage) => {
    addMutation.mutate(page);
  };

  const handleUpdatePage = (data: any) => {
    updateMutation.mutate(data);
  };

  const handleEditClick = (page: SitePage) => {
    if (page.slug === 'home') {
      router.push('/theme');
    } else if (page.slug === 'projects') {
      router.push('/projects');
    } else if (page.slug === 'posts') {
      router.push('/posts');
    } else {
      setEditingPage(page);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: async (slug: string) => {
      await axios.delete(`${API_URL}/api/cms/builder/pages/${slug}`, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms_pages'] });
      setDeletingId(null);
    },
    onError: () => {
      alert('Lỗi xóa trang');
      setDeletingId(null);
    }
  });

  const handleDelete = async (page: SitePage) => {
    if (page.isSystem) return;
    if (!confirm(`Bạn có chắc muốn xóa trang "${page.title}"?`)) return;
    setDeletingId(page.id);
    deleteMutation.mutate(page.slug);
  };

  return (
    <CMSLayout
      title="Quản Lý Trang Website"
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Quản lý Trang' },
      ]}
    >
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900">Quản Lý Trang Website</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Quản lý các trang và bố cục hiển thị trên website bất động sản của bạn
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white transition-all shadow-md shadow-blue-600/25"
        >
          <Plus className="w-4 h-4" />
          Thêm Trang Mới
        </button>
      </div>

      {/* ── Stats Row ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          {
            label: 'Tổng Trang',
            value: pages.length,
            icon: <Layers className="w-4 h-4 text-blue-500" />,
            bg: 'bg-blue-50',
          },
          {
            label: 'Đã Xuất Bản',
            value: pages.filter((p) => p.published).length,
            icon: <Globe className="w-4 h-4 text-emerald-500" />,
            bg: 'bg-emerald-50',
          },
          {
            label: 'Trang Chính',
            value: pages.filter((p) => p.isSystem).length,
            icon: <Settings className="w-4 h-4 text-indigo-500" />,
            bg: 'bg-indigo-50',
          },
          {
            label: 'Trang Tùy Chỉnh',
            value: pages.filter((p) => !p.isSystem).length,
            icon: <FileText className="w-4 h-4 text-amber-500" />,
            bg: 'bg-amber-50',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-3"
          >
            <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-xl font-black text-slate-900">{stat.value}</div>
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Pages Table ───────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-700">Danh Sách Trang</h3>
        </div>

        {pages.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Layers className="w-7 h-7 text-slate-400" />
            </div>
            <h3 className="text-base font-bold text-slate-700 mb-1">Chưa có trang nào</h3>
            <p className="text-sm text-slate-500 mb-5 max-w-xs">
              Bắt đầu bằng cách thêm trang mới cho website của bạn.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white transition-all shadow-md shadow-blue-600/25"
            >
              <Plus className="w-4 h-4" />
              Thêm Trang Đầu Tiên
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Trang
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Đường Dẫn
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                    Trạng Thái
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                    Khối Nội Dung
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                    Phân Loại
                  </th>
                  <th className="px-5 py-3 text-right text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Hành Động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pages.map((page) => (
                  <tr
                    key={page.id}
                    className="group hover:bg-slate-50/70 transition-colors"
                  >
                    {/* Page title */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shrink-0">
                          <FileText className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{page.title}</div>
                          {page.description && (
                            <div className="text-xs text-slate-400 truncate max-w-[220px]">
                              {page.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="px-5 py-3.5">
                      <code className="text-xs font-mono text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded-md">
                        /{page.slug}
                      </code>
                    </td>

                    {/* Published badge */}
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <PublishedBadge published={page.published} />
                    </td>

                    {/* Sections */}
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className="text-sm font-bold text-slate-800">{page.sections}</span>
                      <span className="text-xs text-slate-500 ml-1">khối</span>
                    </td>

                    {/* Type badge */}
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      {page.isSystem ? <SystemBadge /> : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-50 text-slate-600 border border-slate-200">
                          Tùy Chỉnh
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleEditClick(page)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors shadow-2xs"
                          title={
                            page.slug === 'home' ? 'Chỉnh sửa Giao diện & Bố cục Trang Chủ' :
                            page.slug === 'projects' ? 'Quản lý Dự Án BĐS' :
                            page.slug === 'posts' ? 'Quản lý Tin Tức / Blog' : 'Chỉnh sửa nội dung trang'
                          }
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>Sửa</span>
                        </button>

                        {/* View Website Button */}
                        <a
                          href={`http://localhost:3003/${page.slug === 'home' ? '' : page.slug}?tenant=${domainData?.subdomain || 'hoanggialand'}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Xem trang thực tế trên Website"
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Xem</span>
                        </a>

                        {/* Delete */}
                        {page.isSystem ? (
                          <button
                            disabled
                            title="Trang chính của website — bạn có thể sửa nội dung thoải mái, chỉ không thể xóa"
                            className="p-1.5 rounded-lg text-slate-200 cursor-not-allowed"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDelete(page)}
                            disabled={deletingId === page.id}
                            title="Xóa trang"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                          >
                            {deletingId === page.id ? (
                              <span className="w-3.5 h-3.5 border-2 border-slate-300 border-t-red-400 rounded-full animate-spin block" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        {pages.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {pages.length} trang · {pages.filter((p) => p.published).length} đã xuất bản
            </span>
            <span className="text-xs text-slate-400">
              Trang hệ thống được bảo vệ và không thể xóa
            </span>
          </div>
        )}
      </div>

      {/* ── Add Page Modal ────────────────────────────────────────── */}
      {showModal && (
        <AddPageModal onClose={() => setShowModal(false)} onAdd={handleAddPage} />
      )}

      {/* ── Edit Page Modal ───────────────────────────────────────── */}
      {editingPage && (
        <EditPageModal
          page={editingPage}
          onClose={() => setEditingPage(null)}
          onSave={handleUpdatePage}
        />
      )}
    </CMSLayout>
  );
}
