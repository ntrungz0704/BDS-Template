import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

export interface PropertyImageGalleryProps {
  images?: string[];
  thumbnail?: string;
  image?: string;
  badge1?: string;
  badge2?: string;
  badge1Color?: string;
  aspectRatio?: string;
  themeColor?: 'blue' | 'amber' | 'emerald' | 'red' | 'gold';
}

export const PropertyImageGallery: React.FC<PropertyImageGalleryProps> = ({
  images,
  thumbnail,
  image,
  badge1,
  badge2,
  badge1Color = 'bg-blue-600',
  aspectRatio = 'h-80 sm:h-96 md:h-[400px]',
  themeColor = 'blue',
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const rawGallery = images && images.length > 0 ? images : [];
  const galleryList = (Array.isArray(rawGallery) && rawGallery.length >= 3)
    ? rawGallery
    : [
        image || thumbnail || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'
      ];

  const total = galleryList.length;
  const currentImg = galleryList[activeIdx] || galleryList[0];

  // Tự động chuyển tiếp sau 3 giây (Auto-slide every 3s)
  useEffect(() => {
    if (isPaused || isZoomed || total <= 1) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, isZoomed, total]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + total) % total);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % total);
  };

  const ringBorderClasses: Record<string, string> = {
    blue: 'border-blue-600 ring-2 ring-blue-300',
    amber: 'border-amber-500 ring-2 ring-amber-300',
    emerald: 'border-emerald-600 ring-2 ring-emerald-300',
    red: 'border-red-600 ring-2 ring-red-300',
    gold: 'border-[#E6CA65] ring-2 ring-amber-300',
  };

  const activeBorderClass = ringBorderClasses[themeColor] || ringBorderClasses.blue;

  return (
    <div 
      className="space-y-3 select-none w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Khung ảnh chính với mũi tên trái/phải & zoom */}
      <div 
        onClick={() => setIsZoomed(true)}
        className={`${aspectRatio} w-full rounded-xl overflow-hidden bg-slate-950 relative shadow-lg cursor-zoom-in group`}
      >
        <img
          src={currentImg}
          alt=""
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />

        {/* Huy hiệu Badge */}
        <div className="absolute top-3 left-3 flex gap-2 z-10 pointer-events-none">
          {badge1 && (
            <span className={`px-2.5 py-1 ${badge1Color} text-white font-bold text-xs rounded-md shadow`}>
              {badge1}
            </span>
          )}
          {badge2 && (
            <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white font-bold text-xs rounded-md shadow">
              {badge2}
            </span>
          )}
        </div>

        {/* Nút Phóng to / Zoom */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setIsZoomed(true); }}
          className="absolute top-3 right-3 px-2.5 py-1.5 bg-black/50 hover:bg-black/80 text-white rounded-lg backdrop-blur-md transition shadow flex items-center gap-1 text-xs font-bold z-10"
          title="Phóng to ảnh"
        >
          <Maximize2 size={14} />
          <span className="hidden sm:inline">Phóng to</span>
        </button>

        {/* Bộ đếm số ảnh */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-md z-10 pointer-events-none">
          {activeIdx + 1} / {total}
        </div>

        {/* Mũi tên Trái (Prev) */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition shadow-md z-10 hover:scale-110 active:scale-95"
          title="Ảnh trước"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Mũi tên Phải (Next) */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition shadow-md z-10 hover:scale-110 active:scale-95"
          title="Ảnh tiếp theo"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* 4 Thumbnails nhỏ bên dưới */}
      <div className="grid grid-cols-4 gap-2.5">
        {galleryList.map((img, i) => (
          <div
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition relative group ${
              activeIdx === i ? `${activeBorderClass} scale-95 shadow-md` : 'border-slate-200 opacity-70 hover:opacity-100'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
            {activeIdx === i && (
              <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Phóng to Toàn Màn Hình */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6"
          onClick={() => setIsZoomed(false)}
        >
          {/* Thanh trên cùng */}
          <div className="w-full flex items-center justify-between text-white z-20" onClick={(e) => e.stopPropagation()}>
            <span className="text-sm font-bold text-slate-300">
              Chi tiết ảnh: <strong className="text-white">{activeIdx + 1} / {total}</strong>
            </span>
            <button
              type="button"
              onClick={() => setIsZoomed(false)}
              className="p-2 bg-white/10 hover:bg-white/25 text-white rounded-full transition hover:scale-110"
              title="Đóng (Esc)"
            >
              <X size={24} />
            </button>
          </div>

          {/* Khung ảnh lớn với nút điều hướng */}
          <div className="relative max-w-5xl max-h-[75vh] flex items-center justify-center my-auto" onClick={(e) => e.stopPropagation()}>
            <img
              src={currentImg}
              alt=""
              className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl transition duration-300"
            />

            {/* Nút Prev trong Lightbox */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center backdrop-blur-lg transition hover:scale-110 active:scale-95"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Nút Next trong Lightbox */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center backdrop-blur-lg transition hover:scale-110 active:scale-95"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Danh sách ảnh nhỏ trong Lightbox */}
          <div className="w-full max-w-2xl flex justify-center gap-2 overflow-x-auto py-2 z-20" onClick={(e) => e.stopPropagation()}>
            {galleryList.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`w-16 h-12 sm:w-20 sm:h-14 rounded-md overflow-hidden border-2 cursor-pointer transition shrink-0 ${
                  activeIdx === i ? 'border-white ring-2 ring-blue-400 scale-105' : 'border-white/30 opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default PropertyImageGallery;
