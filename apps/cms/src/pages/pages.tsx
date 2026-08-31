import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));
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
  LayoutTemplate,
  ChevronDown,
  ChevronUp,
  EyeOff,
  Save,
  Trash,
  ArrowLeft,
  Zap,
  Sparkles
} from 'lucide-react';
import RichTextEditor from '../components/common/RichTextEditor';
import ItemPreviewModal from '../components/common/ItemPreviewModal';

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

function generateSlug(text: string, existingSlugs: string[] = []): string {
  let slug = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\\s-]/g, '')
    .replace(/\\s+/g, '-')
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

// ─── Add Page Modal ────────────────────────────────────────────────────────────

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
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onClose} />
        <div className="relative bg-white sm:rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-screen sm:max-h-[92vh] flex flex-col h-full sm:h-auto">
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
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 overflow-y-auto flex-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Tên Trang <span className="text-red-500">*</span></label>
              <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); if (error) setError(null); }} placeholder="VD: Chính Sách Bảo Mật, Giới Thiệu Doanh Nghiệp..." className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${error ? 'border-red-300 focus:ring-red-200 bg-red-50' : 'border-slate-200 focus:ring-blue-200 focus:border-blue-400 bg-white'}`} />
              {error && <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Nội Dung Trang (Trình Soạn Thảo Trực Quan)</label>
              <RichTextEditor value={content} onChange={setContent} placeholder="Nhập nội dung bài viết, chính sách, hoặc thông tin hiển thị trên trang..." minHeight="200px" />
            </div>
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-sm font-bold text-slate-800">Hiển Thị Trên Website</p>
                <p className="text-xs text-slate-500">Khách truy cập có thể nhìn thấy trang này</p>
              </div>
              <button type="button" onClick={() => setPublished((p) => !p)} className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${published ? 'bg-blue-600' : 'bg-slate-300'}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-xs transition-transform duration-200 ${published ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            <div className="pt-1">
              <button type="button" onClick={() => setShowAdvanced((v) => !v)} className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1">
                <span>{showAdvanced ? '▼ Thu gọn tùy chọn nâng cao' : '▶ Tùy chọn nâng cao (Đường dẫn trang)'}</span>
              </button>
              {showAdvanced && (
                <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <p className="text-slate-500">Đường dẫn trang web tự động: <code className="font-mono text-indigo-600 font-bold bg-white px-2 py-0.5 rounded border">/{finalSlug}</code></p>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Tự chỉnh đường dẫn (nếu cần):</label>
                    <input type="text" value={customSlug} onChange={(e) => setCustomSlug(e.target.value)} placeholder={autoSlug} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-mono" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-slate-100 shrink-0">
              <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Hủy Bỏ</button>
              <button type="button" onClick={() => setShowPreview(true)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700 transition-colors"><Eye className="w-4 h-4 text-slate-500" />Xem Trước</button>
              <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white transition-all shadow-md shadow-blue-600/25 disabled:opacity-60">{saving ? 'Đang tạo...' : 'Lưu Trang Mới'}</button>
            </div>
          </form>
        </div>
      </div>
      {showPreview && <ItemPreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} type="page" data={{ title: title || 'Tiêu Đề Trang Mới', content: content || '<p>Nội dung trang web hiển thị ở đây...</p>' }} />}
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
    onSave({ slug: page.slug, title: title.trim(), description: content, published });
    setSaving(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onClose} />
        <div className="relative bg-white sm:rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-screen sm:max-h-[92vh] flex flex-col h-full sm:h-auto animate-scale-up">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center"><Pencil className="w-4 h-4 text-blue-600" /></div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Sửa Metadata Trang</h2>
                <p className="text-xs text-slate-500">Đường dẫn: /{page.slug}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"><X className="w-4 h-4" /></button>
          </div>
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 overflow-y-auto flex-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Tên Trang <span className="text-red-500">*</span></label>
              <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); if (error) setError(null); }} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm text-slate-800 outline-none" />
              {error && <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Mô Tả / Nội Dung Metadata</label>
              <RichTextEditor value={content} onChange={setContent} placeholder="Nhập nội dung trang web..." minHeight="200px" />
            </div>
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-sm font-bold text-slate-800">Hiển Thị Trên Website</p>
                <p className="text-xs text-slate-500">Khách truy cập có thể nhìn thấy trang này</p>
              </div>
              <button type="button" onClick={() => setPublished((p) => !p)} className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${published ? 'bg-blue-600' : 'bg-slate-300'}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-xs transition-transform duration-200 ${published ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-slate-100 shrink-0">
              <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Hủy Bỏ</button>
              <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white transition-all shadow-md shadow-blue-600/25 disabled:opacity-60">{saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// ─── Section Editor Schema & Component ──────────────────────────────────────

type FieldType = 'text' | 'textarea' | 'number' | 'array';
interface FieldDef {
  name: string;
  type: FieldType;
  label: string;
  itemFields?: FieldDef[];
}

const SECTION_NAMES: Record<string, { name: string; desc: string; icon: string }> = {
  hero: { name: 'Hero Banner (Tiêu Đề & Ảnh Nền)', desc: 'Ảnh nền lớn, tiêu đề chính, nút kêu gọi hành động (CTA) và thống kê nhanh', icon: '🌟' },
  stats: { name: 'Thống Kê Nổi Bật (Chỉ Số)', desc: 'Số lượng dự án, diện tích, đối tác, tỷ lệ hài lòng', icon: '📊' },
  overview: { name: 'Tổng Quan & Loại Hình BĐS', desc: 'Phân loại biệt thự, căn hộ cao cấp, shophouse, đất nền', icon: '🏢' },
  projects: { name: 'Danh Mục Dự Án Bất Động Sản', desc: 'Danh sách thẻ dự án đang mở bán kèm giá và vị trí', icon: '💎' },
  featured_projects: { name: 'Dự Án Tiêu Biểu (VIP)', desc: 'Các dự án nổi bật nhất được ghim ngoài trang chủ', icon: '🔥' },
  posts: { name: 'Tin Tức & Bài Viết', desc: 'Danh sách tin thị trường và bài viết tư vấn', icon: '📰' },
  about: { name: 'Giới Thiệu Doanh Nghiệp', desc: 'Về chúng tôi, tầm nhìn, sứ mệnh, cam kết chất lượng', icon: '📖' },
  intro: { name: 'Trích Dẫn & Lời Ngỏ', desc: 'Thông điệp chào mừng và lời mở đầu của chủ đầu tư', icon: '✍️' },
  amenities: { name: 'Tiện Ích Đặc Quyền', desc: 'Hồ bơi vô cực, công viên cây xanh, bến du thuyền, smart home', icon: '🏊' },
  floor_plans: { name: 'Mặt Bằng Chi Tiết & Phân Khu', desc: 'Sơ đồ thiết kế căn hộ, thông số diện tích và số phòng ngủ', icon: '📐' },
  policies: { name: 'Chính Sách & Tiến Độ Thanh Toán', desc: 'Tiến độ thanh toán, ưu đãi chiết khấu, cam kết pháp lý', icon: '📜' },
  timeline: { name: 'Dòng Thời Gian & Cột Mốc', desc: 'Lịch sử phát triển và các cột mốc bàn giao', icon: '⏳' },
  gallery: { name: 'Thư Viện Ảnh & Video', desc: 'Hình ảnh thực tế dự án, video 360 virtual tour', icon: '🖼️' },
  testimonials: { name: 'Cảm Nhận Khách Hàng', desc: 'Đánh giá thực tế của cư dân và các nhà đầu tư', icon: '💬' },
  partners: { name: 'Đối Tác & Ngân Hàng', desc: 'Logo các đối tác chiến lược và ngân hàng bảo lãnh', icon: '🤝' },
  faq: { name: 'Câu Hỏi Thường Gặp (FAQ)', desc: 'Giải đáp các thắc mắc về pháp lý, thủ tục và thanh toán', icon: '❓' },
  contact: { name: 'Form Liên Hệ & Nhận Tư Vấn', desc: 'Hotline, địa chỉ văn phòng, form nhận bảng giá và tài liệu', icon: '📞' },
  map: { name: 'Bản Đồ & Chỉ Đường', desc: 'Bản đồ nhúng Google Maps và thông tin vị trí văn phòng', icon: '📍' },
  cta: { name: 'Banner Kêu Gọi Hành Động', desc: 'Khung thông điệp khẩn kích thích đăng ký nhận ưu đãi VIP', icon: '⚡' },
};

const SECTION_SCHEMAS: Record<string, FieldDef[]> = {
  hero: [
    { name: 'badge', type: 'text', label: 'Nhãn phụ / Tagline (Badge)' },
    { name: 'heading', type: 'text', label: 'Tiêu đề chính (Heading)' },
    { name: 'headingAccent', type: 'text', label: 'Tiêu đề nổi bật (Accent Text)' },
    { name: 'subtitle', type: 'textarea', label: 'Mô tả phụ (Subtitle)' },
    { name: 'ctaText', type: 'text', label: 'Chữ trên nút CTA (VD: Nhận Bảng Giá)' },
    { name: 'ctaUrl', type: 'text', label: 'Đường dẫn nút CTA (VD: #contact hoặc /projects)' },
    { name: 'backgroundImage', type: 'text', label: 'Ảnh Nền Banner (URL)' },
    { name: 'quickStats', type: 'array', label: 'Thống kê nhanh dưới banner', itemFields: [
      { name: 'label', type: 'text', label: 'Tên chỉ số' },
      { name: 'value', type: 'text', label: 'Số liệu' }
    ]}
  ],
  intro: [
    { name: 'quote', type: 'text', label: 'Trích dẫn / Lời mở đầu' },
    { name: 'quoteAccent', type: 'text', label: 'Trích dẫn nổi bật' },
    { name: 'description', type: 'textarea', label: 'Mô tả chi tiết' }
  ],
  stats: [
    { name: 'items', type: 'array', label: 'Danh sách chỉ số thống kê', itemFields: [
      { name: 'value', type: 'text', label: 'Chỉ số (VD: 50+)' },
      { name: 'label', type: 'text', label: 'Ý nghĩa (VD: Dự án đã bàn giao)' },
      { name: 'iconName', type: 'text', label: 'Icon (VD: Building2, Users, Award)' }
    ]}
  ],
  overview: [
    { name: 'heading', type: 'text', label: 'Tiêu đề' },
    { name: 'headingAccent', type: 'text', label: 'Tiêu đề nổi bật' },
    { name: 'description', type: 'textarea', label: 'Mô tả tổng quan' },
    { name: 'items', type: 'array', label: 'Danh mục loại hình', itemFields: [
      { name: 'label', type: 'text', label: 'Tên loại hình (VD: Biệt thự ven sông)' },
      { name: 'value', type: 'text', label: 'Số lượng / Quy mô (VD: 24 Căn VIP)' },
      { name: 'desc', type: 'textarea', label: 'Mô tả ngắn' }
    ]}
  ],
  about: [
    { name: 'heading', type: 'text', label: 'Tiêu đề giới thiệu' },
    { name: 'headingAccent', type: 'text', label: 'Tiêu đề nổi bật' },
    { name: 'description', type: 'textarea', label: 'Nội dung giới thiệu doanh nghiệp' },
    { name: 'body', type: 'textarea', label: 'Nội dung chi tiết' },
    { name: 'quote', type: 'text', label: 'Trích dẫn / Cam kết' },
    { name: 'image', type: 'text', label: 'Ảnh giới thiệu (URL)' }
  ],
  amenities: [
    { name: 'heading', type: 'text', label: 'Tiêu đề tiện ích' },
    { name: 'headingAccent', type: 'text', label: 'Tiêu đề nổi bật' },
    { name: 'sectionLabel', type: 'text', label: 'Nhãn phụ khu vực' },
    { name: 'items', type: 'array', label: 'Danh sách tiện ích', itemFields: [
      { name: 'icon', type: 'text', label: 'Tên Icon (VD: Wifi, Sparkles, Shield, Compass)' },
      { name: 'title', type: 'text', label: 'Tên tiện ích (VD: Hồ bơi vô cực 500m²)' },
      { name: 'desc', type: 'textarea', label: 'Mô tả chi tiết tiện ích' }
    ]}
  ],
  floor_plans: [
    { name: 'heading', type: 'text', label: 'Tiêu đề mặt bằng' },
    { name: 'headingAccent', type: 'text', label: 'Tiêu đề nổi bật' },
    { name: 'sectionLabel', type: 'text', label: 'Nhãn khu vực' },
    { name: 'items', type: 'array', label: 'Danh sách phân khu / căn hộ', itemFields: [
      { name: 'id', type: 'text', label: 'Mã phân khu' },
      { name: 'label', type: 'text', label: 'Tên mặt bằng (VD: Villa Đơn Lập Type A)' },
      { name: 'desc', type: 'textarea', label: 'Mô tả bố cục' },
      { name: 'bedrooms', type: 'number', label: 'Số phòng ngủ' },
      { name: 'bathrooms', type: 'number', label: 'Số phòng tắm' },
      { name: 'price', type: 'text', label: 'Giá bán dự kiến' },
      { name: 'img', type: 'text', label: 'Ảnh sơ đồ mặt bằng (URL)' }
    ]}
  ],
  policies: [
    { name: 'heading', type: 'text', label: 'Tiêu đề chính sách' },
    { name: 'headingAccent', type: 'text', label: 'Tiêu đề nổi bật' },
    { name: 'sectionLabel', type: 'text', label: 'Nhãn khu vực' },
    { name: 'items', type: 'array', label: 'Danh sách chính sách & tiến độ', itemFields: [
      { name: 'title', type: 'text', label: 'Tên chính sách (VD: Chiết khấu thanh toán sớm)' },
      { name: 'desc', type: 'textarea', label: 'Nội dung chi tiết & điều kiện hưởng' },
      { name: 'tag', type: 'text', label: 'Thẻ tag (VD: Ưu đãi 9%)' }
    ]}
  ],
  testimonials: [
    { name: 'heading', type: 'text', label: 'Tiêu đề đánh giá' },
    { name: 'headingAccent', type: 'text', label: 'Tiêu đề nổi bật' },
    { name: 'sectionLabel', type: 'text', label: 'Nhãn khu vực' },
    { name: 'items', type: 'array', label: 'Danh sách cảm nhận khách hàng', itemFields: [
      { name: 'name', type: 'text', label: 'Tên khách hàng / Nhà đầu tư' },
      { name: 'title', type: 'text', label: 'Chức danh / Nghề nghiệp' },
      { name: 'text', type: 'textarea', label: 'Nội dung chia sẻ' },
      { name: 'img', type: 'text', label: 'Ảnh đại diện (URL)' },
      { name: 'rating', type: 'number', label: 'Đánh giá (1-5 sao)' }
    ]}
  ],
  timeline: [
    { name: 'heading', type: 'text', label: 'Tiêu đề cột mốc' },
    { name: 'headingAccent', type: 'text', label: 'Tiêu đề nổi bật' },
    { name: 'sectionLabel', type: 'text', label: 'Nhãn khu vực' },
    { name: 'items', type: 'array', label: 'Danh sách cột mốc thời gian', itemFields: [
      { name: 'year', type: 'text', label: 'Thời gian / Quý' },
      { name: 'title', type: 'text', label: 'Cột mốc (VD: Bàn giao sổ hồng)' },
      { name: 'desc', type: 'textarea', label: 'Mô tả chi tiết' }
    ]}
  ],
  faq: [
    { name: 'heading', type: 'text', label: 'Tiêu đề FAQ' },
    { name: 'headingAccent', type: 'text', label: 'Tiêu đề nổi bật' },
    { name: 'sectionLabel', type: 'text', label: 'Nhãn khu vực' },
    { name: 'items', type: 'array', label: 'Danh sách câu hỏi & giải đáp', itemFields: [
      { name: 'q', type: 'text', label: 'Câu hỏi' },
      { name: 'a', type: 'textarea', label: 'Nội dung trả lời chi tiết' }
    ]}
  ],
  cta: [
    { name: 'heading', type: 'text', label: 'Tiêu đề kêu gọi' },
    { name: 'headingAccent', type: 'text', label: 'Tiêu đề nổi bật' },
    { name: 'description', type: 'textarea', label: 'Mô tả thông điệp' },
    { name: 'ctaText', type: 'text', label: 'Nút hành động (VD: Đăng Ký Tư Vấn 24/7)' }
  ],
  gallery: [
    { name: 'heading', type: 'text', label: 'Tiêu đề thư viện ảnh' },
    { name: 'headingAccent', type: 'text', label: 'Tiêu đề nổi bật' },
    { name: 'sectionLabel', type: 'text', label: 'Nhãn khu vực' },
    { name: 'items', type: 'array', label: 'Danh sách hình ảnh', itemFields: [
      { name: 'url', type: 'text', label: 'Đường dẫn ảnh (URL)' },
      { name: 'category', type: 'text', label: 'Phân loại (VD: Ngoại cảnh / Nội thất)' },
      { name: 'title', type: 'text', label: 'Chú thích ảnh' }
    ]}
  ],
  partners: [
    { name: 'items', type: 'array', label: 'Danh sách URL Logo Đối Tác', itemFields: [
      { name: 'value', type: 'text', label: 'Đường dẫn Logo (URL)' }
    ]}
  ],
  featured_projects: [
    { name: 'heading', type: 'text', label: 'Tiêu đề dự án' },
    { name: 'headingAccent', type: 'text', label: 'Tiêu đề nổi bật' },
    { name: 'sectionLabel', type: 'text', label: 'Nhãn khu vực' },
    { name: 'maxItems', type: 'number', label: 'Số dự án tối đa hiển thị' }
  ],
  projects: [
    { name: 'heading', type: 'text', label: 'Tiêu đề danh sách dự án' },
    { name: 'headingAccent', type: 'text', label: 'Tiêu đề nổi bật' },
    { name: 'description', type: 'textarea', label: 'Mô tả khu vực dự án' },
    { name: 'limit', type: 'number', label: 'Số dự án tối đa hiển thị' }
  ],
  posts: [
    { name: 'heading', type: 'text', label: 'Tiêu đề danh sách bài viết' },
    { name: 'headingAccent', type: 'text', label: 'Tiêu đề nổi bật' },
    { name: 'description', type: 'textarea', label: 'Mô tả khu vực tin tức' },
    { name: 'limit', type: 'number', label: 'Số bài viết tối đa hiển thị' }
  ],
  contact: [
    { name: 'heading', type: 'text', label: 'Tiêu đề liên hệ' },
    { name: 'headingAccent', type: 'text', label: 'Tiêu đề nổi bật' },
    { name: 'description', type: 'textarea', label: 'Mô tả / Hướng dẫn khách hàng' },
    { name: 'submitText', type: 'text', label: 'Chữ trên nút gửi form' }
  ],
  map: [
    { name: 'heading', type: 'text', label: 'Tiêu đề bản đồ' },
    { name: 'address', type: 'text', label: 'Địa chỉ hiển thị' },
    { name: 'embedUrl', type: 'text', label: 'Đường dẫn nhúng Google Maps' }
  ]
};

function SectionEditModal({ section, onClose, onSave }: any) {
  const schema = SECTION_SCHEMAS[section.sectionKey] || [];
  const sectionMeta = SECTION_NAMES[section.sectionKey] || { name: section.sectionKey, desc: '', icon: '📦' };
  
  const [formData, setFormData] = useState(() => {
    let initial = section.content ? { ...section.content } : {};
    if (section.sectionKey === 'partners' && Array.isArray(initial.items)) {
       initial.items = initial.items.map((url: string) => (typeof url === 'string' ? { value: url } : url));
    }
    return initial;
  });
  
  const [saving, setSaving] = useState(false);

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (arrayName: string, index: number, fieldName: string, value: any) => {
    setFormData((prev: any) => {
      const newArray = [...(prev[arrayName] || [])];
      newArray[index] = { ...newArray[index], [fieldName]: value };
      return { ...prev, [arrayName]: newArray };
    });
  };

  const addArrayItem = (arrayName: string, itemFields: FieldDef[]) => {
    const newItem = itemFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
    setFormData((prev: any) => ({
      ...prev,
      [arrayName]: [...(prev[arrayName] || []), newItem]
    }));
  };

  const removeArrayItem = (arrayName: string, index: number) => {
    setFormData((prev: any) => {
      const newArray = [...(prev[arrayName] || [])];
      newArray.splice(index, 1);
      return { ...prev, [arrayName]: newArray };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    let finalData = { ...formData };
    
    if (section.sectionKey === 'partners' && Array.isArray(finalData.items)) {
       finalData.items = finalData.items.map((item: any) => item.value || item);
    }
    
    await onSave(section.id, finalData);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{sectionMeta.icon}</span>
            <div>
              <h2 className="text-base font-bold text-slate-900">{sectionMeta.name}</h2>
              <p className="text-xs text-slate-500">{sectionMeta.desc || `Mã định danh: ${section.sectionKey}`}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-5 overflow-y-auto flex-1 space-y-6">
          {schema.length === 0 ? (
            <div className="p-6 text-center text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-sm">Khu vực này sử dụng nội dung tự động từ dữ liệu dự án/bài viết hệ thống.</p>
            </div>
          ) : (
            schema.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">{field.label}</label>
                {field.type === 'text' && (
                  <input
                    type="text"
                    value={formData[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                )}
                {field.type === 'number' && (
                  <input
                    type="number"
                    value={formData[field.name] || 0}
                    onChange={(e) => handleFieldChange(field.name, Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                )}
                {field.type === 'textarea' && (
                  <textarea
                    value={formData[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl min-h-[90px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm leading-relaxed"
                  />
                )}
                {field.type === 'array' && field.itemFields && (
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/70 space-y-4">
                    {(formData[field.name] || []).map((item: any, idx: number) => (
                      <div key={idx} className="relative bg-white p-4 border border-slate-200 rounded-xl shadow-xs group">
                        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                          <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Mục #{idx + 1}</span>
                          <button type="button" onClick={() => removeArrayItem(field.name, idx)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold" title="Xóa mục này">
                            <Trash className="w-3.5 h-3.5" /> Xóa
                          </button>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {field.itemFields!.map((subField) => (
                            <div key={subField.name} className={subField.type === 'textarea' ? 'col-span-full' : ''}>
                              <label className="block text-[11px] font-bold text-slate-600 mb-1">{subField.label}</label>
                              {subField.type === 'text' && (
                                <input
                                  type="text"
                                  value={item[subField.name] || ''}
                                  onChange={(e) => handleArrayChange(field.name, idx, subField.name, e.target.value)}
                                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-400"
                                />
                              )}
                              {subField.type === 'number' && (
                                <input
                                  type="number"
                                  value={item[subField.name] || 0}
                                  onChange={(e) => handleArrayChange(field.name, idx, subField.name, Number(e.target.value))}
                                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-400"
                                />
                              )}
                              {subField.type === 'textarea' && (
                                <textarea
                                  value={item[subField.name] || ''}
                                  onChange={(e) => handleArrayChange(field.name, idx, subField.name, e.target.value)}
                                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg min-h-[60px] focus:ring-2 focus:ring-blue-400"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem(field.name, field.itemFields!)} className="w-full py-2.5 border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/50 hover:bg-blue-50 text-blue-600 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all">
                      <Plus className="w-4 h-4" /> Thêm mục mới
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
          
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6 sticky bottom-0 bg-white py-2">
            <button type="button" onClick={onClose} className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">Hủy Bỏ</button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all">
              {saving ? 'Đang lưu...' : <><Save className="w-4 h-4" /> Lưu Khu Vực</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PageSectionsEditor({ page, onBack }: { page: SitePage, onBack: () => void }) {
  const queryClient = useQueryClient();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<any | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const { data: sections = [], isLoading } = useQuery({
    queryKey: ['cms_page_sections', page.slug],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/builder/pages/${page.slug}/sections`, { withCredentials: true });
      return res.data.data;
    }
  });

  const toggleVisibilityMutation = useMutation({
    mutationFn: async ({ id, isVisible }: { id: string, isVisible: boolean }) => {
      const res = await axios.patch(`${API_URL}/api/cms/builder/sections/${id}/visibility`, { isVisible }, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms_page_sections', page.slug] });
    }
  });

  const updateSectionMutation = useMutation({
    mutationFn: async ({ id, content }: { id: string, content: any }) => {
      const res = await axios.put(`${API_URL}/api/cms/builder/sections/${id}`, { content }, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms_page_sections', page.slug] });
      setEditingSection(null);
    },
    onError: () => {
      alert('Có lỗi xảy ra khi lưu nội dung.');
    }
  });

  const deleteSectionMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`${API_URL}/api/cms/builder/sections/${id}`, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms_page_sections', page.slug] });
    }
  });

  const reorderMutation = useMutation({
    mutationFn: async (orderedIds: string[]) => {
      const res = await axios.patch(`${API_URL}/api/cms/builder/sections/reorder`, {
        pageId: page.id,
        orderedIds,
      }, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms_page_sections', page.slug] });
    }
  });

  const createSectionMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await axios.post(`${API_URL}/api/cms/builder/pages/${page.slug}/sections`, payload, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms_page_sections', page.slug] });
      setShowAddModal(false);
    }
  });

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;
    reorderMutation.mutate(newSections.map((s: any) => s.id));
  };

  const handlePopulateAll = async () => {
    if (!confirm('Bạn có muốn tự động tạo đầy đủ các khu vực chuẩn cho trang này không?')) return;
    const standardKeys = ['hero', 'stats', 'overview', 'amenities', 'floor_plans', 'policies', 'gallery', 'testimonials', 'partners', 'faq', 'contact'];
    for (const key of standardKeys) {
      const exists = sections.some((s: any) => s.sectionKey === key);
      if (!exists) {
        await createSectionMutation.mutateAsync({
          sectionKey: key,
          label: SECTION_NAMES[key]?.name || key,
          isVisible: true,
          content: {},
        });
      }
    }
  };

  if (isLoading) {
    return <div className="py-12 text-center text-slate-500 font-medium">Đang tải cấu trúc các khu vực...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900">{page.title}</h2>
              <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
                {sections.length} khu vực
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Đường dẫn: <code className="text-blue-600 font-bold font-mono">/{page.slug}</code> · Tự do sắp xếp và chỉnh sửa toàn bộ giao diện.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {sections.length < 5 && (
            <button
              onClick={handlePopulateAll}
              className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-xs flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Nạp Đầy Đủ 13 Khu Vực Mẫu</span>
            </button>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Khu Vực</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {sections.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">Trang này chưa có khu vực nội dung nào</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">Bạn có thể nạp nhanh toàn bộ các khu vực mẫu cho trang bất động sản hoặc tự tạo từng khu vực theo nhu cầu.</p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={handlePopulateAll}
                className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-xs flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-white" /> Nạp Đầy Đủ Khu Vực Chuẩn
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Tự Chọn Khu Vực
              </button>
            </div>
          </div>
        ) : (
          sections.map((section: any, idx: number) => {
            const isExpanded = expandedSection === section.id;
            const meta = SECTION_NAMES[section.sectionKey] || { name: section.sectionKey, desc: '', icon: '📦' };
            return (
              <div key={section.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all hover:border-slate-300">
                <div 
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
                  onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl font-black text-sm shrink-0 border border-blue-100">
                      {idx + 1}
                    </div>
                    <span className="text-xl shrink-0">{meta.icon}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm truncate">{meta.name}</h4>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                          {section.sectionKey}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{meta.desc || 'Tùy chỉnh nội dung hiển thị'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-4" onClick={(e) => e.stopPropagation()}>
                    {/* Move Up / Down */}
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, 'up')}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Di chuyển lên trên"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      disabled={idx === sections.length - 1}
                      onClick={() => handleMove(idx, 'down')}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Di chuyển xuống dưới"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Visibility Toggle */}
                    <button
                      onClick={() => toggleVisibilityMutation.mutate({ id: section.id, isVisible: !section.isVisible })}
                      className={`px-2.5 py-1.5 rounded-xl transition-colors flex items-center gap-1 text-xs font-bold ${
                        section.isVisible ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {section.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">{section.isVisible ? 'Hiển thị' : 'Đã ẩn'}</span>
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() => setEditingSection(section)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors border border-blue-200"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Sửa
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => {
                        if (confirm(`Xác nhận xóa khu vực "${meta.name}"?`)) {
                          deleteSectionMutation.mutate(section.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa khu vực này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/60">
                    <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Dữ liệu nội dung hiện tại:</div>
                    <pre className="text-[11px] font-mono text-slate-600 bg-white p-3 rounded-xl border border-slate-200 whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed">
                      {JSON.stringify(section.content, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal Add Section */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
              <div>
                <h3 className="text-base font-bold text-slate-900">Chọn Loại Khu Vực Cần Thêm</h3>
                <p className="text-xs text-slate-500">Bấm vào khu vực để chèn vào trang website của bạn</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto grid sm:grid-cols-2 gap-3">
              {Object.entries(SECTION_NAMES).map(([key, meta]) => (
                <div
                  key={key}
                  onClick={() => createSectionMutation.mutate({
                    sectionKey: key,
                    label: meta.name,
                    isVisible: true,
                    content: {},
                  })}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 cursor-pointer transition-all flex items-start gap-3 group"
                >
                  <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">{meta.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700">{meta.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{meta.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {editingSection && (
        <SectionEditModal
          section={editingSection}
          onClose={() => setEditingSection(null)}
          onSave={async (id: string, content: any) => {
            await updateSectionMutation.mutateAsync({ id, content });
          }}
        />
      )}
    </div>
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
    queryKey: ['cms_pages'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/builder/pages`, { withCredentials: true });
      return res.data.data;
    },
  });
  
  const TITLE_MAP: Record<string, { title: string; desc: string; iconBg: string; iconColor: string }> = {
    'home': {
      title: 'Trang Chủ & Banner',
      desc: 'Banner chính, Dự án nổi bật, Giới thiệu, Đối tác, Form tư vấn & Đánh giá khách hàng',
      iconBg: 'bg-blue-500/10 text-blue-600',
      iconColor: 'text-blue-600'
    },
    'projects': {
      title: 'Dự Án Bất Động Sản',
      desc: 'Bộ lọc tìm kiếm thông minh, Danh mục căn hộ, Biệt thự, Shophouse & Bản đồ vị trí',
      iconBg: 'bg-emerald-500/10 text-emerald-600',
      iconColor: 'text-emerald-600'
    },
    'posts': {
      title: 'Tin Tức / Blog BĐS',
      desc: 'Tin thị trường, Phân tích đầu tư, Cẩm nang pháp lý & Báo cáo quy hoạch',
      iconBg: 'bg-violet-500/10 text-violet-600',
      iconColor: 'text-violet-600'
    },
    'about': {
      title: 'Giới Thiệu Doanh Nghiệp',
      desc: 'Hồ sơ năng lực, Tầm nhìn sứ mệnh, Đội ngũ chuyên viên & Giải thưởng uy tín',
      iconBg: 'bg-amber-500/10 text-amber-600',
      iconColor: 'text-amber-600'
    },
    'contact': {
      title: 'Liên Hệ & Bản Đồ',
      desc: 'Thông tin văn phòng, Hotline, Form gửi câu hỏi & Tích hợp Google Maps',
      iconBg: 'bg-rose-500/10 text-rose-600',
      iconColor: 'text-rose-600'
    },
  };

  const pages: SitePage[] = (fetchedPages || []).map((p: any) => {
    const meta = TITLE_MAP[p.slug] || {
      title: p.title,
      desc: p.description || 'Trang nội dung website bất động sản',
      iconBg: 'bg-slate-500/10 text-slate-600',
      iconColor: 'text-slate-600'
    };
    return {
      id: p.id,
      slug: p.slug,
      title: meta.title,
      description: meta.desc,
      isSystem: p.isSystem ?? true,
      published: p.published ?? true,
      sortOrder: p.sortOrder ?? 0,
      sections: p._count?.sections ?? (typeof p.sections === 'number' ? p.sections : 1),
    };
  });

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showModal, setShowModal] = useState(false);
  const [editingMetadataPage, setEditingMetadataPage] = useState<SitePage | null>(null);
  const [editingContentPage, setEditingContentPage] = useState<SitePage | null>(null);
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
      setEditingMetadataPage(null);
    },
    onError: () => {
      alert('Lỗi cập nhật trang');
    }
  });

  const handleAddPage = (page: SitePage) => addMutation.mutate(page);
  const handleUpdatePage = (data: any) => updateMutation.mutate(data);

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
      title="Quản Lý Trang & Bố Cục"
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Trang & Bố Cục' },
        ...(editingContentPage ? [{ label: `Bố cục: ${editingContentPage.title}` }] : [])
      ]}
    >
      {editingContentPage ? (
        <PageSectionsEditor page={editingContentPage} onBack={() => setEditingContentPage(null)} />
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-xl font-black text-slate-900 flex items-center gap-2.5">
                <LayoutTemplate className="w-6 h-6 text-blue-600" />
                Quản Lý Trang & Bố Cục Website
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Tùy biến trực quan thứ tự, nội dung các khu vực (Hero, Dự Án, Tin Tức, Form...) trên từng trang web
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View toggle */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Dạng thẻ trực quan (Khuyên dùng)"
                >
                  <Layers className="w-3.5 h-3.5" /> Dạng Thẻ
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Dạng danh sách bảng"
                >
                  <FileText className="w-3.5 h-3.5" /> Dạng Bảng
                </button>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white transition-all shadow-md shadow-blue-600/25 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Thêm Trang Mới
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Tổng Trang', value: pages.length, icon: <Layers className="w-4 h-4 text-blue-500" />, bg: 'bg-blue-50' },
              { label: 'Đã Xuất Bản', value: pages.filter((p) => p.published).length, icon: <Globe className="w-4 h-4 text-emerald-500" />, bg: 'bg-emerald-50' },
              { label: 'Trang Chính', value: pages.filter((p) => p.isSystem).length, icon: <Settings className="w-4 h-4 text-indigo-500" />, bg: 'bg-indigo-50' },
              { label: 'Trang Tùy Chỉnh', value: pages.filter((p) => !p.isSystem).length, icon: <FileText className="w-4 h-4 text-amber-500" />, bg: 'bg-amber-50' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>{stat.icon}</div>
                <div>
                  <div className="text-xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Pages Presentation */}
          {pages.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center py-20 px-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4"><Layers className="w-7 h-7 text-slate-400" /></div>
              <h3 className="text-base font-bold text-slate-700 mb-1">Chưa có trang nào</h3>
              <p className="text-sm text-slate-500 mb-5 max-w-xs">Bắt đầu bằng cách thêm trang mới cho website của bạn.</p>
              <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white transition-all shadow-md shadow-blue-600/25">
                <Plus className="w-4 h-4" /> Thêm Trang Đầu Tiên
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* ─── Modern Visual Cards Grid ────────────────────────── */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {pages.map((page) => {
                const meta = TITLE_MAP[page.slug] || {
                  title: page.title,
                  desc: page.description,
                  iconBg: 'bg-slate-500/10 text-slate-600',
                  iconColor: 'text-slate-600'
                };
                return (
                  <div
                    key={page.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden group"
                  >
                    <div className="p-5">
                      {/* Top Meta Bar */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg ${meta.iconBg}`}>
                            {page.slug === 'home' ? '🏠' : page.slug === 'projects' ? '🏢' : page.slug === 'posts' ? '📰' : page.slug === 'about' ? '🌟' : '📍'}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                              {page.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                                /{page.slug === 'home' ? '' : page.slug}
                              </code>
                              {page.isSystem ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                                  Hệ Thống
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                                  Tùy Chỉnh
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <PublishedBadge published={page.published} />
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-500 leading-relaxed min-h-[36px] line-clamp-2 mb-4">
                        {page.description}
                      </p>

                      {/* Sections metric pill */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700 mb-2">
                        <Layers className="w-3.5 h-3.5 text-blue-500" />
                        <span>Bao gồm <strong className="text-slate-900 font-bold">{page.sections}</strong> khu vực bố cục</span>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setEditingContentPage(page)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm hover:shadow shadow-blue-600/20 cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Biên Tập Bố Cục
                      </button>

                      <button
                        onClick={() => setEditingMetadataPage(page)}
                        className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                        title="Chỉnh sửa SEO & Cài Đặt Trang"
                      >
                        <Settings className="w-4 h-4" />
                      </button>

                      <a
                        href={domainData?.customDomain ? `https://${domainData.customDomain}/${page.slug === 'home' ? '' : page.slug}` : `https://${domainData?.subdomain || 'hoanggialand'}.${(process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'templates.aireviewbds.com').replace(/^templates\./, '')}/${page.slug === 'home' ? '' : page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                        title="Xem trang thực tế"
                      >
                        <Eye className="w-4 h-4" />
                      </a>

                      {!page.isSystem && (
                        <button
                          onClick={() => handleDelete(page)}
                          disabled={deletingId === page.id}
                          className="p-2.5 rounded-xl border border-red-200 bg-white hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors"
                          title="Xóa trang tùy chỉnh này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ─── Compact Table View ────────────────────────────── */
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">Trang</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">Đường Dẫn</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">Trạng Thái</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">Khu Vực</th>
                      <th className="px-5 py-3.5 text-right text-[11px] font-bold text-slate-500 uppercase tracking-wider">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {pages.map((page) => (
                      <tr key={page.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-900 text-sm">{page.title}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{page.description}</div>
                        </td>
                        <td className="px-5 py-4">
                          <code className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-md">/{page.slug}</code>
                        </td>
                        <td className="px-5 py-4">
                          <PublishedBadge published={page.published} />
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm font-bold text-slate-800">{page.sections}</span> <span className="text-xs text-slate-500">khu vực</span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => setEditingContentPage(page)}
                              className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer"
                            >
                              <Pencil className="w-3.5 h-3.5 inline mr-1" /> Biên Tập
                            </button>
                            <button
                              onClick={() => setEditingMetadataPage(page)}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                            >
                              SEO
                            </button>
                            <a
                              href={domainData?.customDomain ? `https://${domainData.customDomain}/${page.slug === 'home' ? '' : page.slug}` : `https://${domainData?.subdomain || 'hoanggialand'}.${(process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'templates.aireviewbds.com').replace(/^templates\./, '')}/${page.slug === 'home' ? '' : page.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                              title="Xem trực tiếp"
                            >
                              <Eye className="w-4 h-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {showModal && <AddPageModal onClose={() => setShowModal(false)} onAdd={handleAddPage} />}
      {editingMetadataPage && <EditPageModal page={editingMetadataPage} onClose={() => setEditingMetadataPage(null)} onSave={handleUpdatePage} />}
    </CMSLayout>
  );
}

