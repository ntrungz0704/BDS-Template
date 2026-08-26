import * as React from 'react';

export interface ProjectCardProps {
  id?: string;
  title: string;
  slug?: string;
  thumbnail: string;
  price?: string;
  area?: string;
  bedrooms?: number;
  bathrooms?: number;
  address?: string;
  type?: string;
  status?: string;
  onSelect?: (project: any) => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  thumbnail,
  price,
  area,
  bedrooms,
  address,
  type,
  status = 'Đang mở bán',
  onSelect,
  className = '',
}) => {
  return (
    <div 
      onClick={() => onSelect?.({ title, price, area, address })}
      className={`group rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer ${className}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {status && (
          <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/10">
            {status}
          </span>
        )}
        {type && (
          <span className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            {type}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          {address && (
            <p className="text-xs text-slate-500 mt-1 line-clamp-1 flex items-center gap-1">
              <span>📍</span> {address}
            </p>
          )}
        </div>

        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Mức giá</span>
            <span className="text-base font-black text-rose-600 font-mono">
              {price || 'Liên hệ báo giá'}
            </span>
          </div>

          {area && (
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Diện tích</span>
              <span className="text-xs font-bold text-slate-700">{area}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
