/**
 * CMS Blog / Posts Manager
 *
 * Manage blog posts and articles with:
 *   - Stats: total, published, draft, this month
 *   - Sortable table (by title or date) with pagination (10/page)
 *   - Thumbnail, title, excerpt, category, author, date, status columns
 *   - 'Viết Bài Mới' modal with simplified editor
 */

import React, { useState, useCallback, useMemo } from 'react';
import CMSLayout from '../components/layout/CMSLayout';
import {
  Plus,
  Pencil,
  Eye,
  Trash2,
  Search,
  FileText,
  Globe,
  Clock,
  Calendar,
  ChevronUp,
  ChevronDown as ChevronDownIcon,
  X,
  AlertCircle,
  Check,
  Loader2,
  ChevronLeft,
  ChevronRight,

  BookOpen,
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ─── Types ────────────────────────────────────────────────────────────────────

type PostStatus = 'published' | 'draft';
type SortKey = 'title' | 'publishedAt';
type SortDir = 'asc' | 'desc';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  status: PostStatus;
  thumbnail: string;
}

interface PostFormData {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  published: boolean;
  thumbnail: string;
}

interface FormErrors {
  title?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  content?: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  'Tin Tức BĐS',
  'Phân Tích Thị Trường',
  'Phong Thủy',
  'Kinh Nghiệm Đầu Tư',
  'Pháp Lý',
  'Dự Án Nổi Bật',
];

// Data is fetched from API via useQuery

const PAGE_SIZE = 5;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function isThisMonth(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

// ─── Write Post Modal ─────────────────────────────────────────────────────────

function WritePostModal({
  onClose,
  onSave,
  post,
}: {
  onClose: () => void;
  onSave: (post: any) => void;
  post?: any | null;
}) {
  const [form, setForm] = useState<PostFormData>({
    title: post?.title || '',
    slug: post?.slug || '',
    category: post?.category || CATEGORIES[0],
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    published: post?.status === 'published',
    thumbnail: post?.thumbnail || '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: prev.slug === '' || prev.slug === slugify(prev.title) ? slugify(value) : prev.slug,
    }));
    if (errors.title) setErrors((e) => ({ ...e, title: undefined }));
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.title.trim()) errs.title = 'Tiêu đề không được để trống';
    if (!form.slug.trim()) errs.slug = 'Slug không được để trống';
    if (!form.category) errs.category = 'Vui lòng chọn danh mục';
    if (!form.excerpt.trim()) errs.excerpt = 'Tóm tắt không được để trống';
    if (!form.content.trim()) errs.content = 'Nội dung không được để trống';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    const newPost: any = {
      id: post?.id || String(Date.now()),
      title: form.title,
      slug: form.slug,
      category: form.category,
      author: 'Admin',
      authorAvatar: 'AD',
      publishedAt: new Date().toISOString().split('T')[0],
      status: form.published ? 'published' : 'draft',
      thumbnail: '',
    };
    onSave(newPost);
    setSaving(false);
  };

  const inputCls = (error?: string) =>
    `w-full px-3 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
      error
        ? 'border-red-300 focus:ring-red-200 bg-red-50'
        : 'border-slate-200 focus:ring-blue-200 focus:border-blue-400 bg-white'
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Viết Bài Mới</h2>
              <p className="text-xs text-slate-500">Tạo bài viết mới cho blog của bạn</p>
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
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tiêu Đề <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="VD: Thị Trường BĐS 2026..."
              className={inputCls(errors.title)}
            />
            {errors.title && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.title}
              </p>
            )}
          </div>

          {/* Slug + Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Slug (URL) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm((p) => ({ ...p, slug: slugify(e.target.value) }))}
                placeholder="thi-truong-bds-2026"
                className={`${inputCls(errors.slug)} font-mono`}
              />
              {errors.slug && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.slug}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Danh Mục <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                  className="w-full appearance-none px-3 py-2.5 pr-8 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              URL Ảnh Đại Diện
            </label>
            <input
              type="text"
              value={form.thumbnail}
              onChange={(e) => setForm((p) => ({ ...p, thumbnail: e.target.value }))}
              placeholder="https://images.unsplash.com/..."
              className={inputCls()}
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tóm Tắt <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => {
                setForm((p) => ({ ...p, excerpt: e.target.value }));
                if (errors.excerpt) setErrors((e2) => ({ ...e2, excerpt: undefined }));
              }}
              placeholder="Mô tả ngắn gọn nội dung bài viết (hiển thị trên danh sách blog)..."
              rows={2}
              className={`${inputCls(errors.excerpt)} resize-none`}
            />
            {errors.excerpt && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.excerpt}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nội Dung <span className="text-red-500">*</span>
              <span className="ml-1 text-slate-400 font-normal">(Markdown hỗ trợ)</span>
            </label>
            <textarea
              value={form.content}
              onChange={(e) => {
                setForm((p) => ({ ...p, content: e.target.value }));
                if (errors.content) setErrors((e2) => ({ ...e2, content: undefined }));
              }}
              placeholder={`# Tiêu đề bài viết\n\nNhập nội dung bài viết tại đây...\n\n## Mục 1\n\nNội dung mục 1...`}
              rows={8}
              className={`${inputCls(errors.content)} font-mono text-xs resize-y`}
            />
            {errors.content && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.content}
              </p>
            )}
          </div>

          {/* Published toggle */}
          <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p className="text-sm font-semibold text-slate-800">Xuất Bản Ngay</p>
              <p className="text-xs text-slate-500">Bài viết sẽ hiển thị công khai trên website</p>
            </div>
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, published: !p.published }))}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
                form.published ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                  form.published ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Actions */}
          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white transition-all shadow-md shadow-blue-600/25 disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang đăng bài...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                {form.published ? 'Xuất Bản Bài Viết' : 'Lưu Nháp'}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PostsManagerPage() {
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

  const { data, isLoading } = useQuery({
    queryKey: ['posts', activeTenantId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/posts`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!activeTenantId,
  });

  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('publishedAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const posts = data?.map((p: any) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.summary || p.excerpt || '',
    category: p.category?.name || p.category || 'Tin Tức BĐS',
    author: p.author?.fullName || 'Admin',
    authorAvatar: p.author?.fullName?.substring(0, 2) || 'AD',
    publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    status: p.published ? 'published' : 'draft',
    thumbnail: p.thumbnail || '',
    content: p.content || '',
    version: p.version || 1,
  })) || [];

  const handleSave = useCallback(async (post: any) => {
    try {
      const payload = {
        title: post.title,
        slug: post.slug,
        summary: post.excerpt,
        content: post.content,
        thumbnail: post.thumbnail,
        published: post.status === 'published',
        version: post.version,
      };

      if (editingPost) {
        await axios.put(`${API_URL}/api/cms/posts/${editingPost.id}`, payload, { withCredentials: true });
      } else {
        await axios.post(`${API_URL}/api/cms/posts`, payload, { withCredentials: true });
      }
      queryClient.invalidateQueries({ queryKey: ['cms_posts'] });
      setShowModal(false);
      setEditingPost(null);
    } catch (error) {
      alert('Lỗi lưu bài viết');
    }
  }, [queryClient, editingPost]);

  const handleDelete = async (post: Post) => {
    if (!confirm(`Xóa bài viết "${post.title}"?`)) return;
    setDeletingId(post.id);
    try {
      await axios.delete(`${API_URL}/api/cms/posts/${post.id}`, { withCredentials: true });
      queryClient.invalidateQueries({ queryKey: ['cms_posts'] });
    } catch (error) {
      alert('Lỗi xóa bài viết');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
    setPage(1);
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return posts
      .filter(
        (p) =>
          !search ||
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        let cmp = 0;
        if (sortKey === 'title') cmp = a.title.localeCompare(b.title, 'vi');
        if (sortKey === 'publishedAt') cmp = a.publishedAt.localeCompare(b.publishedAt);
        return sortDir === 'asc' ? cmp : -cmp;
      });
  }, [posts, search, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col)
      return <ChevronDownIcon className="w-3 h-3 text-slate-300 inline ml-0.5" />;
    return sortDir === 'asc' ? (
      <ChevronUp className="w-3 h-3 text-blue-500 inline ml-0.5" />
    ) : (
      <ChevronDownIcon className="w-3 h-3 text-blue-500 inline ml-0.5" />
    );
  };

  const stats = [
    {
      label: 'Tổng Bài Viết',
      value: posts.length,
      icon: <FileText className="w-4 h-4 text-blue-500" />,
      bg: 'bg-blue-50',
    },
    {
      label: 'Đã Xuất Bản',
      value: posts.filter((p) => p.status === 'published').length,
      icon: <Globe className="w-4 h-4 text-emerald-500" />,
      bg: 'bg-emerald-50',
    },
    {
      label: 'Bản Nháp',
      value: posts.filter((p) => p.status === 'draft').length,
      icon: <Clock className="w-4 h-4 text-amber-500" />,
      bg: 'bg-amber-50',
    },
    {
      label: 'Tháng Này',
      value: posts.filter((p) => isThisMonth(p.publishedAt)).length,
      icon: <Calendar className="w-4 h-4 text-violet-500" />,
      bg: 'bg-violet-50',
    },
  ];

  const CATEGORY_COLORS: Record<string, string> = {
    'Tin Tức BĐS': 'bg-blue-50 text-blue-700 border-blue-200',
    'Phân Tích Thị Trường': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'Phong Thủy': 'bg-amber-50 text-amber-700 border-amber-200',
    'Kinh Nghiệm Đầu Tư': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Pháp Lý': 'bg-red-50 text-red-700 border-red-200',
    'Dự Án Nổi Bật': 'bg-violet-50 text-violet-700 border-violet-200',
  };

  return (
    <CMSLayout
      title="Quản Lý Bài Viết"
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Bài Viết' },
      ]}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900">Quản Lý Bài Viết</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Quản lý các bài viết và bài đăng trên blog của website
          </p>
        </div>
        <button
          onClick={() => {
            setEditingPost(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white transition-all shadow-md shadow-blue-600/25"
        >
          <Plus className="w-4 h-4" />
          Viết Bài Mới
        </button>
      </div>

      {/* ── Stats Row ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {stats.map((stat) => (
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

      {/* ── Table Card ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3 flex-wrap">
          <h3 className="text-sm font-bold text-slate-700">Danh Sách Bài Viết</h3>
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl min-w-[220px] shadow-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Tìm bài viết, danh mục..."
              className="flex-1 text-sm text-slate-700 bg-transparent outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Hình
                </th>
                <th
                  className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 select-none"
                  onClick={() => handleSort('title')}
                >
                  Tiêu Đề <SortIcon col="title" />
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                  Danh Mục
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                  Tác Giả
                </th>
                <th
                  className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell cursor-pointer hover:text-slate-700 select-none"
                  onClick={() => handleSort('publishedAt')}
                >
                  Ngày <SortIcon col="publishedAt" />
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                  Trạng Thái
                </th>
                <th className="px-5 py-3 text-right text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-3 text-slate-400">
                      <FileText className="w-10 h-10 opacity-30" />
                      <p className="text-sm font-medium">Không tìm thấy bài viết nào</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((post) => (
                  <tr key={post.id} className="group hover:bg-slate-50/70 transition-colors">
                    {/* Thumbnail */}
                    <td className="px-5 py-3.5">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                    </td>

                    {/* Title + excerpt */}
                    <td className="px-5 py-3.5 min-w-[220px] max-w-[320px]">
                      <p className="font-semibold text-slate-800 text-sm leading-snug line-clamp-1">
                        {post.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {post.excerpt}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${CATEGORY_COLORS[post.category] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}
                      >
                        {post.category}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[9px] font-black text-white shrink-0">
                          {post.authorAvatar}
                        </div>
                        <span className="text-xs text-slate-600 font-medium">{post.author}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-3.5 text-xs text-slate-500 hidden sm:table-cell whitespace-nowrap">
                      {formatDate(post.publishedAt)}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          post.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            post.status === 'published' ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                        {post.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setEditingPost(post);
                            setShowModal(true);
                          }}
                          title="Chỉnh sửa"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          title="Xem trước"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(post)}
                          disabled={deletingId === post.id}
                          title="Xóa"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                        >
                          {deletingId === post.id ? (
                            <span className="w-3.5 h-3.5 border-2 border-slate-300 border-t-red-400 rounded-full animate-spin block" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} / {filtered.length} bài viết
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => setPage(pg)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
                    pg === page
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'border border-slate-200 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {pg}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Modal ──────────────────────────────────────────────────── */}
      {showModal && (
        <WritePostModal 
          onClose={() => {
            setShowModal(false);
            setEditingPost(null);
          }} 
          onSave={handleSave} 
          post={editingPost}
        />
      )}
    </CMSLayout>
  );
}

