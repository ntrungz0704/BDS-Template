import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Crop,
  Check,
  Upload,
  Move
} from 'lucide-react';

export interface ImageCropperModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialImage?: string;
  onCropComplete?: (croppedBase64: string) => void;
  aspectRatio?: '1:1' | '16:9' | '4:3' | 'free';
  title?: string;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  onClose,
  initialImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
  onCropComplete,
  aspectRatio: defaultAspectRatio = '1:1',
  title = 'Cắt & Căn Chỉnh Vị Trí Ảnh (Facebook Style)'
}) => {
  const [imageSrc, setImageSrc] = useState<string>(initialImage);
  const [aspect, setAspect] = useState<'1:1' | '16:9' | '4:3' | 'free'>(defaultAspectRatio);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImage) {
      setImageSrc(initialImage);
      setPosition({ x: 0, y: 0 });
      setZoom(1);
      setRotation(0);
    }
  }, [initialImage, isOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Touch support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImageSrc(reader.result);
          setPosition({ x: 0, y: 0 });
          setZoom(1);
          setRotation(0);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExportCrop = () => {
    setIsProcessing(true);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    if (!ctx || !img) {
      setIsProcessing(false);
      return;
    }

    let outWidth = 800;
    let outHeight = 800;
    if (aspect === '16:9') {
      outWidth = 960;
      outHeight = 540;
    } else if (aspect === '4:3') {
      outWidth = 800;
      outHeight = 600;
    }

    canvas.width = outWidth;
    canvas.height = outHeight;

    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, outWidth, outHeight);

    ctx.translate(outWidth / 2, outHeight / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);
    ctx.translate(position.x * (outWidth / 300), position.y * (outHeight / 300));

    const imgAspect = img.naturalWidth / img.naturalHeight;
    let drawW = outWidth;
    let drawH = outWidth / imgAspect;

    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
    if (onCropComplete) {
      onCropComplete(croppedDataUrl);
    }
    setIsProcessing(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold">
              <Crop className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 leading-tight">{title}</h3>
              <p className="text-[11px] text-slate-500 font-medium">Kéo thả để định vị góc hiển thị đẹp nhất</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Workspace Canvas */}
        <div className="p-6 bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden select-none">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`relative overflow-hidden bg-slate-950 border-2 border-dashed border-blue-500 shadow-2xl cursor-grab active:cursor-grabbing transition-all ${
              aspect === '1:1'
                ? 'w-64 h-64 rounded-full'
                : aspect === '16:9'
                ? 'w-80 h-44 rounded-xl'
                : aspect === '4:3'
                ? 'w-80 h-60 rounded-xl'
                : 'w-80 h-64 rounded-xl'
            }`}
          >
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Crop target"
              draggable={false}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                transformOrigin: 'center',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
              }}
              className="max-w-none w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute inset-0 border border-white/20 pointer-events-none" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20 pointer-events-none" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 pointer-events-none" />
          </div>

          <div className="mt-3 flex items-center gap-2 text-slate-400 text-xs font-semibold">
            <Move className="w-3.5 h-3.5" />
            <span>Kéo để di chuyển vùng hiển thị</span>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="p-6 space-y-4 bg-white">
          {/* Zoom Slider */}
          <div className="flex items-center gap-4">
            <ZoomOut className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="range"
              min="1"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <ZoomIn className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs font-bold text-slate-700 font-mono w-10 text-right">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          {/* Aspect Ratio Buttons & Rotate */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500 mr-1">Tỉ lệ:</span>
              {[
                { key: '1:1', label: '1:1 (Avatar)' },
                { key: '16:9', label: '16:9 (Cover)' },
                { key: '4:3', label: '4:3 (BĐS)' },
                { key: 'free', label: 'Tự do' }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setAspect(item.key as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    aspect === item.key
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setRotation((r) => (r + 90) % 360)}
                title="Xoay 90 độ"
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 text-xs font-bold"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Xoay</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 text-xs font-bold"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Tải ảnh khác</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleExportCrop}
            disabled={isProcessing}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-blue-600/20 flex items-center gap-1.5 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>{isProcessing ? 'Đang xuất ảnh...' : 'Lưu & Áp Dụng'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
