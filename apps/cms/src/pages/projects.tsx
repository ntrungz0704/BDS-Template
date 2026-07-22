/**
 * CMS Projects Manager
 *
 * Manage tenant real-estate projects with full CRUD (mock data, no API).
 *   - Stats row: total, published, pending, featured
 *   - Search + type filter
 *   - 3-column grid cards with thumbnail, badges, progress bar, actions
 *   - Add/Edit modal with validation and loading state
 */

import React, { useState, useCallback } from 'react';
import CMSLayout from '../components/layout/CMSLayout';
import {
  Plus,
  Pencil,
  Eye,
  Trash2,
  Star,
  Search,
  Building2,
  MapPin,
  X,
  AlertCircle,
  Check,
  Loader2,
  Globe,
  Clock,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ─── Types ────────────────────────────────────────────────────────────────────

type ProjectType = 'Biệt thự' | 'Căn hộ' | 'Shophouse' | 'Nghỉ dưỡng';
type ProjectStatus = 'published' | 'draft';

interface Project {
  id: string;
  name: string;
  slug: string;
  type: ProjectType;
  address: string;
  description: string;
  priceFrom: number;
  priceTo: number;
  status: ProjectStatus;
  featured: boolean;
  thumbnail: string;
  progress?: number;
}

interface ProjectFormData {
  name: string;
  slug: string;
  type: ProjectType;
  address: string;
  description: string;
  priceFrom: string;
  priceTo: string;
  published: boolean;
  area: string;
  thumbnail: string;
}

interface FormErrors {
  name?: string;
  slug?: string;
  address?: string;
  description?: string;
  priceFrom?: string;
  priceTo?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

// ─── (INITIAL_PROJECTS removed — data is fetched from API) ────────────────

const PROJECT_TYPES: ProjectType[] = ['Biệt thự', 'Căn hộ', 'Shophouse', 'Nghỉ dưỡng'];

const TYPE_COLORS: Record<ProjectType, string> = {
  'Biệt thự': 'bg-violet-50 text-violet-700 border-violet-200',
  'Căn hộ': 'bg-blue-50 text-blue-700 border-blue-200',
  'Shophouse': 'bg-amber-50 text-amber-700 border-amber-200',
  'Nghỉ dưỡng': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

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

function formatPrice(amount: number) {
  if (amount >= 1000) return `${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)} tỷ`;
  return `${amount} triệu`;
}

// ─── Add Project Modal ────────────────────────────────────────────────────────

function ProjectModal({
  onClose,
  onSave,
  project,
}: {
  onClose: () => void;
  onSave: (project: any) => void;
  project?: any | null;
}) {
  const [form, setForm] = useState<ProjectFormData>({
    name: project?.name || '',
    slug: project?.slug || '',
    type: project?.type || 'Căn hộ',
    address: project?.address || '',
    description: project?.description || '',
    priceFrom: project?.priceFrom ? String(project.priceFrom) : '',
    priceTo: project?.priceTo ? String(project.priceTo) : '',
    published: project?.status === 'published',
    area: project?.area || '',
    thumbnail: project?.thumbnail || '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  const handleNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: prev.slug === '' || prev.slug === slugify(prev.name) ? slugify(value) : prev.slug,
    }));
    if (errors.name) setErrors((e) => ({ ...e, name: undefined }));
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'Tên dự án không được để trống';
    if (!form.slug.trim()) errs.slug = 'Slug không được để trống';
    if (!form.address.trim()) errs.address = 'Địa chỉ không được để trống';
    if (!form.description.trim()) errs.description = 'Mô tả ngắn không được để trống';
    if (!form.priceFrom || isNaN(Number(form.priceFrom))) errs.priceFrom = 'Giá từ phải là số hợp lệ';
    if (form.priceTo && isNaN(Number(form.priceTo))) errs.priceTo = 'Giá đến phải là số hợp lệ';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    const newProject: any = {
      id: project?.id || String(Date.now()),
      name: form.name,
      slug: form.slug,
      type: form.type,
      address: form.address,
      description: form.description,
      priceFrom: Number(form.priceFrom),
      priceTo: form.priceTo ? Number(form.priceTo) : 0,
      status: form.published ? 'published' : 'draft',
      featured: project?.featured || false,
      thumbnail: form.thumbnail,
      area: form.area,
      version: project?.version || 1,
    };
    onSave(newProject);
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
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Thêm Dự Án Mới</h2>
              <p className="text-xs text-slate-500">Điền đầy đủ thông tin dự án bất động sản</p>
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
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tên Dự Án <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="VD: Vinhomes Grand Park"
              className={inputCls(errors.name)}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
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
                /du-an/
              </span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) =>
                  setForm((p) => ({ ...p, slug: slugify(e.target.value) }))
                }
                placeholder="vinhomes-grand-park"
                className={`flex-1 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-mono ${errors.slug ? 'bg-red-50' : 'bg-white'}`}
              />
            </div>
            {errors.slug && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.slug}
              </p>
            )}
          </div>

          {/* Type + Address */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Loại Hình <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, type: e.target.value as ProjectType }))
                  }
                  className="w-full appearance-none px-3 py-2.5 pr-8 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white"
                >
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Địa Chỉ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => {
                  setForm((p) => ({ ...p, address: e.target.value }));
                  if (errors.address) setErrors((e2) => ({ ...e2, address: undefined }));
                }}
                placeholder="Quận 9, TP. HCM"
                className={inputCls(errors.address)}
              />
              {errors.address && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.address}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Mô Tả Ngắn <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => {
                setForm((p) => ({ ...p, description: e.target.value }));
                if (errors.description) setErrors((e2) => ({ ...e2, description: undefined }));
              }}
              placeholder="Mô tả nổi bật của dự án..."
              rows={3}
              className={`${inputCls(errors.description)} resize-none`}
            />
            {errors.description && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.description}
              </p>
            )}
          </div>

          {/* Price range */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Giá Từ (triệu) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={0}
                value={form.priceFrom}
                onChange={(e) => {
                  setForm((p) => ({ ...p, priceFrom: e.target.value }));
                  if (errors.priceFrom) setErrors((e2) => ({ ...e2, priceFrom: undefined }));
                }}
                placeholder="2500"
                className={inputCls(errors.priceFrom)}
              />
              {errors.priceFrom && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.priceFrom}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Giá Đến (triệu) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={0}
                value={form.priceTo}
                onChange={(e) => {
                  setForm((p) => ({ ...p, priceTo: e.target.value }));
                  if (errors.priceTo) setErrors((e2) => ({ ...e2, priceTo: undefined }));
                }}
                placeholder="6800"
                className={inputCls(errors.priceTo)}
              />
              {errors.priceTo && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.priceTo}
                </p>
              )}
            </div>
          </div>

          {/* Area & Thumbnail */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Diện Tích (ví dụ: 120m² hoặc 120)
              </label>
              <input
                type="text"
                value={form.area}
                onChange={(e) => setForm((p) => ({ ...p, area: e.target.value }))}
                placeholder="120m²"
                className={inputCls()}
              />
            </div>
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
          </div>

          {/* Published toggle */}
          <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p className="text-sm font-semibold text-slate-800">Xuất Bản Ngay</p>
              <p className="text-xs text-slate-500">Dự án sẽ hiển thị công khai trên website</p>
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
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Thêm Dự Án
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  onEdit,
  onToggleFeatured,
  onDelete,
}: {
  project: any;
  onEdit: () => void;
  onToggleFeatured: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Xóa dự án "${project.name}"?`)) return;
    setDeleting(true);
    await new Promise((r) => setTimeout(r, 500));
    onDelete(project.id);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={project.thumbnail}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Published badge — top right */}
        <div className="absolute top-2.5 right-2.5">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold shadow-sm ${
              project.status === 'published'
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-700/80 text-white'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                project.status === 'published' ? 'bg-white' : 'bg-slate-400'
              }`}
            />
            {project.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
          </span>
        </div>

        {/* Featured star — top left */}
        <button
          onClick={() => onToggleFeatured(project.id)}
          className={`absolute top-2.5 left-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all ${
            project.featured
              ? 'bg-amber-400 text-white'
              : 'bg-white/80 text-slate-400 hover:bg-amber-50 hover:text-amber-500'
          }`}
          title={project.featured ? 'Bỏ nổi bật' : 'Đánh dấu nổi bật'}
        >
          <Star
            className="w-3.5 h-3.5"
            fill={project.featured ? 'currentColor' : 'none'}
          />
        </button>

        {/* Progress overlay */}
        {project.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/30">
            <div
              className="h-full bg-blue-400 transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border mb-2 ${TYPE_COLORS[project.type]}`}
        >
          {project.type}
        </span>

        <h3 className="font-black text-slate-900 text-sm leading-snug mb-1 line-clamp-1">
          {project.name}
        </h3>

        <p className="text-xs text-slate-500 flex items-center gap-1 mb-2">
          <MapPin className="w-3 h-3 shrink-0" />
          {project.address}
        </p>

        <p className="text-sm font-bold text-blue-700">
          {project.priceTo && project.priceTo > project.priceFrom
            ? `${formatPrice(project.priceFrom)} – ${formatPrice(project.priceTo)}`
            : formatPrice(project.priceFrom)}
        </p>

        {project.progress !== undefined && (
          <div className="mt-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-slate-500 font-medium">Tiến độ xây dựng</span>
              <span className="text-[10px] font-bold text-slate-700">{project.progress}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex items-center gap-1.5">
        <button 
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" />
          Sửa
        </button>
        <a
          href="/demo/luxury-gold"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          title="Xem trước"
        >
          <Eye className="w-3.5 h-3.5" />
        </a>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors disabled:opacity-40"
          title="Xóa"
        >
          {deleting ? (
            <span className="w-3.5 h-3.5 border-2 border-slate-300 border-t-red-400 rounded-full animate-spin block" />
          ) : (
            <Trash2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProjectsManagerPage() {
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
    queryKey: ['projects', activeTenantId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/projects`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!activeTenantId,
  });

  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Map backend data to frontend format (or use backend format directly)
  const projects = data?.map((p: any) => ({
    id: p.id,
    name: p.title || p.name,
    slug: p.slug,
    type: p.type === 'APARTMENT' ? 'Căn hộ' : p.type === 'VILLA' ? 'Biệt thự' : 'Shophouse',
    address: p.address || '',
    description: p.description || '',
    priceFrom: p.priceFrom || 0,
    priceTo: p.priceTo || 0,
    status: p.published ? 'published' : 'draft',
    featured: p.featured || false,
    thumbnail: p.thumbnail || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    progress: p.progress,
  })) || [];

  const handleSave = useCallback(async (project: any) => {
    try {
      const typeMap: Record<string, string> = {
        'Căn hộ': 'APARTMENT',
        'Biệt thự': 'VILLA',
        'Shophouse': 'TOWNHOUSE',
        'Nghỉ dưỡng': 'COMMERCIAL',
      };
      
      const payload = {
        title: project.name,
        slug: project.slug,
        type: typeMap[project.type] || 'APARTMENT',
        status: 'SELLING', // Trạng thái bắt buộc bởi backend Zod schema
        address: project.address,
        description: project.description,
        priceFrom: project.priceFrom,
        priceTo: project.priceTo,
        area: project.area,
        thumbnail: project.thumbnail,
        published: project.status === 'published',
        version: project.version,
      };

      if (editingProject) {
        await axios.put(`${API_URL}/api/cms/projects/${editingProject.id}`, payload, { withCredentials: true });
      } else {
        await axios.post(`${API_URL}/api/cms/projects`, payload, { withCredentials: true });
      }
      queryClient.invalidateQueries({ queryKey: ['cms_projects'] });
      setShowModal(false);
      setEditingProject(null);
    } catch (error) {
      alert('Lỗi lưu dự án');
    }
  }, [queryClient, editingProject]);

  const handleToggleFeatured = useCallback(async (id: string) => {
    const rawProj = data?.find((x: any) => x.id === id);
    if (!rawProj) return;
    try {
      await axios.put(`${API_URL}/api/cms/projects/${id}`, {
        title: rawProj.title,
        slug: rawProj.slug,
        type: rawProj.type,
        status: rawProj.status || 'SELLING',
        address: rawProj.address || '',
        description: rawProj.description || '',
        priceFrom: rawProj.priceFrom ? Number(rawProj.priceFrom) : undefined,
        priceTo: rawProj.priceTo ? Number(rawProj.priceTo) : undefined,
        area: rawProj.area || '',
        thumbnail: rawProj.thumbnail || '',
        published: rawProj.published,
        featured: !rawProj.featured,
        version: rawProj.version
      }, { withCredentials: true });
      queryClient.invalidateQueries({ queryKey: ['cms_projects'] });
    } catch (error) {
      alert('Lỗi cập nhật dự án nổi bật');
    }
  }, [data, queryClient]);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await axios.delete(`${API_URL}/api/cms/projects/${id}`, { withCredentials: true });
      queryClient.invalidateQueries({ queryKey: ['cms_projects'] });
    } catch (error) {
      alert('Lỗi xóa dự án');
    }
  }, [queryClient]);

  const filtered = projects.filter((p) => {
    const q = search.toLowerCase();
    const nameMatch =
      !search ||
      p.name.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q);
    const typeMatch = typeFilter === 'all' || p.type === typeFilter;
    return nameMatch && typeMatch;
  });

  const stats = [
    {
      label: 'Tổng Dự Án',
      value: projects.length,
      icon: <Building2 className="w-4 h-4 text-blue-500" />,
      bg: 'bg-blue-50',
    },
    {
      label: 'Đã Xuất Bản',
      value: projects.filter((p) => p.status === 'published').length,
      icon: <Globe className="w-4 h-4 text-emerald-500" />,
      bg: 'bg-emerald-50',
    },
    {
      label: 'Đang Chờ',
      value: projects.filter((p) => p.status === 'draft').length,
      icon: <Clock className="w-4 h-4 text-amber-500" />,
      bg: 'bg-amber-50',
    },
    {
      label: 'Nổi Bật',
      value: projects.filter((p) => p.featured).length,
      icon: <Sparkles className="w-4 h-4 text-violet-500" />,
      bg: 'bg-violet-50',
    },
  ];

  return (
    <CMSLayout
      title="Quản Lý Dự Án"
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Dự Án' },
      ]}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900">Quản Lý Dự Án</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Quản lý và xuất bản các dự án bất động sản trên website
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProject(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white transition-all shadow-md shadow-blue-600/25"
        >
          <Plus className="w-4 h-4" />
          Thêm Dự Án Mới
        </button>
      </div>

      {/* ── Stats Row ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-3"
          >
            <div
              className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}
            >
              {stat.icon}
            </div>
            <div>
              <div className="text-xl font-black text-slate-900">{stat.value}</div>
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters ────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-2.5 bg-white border border-slate-200 rounded-xl flex-1 min-w-[200px] shadow-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm dự án theo tên hoặc địa chỉ..."
            className="flex-1 text-sm text-slate-700 bg-transparent outline-none placeholder:text-slate-400"
          />
        </div>
        <div className="flex gap-1 bg-slate-100 p-0.5 rounded-xl">
          {(['all', ...PROJECT_TYPES] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-[9px] text-xs font-semibold transition-all ${
                typeFilter === t
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t === 'all' ? 'Tất cả' : t}
            </button>
          ))}
        </div>
      </div>

      {/* ── Projects Grid ──────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <Building2 className="w-7 h-7 text-slate-400" />
          </div>
          <h3 className="text-base font-bold text-slate-700 mb-1">Không tìm thấy dự án</h3>
          <p className="text-sm text-slate-500 mb-5 max-w-xs">
            Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setTypeFilter('all');
            }}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Xoá bộ lọc
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={() => {
                  setEditingProject(project);
                  setShowModal(true);
                }}
                onToggleFeatured={handleToggleFeatured}
                onDelete={handleDelete}
              />
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4 text-right">
            Hiển thị {filtered.length} / {projects.length} dự án
          </p>
        </>
      )}

      {/* ── Modal ──────────────────────────────────────────────────── */}
      {showModal && (
        <ProjectModal 
          onClose={() => {
            setShowModal(false);
            setEditingProject(null);
          }} 
          onSave={handleSave} 
          project={editingProject}
        />
      )}
    </CMSLayout>
  );
}
