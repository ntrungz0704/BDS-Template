import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Eye, Heart, Play, Check, Zap, Users, ArrowRight, Crown, TrendingUp, ShoppingCart, Clock } from 'lucide-react';
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
  thumbnail: string;
}> = {
  // 1. Luxury Gold
  'bds-01': { accent:'#C5A028', badge:'LUXURY VIP', badgeBg:'#0F172A', badgeColor:'#E2B714', tagline:'Biệt thự · Penthouse · Dinh thự dát vàng', audience:'Chủ đầu tư biệt thự siêu sang', rating:5.0, reviews:128, ribbon:'Bán chạy #1', ribbonColor:'#D97706', badgeIcon:<Crown className="w-3 h-3 text-amber-400"/>, thumbnail:'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800' },
  'luxury-gold': { accent:'#C5A028', badge:'LUXURY VIP', badgeBg:'#0F172A', badgeColor:'#E2B714', tagline:'Biệt thự · Penthouse · Dinh thự dát vàng', audience:'Chủ đầu tư biệt thự siêu sang', rating:5.0, reviews:128, ribbon:'Bán chạy #1', ribbonColor:'#D97706', badgeIcon:<Crown className="w-3 h-3 text-amber-400"/>, thumbnail:'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800' },
  'mock-1': { accent:'#C5A028', badge:'LUXURY VIP', badgeBg:'#0F172A', badgeColor:'#E2B714', tagline:'Biệt thự · Penthouse · Dinh thự dát vàng', audience:'Chủ đầu tư biệt thự siêu sang', rating:5.0, reviews:128, ribbon:'Bán chạy #1', ribbonColor:'#D97706', badgeIcon:<Crown className="w-3 h-3 text-amber-400"/>, thumbnail:'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800' },

  // 2. Minimal White
  'bds-02': { accent:'#2563EB', badge:'APPLE MINIMAL', badgeBg:'#EFF6FF', badgeColor:'#2563EB', tagline:'Penthouse · Căn hộ Bắc Âu · Tối giản', audience:'Môi giới cá nhân & Studio trẻ', rating:4.9, reviews:98, ribbon:'Phổ biến', ribbonColor:'#2563EB', badgeIcon:<Zap className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800' },
  'minimal-white': { accent:'#2563EB', badge:'APPLE MINIMAL', badgeBg:'#EFF6FF', badgeColor:'#2563EB', tagline:'Penthouse · Căn hộ Bắc Âu · Tối giản', audience:'Môi giới cá nhân & Studio trẻ', rating:4.9, reviews:98, ribbon:'Phổ biến', ribbonColor:'#2563EB', badgeIcon:<Zap className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800' },
  'minimal-zen': { accent:'#2563EB', badge:'APPLE MINIMAL', badgeBg:'#EFF6FF', badgeColor:'#2563EB', tagline:'Penthouse · Căn hộ Bắc Âu · Tối giản', audience:'Môi giới cá nhân & Studio trẻ', rating:4.9, reviews:98, ribbon:'Phổ biến', ribbonColor:'#2563EB', badgeIcon:<Zap className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800' },
  'mock-2': { accent:'#2563EB', badge:'APPLE MINIMAL', badgeBg:'#EFF6FF', badgeColor:'#2563EB', tagline:'Penthouse · Căn hộ Bắc Âu · Tối giản', audience:'Môi giới cá nhân & Studio trẻ', rating:4.9, reviews:98, ribbon:'Phổ biến', ribbonColor:'#2563EB', badgeIcon:<Zap className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800' },

  // 3. Modern Corporate
  'bds-03': { accent:'#0F4C81', badge:'CORPORATE PRO', badgeBg:'#0F4C81', badgeColor:'#FFFFFF', tagline:'Tập đoàn BĐS · Sàn lớn · Multi-Branch', audience:'Doanh nghiệp & Tập đoàn 100+ nhân sự', rating:4.8, reviews:76, ribbon:'Doanh nghiệp', ribbonColor:'#0F4C81', badgeIcon:<TrendingUp className="w-3 h-3 text-white"/>, thumbnail:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },
  'modern-corporate': { accent:'#0F4C81', badge:'CORPORATE PRO', badgeBg:'#0F4C81', badgeColor:'#FFFFFF', tagline:'Tập đoàn BĐS · Sàn lớn · Multi-Branch', audience:'Doanh nghiệp & Tập đoàn 100+ nhân sự', rating:4.8, reviews:76, ribbon:'Doanh nghiệp', ribbonColor:'#0F4C81', badgeIcon:<TrendingUp className="w-3 h-3 text-white"/>, thumbnail:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },
  'mock-3': { accent:'#0F4C81', badge:'CORPORATE PRO', badgeBg:'#0F4C81', badgeColor:'#FFFFFF', tagline:'Tập đoàn BĐS · Sàn lớn · Multi-Branch', audience:'Doanh nghiệp & Tập đoàn 100+ nhân sự', rating:4.8, reviews:76, ribbon:'Doanh nghiệp', ribbonColor:'#0F4C81', badgeIcon:<TrendingUp className="w-3 h-3 text-white"/>, thumbnail:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },

  // 4. Resort Paradise
  'bds-04': { accent:'#0284C7', badge:'RESORT PARADISE', badgeBg:'#E0F2FE', badgeColor:'#0284C7', tagline:'Biển đảo · Condotel · Second Home', audience:'Chủ đầu tư BĐS nghỉ dưỡng ven biển', rating:4.9, reviews:64, ribbon:'Nghỉ dưỡng', ribbonColor:'#0284C7', badgeIcon:<Zap className="w-3 h-3 text-sky-600"/>, thumbnail:'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800' },
  'resort-paradise': { accent:'#0284C7', badge:'RESORT PARADISE', badgeBg:'#E0F2FE', badgeColor:'#0284C7', tagline:'Biển đảo · Condotel · Second Home', audience:'Chủ đầu tư BĐS nghỉ dưỡng ven biển', rating:4.9, reviews:64, ribbon:'Nghỉ dưỡng', ribbonColor:'#0284C7', badgeIcon:<Zap className="w-3 h-3 text-sky-600"/>, thumbnail:'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800' },
  'ocean-view': { accent:'#0284C7', badge:'RESORT PARADISE', badgeBg:'#E0F2FE', badgeColor:'#0284C7', tagline:'Biển đảo · Condotel · Second Home', audience:'Chủ đầu tư BĐS nghỉ dưỡng ven biển', rating:4.9, reviews:64, ribbon:'Nghỉ dưỡng', ribbonColor:'#0284C7', badgeIcon:<Zap className="w-3 h-3 text-sky-600"/>, thumbnail:'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800' },
  'mock-4': { accent:'#0284C7', badge:'RESORT PARADISE', badgeBg:'#E0F2FE', badgeColor:'#0284C7', tagline:'Biển đảo · Condotel · Second Home', audience:'Chủ đầu tư BĐS nghỉ dưỡng ven biển', rating:4.9, reviews:64, ribbon:'Nghỉ dưỡng', ribbonColor:'#0284C7', badgeIcon:<Zap className="w-3 h-3 text-sky-600"/>, thumbnail:'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800' },

  // 5. Urban City / Smart Urban
  'bds-05': { accent:'#7C3AED', badge:'SMART URBAN', badgeBg:'#F5F3FF', badgeColor:'#7C3AED', tagline:'Smart City · Căn hộ cao tầng · Bản đồ Metro', audience:'Chung cư nội đô & Đại đô thị thông minh', rating:4.8, reviews:52, ribbon:'Smart City', ribbonColor:'#7C3AED', badgeIcon:<Zap className="w-3 h-3 text-purple-600"/>, thumbnail:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
  'urban-city': { accent:'#7C3AED', badge:'SMART URBAN', badgeBg:'#F5F3FF', badgeColor:'#7C3AED', tagline:'Smart City · Căn hộ cao tầng · Bản đồ Metro', audience:'Chung cư nội đô & Đại đô thị thông minh', rating:4.8, reviews:52, ribbon:'Smart City', ribbonColor:'#7C3AED', badgeIcon:<Zap className="w-3 h-3 text-purple-600"/>, thumbnail:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
  'smart-urban': { accent:'#7C3AED', badge:'SMART URBAN', badgeBg:'#F5F3FF', badgeColor:'#7C3AED', tagline:'Smart City · Căn hộ cao tầng · Bản đồ Metro', audience:'Chung cư nội đô & Đại đô thị thông minh', rating:4.8, reviews:52, ribbon:'Smart City', ribbonColor:'#7C3AED', badgeIcon:<Zap className="w-3 h-3 text-purple-600"/>, thumbnail:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
  'high-rise': { accent:'#7C3AED', badge:'SMART URBAN', badgeBg:'#F5F3FF', badgeColor:'#7C3AED', tagline:'Smart City · Căn hộ cao tầng · Bản đồ Metro', audience:'Chung cư nội đô & Đại đô thị thông minh', rating:4.8, reviews:52, ribbon:'Smart City', ribbonColor:'#7C3AED', badgeIcon:<Zap className="w-3 h-3 text-purple-600"/>, thumbnail:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
  'mock-5': { accent:'#7C3AED', badge:'SMART URBAN', badgeBg:'#F5F3FF', badgeColor:'#7C3AED', tagline:'Smart City · Căn hộ cao tầng · Bản đồ Metro', audience:'Chung cư nội đô & Đại đô thị thông minh', rating:4.8, reviews:52, ribbon:'Smart City', ribbonColor:'#7C3AED', badgeIcon:<Zap className="w-3 h-3 text-purple-600"/>, thumbnail:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },

  // 6. Industrial Estate
  'bds-06': { accent:'#F59E0B', badge:'INDUSTRIAL B2B', badgeBg:'#1E293B', badgeColor:'#F59E0B', tagline:'Khu công nghiệp · Nhà xưởng · Kho vận B2B', audience:'Chủ đầu tư KCN & Doanh nghiệp FDI', rating:4.7, reviews:39, ribbon:'KCN & Kho Bãi', ribbonColor:'#475569', badgeIcon:<Zap className="w-3 h-3 text-amber-500"/>, thumbnail:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800' },
  'industrial-estate': { accent:'#F59E0B', badge:'INDUSTRIAL B2B', badgeBg:'#1E293B', badgeColor:'#F59E0B', tagline:'Khu công nghiệp · Nhà xưởng · Kho vận B2B', audience:'Chủ đầu tư KCN & Doanh nghiệp FDI', rating:4.7, reviews:39, ribbon:'KCN & Kho Bãi', ribbonColor:'#475569', badgeIcon:<Zap className="w-3 h-3 text-amber-500"/>, thumbnail:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800' },
  'industrial-logistics': { accent:'#F59E0B', badge:'INDUSTRIAL B2B', badgeBg:'#1E293B', badgeColor:'#F59E0B', tagline:'Khu công nghiệp · Nhà xưởng · Kho vận B2B', audience:'Chủ đầu tư KCN & Doanh nghiệp FDI', rating:4.7, reviews:39, ribbon:'KCN & Kho Bãi', ribbonColor:'#475569', badgeIcon:<Zap className="w-3 h-3 text-amber-500"/>, thumbnail:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800' },
  'mock-6': { accent:'#F59E0B', badge:'INDUSTRIAL B2B', badgeBg:'#1E293B', badgeColor:'#F59E0B', tagline:'Khu công nghiệp · Nhà xưởng · Kho vận B2B', audience:'Chủ đầu tư KCN & Doanh nghiệp FDI', rating:4.7, reviews:39, ribbon:'KCN & Kho Bãi', ribbonColor:'#475569', badgeIcon:<Zap className="w-3 h-3 text-amber-500"/>, thumbnail:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800' },

  // 7. Villa Premium / Royal Garden
  'bds-07': { accent:'#B45309', badge:'VILLA 3D TOUR', badgeBg:'#FEF3C7', badgeColor:'#B45309', tagline:'Biệt thự đơn lập · Sơ đồ mặt bằng · 3D Tour', audience:'Dự án Villa compound cao cấp', rating:5.0, reviews:84, ribbon:'Matterport 3D', ribbonColor:'#B45309', badgeIcon:<Crown className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
  'villa-premium': { accent:'#B45309', badge:'VILLA 3D TOUR', badgeBg:'#FEF3C7', badgeColor:'#B45309', tagline:'Biệt thự đơn lập · Sơ đồ mặt bằng · 3D Tour', audience:'Dự án Villa compound cao cấp', rating:5.0, reviews:84, ribbon:'Matterport 3D', ribbonColor:'#B45309', badgeIcon:<Crown className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
  'modern-villa': { accent:'#B45309', badge:'VILLA 3D TOUR', badgeBg:'#FEF3C7', badgeColor:'#B45309', tagline:'Biệt thự đơn lập · Sơ đồ mặt bằng · 3D Tour', audience:'Dự án Villa compound cao cấp', rating:5.0, reviews:84, ribbon:'Matterport 3D', ribbonColor:'#B45309', badgeIcon:<Crown className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
  'luxury-villa': { accent:'#B45309', badge:'VILLA 3D TOUR', badgeBg:'#FEF3C7', badgeColor:'#B45309', tagline:'Biệt thự đơn lập · Sơ đồ mặt bằng · 3D Tour', audience:'Dự án Villa compound cao cấp', rating:5.0, reviews:84, ribbon:'Matterport 3D', ribbonColor:'#B45309', badgeIcon:<Crown className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
  'mock-7': { accent:'#B45309', badge:'VILLA 3D TOUR', badgeBg:'#FEF3C7', badgeColor:'#B45309', tagline:'Biệt thự đơn lập · Sơ đồ mặt bằng · 3D Tour', audience:'Dự án Villa compound cao cấp', rating:5.0, reviews:84, ribbon:'Matterport 3D', ribbonColor:'#B45309', badgeIcon:<Crown className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },

  // 8. Eco Green Living
  'bds-08': { accent:'#16A34A', badge:'ECO LIVING', badgeBg:'#DCFCE7', badgeColor:'#16A34A', tagline:'Đô thị sinh thái xanh · Ecopark · ESG', audience:'Khu đô thị sinh thái & Nhà vườn xanh', rating:4.8, reviews:58, ribbon:'Chuẩn Xanh ESG', ribbonColor:'#16A34A', badgeIcon:<Zap className="w-3 h-3 text-emerald-600"/>, thumbnail:'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800' },
  'eco-green': { accent:'#16A34A', badge:'ECO LIVING', badgeBg:'#DCFCE7', badgeColor:'#16A34A', tagline:'Đô thị sinh thái xanh · Ecopark · ESG', audience:'Khu đô thị sinh thái & Nhà vườn xanh', rating:4.8, reviews:58, ribbon:'Chuẩn Xanh ESG', ribbonColor:'#16A34A', badgeIcon:<Zap className="w-3 h-3 text-emerald-600"/>, thumbnail:'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800' },
  'green-eco': { accent:'#16A34A', badge:'ECO LIVING', badgeBg:'#DCFCE7', badgeColor:'#16A34A', tagline:'Đô thị sinh thái xanh · Ecopark · ESG', audience:'Khu đô thị sinh thái & Nhà vườn xanh', rating:4.8, reviews:58, ribbon:'Chuẩn Xanh ESG', ribbonColor:'#16A34A', badgeIcon:<Zap className="w-3 h-3 text-emerald-600"/>, thumbnail:'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800' },
  'eco-living': { accent:'#16A34A', badge:'ECO LIVING', badgeBg:'#DCFCE7', badgeColor:'#16A34A', tagline:'Đô thị sinh thái xanh · Ecopark · ESG', audience:'Khu đô thị sinh thái & Nhà vườn xanh', rating:4.8, reviews:58, ribbon:'Chuẩn Xanh ESG', ribbonColor:'#16A34A', badgeIcon:<Zap className="w-3 h-3 text-emerald-600"/>, thumbnail:'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800' },
  'mock-8': { accent:'#16A34A', badge:'ECO LIVING', badgeBg:'#DCFCE7', badgeColor:'#16A34A', tagline:'Đô thị sinh thái xanh · Ecopark · ESG', audience:'Khu đô thị sinh thái & Nhà vườn xanh', rating:4.8, reviews:58, ribbon:'Chuẩn Xanh ESG', ribbonColor:'#16A34A', badgeIcon:<Zap className="w-3 h-3 text-emerald-600"/>, thumbnail:'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800' },

  // 9. Classic Heritage
  'bds-09': { accent:'#9F1239', badge:'CLASSIC HERITAGE', badgeBg:'#FFF1F2', badgeColor:'#9F1239', tagline:'Tân cổ điển Châu Âu · Lâu đài · Indochine', audience:'Doanh nghiệp lâu năm & Khách trung niên', rating:4.8, reviews:44, ribbon:'Tân cổ điển', ribbonColor:'#9F1239', badgeIcon:<Zap className="w-3 h-3 text-rose-600"/>, thumbnail:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800' },
  'classic-elegant': { accent:'#9F1239', badge:'CLASSIC HERITAGE', badgeBg:'#FFF1F2', badgeColor:'#9F1239', tagline:'Tân cổ điển Châu Âu · Lâu đài · Indochine', audience:'Doanh nghiệp lâu năm & Khách trung niên', rating:4.8, reviews:44, ribbon:'Tân cổ điển', ribbonColor:'#9F1239', badgeIcon:<Zap className="w-3 h-3 text-rose-600"/>, thumbnail:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800' },
  'heritage-classic': { accent:'#9F1239', badge:'CLASSIC HERITAGE', badgeBg:'#FFF1F2', badgeColor:'#9F1239', tagline:'Tân cổ điển Châu Âu · Lâu đài · Indochine', audience:'Doanh nghiệp lâu năm & Khách trung niên', rating:4.8, reviews:44, ribbon:'Tân cổ điển', ribbonColor:'#9F1239', badgeIcon:<Zap className="w-3 h-3 text-rose-600"/>, thumbnail:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800' },
  'classic-heritage': { accent:'#9F1239', badge:'CLASSIC HERITAGE', badgeBg:'#FFF1F2', badgeColor:'#9F1239', tagline:'Tân cổ điển Châu Âu · Lâu đài · Indochine', audience:'Doanh nghiệp lâu năm & Khách trung niên', rating:4.8, reviews:44, ribbon:'Tân cổ điển', ribbonColor:'#9F1239', badgeIcon:<Zap className="w-3 h-3 text-rose-600"/>, thumbnail:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800' },
  'mock-9': { accent:'#9F1239', badge:'CLASSIC HERITAGE', badgeBg:'#FFF1F2', badgeColor:'#9F1239', tagline:'Tân cổ điển Châu Âu · Lâu đài · Indochine', audience:'Doanh nghiệp lâu năm & Khách trung niên', rating:4.8, reviews:44, ribbon:'Tân cổ điển', ribbonColor:'#9F1239', badgeIcon:<Zap className="w-3 h-3 text-rose-600"/>, thumbnail:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800' },

  // 10. Investment Pro
  'bds-10': { accent:'#1E40AF', badge:'INVESTMENT PRO', badgeBg:'#EFF6FF', badgeColor:'#1E40AF', tagline:'Tài chính BĐS · Biểu đồ giá · Máy tính ROI', audience:'Nhà đầu tư sành sỏi & Quỹ BĐS', rating:4.9, reviews:71, ribbon:'Phân tích ROI', ribbonColor:'#1E40AF', badgeIcon:<TrendingUp className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800' },
  'investment-pro': { accent:'#1E40AF', badge:'INVESTMENT PRO', badgeBg:'#EFF6FF', badgeColor:'#1E40AF', tagline:'Tài chính BĐS · Biểu đồ giá · Máy tính ROI', audience:'Nhà đầu tư sành sỏi & Quỹ BĐS', rating:4.9, reviews:71, ribbon:'Phân tích ROI', ribbonColor:'#1E40AF', badgeIcon:<TrendingUp className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800' },
  'tech-hub': { accent:'#1E40AF', badge:'INVESTMENT PRO', badgeBg:'#EFF6FF', badgeColor:'#1E40AF', tagline:'Tài chính BĐS · Biểu đồ giá · Máy tính ROI', audience:'Nhà đầu tư sành sỏi & Quỹ BĐS', rating:4.9, reviews:71, ribbon:'Phân tích ROI', ribbonColor:'#1E40AF', badgeIcon:<TrendingUp className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800' },
  'mock-10': { accent:'#1E40AF', badge:'INVESTMENT PRO', badgeBg:'#EFF6FF', badgeColor:'#1E40AF', tagline:'Tài chính BĐS · Biểu đồ giá · Máy tính ROI', audience:'Nhà đầu tư sành sỏi & Quỹ BĐS', rating:4.9, reviews:71, ribbon:'Phân tích ROI', ribbonColor:'#1E40AF', badgeIcon:<TrendingUp className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800' },

  // 11. Agency Onepage
  'bds-11': { accent:'#DB2777', badge:'LANDING ADS', badgeBg:'#FDF2F8', badgeColor:'#DB2777', tagline:'Landing Page 1 trang · Tối ưu Ads · FOMO', audience:'Agency chạy Ads & Chiến dịch mở bán F1', rating:4.9, reviews:96, ribbon:'Chạy Ads Tốt', ribbonColor:'#DB2777', badgeIcon:<Zap className="w-3 h-3 text-pink-600"/>, thumbnail:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800' },
  'agency-onepage': { accent:'#DB2777', badge:'LANDING ADS', badgeBg:'#FDF2F8', badgeColor:'#DB2777', tagline:'Landing Page 1 trang · Tối ưu Ads · FOMO', audience:'Agency chạy Ads & Chiến dịch mở bán F1', rating:4.9, reviews:96, ribbon:'Chạy Ads Tốt', ribbonColor:'#DB2777', badgeIcon:<Zap className="w-3 h-3 text-pink-600"/>, thumbnail:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800' },
  'suburban-family': { accent:'#DB2777', badge:'LANDING ADS', badgeBg:'#FDF2F8', badgeColor:'#DB2777', tagline:'Landing Page 1 trang · Tối ưu Ads · FOMO', audience:'Agency chạy Ads & Chiến dịch mở bán F1', rating:4.9, reviews:96, ribbon:'Chạy Ads Tốt', ribbonColor:'#DB2777', badgeIcon:<Zap className="w-3 h-3 text-pink-600"/>, thumbnail:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800' },
  'mock-11': { accent:'#DB2777', badge:'LANDING ADS', badgeBg:'#FDF2F8', badgeColor:'#DB2777', tagline:'Landing Page 1 trang · Tối ưu Ads · FOMO', audience:'Agency chạy Ads & Chiến dịch mở bán F1', rating:4.9, reviews:96, ribbon:'Chạy Ads Tốt', ribbonColor:'#DB2777', badgeIcon:<Zap className="w-3 h-3 text-pink-600"/>, thumbnail:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800' },

  // 12. Mega Developer Portal
  'bds-12': { accent:'#38BDF8', badge:'MEGA PORTAL', badgeBg:'#0F172A', badgeColor:'#38BDF8', tagline:'Cổng thông tin Đa dự án · Quan hệ cổ đông', audience:'Chủ đầu tư cấp 1 & Tập đoàn niêm yết', rating:5.0, reviews:50, ribbon:'Enterprise', ribbonColor:'#0F172A', badgeIcon:<Crown className="w-3 h-3 text-cyan-400"/>, thumbnail:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },
  'mega-developer': { accent:'#38BDF8', badge:'MEGA PORTAL', badgeBg:'#0F172A', badgeColor:'#38BDF8', tagline:'Cổng thông tin Đa dự án · Quan hệ cổ đông', audience:'Chủ đầu tư cấp 1 & Tập đoàn niêm yết', rating:5.0, reviews:50, ribbon:'Enterprise', ribbonColor:'#0F172A', badgeIcon:<Crown className="w-3 h-3 text-cyan-400"/>, thumbnail:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },
  'listing-portal': { accent:'#38BDF8', badge:'MEGA PORTAL', badgeBg:'#0F172A', badgeColor:'#38BDF8', tagline:'Cổng thông tin Đa dự án · Quan hệ cổ đông', audience:'Chủ đầu tư cấp 1 & Tập đoàn niêm yết', rating:5.0, reviews:50, ribbon:'Enterprise', ribbonColor:'#0F172A', badgeIcon:<Crown className="w-3 h-3 text-cyan-400"/>, thumbnail:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },
  'riverside-mansion': { accent:'#38BDF8', badge:'MEGA PORTAL', badgeBg:'#0F172A', badgeColor:'#38BDF8', tagline:'Cổng thông tin Đa dự án · Quan hệ cổ đông', audience:'Chủ đầu tư cấp 1 & Tập đoàn niêm yết', rating:5.0, reviews:50, ribbon:'Enterprise', ribbonColor:'#0F172A', badgeIcon:<Crown className="w-3 h-3 text-cyan-400"/>, thumbnail:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },
  'mock-12': { accent:'#38BDF8', badge:'MEGA PORTAL', badgeBg:'#0F172A', badgeColor:'#38BDF8', tagline:'Cổng thông tin Đa dự án · Quan hệ cổ đông', audience:'Chủ đầu tư cấp 1 & Tập đoàn niêm yết', rating:5.0, reviews:50, ribbon:'Enterprise', ribbonColor:'#0F172A', badgeIcon:<Crown className="w-3 h-3 text-cyan-400"/>, thumbnail:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },

  // 13. Sàn Đấu Giá BĐS
  'bds-13': { accent:'#DC2626', badge:'AUCTION PRO', badgeBg:'#FEE2E2', badgeColor:'#DC2626', tagline:'Đấu giá trực tuyến · Countdown · Giá khởi điểm', audience:'Sàn đấu giá & Tài sản phát mãi ngân hàng', rating:4.9, reviews:89, ribbon:'Đấu giá HOT', ribbonColor:'#DC2626', badgeIcon:<Zap className="w-3 h-3 text-red-600"/>, thumbnail:'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800' },
  'auction-template': { accent:'#DC2626', badge:'AUCTION PRO', badgeBg:'#FEE2E2', badgeColor:'#DC2626', tagline:'Đấu giá trực tuyến · Countdown · Giá khởi điểm', audience:'Sàn đấu giá & Tài sản phát mãi ngân hàng', rating:4.9, reviews:89, ribbon:'Đấu giá HOT', ribbonColor:'#DC2626', badgeIcon:<Zap className="w-3 h-3 text-red-600"/>, thumbnail:'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800' },
  'auction-bds': { accent:'#DC2626', badge:'AUCTION PRO', badgeBg:'#FEE2E2', badgeColor:'#DC2626', tagline:'Đấu giá trực tuyến · Countdown · Giá khởi điểm', audience:'Sàn đấu giá & Tài sản phát mãi ngân hàng', rating:4.9, reviews:89, ribbon:'Đấu giá HOT', ribbonColor:'#DC2626', badgeIcon:<Zap className="w-3 h-3 text-red-600"/>, thumbnail:'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800' },
  'lake-sanctuary': { accent:'#DC2626', badge:'AUCTION PRO', badgeBg:'#FEE2E2', badgeColor:'#DC2626', tagline:'Đấu giá trực tuyến · Countdown · Giá khởi điểm', audience:'Sàn đấu giá & Tài sản phát mãi ngân hàng', rating:4.9, reviews:89, ribbon:'Đấu giá HOT', ribbonColor:'#DC2626', badgeIcon:<Zap className="w-3 h-3 text-red-600"/>, thumbnail:'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800' },
  'mock-new-1': { accent:'#DC2626', badge:'AUCTION PRO', badgeBg:'#FEE2E2', badgeColor:'#DC2626', tagline:'Đấu giá trực tuyến · Countdown · Giá khởi điểm', audience:'Sàn đấu giá & Tài sản phát mãi ngân hàng', rating:4.9, reviews:89, ribbon:'Đấu giá HOT', ribbonColor:'#DC2626', badgeIcon:<Zap className="w-3 h-3 text-red-600"/>, thumbnail:'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800' },

  // 14. Dự Án Đất Nền
  'bds-14': { accent:'#D97706', badge:'MASTER LAND PLOT', badgeBg:'#FEF3C7', badgeColor:'#D97706', tagline:'Phân lô bán nền · Bản đồ 1/500 · Vị trí đắc địa', audience:'Chủ đầu tư đất nền & Khu đô thị mới', rating:4.8, reviews:75, ribbon:'Phân Lô 1/500', ribbonColor:'#D97706', badgeIcon:<Zap className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },
  'landplot-template': { accent:'#D97706', badge:'MASTER LAND PLOT', badgeBg:'#FEF3C7', badgeColor:'#D97706', tagline:'Phân lô bán nền · Bản đồ 1/500 · Vị trí đắc địa', audience:'Chủ đầu tư đất nền & Khu đô thị mới', rating:4.8, reviews:75, ribbon:'Phân Lô 1/500', ribbonColor:'#D97706', badgeIcon:<Zap className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },
  'land-plot': { accent:'#D97706', badge:'MASTER LAND PLOT', badgeBg:'#FEF3C7', badgeColor:'#D97706', tagline:'Phân lô bán nền · Bản đồ 1/500 · Vị trí đắc địa', audience:'Chủ đầu tư đất nền & Khu đô thị mới', rating:4.8, reviews:75, ribbon:'Phân Lô 1/500', ribbonColor:'#D97706', badgeIcon:<Zap className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },
  'mountain-retreat': { accent:'#D97706', badge:'MASTER LAND PLOT', badgeBg:'#FEF3C7', badgeColor:'#D97706', tagline:'Phân lô bán nền · Bản đồ 1/500 · Vị trí đắc địa', audience:'Chủ đầu tư đất nền & Khu đô thị mới', rating:4.8, reviews:75, ribbon:'Phân Lô 1/500', ribbonColor:'#D97706', badgeIcon:<Zap className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },
  'mock-new-2': { accent:'#D97706', badge:'MASTER LAND PLOT', badgeBg:'#FEF3C7', badgeColor:'#D97706', tagline:'Phân lô bán nền · Bản đồ 1/500 · Vị trí đắc địa', audience:'Chủ đầu tư đất nền & Khu đô thị mới', rating:4.8, reviews:75, ribbon:'Phân Lô 1/500', ribbonColor:'#D97706', badgeIcon:<Zap className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },

  // 15. Retail Podium / Shophouse
  'bds-15': { accent:'#EA580C', badge:'RETAIL & SHOP', badgeBg:'#FFF7ED', badgeColor:'#EA580C', tagline:'Shophouse khối đế · Mặt bằng kinh doanh TTTM', audience:'Chủ đầu tư trung tâm thương mại & Shophouse', rating:4.8, reviews:68, ribbon:'Mặt Bằng KD', ribbonColor:'#EA580C', badgeIcon:<Crown className="w-3 h-3 text-orange-600"/>, thumbnail:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800' },
  'retail-podium': { accent:'#EA580C', badge:'RETAIL & SHOP', badgeBg:'#FFF7ED', badgeColor:'#EA580C', tagline:'Shophouse khối đế · Mặt bằng kinh doanh TTTM', audience:'Chủ đầu tư trung tâm thương mại & Shophouse', rating:4.8, reviews:68, ribbon:'Mặt Bằng KD', ribbonColor:'#EA580C', badgeIcon:<Crown className="w-3 h-3 text-orange-600"/>, thumbnail:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800' },
  'retail-commercial': { accent:'#EA580C', badge:'RETAIL & SHOP', badgeBg:'#FFF7ED', badgeColor:'#EA580C', tagline:'Shophouse khối đế · Mặt bằng kinh doanh TTTM', audience:'Chủ đầu tư trung tâm thương mại & Shophouse', rating:4.8, reviews:68, ribbon:'Mặt Bằng KD', ribbonColor:'#EA580C', badgeIcon:<Crown className="w-3 h-3 text-orange-600"/>, thumbnail:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800' },
  'commercial-plaza': { accent:'#EA580C', badge:'RETAIL & SHOP', badgeBg:'#FFF7ED', badgeColor:'#EA580C', tagline:'Shophouse khối đế · Mặt bằng kinh doanh TTTM', audience:'Chủ đầu tư trung tâm thương mại & Shophouse', rating:4.8, reviews:68, ribbon:'Mặt Bằng KD', ribbonColor:'#EA580C', badgeIcon:<Crown className="w-3 h-3 text-orange-600"/>, thumbnail:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800' },
  'mock-15': { accent:'#EA580C', badge:'RETAIL & SHOP', badgeBg:'#FFF7ED', badgeColor:'#EA580C', tagline:'Shophouse khối đế · Mặt bằng kinh doanh TTTM', audience:'Chủ đầu tư trung tâm thương mại & Shophouse', rating:4.8, reviews:68, ribbon:'Mặt Bằng KD', ribbonColor:'#EA580C', badgeIcon:<Crown className="w-3 h-3 text-orange-600"/>, thumbnail:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800' },

  // 16. Personal Agent
  'bds-16': { accent:'#4F46E5', badge:'TOP PERFORMER', badgeBg:'#EEF2FF', badgeColor:'#4F46E5', tagline:'Môi giới triệu đô · One Page · Booking tư vấn', audience:'Chuyên viên môi giới cá nhân & Top Advisor', rating:5.0, reviews:165, ribbon:'Môi Giới VIP', ribbonColor:'#4F46E5', badgeIcon:<TrendingUp className="w-3 h-3 text-indigo-600"/>, thumbnail:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800' },
  'personal-agent': { accent:'#4F46E5', badge:'TOP PERFORMER', badgeBg:'#EEF2FF', badgeColor:'#4F46E5', tagline:'Môi giới triệu đô · One Page · Booking tư vấn', audience:'Chuyên viên môi giới cá nhân & Top Advisor', rating:5.0, reviews:165, ribbon:'Môi Giới VIP', ribbonColor:'#4F46E5', badgeIcon:<TrendingUp className="w-3 h-3 text-indigo-600"/>, thumbnail:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800' },
  'golf-residences': { accent:'#4F46E5', badge:'TOP PERFORMER', badgeBg:'#EEF2FF', badgeColor:'#4F46E5', tagline:'Môi giới triệu đô · One Page · Booking tư vấn', audience:'Chuyên viên môi giới cá nhân & Top Advisor', rating:5.0, reviews:165, ribbon:'Môi Giới VIP', ribbonColor:'#4F46E5', badgeIcon:<TrendingUp className="w-3 h-3 text-indigo-600"/>, thumbnail:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800' },
  'mock-16': { accent:'#4F46E5', badge:'TOP PERFORMER', badgeBg:'#EEF2FF', badgeColor:'#4F46E5', tagline:'Môi giới triệu đô · One Page · Booking tư vấn', audience:'Chuyên viên môi giới cá nhân & Top Advisor', rating:5.0, reviews:165, ribbon:'Môi Giới VIP', ribbonColor:'#4F46E5', badgeIcon:<TrendingUp className="w-3 h-3 text-indigo-600"/>, thumbnail:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800' },

  // 17. Portal Listing (HOT)
  'bds-17': { accent:'#2563EB', badge:'PORTAL TOP 1', badgeBg:'#EFF6FF', badgeColor:'#2563EB', tagline:'Cổng tin BĐS số 1 · Mua bán & Cho thuê · Tính lãi vay', audience:'Sàn giao dịch lớn & Cổng tin toàn quốc', rating:5.0, reviews:210, ribbon:'HOT 🔥', ribbonColor:'#EF4444', badgeIcon:<Crown className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
  'portal-listing': { accent:'#2563EB', badge:'PORTAL TOP 1', badgeBg:'#EFF6FF', badgeColor:'#2563EB', tagline:'Cổng tin BĐS số 1 · Mua bán & Cho thuê · Tính lãi vay', audience:'Sàn giao dịch lớn & Cổng tin toàn quốc', rating:5.0, reviews:210, ribbon:'HOT 🔥', ribbonColor:'#EF4444', badgeIcon:<Crown className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
  'vietnam-portal': { accent:'#2563EB', badge:'PORTAL TOP 1', badgeBg:'#EFF6FF', badgeColor:'#2563EB', tagline:'Cổng tin BĐS số 1 · Mua bán & Cho thuê · Tính lãi vay', audience:'Sàn giao dịch lớn & Cổng tin toàn quốc', rating:5.0, reviews:210, ribbon:'HOT 🔥', ribbonColor:'#EF4444', badgeIcon:<Crown className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
  'mock-17': { accent:'#2563EB', badge:'PORTAL TOP 1', badgeBg:'#EFF6FF', badgeColor:'#2563EB', tagline:'Cổng tin BĐS số 1 · Mua bán & Cho thuê · Tính lãi vay', audience:'Sàn giao dịch lớn & Cổng tin toàn quốc', rating:5.0, reviews:210, ribbon:'HOT 🔥', ribbonColor:'#EF4444', badgeIcon:<Crown className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },

  // 18. Bds123 Bến Thành Portal
  'bds-18': { accent:'#0072BC', badge:'SÀN BẾN THÀNH', badgeBg:'#DBEAFE', badgeColor:'#1E40AF', tagline:'Đấu giá Bến Thành · BĐS 6 Tỉnh thành · Lưới 4 cột', audience:'Sàn giao dịch BĐS & Cổng đấu giá lớn', rating:5.0, reviews:185, ribbon:'MẪU MỚI', ribbonColor:'#0072BC', badgeIcon:<Crown className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800' },
  'bds123-portal': { accent:'#0072BC', badge:'SÀN BẾN THÀNH', badgeBg:'#DBEAFE', badgeColor:'#1E40AF', tagline:'Đấu giá Bến Thành · BĐS 6 Tỉnh thành · Lưới 4 cột', audience:'Sàn giao dịch BĐS & Cổng đấu giá lớn', rating:5.0, reviews:185, ribbon:'MẪU MỚI', ribbonColor:'#0072BC', badgeIcon:<Crown className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800' },

  // 19. Nhadatso Density Portal
  'bds-19': { accent:'#1E8449', badge:'NHÀ ĐẤT SỐ', badgeBg:'#D1FAE5', badgeColor:'#065F46', tagline:'Mật độ cao chuẩn Việt Nam · Lọc 6 tiêu chí · Phong thủy', audience:'Sàn môi giới thổ cư & Báo mạng BĐS', rating:5.0, reviews:164, ribbon:'CHUẨN VIỆT', ribbonColor:'#1E8449', badgeIcon:<Crown className="w-3 h-3 text-emerald-600"/>, thumbnail:'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800' },
  'nhadatso-density': { accent:'#1E8449', badge:'NHÀ ĐẤT SỐ', badgeBg:'#D1FAE5', badgeColor:'#065F46', tagline:'Mật độ cao chuẩn Việt Nam · Lọc 6 tiêu chí · Phong thủy', audience:'Sàn môi giới thổ cư & Báo mạng BĐS', rating:5.0, reviews:164, ribbon:'CHUẨN VIỆT', ribbonColor:'#1E8449', badgeIcon:<Crown className="w-3 h-3 text-emerald-600"/>, thumbnail:'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800' },

  // 20. Minh Khai Apartment
  'bds-20': { accent:'#D97706', badge:'MINH KHAI LUXURY', badgeBg:'#FEF3C7', badgeColor:'#B45309', tagline:'Chung cư Minh Khai · Times City · FAQ Accordion', audience:'Đại lý phân phối chung cư cao cấp', rating:5.0, reviews:142, ribbon:'MỚI 🔥', ribbonColor:'#D97706', badgeIcon:<Crown className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
  'minhkhai-apartment': { accent:'#D97706', badge:'MINH KHAI LUXURY', badgeBg:'#FEF3C7', badgeColor:'#B45309', tagline:'Chung cư Minh Khai · Times City · FAQ Accordion', audience:'Đại lý phân phối chung cư cao cấp', rating:5.0, reviews:142, ribbon:'MỚI 🔥', ribbonColor:'#D97706', badgeIcon:<Crown className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },

  // 21. Hanoi Rental Portal
  'bds-21': { accent:'#0066B2', badge:'THUÊ CHUNG CƯ HN', badgeBg:'#DBEAFE', badgeColor:'#1D4ED8', tagline:'Cho thuê chung cư Hà Nội · 5 Quận trọng điểm · Giá tốt', audience:'Môi giới chuyên cho thuê chung cư Hà Nội', rating:5.0, reviews:178, ribbon:'MỚI 🔥', ribbonColor:'#0066B2', badgeIcon:<Crown className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800' },
  'hanoi-rental': { accent:'#0066B2', badge:'THUÊ CHUNG CƯ HN', badgeBg:'#DBEAFE', badgeColor:'#1D4ED8', tagline:'Cho thuê chung cư Hà Nội · 5 Quận trọng điểm · Giá tốt', audience:'Môi giới chuyên cho thuê chung cư Hà Nội', rating:5.0, reviews:178, ribbon:'MỚI 🔥', ribbonColor:'#0066B2', badgeIcon:<Crown className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800' },

  // 22. Happy Land Nha Trang
  'bds-22': { accent:'#EA580C', badge:'ZOHOTELS RESORT', badgeBg:'#FFEDD5', badgeColor:'#C2410C', tagline:'Căn hộ nghỉ dưỡng biển · ZoHotels · Ưu đãi 50%', audience:'Khách sạn căn hộ & Condotel biển', rating:5.0, reviews:195, ribbon:'MỚI 🔥', ribbonColor:'#EA580C', badgeIcon:<Crown className="w-3 h-3 text-orange-600"/>, thumbnail:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800' },
  'happyland-resort': { accent:'#EA580C', badge:'ZOHOTELS RESORT', badgeBg:'#FFEDD5', badgeColor:'#C2410C', tagline:'Căn hộ nghỉ dưỡng biển · ZoHotels · Ưu đãi 50%', audience:'Khách sạn căn hộ & Condotel biển', rating:5.0, reviews:195, ribbon:'MỚI 🔥', ribbonColor:'#EA580C', badgeIcon:<Crown className="w-3 h-3 text-orange-600"/>, thumbnail:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800' },

  // 23. Homeo Agency
  'bds-23': { accent:'#881337', badge:'HOMEO NHÀ PHỐ', badgeBg:'#FFE4E6', badgeColor:'#9F1239', tagline:'Sàn nhà phố Homeo · Card đa ảnh · Cẩm nang người mua', audience:'Công ty môi giới nhà phố thổ cư', rating:5.0, reviews:132, ribbon:'MỚI 🔥', ribbonColor:'#881337', badgeIcon:<Crown className="w-3 h-3 text-rose-600"/>, thumbnail:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
  'homeo-multithumb': { accent:'#881337', badge:'HOMEO NHÀ PHỐ', badgeBg:'#FFE4E6', badgeColor:'#9F1239', tagline:'Sàn nhà phố Homeo · Card đa ảnh · Cẩm nang người mua', audience:'Công ty môi giới nhà phố thổ cư', rating:5.0, reviews:132, ribbon:'MỚI 🔥', ribbonColor:'#881337', badgeIcon:<Crown className="w-3 h-3 text-rose-600"/>, thumbnail:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },

  // 24. RealtyBuild Tech Portal
  'bds-24': { accent:'#0284C7', badge:'REALTYBUILD TECH', badgeBg:'#E0F2FE', badgeColor:'#0369A1', tagline:'RealtyBuild Tech Portal · Icon Pills · 6 Thành phố lớn', audience:'Tập đoàn PropTech & Cổng tin toàn quốc', rating:5.0, reviews:215, ribbon:'MỚI 🔥', ribbonColor:'#0284C7', badgeIcon:<Crown className="w-3 h-3 text-sky-600"/>, thumbnail:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
  'realtybuild-tech': { accent:'#0284C7', badge:'REALTYBUILD TECH', badgeBg:'#E0F2FE', badgeColor:'#0369A1', tagline:'RealtyBuild Tech Portal · Icon Pills · 6 Thành phố lớn', audience:'Tập đoàn PropTech & Cổng tin toàn quốc', rating:5.0, reviews:215, ribbon:'MỚI 🔥', ribbonColor:'#0284C7', badgeIcon:<Crown className="w-3 h-3 text-sky-600"/>, thumbnail:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },

  // Portal 01 to 24 Direct Mappings
  'portal-01': { accent:'#D8232A', badge:'DÒNG A #01', badgeBg:'#D8232A', badgeColor:'#FFFFFF', tagline:'Sàn giao dịch BĐS · Rao vặt kinh điển · Sidebar dày đặc', audience:'Sàn giao dịch & Công ty môi giới BĐS', rating:5.0, reviews:240, ribbon:'BÁN CHẠY #1', ribbonColor:'#D8232A', badgeIcon:<Crown className="w-3 h-3 text-white"/>, thumbnail:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800' },
  'portal-02': { accent:'#1E40AF', badge:'DÒNG A #02', badgeBg:'#1E40AF', badgeColor:'#FFFFFF', tagline:'Sàn BĐS đô thị hiện đại · Grid 3 cột · Fullwidth thoáng đãng', audience:'Sàn phân phối căn hộ & PropTech', rating:4.9, reviews:180, ribbon:'HIỆN ĐẠI', ribbonColor:'#1E40AF', badgeIcon:<Zap className="w-3 h-3 text-cyan-400"/>, thumbnail:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
  'portal-03': { accent:'#C5A028', badge:'DÒNG A #03', badgeBg:'#0F172A', badgeColor:'#D4AF37', tagline:'Sàn BĐS phân khúc siêu sang · VIP Lounge · Gold Accent', audience:'Chủ đầu tư biệt thự & Dinh thự triệu đô', rating:5.0, reviews:165, ribbon:'SIÊU SANG', ribbonColor:'#D97706', badgeIcon:<Crown className="w-3 h-3 text-amber-400"/>, thumbnail:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
  'portal-04': { accent:'#1E8449', badge:'DÒNG A #04', badgeBg:'#D1FAE5', badgeColor:'#065F46', tagline:'Cổng tin rao vặt siêu dày đặc · Mật độ tin cao chuẩn Việt Nam', audience:'Báo mạng BĐS & Sàn môi giới thổ cư', rating:4.9, reviews:195, ribbon:'MẬT ĐỘ CAO', ribbonColor:'#16A34A', badgeIcon:<TrendingUp className="w-3 h-3 text-emerald-600"/>, thumbnail:'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800' },
  'portal-05': { accent:'#0284C7', badge:'DÒNG A #05', badgeBg:'#E0F2FE', badgeColor:'#0369A1', tagline:'Cổng tin BĐS bản đồ thông minh · Split Map/List · Lọc bán kính', audience:'Khách hàng tìm nhà theo khu vực', rating:4.9, reviews:150, ribbon:'BẢN ĐỒ MAP', ribbonColor:'#0284C7', badgeIcon:<Zap className="w-3 h-3 text-sky-600"/>, thumbnail:'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800' },
  'portal-06': { accent:'#16A34A', badge:'DÒNG A #06', badgeBg:'#DCFCE7', badgeColor:'#16A34A', tagline:'Sàn đô thị sinh thái & Nhà vườn nghỉ dưỡng · ESG Green', audience:'Khu đô thị sinh thái & Nhà vườn nghỉ dưỡng', rating:4.8, reviews:142, ribbon:'CHUẨN XANH', ribbonColor:'#16A34A', badgeIcon:<Zap className="w-3 h-3 text-emerald-600"/>, thumbnail:'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800' },
  'portal-07': { accent:'#0284C7', badge:'DÒNG A #07', badgeBg:'#E0F2FE', badgeColor:'#0284C7', tagline:'Sàn BĐS nghỉ dưỡng & Villa biển cao cấp · Sun & Sea Theme', audience:'Chủ đầu tư BĐS biển & Second Home', rating:5.0, reviews:188, ribbon:'NGHỈ DƯỠNG', ribbonColor:'#0284C7', badgeIcon:<Crown className="w-3 h-3 text-sky-600"/>, thumbnail:'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800' },
  'portal-08': { accent:'#D97706', badge:'DÒNG A #08', badgeBg:'#1E293B', badgeColor:'#F59E0B', tagline:'Cổng BĐS công nghiệp · Kho bãi logistics · B2B FDI', audience:'Chủ đầu tư KCN & Doanh nghiệp FDI', rating:4.8, reviews:110, ribbon:'KHO BÃI B2B', ribbonColor:'#475569', badgeIcon:<Zap className="w-3 h-3 text-amber-500"/>, thumbnail:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800' },
  'portal-09': { accent:'#9F1239', badge:'DÒNG A #09', badgeBg:'#FFF1F2', badgeColor:'#9F1239', tagline:'Sàn BĐS kiến trúc di sản · Biệt thự Pháp cổ · Indochine', audience:'Doanh nghiệp lâu năm & Khách trung niên', rating:4.9, reviews:125, ribbon:'DI SẢN CỔ', ribbonColor:'#9F1239', badgeIcon:<Crown className="w-3 h-3 text-rose-600"/>, thumbnail:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800' },
  'portal-10': { accent:'#1E40AF', badge:'DÒNG A #10', badgeBg:'#EFF6FF', badgeColor:'#1E40AF', tagline:'Sàn BĐS tài chính & Đầu tư sinh lời · Máy tính dòng tiền ROI', audience:'Nhà đầu tư sành sỏi & Quỹ BĐS', rating:5.0, reviews:205, ribbon:'LỢI SUẤT ROI', ribbonColor:'#1E40AF', badgeIcon:<TrendingUp className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800' },
  'portal-11': { accent:'#B45309', badge:'DÒNG A #11', badgeBg:'#FEF3C7', badgeColor:'#B45309', tagline:'Sàn biệt thự ven sông & Dinh thự compound · Bến du thuyền', audience:'Dự án Villa compound cao cấp ven sông', rating:5.0, reviews:172, ribbon:'VEN SÔNG VIP', ribbonColor:'#B45309', badgeIcon:<Crown className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
  'portal-12': { accent:'#38BDF8', badge:'DÒNG A #12', badgeBg:'#0F172A', badgeColor:'#38BDF8', tagline:'Cổng hệ sinh thái đại đô thị & Chủ đầu tư tập đoàn Mega', audience:'Chủ đầu tư cấp 1 & Tập đoàn niêm yết', rating:5.0, reviews:230, ribbon:'TẬP ĐOÀN MEGA', ribbonColor:'#0F172A', badgeIcon:<Crown className="w-3 h-3 text-cyan-400"/>, thumbnail:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },
  'portal-13': { accent:'#DC2626', badge:'DÒNG A #13', badgeBg:'#FEE2E2', badgeColor:'#DC2626', tagline:'Sàn đấu giá & Phát mãi BĐS ngân hàng · Đếm ngược Countdown', audience:'Sàn đấu giá & Tài sản phát mãi ngân hàng', rating:4.9, reviews:180, ribbon:'ĐẤU GIÁ HOT', ribbonColor:'#DC2626', badgeIcon:<Zap className="w-3 h-3 text-red-600"/>, thumbnail:'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800' },
  'portal-14': { accent:'#D97706', badge:'DÒNG A #14', badgeBg:'#FEF3C7', badgeColor:'#D97706', tagline:'Sàn giao dịch đất nền & Đất sào vườn Farmstay · Sơ đồ phân lô', audience:'Chủ đầu tư đất nền & Farmstay sinh thái', rating:4.8, reviews:160, ribbon:'ĐẤT NỀN 1/500', ribbonColor:'#D97706', badgeIcon:<Zap className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },
  'portal-15': { accent:'#EA580C', badge:'DÒNG A #15', badgeBg:'#FFF7ED', badgeColor:'#EA580C', tagline:'Sàn Shophouse & Mặt bằng thương mại khối đế · Traffic cao', audience:'Chủ đầu tư trung tâm thương mại & Shophouse', rating:4.9, reviews:145, ribbon:'SHOPHOUSE KD', ribbonColor:'#EA580C', badgeIcon:<Crown className="w-3 h-3 text-orange-600"/>, thumbnail:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800' },
  'portal-16': { accent:'#4F46E5', badge:'DÒNG A #16', badgeBg:'#EEF2FF', badgeColor:'#4F46E5', tagline:'Trang môi giới cá nhân triệu đô · Personal Branding · Booking', audience:'Chuyên viên môi giới cá nhân & Top Advisor', rating:5.0, reviews:260, ribbon:'TOP BROKER', ribbonColor:'#4F46E5', badgeIcon:<TrendingUp className="w-3 h-3 text-indigo-600"/>, thumbnail:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800' },
  'portal-17': { accent:'#B45309', badge:'DÒNG A #17', badgeBg:'#FEF3C7', badgeColor:'#92400E', tagline:'Cổng thông tin nhà đất thủ đô Hà Nội · Thổ cư 12 Quận · Pháp lý', audience:'Môi giới & Khách hàng săn nhà phố Hà Nội', rating:5.0, reviews:190, ribbon:'NHÀ ĐẤT HÀ NỘI', ribbonColor:'#B45309', badgeIcon:<Crown className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1509030450996-93781297593c?w=800' },
  'portal-18': { accent:'#0072BC', badge:'DÒNG A #18', badgeBg:'#DBEAFE', badgeColor:'#1E40AF', tagline:'Sàn giao dịch BĐS Sài Gòn & Bến Thành · Năng động · Đa kết nối', audience:'Sàn môi giới BĐS TP.HCM & Đô thị lớn', rating:5.0, reviews:210, ribbon:'BĐS SÀI GÒN', ribbonColor:'#0072BC', badgeIcon:<Crown className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800' },
  'portal-19': { accent:'#0284C7', badge:'DÒNG A #19', badgeBg:'#E0F2FE', badgeColor:'#0284C7', tagline:'Sàn BĐS duyên hải miền Trung · Đà Nẵng, Nha Trang, Quy Nhơn', audience:'Khách hàng đầu tư BĐS ven biển miền Trung', rating:4.9, reviews:155, ribbon:'MIỀN TRUNG', ribbonColor:'#0284C7', badgeIcon:<Zap className="w-3 h-3 text-sky-600"/>, thumbnail:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800' },
  'portal-20': { accent:'#059669', badge:'DÒNG A #20', badgeBg:'#D1FAE5', badgeColor:'#065F46', tagline:'Sàn BĐS cao nguyên & Nhà vườn đồi thông · Đà Lạt, Bảo Lộc', audience:'Khách hàng tìm nhà vườn nghỉ dưỡng đồi', rating:4.9, reviews:140, ribbon:'ĐÀ LẠT RETREAT', ribbonColor:'#059669', badgeIcon:<Zap className="w-3 h-3 text-emerald-600"/>, thumbnail:'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800' },
  'portal-21': { accent:'#2563EB', badge:'DÒNG A #21', badgeBg:'#EFF6FF', badgeColor:'#2563EB', tagline:'Sàn BĐS phong cách Bắc Âu Scandinavian · Tối giản · Tinh tế', audience:'Khách hàng trẻ chuộng phong cách Nordic', rating:4.9, reviews:135, ribbon:'NORDIC ZEN', ribbonColor:'#2563EB', badgeIcon:<Zap className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800' },
  'portal-22': { accent:'#E11D48', badge:'DÒNG A #22', badgeBg:'#FFE4E6', badgeColor:'#9F1239', tagline:'Sàn thương mại phố đêm & Shophouse giải trí 24/7 năng động', audience:'Chủ đầu tư phố đi bộ & Khu vui chơi ẩm thực', rating:4.8, reviews:120, ribbon:'PHỐ ĐÊM 24/7', ribbonColor:'#E11D48', badgeIcon:<Zap className="w-3 h-3 text-rose-600"/>, thumbnail:'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800' },
  'portal-23': { accent:'#D97706', badge:'DÒNG A #23', badgeBg:'#0F172A', badgeColor:'#FBBF24', tagline:'Sàn Penthouse & Sky Villa chân mây · Tầm view 360 độ vô cực', audience:'Giới tinh hoa sở hữu Sky Villa trên cao', rating:5.0, reviews:175, ribbon:'SKY VILLA VIP', ribbonColor:'#D97706', badgeIcon:<Crown className="w-3 h-3 text-amber-400"/>, thumbnail:'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800' },
  'portal-24': { accent:'#06B6D4', badge:'DÒNG A #24', badgeBg:'#0B0F19', badgeColor:'#06B6D4', tagline:'Cổng BĐS đô thị thông minh AI & Net-Zero · Smart City Hub', audience:'Cư dân công nghệ & Chủ đầu tư Smart City', rating:5.0, reviews:215, ribbon:'SMART CITY AI', ribbonColor:'#06B6D4', badgeIcon:<Crown className="w-3 h-3 text-cyan-400"/>, thumbnail:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },
};

const VIETNAMESE_CARD_COPY: Record<string, { tagline: string; audience: string; features: string[] }> = {
  luxury: { tagline: 'Biệt thự · Dinh thự · Nhà ở cao cấp', audience: 'Chủ đầu tư và đơn vị phân phối biệt thự', features: ['Ảnh mở đầu tràn màn hình', 'Thư viện ảnh cao cấp', 'Form đăng ký tham quan riêng'] },
  minimal: { tagline: 'Căn hộ · Nhà phố · Phong cách tối giản', audience: 'Môi giới cá nhân và nhóm tư vấn trẻ', features: ['Bố cục chia đôi hiện đại', 'Khoảng trắng dễ đọc', 'Thẻ dự án tối ưu di động'] },
  corporate: { tagline: 'Tổng công ty · Sàn giao dịch · Tập đoàn', audience: 'Doanh nghiệp bất động sản Việt Nam', features: ['Điều hướng doanh nghiệp', 'Lưới dự án đang phân phối', 'Trang đối tác và tuyển dụng'] },
  resort: { tagline: 'Villa biển · Khu nghỉ dưỡng · Ngôi nhà thứ hai', audience: 'Chủ đầu tư bất động sản nghỉ dưỡng', features: ['Ảnh biển toàn màn hình', 'Bộ sưu tập điểm đến', 'Form nhận tài liệu dự án'] },
  apartment: { tagline: 'Căn hộ đô thị · Nhà mẫu · Mặt bằng', audience: 'Chủ đầu tư và đại lý phân phối căn hộ', features: ['Bảng giá theo tòa', 'Mặt bằng căn hộ', 'Đăng ký xem nhà mẫu'] },
  industrial: { tagline: 'Khu công nghiệp · Nhà xưởng · Kho vận', audience: 'Doanh nghiệp sản xuất và logistics', features: ['Bộ lọc kho xưởng', 'Bản đồ hạ tầng vùng', 'Form yêu cầu mặt bằng'] },
  villa: { tagline: 'Biệt thự · Compound · Nhà vườn', audience: 'Chủ đầu tư khu biệt thự khép kín', features: ['Danh mục biệt thự', 'Mặt bằng từng tầng', 'Đặt lịch tham quan'] },
  eco: { tagline: 'Đô thị sinh thái · Nhà vườn · Cảnh quan', audience: 'Khu đô thị xanh và nhà ở gia đình', features: ['Tổng quan quy hoạch', 'Hệ sinh thái tiện ích', 'Tiến độ phát triển'] },
  classic: { tagline: 'Nhà phố · Dinh thự · Kiến trúc di sản', audience: 'Dự án tân cổ điển và nhà ở lâu dài', features: ['Câu chuyện kiến trúc', 'Bộ sưu tập nhà ở', 'Thư viện nội ngoại thất'] },
  investment: { tagline: 'Dữ liệu giá · Lợi suất · Cơ hội đầu tư', audience: 'Nhà đầu tư và đơn vị tư vấn tài sản', features: ['Phân tích lợi suất', 'So sánh khu vực', 'Báo cáo thị trường'] },
  agency: { tagline: 'Trang mở bán · Quảng cáo · Thu khách hàng', audience: 'Đại lý triển khai chiến dịch mở bán', features: ['Thông tin mở bán nổi bật', 'Chính sách và giỏ hàng', 'Form nhận bảng giá'] },
  developer: { tagline: 'Chủ đầu tư · Danh mục dự án · Đối tác', audience: 'Tập đoàn phát triển bất động sản', features: ['Hồ sơ năng lực', 'Danh mục dự án', 'Tin tức doanh nghiệp'] },
  project: { tagline: 'Đất nền · Quy hoạch · Khu đô thị', audience: 'Chủ đầu tư đất nền và khu đô thị', features: ['Sơ đồ phân lô', 'Thông tin pháp lý', 'Đăng ký chọn vị trí'] },
  retail: { tagline: 'Shophouse · Khối đế · Mặt bằng bán lẻ', audience: 'Đơn vị phát triển bất động sản thương mại', features: ['Danh mục mặt bằng', 'Thông tin khai thác', 'Form thuê và đầu tư'] },
  agent: { tagline: 'Môi giới cá nhân · Zalo · Đặt lịch', audience: 'Chuyên viên tư vấn bất động sản', features: ['Hồ sơ chuyên viên', 'Dự án đang phân phối', 'Đặt lịch xem nhà'] },
  portal: { tagline: 'Cổng tin BĐS số 1 · Mua bán & Cho thuê · Tính lãi vay', audience: 'Sàn giao dịch lớn & Cổng tin toàn quốc', features: ['Hero Search đa năng', '8 Tin Bán & 8 Tin Thuê', 'Spotlight Dự án', 'Tính lãi vay ngân hàng'] },
};

export default function ProductCard({ template, onSelect, onOpenDetails }: ProductCardProps) {
  const { wishlists, toggleWishlist, addToCart, isPurchased, isPendingApproval } = useAuth();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const owned = isPurchased(template.slug || template.id);
  const isPending = !owned && isPendingApproval(template.slug || template.id);
  const isFavorite = wishlists?.some((w: any) => w.templateId === template.id || w.template?.id === template.id) || false;

  const sourceSlug = template.sectionConfig?.sourceSlug;
  const cfg = CARD_CONFIG[sourceSlug] || CARD_CONFIG[template.slug] || CARD_CONFIG[template.id] || CARD_CONFIG['luxury-gold'] || CARD_CONFIG['mock-1'];
  const vietnameseCopy = VIETNAMESE_CARD_COPY[template.collectionSlug] || VIETNAMESE_CARD_COPY.corporate;
  
  const badgeText = owned ? 'ĐÃ SỞ HỮU' : isPending ? 'CHỜ DUYỆT' : (template.badge || cfg?.badge || 'PREMIUM');
  const badgeBg = owned ? '#10B981' : isPending ? '#F59E0B' : (template.badgeBg || cfg?.badgeBg || '#0F172A');
  const badgeColor = owned ? '#FFFFFF' : isPending ? '#FFFFFF' : (template.badgeColor || cfg?.badgeColor || '#D4AF37');
  const tagline = vietnameseCopy.tagline;
  const rating = template.rating || cfg?.rating || 4.9;
  const reviewCount = template.reviewCount || cfg?.reviews || 95;
  const targetAudience = vietnameseCopy.audience;
  const audience = targetAudience;
  const demoUrl = getTemplateDemoUrl(template.slug);

  const cardThumbnail = template.thumbnail || cfg?.thumbnail || 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800';

  const fmt = (val: number) => new Intl.NumberFormat('vi-VN').format(val) + 'đ';

  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
  ));

  return (
    <div
      className={`group relative bg-white rounded-2xl border ${owned ? 'border-emerald-300 ring-2 ring-emerald-500/20' : 'border-slate-200/90 hover:border-blue-400'} hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden shadow-sm cursor-pointer select-none h-full`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenDetails(template)}
    >
      {/* ── IMAGE ── */}
      <div className="relative overflow-hidden bg-slate-100 aspect-[16/10]">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center z-10">
            <span className="text-xs text-slate-400 font-medium tracking-wide">⚡ {template.name}</span>
          </div>
        )}

        <img
          src={imgError ? 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=800&q=80' : `${cardThumbnail}${cardThumbnail.includes('?') ? '&' : '?'}auto=format&fit=crop&w=800&q=80`}
          alt={template.name}
          onLoad={() => setImgLoaded(true)}
          onError={() => { setImgError(true); setImgLoaded(true); }}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
          <span 
            className="text-[10px] font-black tracking-wider px-2.5 py-1 rounded-md uppercase shadow-md flex items-center gap-1 backdrop-blur-md"
            style={{ backgroundColor: badgeBg, color: badgeColor }}
          >
            {owned && <Check className="w-3 h-3 text-white" />}
            {badgeText}
          </span>
          <span className="text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-white bg-blue-600 shadow-sm">
            {template.slug?.startsWith('bds-') 
              ? template.slug.toUpperCase().replace('-', ' ') 
              : `BĐS ${String(template.sortOrder || 1).padStart(2, '0')}`}
          </span>
        </div>

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center gap-2.5 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2 bg-white/95 hover:bg-white text-slate-900 font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 hover:scale-105 transition-all pointer-events-auto"
          >
            <Play className="w-3.5 h-3.5 fill-slate-900" /> Xem Demo
          </a>
        </div>
      </div>

      {/* ── CARD CONTENT ── */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
            {template.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0 mt-0.5" title={`${rating} sao (${reviewCount} đánh giá)`}>
            <div className="flex gap-0.5">{stars}</div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs text-slate-500 line-clamp-1 mb-3">{tagline}</p>

        {/* Audience chip */}
        <div className="mb-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700">
            <Users className="w-3 h-3 text-slate-400" /> {audience}
          </span>
        </div>

        {/* Features — top 3 */}
        <div className="flex flex-col gap-1.5 mb-4 flex-grow">
          {vietnameseCopy.features.map((f: string, i: number) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
              <Check className="w-3.5 h-3.5 shrink-0 text-blue-600" />
              <span className="line-clamp-1">{f}</span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="border-t border-slate-100 pt-3.5 mt-auto">
          <div className="flex items-end justify-between mb-3.5">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[11px] text-slate-400 line-through font-semibold">
                  {fmt((template.priceBuy || 499000) <= 499000 ? 799000 : 999000)}
                </span>
                <span className="text-[9px] bg-rose-50 text-rose-600 font-extrabold px-1.5 py-0.5 rounded border border-rose-200">
                  -50%
                </span>
              </div>
              <span className="text-xl font-extrabold text-blue-600">
                {fmt(template.priceBuy || 499000)}
              </span>
            </div>
            <span className={`text-[10px] ${owned ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : isPending ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-emerald-50 text-emerald-700 border-emerald-200'} font-bold px-2 py-0.5 rounded-md border`}>
              {owned ? 'ĐÃ SỞ HỮU TRỌN ĐỜI' : isPending ? 'CHỜ ADMIN DUYỆT' : 'BÀN GIAO NGAY'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {owned ? (
              <a
                href={process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Vào CMS Quản trị</span>
              </a>
            ) : isPending ? (
              <Link
                href="/customer/dashboard?tab=orders"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Đang chờ duyệt</span>
              </Link>
            ) : (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(template, 'BUY');
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-all shrink-0 flex items-center justify-center group/btn"
                  title="Thêm vào giỏ hàng"
                >
                  <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onOpenDetails(template); }}
                  className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all group-hover:bg-blue-600"
                >
                  <span>Xem chi tiết & Demo</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

