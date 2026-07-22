import React, { useState } from 'react';
import { Star, Eye, Heart, Play, Check, Zap, Users, ArrowRight, Crown, TrendingUp } from 'lucide-react';
import { getTemplateDemoUrl } from '../utils/demo';
import { Template } from '../data/templatesData';
import { useAuth } from '../context/AuthContext';

interface ProductCardProps {
  template: Template | any;
  onSelect: (tpl: any) => void;
  onOpenDetails: (tpl: any) => void;
}

const CARD_CONFIG: Record<string, {
  accent: string;
  badge: string;
  badgeIcon: React.ReactNode;
  badgeBg: string;
  badgeColor: string;
  tagline: string;
  audience: string;
  rating: number;
  reviews: number;
  ribbon?: string;
  ribbonColor?: string;
}> = {
  'mock-1':  { accent:'#C5A028', badge:'LUXURY VIP',  badgeBg:'#0F172A', badgeColor:'#C5A028', tagline:'Biệt thự · Penthouse · Villa', audience:'Chủ đầu tư hạng sang', rating:5.0, reviews:124, ribbon:'Bán chạy #1', ribbonColor:'#C5A028', badgeIcon:<Crown className="w-2.5 h-2.5"/> },
  'mock-2':  { accent:'#2563EB', badge:'APPLE STYLE', badgeBg:'#EFF6FF', badgeColor:'#2563EB', tagline:'Nhà phố · Chung cư · Startup', audience:'Môi giới cá nhân', rating:4.9, reviews:98, ribbon:'Phổ biến', ribbonColor:'#2563EB', badgeIcon:<Zap className="w-2.5 h-2.5"/> },
  'mock-3':  { accent:'#0F4C81', badge:'CORPORATE PRO', badgeBg:'#0F4C81', badgeColor:'#fff', tagline:'Tổng công ty · Sàn lớn · Tập đoàn', audience:'Doanh nghiệp & Tập đoàn', rating:4.8, reviews:67, badgeIcon:<TrendingUp className="w-2.5 h-2.5"/> },
  'mock-4':  { accent:'#0369A1', badge:'RESORT PARADISE', badgeBg:'#E0F2FE', badgeColor:'#0369A1', tagline:'Biển · Condotel · Second Home', audience:'BĐS nghỉ dưỡng', rating:4.9, reviews:55, badgeIcon:<Zap className="w-2.5 h-2.5"/> },
  'mock-5':  { accent:'#7C3AED', badge:'SMART URBAN', badgeBg:'#F5F3FF', badgeColor:'#7C3AED', tagline:'Smart City · Căn hộ · Nội đô', audience:'Chung cư đô thị', rating:4.8, reviews:43, badgeIcon:<Zap className="w-2.5 h-2.5"/> },
  'mock-6':  { accent:'#374151', badge:'INDUSTRIAL B2B', badgeBg:'#374151', badgeColor:'#fff', tagline:'Nhà xưởng · KCN · Logistics', audience:'BĐS công nghiệp B2B', rating:4.7, reviews:31, badgeIcon:<Zap className="w-2.5 h-2.5"/> },
  'mock-7':  { accent:'#B45309', badge:'VILLA 3D TOUR', badgeBg:'#FEF3C7', badgeColor:'#B45309', tagline:'Villa · Biệt thự · Floor Plan', audience:'Dự án villa phân khu', rating:5.0, reviews:78, ribbon:'Mới nhất', ribbonColor:'#B45309', badgeIcon:<Crown className="w-2.5 h-2.5"/> },
  'mock-8':  { accent:'#16A34A', badge:'ECO LIVING',  badgeBg:'#DCFCE7', badgeColor:'#16A34A', tagline:'Sinh thái · Ecopark · Cây xanh', audience:'Nhà ở xanh & Ecopark', rating:4.8, reviews:49, badgeIcon:<Zap className="w-2.5 h-2.5"/> },
  'mock-9':  { accent:'#9F1239', badge:'CLASSIC HERITAGE', badgeBg:'#FFF1F2', badgeColor:'#9F1239', tagline:'Thanh lịch · Truyền thống · Uy tín', audience:'Doanh nghiệp lâu năm', rating:4.7, reviews:38, badgeIcon:<Zap className="w-2.5 h-2.5"/> },
  'mock-10': { accent:'#1E40AF', badge:'INVESTMENT PRO', badgeBg:'#1E40AF', badgeColor:'#fff', tagline:'ROI · Finance · Phân tích', audience:'Nhà đầu tư & Fund BĐS', rating:4.9, reviews:62, badgeIcon:<TrendingUp className="w-2.5 h-2.5"/> },
  'mock-11': { accent:'#DB2777', badge:'LANDING HIGH-CONVERT', badgeBg:'#FDF2F8', badgeColor:'#DB2777', tagline:'Landing Page · Agency · Mở bán', audience:'Chiến dịch marketing', rating:4.9, reviews:91, ribbon:'Chạy Ads tốt', ribbonColor:'#DB2777', badgeIcon:<Zap className="w-2.5 h-2.5"/> },
  'mock-12': { accent:'#0F172A', badge:'MEGA PORTAL', badgeBg:'#0F172A', badgeColor:'#fff', tagline:'Portal · Tập đoàn · Multi-Project', audience:'Developer hàng đầu', rating:5.0, reviews:44, ribbon:'Enterprise', ribbonColor:'#0F172A', badgeIcon:<Crown className="w-2.5 h-2.5"/> },
  'mock-new-1': { accent:'#EF4444', badge:'AUCTION', badgeBg:'#FEE2E2', badgeColor:'#EF4444', tagline:'Đấu giá · Mua bán giá tốt', audience:'Sàn đấu giá', rating:4.9, reviews:82, ribbon:'Hot', ribbonColor:'#EF4444', badgeIcon:<Zap className="w-2.5 h-2.5"/> },
  'mock-new-2': { accent:'#D4A373', badge:'LAND PLOT', badgeBg:'#FEF3C7', badgeColor:'#D97706', tagline:'Đất nền · Khu đô thị', audience:'Chủ đầu tư đất nền', rating:4.8, reviews:71, badgeIcon:<Zap className="w-2.5 h-2.5"/> },
  'mock-15': { accent:'#d97706', badge:'RETAIL & SHOPHOUSE', badgeBg:'#fef3c7', badgeColor:'#d97706', tagline:'Shophouse · Retail · Mặt bằng', audience:'Chủ đầu tư trung tâm', rating:4.8, reviews:64, badgeIcon:<Crown className="w-2.5 h-2.5"/> },
  'mock-16': { accent:'#4f46e5', badge:'TOP PERFORMER', badgeBg:'#e0e7ff', badgeColor:'#4f46e5', tagline:'Môi giới cá nhân · One page', audience:'Môi giới cá nhân', rating:5.0, reviews:150, ribbon:'Xu hướng', ribbonColor:'#4f46e5', badgeIcon:<TrendingUp className="w-2.5 h-2.5"/> },
};

export default function ProductCard({ template, onSelect, onOpenDetails }: ProductCardProps) {
  const { wishlists, toggleWishlist } = useAuth();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorite = wishlists?.some((w: any) => w.templateId === template.id || w.template?.id === template.id) || false;

  const cfg = CARD_CONFIG[template.id] || CARD_CONFIG['mock-1'];
  
  const accent = template.accentColor || cfg.accent;
  const badgeText = template.badge || cfg.badge;
  const badgeBg = template.badgeBg || cfg.badgeBg;
  const badgeColor = template.badgeColor || cfg.badgeColor;
  const tagline = template.shortDescription || cfg.tagline;
  const accentColor = template.accentColor || cfg.accent;
  const rating = template.rating || cfg.rating;
  const reviewCount = template.reviewCount || cfg.reviews;
  const targetAudience = template.targetAudience?.[0] || cfg.audience;
  const audience = targetAudience;
  const demoUrl = getTemplateDemoUrl(template.slug);

  const fmt = (val: number) => new Intl.NumberFormat('vi-VN').format(val) + 'đ';

  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
  ));

  return (
    <div
      className="group relative bg-white rounded-3xl border border-slate-200/80 hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden shadow-sm hover:shadow-2xl cursor-pointer select-none"
      style={{
        boxShadow: isHovered ? `0 20px 40px -15px ${accentColor}1A` : undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenDetails(template)}
    >
      {/* ── IMAGE ── */}
      <div className="relative overflow-hidden bg-slate-100" style={{ aspectRatio: '16/10' }}>
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center z-10">
            <span className="text-xs text-slate-400 font-medium tracking-wide">⚡ {template.name}</span>
          </div>
        )}

        <img
          src={(imgError || !template.thumbnail) ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' : `${template.thumbnail}${template.thumbnail.includes('?') ? '&' : '?'}auto=format&fit=crop&w=800&q=80`}
          alt={template.name}
          onLoad={() => setImgLoaded(true)}
          onError={() => { setImgError(true); setImgLoaded(true); }}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          style={{
            transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            opacity: 1,
          }}
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-2.5"
          style={{
            background: 'rgba(0,0,0,0.42)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.25s ease',
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); window.open(demoUrl, '_blank'); }}
            className="flex items-center gap-1.5 bg-white text-slate-900 font-bold text-xs px-3.5 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            <Play className="w-3 h-3" /> Demo
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onOpenDetails(template); }}
            className="flex items-center gap-1.5 border border-white/60 text-white font-semibold text-xs px-3.5 py-2 rounded-xl hover:bg-white/20 transition-colors"
          >
            <Eye className="w-3 h-3" /> Chi tiết
          </button>
        </div>

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span
            className="flex items-center gap-1.5 text-[13px] font-semibold px-[14px] py-[6px] rounded-full uppercase tracking-wider shadow-sm"
            style={{ backgroundColor: badgeBg, color: badgeColor }}
          >
            {cfg.badgeIcon}
            {badgeText}
          </span>
          {cfg.ribbon && (
            <span
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-white uppercase tracking-wider"
              style={{ backgroundColor: cfg.ribbonColor }}
            >
              {cfg.ribbon}
            </span>
          )}
        </div>

        {/* Favorite */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(template); }}
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow transition-transform hover:scale-110"
          title={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
        >
          <Heart className={`w-3.5 h-3.5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
        </button>
      </div>

      {/* ── CONTENT ── */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-card-title line-clamp-1 flex-1 text-text-primary">{template.name}</h3>
          <div className="flex items-center gap-0.5 shrink-0 mt-1">
            {stars}
          </div>
        </div>

        {/* Tagline */}
        <p className="text-small text-text-caption mb-3">{tagline}</p>

        {/* Audience chip */}
        <div className="mb-3">
          <span
            className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg"
            style={{ backgroundColor: accent + '12', color: accent }}
          >
            <Users className="w-2.5 h-2.5" /> {audience}
          </span>
        </div>

        {/* Features — top 3 */}
        <div className="flex flex-col gap-1 mb-4 flex-grow">
          {(template.features || []).slice(0, 3).map((f: string, i: number) => (
            <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600 font-normal">
              <Check className="w-3 h-3 shrink-0" style={{ color: accent }} />
              <span className="line-clamp-1">{f}</span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-caption text-text-caption mb-1">Thiết kế trọn gói</p>
              <p className="text-[32px] font-black leading-none text-[#2563EB]">
                499.000đ
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] bg-emerald-50 text-emerald-600 font-extrabold px-2 py-1 rounded-md border border-emerald-200">BÀN GIAO NGAY</span>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); onOpenDetails(template); }}
            className="w-full h-12 text-white text-button rounded-[14px] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
            style={{ backgroundColor: accent, letterSpacing: '0.02em' }}
          >
            Xem chi tiết & Demo <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
