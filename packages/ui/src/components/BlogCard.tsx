import * as React from 'react';

export interface BlogCardProps {
  title: string;
  thumbnail: string;
  summary?: string;
  category?: string;
  date?: string;
  slug?: string;
  onReadMore?: () => void;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  thumbnail,
  summary,
  category = 'Tin thị trường',
  date,
  onReadMore,
  className = '',
}) => {
  return (
    <div 
      onClick={onReadMore}
      className={`group rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer ${className}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {category && (
          <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-400/20">
            {category}
          </span>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {date && (
            <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">{date}</span>
          )}
          <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
            {title}
          </h3>
          {summary && (
            <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
              {summary}
            </p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
          <span>Đọc tiếp →</span>
        </div>
      </div>
    </div>
  );
};
