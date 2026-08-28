import React, { useState } from 'react';
import { Monitor, Smartphone, X, MapPin, Check, Calendar, User, Eye } from 'lucide-react';

interface ItemPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'project' | 'page' | 'post';
  data: {
    title?: string;
    name?: string;
    thumbnail?: string;
    image?: string;
    description?: string;
    content?: string;
    excerpt?: string;
    price?: string;
    priceFrom?: string | number;
    priceTo?: string | number;
    area?: string;
    address?: string;
    location?: string;
    category?: string;
    type?: string;
    amenities?: string[];
    author?: string;
    date?: string;
  };
}

export default function ItemPreviewModal({ isOpen, onClose, type, data }: ItemPreviewModalProps) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  if (!isOpen) return null;

  const title = data.title || data.name || 'Tiêu Đề Mẫu';
  const img = data.thumbnail || data.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85';
  const richHtml = data.content || data.description || '<p>Chưa có nội dung mô tả chi tiết...</p>';
  const location = data.address || data.location || 'Địa chỉ đang cập nhật';
  const price = data.price || (data.priceFrom ? `Từ ${data.priceFrom} triệu` : 'Liên hệ báo giá');
  const area = data.area ? (data.area.includes('m') ? data.area : `${data.area} m²`) : '—';
  const category = data.category || data.type || 'Bất Động Sản';
  const amenities = data.amenities || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-5xl h-[90vh] bg-slate-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-700">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900 border-b border-slate-800 text-white shrink-0">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Xem Trước Giao Diện Website
            </span>
          </div>

          {/* Desktop / Mobile Switcher */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 gap-1">
            <button
              type="button"
              onClick={() => setDevice('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                device === 'desktop' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> Máy Tính
            </button>
            <button
              type="button"
              onClick={() => setDevice('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                device === 'mobile' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Điện Thoại
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport Canvas */}
        <div className="flex-1 bg-slate-950 p-4 overflow-y-auto flex items-center justify-center">
          <div
            className={`bg-white transition-all duration-300 overflow-y-auto ${
              device === 'mobile'
                ? 'w-[390px] h-[720px] rounded-[36px] border-[10px] border-slate-800 shadow-2xl relative'
                : 'w-full h-full rounded-xl shadow-lg border border-slate-200'
            }`}
          >
            {/* Mobile Notch simulation */}
            {device === 'mobile' && (
              <div className="sticky top-0 z-30 bg-slate-900 text-white text-[10px] px-6 py-1 flex justify-between items-center rounded-t-[26px]">
                <span>9:41</span>
                <div className="w-20 h-3 bg-black rounded-full mx-auto" />
                <span>5G 100%</span>
              </div>
            )}

            {/* Simulated Website Navigation */}
            <div className="sticky top-0 z-20 bg-slate-900/95 text-white px-5 py-3.5 flex justify-between items-center border-b border-amber-500/20 backdrop-blur-md">
              <div className="text-xs font-serif uppercase tracking-widest text-amber-400 font-bold">
                BẤT ĐỘNG SẢN HOÀNG GIA
              </div>
              <div className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-medium">
                {type === 'project' ? 'Dự Án' : type === 'post' ? 'Tin Tức' : 'Trang'}
              </div>
            </div>

            {/* PREVIEW CONTENT */}
            {type === 'project' && (
              <div className="p-4 sm:p-8 space-y-6">
                {/* Hero Photo */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md bg-slate-100">
                  <img src={img} alt={title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-md bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-sm">
                    {category}
                  </span>
                </div>

                {/* Title & Price Bar */}
                <div className="border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{location}</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">{title}</h1>
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Mức Giá</span>
                      <span className="text-lg sm:text-xl font-black text-amber-600">{price}</span>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Diện Tích</span>
                      <span className="text-sm sm:text-base font-bold text-slate-800">{area}</span>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Trạng Thái</span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Đang Mở Bán
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                {amenities.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Tiện Ích Nổi Bật</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {amenities.map((a, i) => (
                        <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description Body */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Thông Tin Chi Tiết</h3>
                  <div
                    className="prose prose-sm max-w-none text-slate-700 leading-relaxed rich-preview-content"
                    dangerouslySetInnerHTML={{ __html: richHtml }}
                  />
                </div>
              </div>
            )}

            {type === 'post' && (
              <div className="p-4 sm:p-8 space-y-5">
                <div className="space-y-2 border-b border-slate-100 pb-4">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                    {category}
                  </span>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{title}</h1>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Hôm nay</span>
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> Ban Biên Tập BĐS</span>
                  </div>
                </div>

                {data.excerpt && (
                  <p className="text-sm font-medium text-slate-600 italic bg-slate-50 p-4 rounded-xl border-l-4 border-blue-500">
                    {data.excerpt}
                  </p>
                )}

                <div className="rounded-2xl overflow-hidden aspect-video shadow-sm bg-slate-100">
                  <img src={img} alt={title} className="w-full h-full object-cover" />
                </div>

                <div
                  className="prose prose-sm max-w-none text-slate-700 leading-relaxed rich-preview-content pt-2"
                  dangerouslySetInnerHTML={{ __html: richHtml }}
                />
              </div>
            )}

            {type === 'page' && (
              <div className="p-4 sm:p-8 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{title}</h1>
                  <p className="text-xs text-slate-400 mt-1">Trang nội dung trên website</p>
                </div>

                <div
                  className="prose prose-sm sm:prose-base max-w-none text-slate-700 leading-relaxed rich-preview-content"
                  dangerouslySetInnerHTML={{ __html: richHtml }}
                />
              </div>
            )}

            {/* Footer simulation */}
            <div className="mt-12 bg-slate-950 text-slate-400 p-6 text-center text-xs border-t border-slate-800">
              <p className="font-serif text-amber-400 font-bold mb-1">BẤT ĐỘNG SẢN HOÀNG GIA</p>
              <p className="text-[11px] text-slate-500">© 2026 Bản quyền thuộc về thương hiệu</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

