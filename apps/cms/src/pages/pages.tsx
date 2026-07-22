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
import CMSLayout from '../components/layout/CMSLayout';
import {
  Plus,
  Pencil,
  Eye,
  Trash2,
  Lock,
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

const INITIAL_PAGES: SitePage[] = [
  {
    id: '1',
    slug: 'home',
    title: 'Trang Chủ',
    description: 'Trang chủ chính của website',
    isSystem: true,
    published: true,
    sortOrder: 1,
    sections: 8,
  },
  {
    id: '2',
    slug: 'about',
    title: 'Giới Thiệu',
    description: 'Trang giới thiệu công ty',
    isSystem: true,
    published: true,
    sortOrder: 2,
    sections: 5,
  },
  {
    id: '3',
    slug: 'contact',
    title: 'Liên Hệ',
    description: 'Trang liên hệ & form',
    isSystem: true,
    published: false,
    sortOrder: 3,
    sections: 3,
  },
  {
    id: '4',
    slug: 'projects',
    title: 'Dự Án',
    description: 'Danh sách dự án bất động sản',
    isSystem: true,
    published: true,
    sortOrder: 4,
    sections: 4,
  },
];

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
      <Lock className="w-2.5 h-2.5" />
      Hệ Thống
    </span>
  );
}

// ─── Add Page Modal ────────────────────────────────────────────────────────────

function AddPageModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (page: SitePage) => void;
}) {
  const [form, setForm] = useState<NewPageForm>({
    slug: '',
    title: '',
    description: '',
    published: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: prev.slug === '' || prev.slug === slugify(prev.title) ? slugify(value) : prev.slug,
    }));
    if (errors.title) setErrors((e) => ({ ...e, title: undefined }));
  };

  const handleSlugChange = (value: string) => {
    setForm((prev) => ({ ...prev, slug: slugify(value) }));
    if (errors.slug) setErrors((e) => ({ ...e, slug: undefined }));
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.title.trim()) errs.title = 'Tên trang không được để trống';
    if (!form.slug.trim()) errs.slug = 'Slug không được để trống';
    else if (!/^[a-z0-9-]+$/.test(form.slug)) errs.slug = 'Slug chỉ chứa chữ thường, số và dấu gạch ngang';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    const newPage: SitePage = {
      id: String(Date.now()),
      slug: form.slug,
      title: form.title,
      description: form.description,
      isSystem: false,
      published: form.published,
      sortOrder: 99,
      sections: 0,
    };
    onAdd(newPage);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <LayoutTemplate className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Thêm Trang Mới</h2>
              <p className="text-xs text-slate-500">Tạo trang website tùy chỉnh</p>
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
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tên Trang <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="VD: Chính Sách Bảo Mật"
              className={`w-full px-3 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.title
                  ? 'border-red-300 focus:ring-red-200 bg-red-50'
                  : 'border-slate-200 focus:ring-blue-200 focus:border-blue-400 bg-white'
              }`}
            />
            {errors.title && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Slug (URL) <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-400 overflow-hidden bg-white">
              <span className="px-3 py-2.5 text-sm text-slate-400 bg-slate-50 border-r border-slate-200 shrink-0 select-none">
                /
              </span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="chinh-sach-bao-mat"
                className={`flex-1 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-mono ${
                  errors.slug ? 'bg-red-50' : 'bg-white'
                }`}
              />
            </div>
            {errors.slug && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.slug}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Mô Tả <span className="text-slate-400 font-normal">(tùy chọn)</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="Mô tả ngắn về nội dung trang..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none bg-white"
            />
          </div>

          {/* Published toggle */}
          <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p className="text-sm font-semibold text-slate-800">Xuất Bản Ngay</p>
              <p className="text-xs text-slate-500">Trang sẽ hiển thị trên website công khai</p>
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
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Hủy Bỏ
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white transition-all shadow-md shadow-blue-600/25 disabled:opacity-60"
            >
              {saving ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang tạo...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Tạo Trang
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PagesManagerPage() {
  const [pages, setPages] = useState<SitePage[]>(INITIAL_PAGES);
  const [showModal, setShowModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAddPage = (page: SitePage) => {
    setPages((prev) => [...prev, page]);
    setShowModal(false);
  };

  const handleDelete = async (page: SitePage) => {
    if (page.isSystem) return;
    if (!confirm(`Bạn có chắc muốn xóa trang "${page.title}"?`)) return;
    setDeletingId(page.id);
    await new Promise((r) => setTimeout(r, 500));
    setPages((prev) => prev.filter((p) => p.id !== page.id));
    setDeletingId(null);
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
            Quản lý các trang hiển thị trên website của bạn
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
            label: 'Trang Hệ Thống',
            value: pages.filter((p) => p.isSystem).length,
            icon: <Lock className="w-4 h-4 text-indigo-500" />,
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
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Trang
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                    Trạng Thái
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                    Sections
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                    Loại
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
                          <div className="font-semibold text-slate-800 text-sm">{page.title}</div>
                          {page.description && (
                            <div className="text-xs text-slate-400 truncate max-w-[180px]">
                              {page.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="px-5 py-3.5">
                      <code className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                        /{page.slug}
                      </code>
                    </td>

                    {/* Published badge */}
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <PublishedBadge published={page.published} />
                    </td>

                    {/* Sections */}
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className="text-sm font-semibold text-slate-700">{page.sections}</span>
                      <span className="text-xs text-slate-400 ml-1">sections</span>
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
                      <div className="flex items-center justify-end gap-1">
                        {/* Edit */}
                        <button
                          title="Chỉnh sửa"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>

                        {/* Preview */}
                        <button
                          title="Xem trước"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        {page.isSystem ? (
                          <button
                            disabled
                            title="Trang hệ thống không thể xóa"
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
    </CMSLayout>
  );
}
