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

const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));

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

import RichTextEditor from '../components/common/RichTextEditor';
import ImageUploader from '../components/common/ImageUploader';
import ItemPreviewModal from '../components/common/ItemPreviewModal';

const POPULAR_AMENITIES = [
  'Hồ bơi vô cực',
  'Công viên ven sông',
  'Bến du thuyền',
  'Phòng Gym & Yoga',
  'An ninh đa lớp 24/7',
  'Sân chơi trẻ em',
  'Trung tâm thương mại',
  'Khu BBQ ngoài trời',
  'Chỗ đậu xe thông minh',
  'Sảnh đón 5 sao',
];

// ─── Add/Edit Project Modal (Low-Tech Friendly) ────────────────────────────────

function ProjectModal({
  onClose,
  onSave,
  project,
}: {
  onClose: () => void;
  onSave: (project: any) => void;
  project?: any | null;
}) {
  const [name, setName] = useState(project?.name || '');
  const [customSlug, setCustomSlug] = useState('');
  const [type, setType] = useState<ProjectType>(project?.type || 'Căn hộ');
  const [address, setAddress] = useState(project?.address || '');
  const [description, setDescription] = useState(project?.description || '');
  const [priceText, setPriceText] = useState(project?.priceText || (project?.priceFrom ? formatPrice(project.priceFrom) : ''));
  const [priceFrom, setPriceFrom] = useState(project?.priceFrom ? String(project.priceFrom) : '');
  const [priceTo, setPriceTo] = useState(project?.priceTo ? String(project.priceTo) : '');
  const [area, setArea] = useState(project?.area || '');
  const [thumbnail, setThumbnail] = useState(project?.thumbnail || '');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    project?.amenities || ['Hồ bơi vô cực', 'An ninh đa lớp 24/7']
  );
  const [published, setPublished] = useState(project ? project.status === 'published' : true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const autoSlug = slugify(name || 'du-an-moi');
  const finalSlug = customSlug.trim() ? slugify(customSlug) : (project?.slug || autoSlug);

  const toggleAmenity = (item: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Vui lòng nhập tên dự án.';
    if (!address.trim()) errs.address = 'Vui lòng nhập địa chỉ dự án.';
    if (priceFrom && priceTo && Number(priceTo) > 0 && Number(priceTo) < Number(priceFrom)) {
      errs.priceTo = 'Giá đến phải lớn hơn hoặc bằng giá từ.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    const newProject: any = {
      id: project?.id || String(Date.now()),
      name: name.trim(),
      slug: finalSlug,
      type,
      address: address.trim(),
      description: description.trim() || `<p>${name}</p>`,
      priceText: priceText.trim() || (priceFrom ? `${priceFrom} triệu` : 'Liên hệ'),
      priceFrom: priceFrom ? Number(priceFrom) : 0,
      priceTo: priceTo ? Number(priceTo) : 0,
      area: area.trim(),
      thumbnail: thumbnail.trim() || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      amenities: selectedAmenities,
      status: published ? 'published' : 'draft',
      featured: project?.featured || false,
      version: project?.version || 1,
    };
    onSave(newProject);
    setSaving(false);
  };

  const inputCls = (errKey?: string) =>
    `w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
      errKey && errors[errKey]
        ? 'border-red-300 focus:ring-red-200 bg-red-50'
        : 'border-slate-200 focus:ring-blue-200 focus:border-blue-400 bg-white'
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white sm:rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-screen sm:max-h-[92vh] flex flex-col h-full sm:h-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">{project ? 'Chỉnh Sửa Dự Án' : 'Thêm Dự Án Mới'}</h2>
              <p className="text-xs text-slate-500">Nhập thông tin dự án dễ dàng, hệ thống sẽ tự động trình bày đẹp mắt</p>
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
          {/* Project Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tên Dự Án <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              placeholder="VD: Căn hộ Duplex Golden Heritage, Biệt thự Đảo Royal..."
              className={inputCls('name')}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          {/* Type + Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Loại Hình BĐS <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as ProjectType)}
                  className="w-full appearance-none px-3.5 py-2.5 pr-8 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white"
                >
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Địa Chỉ Dự Án <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (errors.address) setErrors((prev) => ({ ...prev, address: '' }));
                }}
                placeholder="VD: Thủ Thiêm, TP. Thủ Đức, TP. HCM"
                className={inputCls('address')}
              />
              {errors.address && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.address}
                </p>
              )}
            </div>
          </div>

          {/* Image Uploader */}
          <div>
            <ImageUploader
              value={thumbnail}
              onChange={setThumbnail}
              label="Ảnh Đại Diện Dự Án"
              hint="Kéo thả ảnh hoặc bấm chọn file (Khuyến nghị tỉ lệ 16:9, tối đa 10MB)"
            />
          </div>

          {/* Visual Rich Text Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Mô Tả Chi Tiết Dự Án
            </label>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Soạn thảo thông tin thiết kế, view sông, tiện ích, chính sách bán hàng..."
              minHeight="160px"
            />
          </div>

          {/* Price & Area */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Mức Giá Hiển Thị
              </label>
              <input
                type="text"
                value={priceText}
                onChange={(e) => setPriceText(e.target.value)}
                placeholder="VD: 62 tỷ, Từ 35 tỷ..."
                className={inputCls()}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Giá Từ (triệu VNĐ)
              </label>
              <input
                type="number"
                min={0}
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                placeholder="VD: 35000"
                className={inputCls()}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Diện Tích (m²)
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="VD: 180m² hoặc 240m²"
                className={inputCls()}
              />
            </div>
          </div>

          {/* Amenities Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Tiện Ích Nổi Bật (Bấm chọn nhanh)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_AMENITIES.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {amenity}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Published Toggle */}
          <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p className="text-sm font-bold text-slate-800">Hiển Thị Trên Website</p>
              <p className="text-xs text-slate-500">Khách truy cập có thể tìm thấy dự án này trên trang web</p>
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

          {/* Advanced URL Option */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowAdvanced((v) => !v)}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1"
            >
              <span>{showAdvanced ? '▼ Thu gọn tùy chọn nâng cao' : '▶ Tùy chọn nâng cao (Đường dẫn dự án)'}</span>
            </button>
            {showAdvanced && (
              <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <p className="text-slate-500">
                  Đường dẫn dự án tự động: <code className="font-mono text-indigo-600 font-bold bg-white px-2 py-0.5 rounded border">/du-an/{finalSlug}</code>
                </p>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Tự chỉnh đường dẫn (nếu muốn):
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
              {saving ? 'Đang lưu...' : project ? 'Lưu Thay Đổi' : 'Lưu Dự Án'}
            </button>
          </div>
        </form>
      </div>

      {showPreview && (
        <ItemPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          type="project"
          data={{
            title: name || 'Tên Dự Án Mẫu',
            type,
            address: address || 'Địa chỉ dự án',
            price: priceText || (priceFrom ? `Từ ${priceFrom} triệu` : 'Liên hệ báo giá'),
            priceFrom,
            area,
            thumbnail,
            description: description || '<p>Thông tin dự án đang cập nhật...</p>',
            amenities: selectedAmenities,
          }}
        />
      )}
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  onEdit,
  onToggleFeatured,
  onDelete,
  domainSlug,
}: {
  project: any;
  onEdit: () => void;
  onToggleFeatured: (id: string) => void;
  onDelete: (id: string) => void;
  domainSlug?: string;
}) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Xóa dự án "${project.name}"?`)) return;
    setDeleting(true);
    await new Promise((r) => setTimeout(r, 500));
    onDelete(project.id);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group flex flex-col justify-between">
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={project.thumbnail}
          alt={project.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80';
          }}
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
      <div className="p-4 flex-1">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border mb-2 ${TYPE_COLORS[project.type as ProjectType] || 'bg-slate-100 text-slate-700'}`}
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
          {project.priceText || (project.priceTo && project.priceTo > project.priceFrom
            ? `${formatPrice(project.priceFrom)} – ${formatPrice(project.priceTo)}`
            : project.priceFrom ? formatPrice(project.priceFrom) : 'Liên hệ')}
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
          href={`https://${domainSlug || 'hoanggialand'}.${process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'templates.aireviewbds.com'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          title="Xem trên Website"
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
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/projects`, { withCredentials: true });
      return res.data.data;
    },
  });

  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Map backend data to frontend format
  const projects = data?.map((p: any) => ({
    id: p.id,
    name: p.title || p.name,
    slug: p.slug,
    type: p.type === 'APARTMENT' ? 'Căn hộ' : p.type === 'VILLA' ? 'Biệt thự' : p.type === 'COMMERCIAL' || p.type === 'TOWNHOUSE' ? 'Shophouse' : 'Nghỉ dưỡng',
    address: p.address || p.city || 'TP. Hồ Chí Minh',
    description: p.description || p.shortDescription || '',
    priceFrom: p.priceFrom || 0,
    priceTo: p.priceTo || 0,
    priceText: p.price || (p.priceFrom ? formatPrice(p.priceFrom) : 'Liên hệ'),
    status: p.published ? 'published' : 'draft',
    featured: p.featured || false,
    thumbnail: p.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
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
        price: project.priceText || (project.priceFrom ? `${project.priceFrom} triệu` : 'Liên hệ'),
        priceFrom: project.priceFrom ? Number(project.priceFrom) : undefined,
        priceTo: project.priceTo ? Number(project.priceTo) : undefined,
        area: project.area,
        thumbnail: project.thumbnail,
        published: project.status === 'published',
        version: project.version || 1,
      };

      if (editingProject) {
        await axios.put(`${API_URL}/api/cms/projects/${editingProject.id}`, payload, { withCredentials: true });
      } else {
        await axios.post(`${API_URL}/api/cms/projects`, payload, { withCredentials: true });
      }
      queryClient.invalidateQueries({ queryKey: ['projects'] });
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
        price: rawProj.price || 'Liên hệ',
        area: rawProj.area || '',
        thumbnail: rawProj.thumbnail || '',
        published: rawProj.published,
        featured: !rawProj.featured,
        version: rawProj.version || 1
      }, { withCredentials: true });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    } catch (error) {
      alert('Lỗi cập nhật dự án nổi bật');
    }
  }, [data, queryClient]);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await axios.delete(`${API_URL}/api/cms/projects/${id}`, { withCredentials: true });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
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

