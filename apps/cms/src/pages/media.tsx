/**
 * CMS Media Library Page
 *
 * Visual media management with:
 *   - Grid/List view toggle
 *   - Folder tree navigation
 *   - Upload zone (drag & drop)
 *   - Search & filter by type (image, video, document)
 *   - File actions: copy URL, rename, delete
 *   - Image preview with metadata
 */

import React, { useState, useRef, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import CMSLayout from '../components/layout/CMSLayout';
import {
  Image as ImageIcon,
  Upload,
  FolderOpen,
  Folder,
  Grid3X3,
  List,
  Search,
  Filter,
  MoreHorizontal,
  Copy,
  Pencil,
  Trash2,
  Download,
  Plus,
  X,
  FileText,
  Video,
  File,
  Check,
  ChevronRight,
  Cloud,
  AlertCircle,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ─── Types ────────────────────────────────────────────────────────────────────

type FileType = 'image' | 'video' | 'document' | 'other';
type ViewMode = 'grid' | 'list';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: FileType;
  size: string;
  dimensions?: string;
  uploadedAt: string;
  folder?: string;
}

interface MediaFolder {
  id: string;
  name: string;
  count: number;
}

// ─── (Mock data removed — data is fetched from API) ────────────────────────

// ─── File Type Icon ───────────────────────────────────────────────────────────

function FileTypeIcon({ type, className = 'w-8 h-8' }: { type: FileType; className?: string }) {
  if (type === 'video') return <Video className={`${className} text-violet-500`} />;
  if (type === 'document') return <FileText className={`${className} text-blue-500`} />;
  if (type === 'image') return <ImageIcon className={`${className} text-emerald-500`} />;
  return <File className={`${className} text-slate-400`} />;
}

// ─── File Size in human readable ──────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── Grid File Card ───────────────────────────────────────────────────────────

function FileGridCard({
  file,
  selected,
  onSelect,
  onCopy,
  onDelete,
}: {
  file: MediaFile;
  selected: boolean;
  onSelect: () => void;
  onCopy: () => void;
  onDelete: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <div
      className={`group relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-150 ${
        selected ? 'border-blue-500 shadow-md shadow-blue-500/20' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}
      onClick={onSelect}
    >
      {/* Thumbnail */}
      <div className="h-36 bg-slate-100 flex items-center justify-center relative">
        {file.type === 'image' && file.url ? (
          <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
        ) : (
          <FileTypeIcon type={file.type} className="w-12 h-12" />
        )}

        {/* Selection checkbox */}
        <div
          className={`absolute top-2 left-2 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            selected ? 'bg-blue-500 border-blue-500' : 'bg-white/80 border-slate-300 opacity-0 group-hover:opacity-100'
          }`}
        >
          {selected && <Check className="w-3 h-3 text-white" />}
        </div>

        {/* Actions overlay */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            className="w-7 h-7 bg-white/90 rounded-lg flex items-center justify-center shadow-sm hover:bg-white"
          >
            <MoreHorizontal className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Context Menu */}
        {menuOpen && (
          <div
            className="absolute top-10 right-2 bg-white rounded-xl border border-slate-200 shadow-xl py-1 z-10 min-w-[140px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => { onCopy(); setCopied(true); setMenuOpen(false); setTimeout(() => setCopied(false), 2000); }}
              className="flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Đã sao chép!' : 'Sao chép URL'}
            </button>
            <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50">
              <Download className="w-3.5 h-3.5" /> Tải xuống
            </button>
            <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50">
              <Pencil className="w-3.5 h-3.5" /> Đổi tên
            </button>
            <div className="border-t border-slate-100 my-1" />
            <button onClick={() => { onDelete(); setMenuOpen(false); }} className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-600 hover:bg-red-50">
              <Trash2 className="w-3.5 h-3.5" /> Xóa
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5">
        <p className="text-xs font-semibold text-slate-800 truncate" title={file.name}>{file.name}</p>
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-[10px] text-slate-400">{file.size}</span>
          {file.dimensions && <span className="text-[10px] text-slate-400">{file.dimensions}</span>}
        </div>
      </div>
    </div>
  );
}

// ─── Upload Zone ──────────────────────────────────────────────────────────────

function UploadZone({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = async (files: FileList) => {
    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        await axios.post(`${API_URL}/api/cms/media/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        });
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Lỗi khi tải file lên');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await uploadFiles(files);
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await uploadFiles(files);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-black text-slate-900">Tải lên Media</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
            dragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
          }`}
        >
          <input ref={inputRef} type="file" onChange={handleFileChange} multiple accept="image/*,video/*,.pdf,.doc,.docx" className="hidden" />
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-semibold text-blue-600">Đang tải lên...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Cloud className="w-7 h-7 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Kéo thả file vào đây</p>
                <p className="text-xs text-slate-500 mt-1">hoặc click để chọn file từ máy tính</p>
              </div>
              <p className="text-[11px] text-slate-400">Hỗ trợ: JPG, PNG, WebP, MP4, PDF. Tối đa 50MB/file</p>
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            Hủy
          </button>
          <button onClick={() => inputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors">
            <Upload className="w-4 h-4" /> Chọn File
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MediaLibraryPage() {
  const queryClient = useQueryClient();
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [search, setSearch] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [showUpload, setShowUpload] = useState(false);
  const [typeFilter, setTypeFilter] = useState<FileType | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { data: domainData } = useQuery<any>({
    queryKey: ['cms_layout_domain'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/builder/domain`, { withCredentials: true });
      return res.data?.data;
    },
    staleTime: Infinity,
  });
  const activeTenantId = domainData?.tenantId;

  const { data: mediaData, isLoading } = useQuery({
    queryKey: ['media', activeTenantId, selectedFolder],
    queryFn: async () => {
      const params = selectedFolder ? `?folderId=${selectedFolder}` : '';
      const res = await axios.get(`${API_URL}/api/cms/media${params}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!activeTenantId,
  });

  const folders: MediaFolder[] = mediaData?.folders || [];
  const assets: MediaFile[] = (mediaData?.assets || []).map((a: any) => {
    const rawType = (a.type || 'IMAGE').toLowerCase();
    const typeMapped = rawType === 'image' ? 'image' : rawType === 'video' ? 'video' : 'document';
    
    // Format size
    const sizeInBytes = Number(a.size) || 0;
    const sizeFormatted = sizeInBytes > 1024 * 1024 
      ? `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`
      : sizeInBytes > 1024 
        ? `${(sizeInBytes / 1024).toFixed(0)} KB` 
        : `${sizeInBytes} B`;

    return {
      id: a.id,
      name: a.name || 'unnamed',
      url: a.url ? (a.url.startsWith('http') ? a.url : `${API_URL}${a.url}`) : '',
      type: typeMapped as FileType,
      size: sizeFormatted,
      dimensions: a.width && a.height ? `${a.width}x${a.height}` : undefined,
      uploadedAt: a.createdAt ? new Date(a.createdAt).toLocaleDateString('vi-VN') : '12/07/2026',
    };
  });

  const filtered = assets.filter((f) => {
    const typeMatch = typeFilter === 'all' || f.type === typeFilter;
    const searchMatch = !search || f.name.toLowerCase().includes(search.toLowerCase());
    return typeMatch && searchMatch;
  });

  const toggleSelect = (id: string) => {
    setSelectedFiles((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const copyUrl = (file: MediaFile) => {
    if (file.url) {
      navigator.clipboard.writeText(file.url).catch(() => {});
      setCopiedId(file.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const usedMB = 48;
  const totalMB = 500;

  const handleDelete = async (file: MediaFile) => {
    if (!confirm(`Xóa file "${file.name}"?`)) return;
    try {
      await axios.delete(`${API_URL}/api/cms/media/${file.id}`, { withCredentials: true });
      queryClient.invalidateQueries({ queryKey: ['cms_media'] });
    } catch (err: any) {
      alert(err.response?.data?.message || 'Lỗi khi xóa file');
    }
  };

  return (
    <CMSLayout
      title="Media Library"
      breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Media Library' }]}
    >
      {showUpload && (
        <UploadZone 
          onClose={() => setShowUpload(false)} 
          onSuccess={() => queryClient.invalidateQueries({ queryKey: ['cms_media'] })} 
        />
      )}

      <div className="flex gap-5 h-[calc(100vh-140px)]">
        {/* ── Sidebar: Folders ─────────────────────────────────────── */}
        <div className="w-52 shrink-0 flex flex-col gap-3">
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors shadow-md shadow-blue-600/20"
          >
            <Upload className="w-4 h-4" /> Tải Lên
          </button>

          {/* Folders */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1">
            <div className="px-3 py-2.5 border-b border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thư Mục</p>
            </div>
            <div className="p-2 space-y-0.5">
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id === selectedFolder ? null : folder.id)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedFolder === folder.id
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {selectedFolder === folder.id
                        ? <FolderOpen className="w-3.5 h-3.5 text-blue-500" />
                        : <Folder className="w-3.5 h-3.5 text-slate-400" />
                      }
                      <span>{folder.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{folder.count}</span>
                  </button>
                ))
              )}
            </div>

            {/* Storage usage */}
            <div className="p-3 border-t border-slate-100 mt-auto">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] font-semibold text-slate-500">Dung lượng</p>
                <p className="text-[10px] text-slate-500">{usedMB}/{totalMB} MB</p>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${(usedMB / totalMB) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Main: File Grid/List ─────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl flex-1 min-w-[180px] shadow-sm">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm file..."
                className="flex-1 text-sm text-slate-700 bg-transparent outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Type filter */}
            <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg">
              {(['all', 'image', 'video', 'document'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-2.5 py-1 rounded-[7px] text-xs font-semibold transition-all ${
                    typeFilter === t ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {t === 'all' ? 'Tất cả' : t === 'image' ? 'Ảnh' : t === 'video' ? 'Video' : 'Tài liệu'}
                </button>
              ))}
            </div>

            {/* View mode */}
            <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-[7px] transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}>
                <Grid3X3 className="w-3.5 h-3.5 text-slate-600" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-[7px] transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}>
                <List className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>

            {selectedFiles.size > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-xl">
                <span className="text-xs font-bold text-blue-700">{selectedFiles.size} đã chọn</span>
                <button className="text-xs text-red-600 font-semibold hover:text-red-700">Xóa</button>
                <button onClick={() => setSelectedFiles(new Set())} className="text-xs text-slate-500 hover:text-slate-700">Bỏ chọn</button>
              </div>
            )}
          </div>

          {/* File count */}
          <p className="text-xs text-slate-500 mb-3">{filtered.length} file</p>

          {/* Grid */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 overflow-y-auto pr-1">
              {filtered.map((file) => (
                <FileGridCard
                  key={file.id}
                  file={file}
                  selected={selectedFiles.has(file.id)}
                  onSelect={() => toggleSelect(file.id)}
                  onCopy={() => copyUrl(file)}
                  onDelete={() => handleDelete(file)}
                />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400">
                  <ImageIcon className="w-12 h-12 mb-3 opacity-30" />
                  <p className="text-sm font-medium">Không tìm thấy file nào</p>
                </div>
              )}
            </div>
          ) : (
            /* List View */
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500">Tên File</th>
                    <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 hidden sm:table-cell">Loại</th>
                    <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 hidden md:table-cell">Kích thước</th>
                    <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 hidden lg:table-cell">Ngày tải</th>
                    <th className="px-4 py-2.5 text-right text-xs font-bold text-slate-500">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((file) => (
                    <tr key={file.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {file.type === 'image' && file.url ? (
                            <img src={file.url} alt="" className="w-8 h-8 rounded-lg object-cover shrink-0" />
                          ) : (
                            <FileTypeIcon type={file.type} className="w-8 h-8 shrink-0" />
                          )}
                          <span className="font-medium text-slate-800 truncate max-w-[200px]">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-500 capitalize hidden sm:table-cell">{file.type}</td>
                      <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{file.size}</td>
                      <td className="px-4 py-3 text-slate-500 hidden lg:table-cell">{file.uploadedAt}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end">
                          <button onClick={() => copyUrl(file)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors" title="Sao chép URL">
                            {copiedId === file.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors" title="Đổi tên">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDelete(file)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors" title="Xóa">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <ImageIcon className="w-12 h-12 mb-3 opacity-30" />
                  <p className="text-sm font-medium">Không tìm thấy file nào</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </CMSLayout>
  );
}
