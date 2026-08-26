import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image as ImageIcon, Trash2, RefreshCw, Check } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
  folder?: string;
  aspectRatio?: string;
  placeholder?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = 'Ảnh đại diện',
  hint = 'Hỗ trợ định dạng JPG, PNG, WebP (Tối đa 10MB)',
  folder,
  aspectRatio,
  placeholder,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(value || '');

  // Synchronize when value changes externally
  React.useEffect(() => {
    if (value) {
      setPreview(value);
    }
  }, [value]);

  const handleUpload = useCallback(
    async (file: File) => {
      setUploading(true);

      // Local preview immediately for instant feedback
      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await axios.post(`${API_URL}/api/cms/media/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        });

        const uploadedUrl = res.data?.data?.url || res.data?.url;
        if (uploadedUrl) {
          setPreview(uploadedUrl);
          onChange(uploadedUrl);
        } else {
          // If backend returns base64 or fallback
          const reader = new FileReader();
          reader.onload = (e) => {
            const b64 = e.target?.result as string;
            onChange(b64);
          };
          reader.readAsDataURL(file);
        }
      } catch (error) {
        // Fallback to Base64 in case of network upload failure
        const reader = new FileReader();
        reader.onload = (e) => {
          const b64 = e.target?.result as string;
          setPreview(b64);
          onChange(b64);
        };
        reader.readAsDataURL(file);
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        handleUpload(acceptedFiles[0]);
      }
    },
    [handleUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview('');
    onChange('');
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
      )}

      {preview ? (
        <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-900 group aspect-[16/9] max-h-56 flex items-center justify-center shadow-xs">
          <img
            src={preview}
            alt="Preview"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80';
            }}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
          />

          {uploading && (
            <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-white text-xs font-bold gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
              Đang tải ảnh lên...
            </div>
          )}

          {/* Action Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
            <div {...getRootProps()} className="cursor-pointer">
              <input {...getInputProps()} />
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-800 text-xs font-bold shadow-md transition-all backdrop-blur-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Thay đổi ảnh
              </button>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Xóa ảnh
            </button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[140px] ${
            isDragActive
              ? 'border-blue-500 bg-blue-50/50'
              : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50/60 bg-slate-50/30'
          }`}
        >
          <input {...getInputProps()} />
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-2.5 shadow-xs">
            <UploadCloud className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-800">
            {isDragActive ? 'Thả ảnh vào đây...' : 'Kéo thả ảnh vào đây hoặc bấm để chọn'}
          </p>
          <p className="text-xs text-slate-400 mt-1">{hint}</p>
        </div>
      )}
    </div>
  );
}
