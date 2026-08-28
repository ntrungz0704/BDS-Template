import React, { useState } from 'react';
import { Star, Eye, Heart, Play, Check, Zap, Users, ArrowRight, Crown, TrendingUp, ShoppingCart } from 'lucide-react';
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
  'luxury-gold': { accent:'#C5A028', badge:'LUXURY VIP', badgeBg:'#0F172A', badgeColor:'#E2B714', tagline:'Biệt thự · Penthouse · Dinh thự dát vàng', audience:'Chủ đầu tư biệt thự siêu sang', rating:5.0, reviews:128, ribbon:'Bán chạy #1', ribbonColor:'#D97706', badgeIcon:<Crown className="w-3 h-3 text-amber-400"/>, thumbnail:'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800' },
  'mock-1': { accent:'#C5A028', badge:'LUXURY VIP', badgeBg:'#0F172A', badgeColor:'#E2B714', tagline:'Biệt thự · Penthouse · Dinh thự dát vàng', audience:'Chủ đầu tư biệt thự siêu sang', rating:5.0, reviews:128, ribbon:'Bán chạy #1', ribbonColor:'#D97706', badgeIcon:<Crown className="w-3 h-3 text-amber-400"/>, thumbnail:'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800' },

  // 2. Minimal White
  'minimal-white': { accent:'#2563EB', badge:'APPLE MINIMAL', badgeBg:'#EFF6FF', badgeColor:'#2563EB', tagline:'Penthouse · Căn hộ Bắc Âu · Tối giản', audience:'Môi giới cá nhân & Studio trẻ', rating:4.9, reviews:98, ribbon:'Phổ biến', ribbonColor:'#2563EB', badgeIcon:<Zap className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800' },
  'minimal-zen': { accent:'#2563EB', badge:'APPLE MINIMAL', badgeBg:'#EFF6FF', badgeColor:'#2563EB', tagline:'Penthouse · Căn hộ Bắc Âu · Tối giản', audience:'Môi giới cá nhân & Studio trẻ', rating:4.9, reviews:98, ribbon:'Phổ biến', ribbonColor:'#2563EB', badgeIcon:<Zap className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800' },
  'mock-2': { accent:'#2563EB', badge:'APPLE MINIMAL', badgeBg:'#EFF6FF', badgeColor:'#2563EB', tagline:'Penthouse · Căn hộ Bắc Âu · Tối giản', audience:'Môi giới cá nhân & Studio trẻ', rating:4.9, reviews:98, ribbon:'Phổ biến', ribbonColor:'#2563EB', badgeIcon:<Zap className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800' },

  // 3. Modern Corporate
  'modern-corporate': { accent:'#0F4C81', badge:'CORPORATE PRO', badgeBg:'#0F4C81', badgeColor:'#FFFFFF', tagline:'Tập đoàn BĐS · Sàn lớn · Multi-Branch', audience:'Doanh nghiệp & Tập đoàn 100+ nhân sự', rating:4.8, reviews:76, ribbon:'Doanh nghiệp', ribbonColor:'#0F4C81', badgeIcon:<TrendingUp className="w-3 h-3 text-white"/>, thumbnail:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },
  'mock-3': { accent:'#0F4C81', badge:'CORPORATE PRO', badgeBg:'#0F4C81', badgeColor:'#FFFFFF', tagline:'Tập đoàn BĐS · Sàn lớn · Multi-Branch', audience:'Doanh nghiệp & Tập đoàn 100+ nhân sự', rating:4.8, reviews:76, ribbon:'Doanh nghiệp', ribbonColor:'#0F4C81', badgeIcon:<TrendingUp className="w-3 h-3 text-white"/>, thumbnail:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },

  // 4. Resort Paradise
  'resort-paradise': { accent:'#0284C7', badge:'RESORT PARADISE', badgeBg:'#E0F2FE', badgeColor:'#0284C7', tagline:'Biển đảo · Condotel · Second Home', audience:'Chủ đầu tư BĐS nghỉ dưỡng ven biển', rating:4.9, reviews:64, ribbon:'Nghỉ dưỡng', ribbonColor:'#0284C7', badgeIcon:<Zap className="w-3 h-3 text-sky-600"/>, thumbnail:'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800' },
  'ocean-view': { accent:'#0284C7', badge:'RESORT PARADISE', badgeBg:'#E0F2FE', badgeColor:'#0284C7', tagline:'Biển đảo · Condotel · Second Home', audience:'Chủ đầu tư BĐS nghỉ dưỡng ven biển', rating:4.9, reviews:64, ribbon:'Nghỉ dưỡng', ribbonColor:'#0284C7', badgeIcon:<Zap className="w-3 h-3 text-sky-600"/>, thumbnail:'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800' },
  'mock-4': { accent:'#0284C7', badge:'RESORT PARADISE', badgeBg:'#E0F2FE', badgeColor:'#0284C7', tagline:'Biển đảo · Condotel · Second Home', audience:'Chủ đầu tư BĐS nghỉ dưỡng ven biển', rating:4.9, reviews:64, ribbon:'Nghỉ dưỡng', ribbonColor:'#0284C7', badgeIcon:<Zap className="w-3 h-3 text-sky-600"/>, thumbnail:'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800' },

  // 5. Urban City / Smart Urban
  'urban-city': { accent:'#7C3AED', badge:'SMART URBAN', badgeBg:'#F5F3FF', badgeColor:'#7C3AED', tagline:'Smart City · Căn hộ cao tầng · Bản đồ Metro', audience:'Chung cư nội đô & Đại đô thị thông minh', rating:4.8, reviews:52, ribbon:'Smart City', ribbonColor:'#7C3AED', badgeIcon:<Zap className="w-3 h-3 text-purple-600"/>, thumbnail:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
  'smart-urban': { accent:'#7C3AED', badge:'SMART URBAN', badgeBg:'#F5F3FF', badgeColor:'#7C3AED', tagline:'Smart City · Căn hộ cao tầng · Bản đồ Metro', audience:'Chung cư nội đô & Đại đô thị thông minh', rating:4.8, reviews:52, ribbon:'Smart City', ribbonColor:'#7C3AED', badgeIcon:<Zap className="w-3 h-3 text-purple-600"/>, thumbnail:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
  'high-rise': { accent:'#7C3AED', badge:'SMART URBAN', badgeBg:'#F5F3FF', badgeColor:'#7C3AED', tagline:'Smart City · Căn hộ cao tầng · Bản đồ Metro', audience:'Chung cư nội đô & Đại đô thị thông minh', rating:4.8, reviews:52, ribbon:'Smart City', ribbonColor:'#7C3AED', badgeIcon:<Zap className="w-3 h-3 text-purple-600"/>, thumbnail:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
  'mock-5': { accent:'#7C3AED', badge:'SMART URBAN', badgeBg:'#F5F3FF', badgeColor:'#7C3AED', tagline:'Smart City · Căn hộ cao tầng · Bản đồ Metro', audience:'Chung cư nội đô & Đại đô thị thông minh', rating:4.8, reviews:52, ribbon:'Smart City', ribbonColor:'#7C3AED', badgeIcon:<Zap className="w-3 h-3 text-purple-600"/>, thumbnail:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },

  // 6. Industrial Estate
  'industrial-estate': { accent:'#F59E0B', badge:'INDUSTRIAL B2B', badgeBg:'#1E293B', badgeColor:'#F59E0B', tagline:'Khu công nghiệp · Nhà xưởng · Kho vận B2B', audience:'Chủ đầu tư KCN & Doanh nghiệp FDI', rating:4.7, reviews:39, ribbon:'KCN & Kho Bãi', ribbonColor:'#475569', badgeIcon:<Zap className="w-3 h-3 text-amber-500"/>, thumbnail:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800' },
  'industrial-logistics': { accent:'#F59E0B', badge:'INDUSTRIAL B2B', badgeBg:'#1E293B', badgeColor:'#F59E0B', tagline:'Khu công nghiệp · Nhà xưởng · Kho vận B2B', audience:'Chủ đầu tư KCN & Doanh nghiệp FDI', rating:4.7, reviews:39, ribbon:'KCN & Kho Bãi', ribbonColor:'#475569', badgeIcon:<Zap className="w-3 h-3 text-amber-500"/>, thumbnail:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800' },
  'mock-6': { accent:'#F59E0B', badge:'INDUSTRIAL B2B', badgeBg:'#1E293B', badgeColor:'#F59E0B', tagline:'Khu công nghiệp · Nhà xưởng · Kho vận B2B', audience:'Chủ đầu tư KCN & Doanh nghiệp FDI', rating:4.7, reviews:39, ribbon:'KCN & Kho Bãi', ribbonColor:'#475569', badgeIcon:<Zap className="w-3 h-3 text-amber-500"/>, thumbnail:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800' },

  // 7. Villa Premium / Royal Garden
  'villa-premium': { accent:'#B45309', badge:'VILLA 3D TOUR', badgeBg:'#FEF3C7', badgeColor:'#B45309', tagline:'Biệt thự đơn lập · Sơ đồ mặt bằng · 3D Tour', audience:'Dự án Villa compound cao cấp', rating:5.0, reviews:84, ribbon:'Matterport 3D', ribbonColor:'#B45309', badgeIcon:<Crown className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
  'modern-villa': { accent:'#B45309', badge:'VILLA 3D TOUR', badgeBg:'#FEF3C7', badgeColor:'#B45309', tagline:'Biệt thự đơn lập · Sơ đồ mặt bằng · 3D Tour', audience:'Dự án Villa compound cao cấp', rating:5.0, reviews:84, ribbon:'Matterport 3D', ribbonColor:'#B45309', badgeIcon:<Crown className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
  'luxury-villa': { accent:'#B45309', badge:'VILLA 3D TOUR', badgeBg:'#FEF3C7', badgeColor:'#B45309', tagline:'Biệt thự đơn lập · Sơ đồ mặt bằng · 3D Tour', audience:'Dự án Villa compound cao cấp', rating:5.0, reviews:84, ribbon:'Matterport 3D', ribbonColor:'#B45309', badgeIcon:<Crown className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
  'mock-7': { accent:'#B45309', badge:'VILLA 3D TOUR', badgeBg:'#FEF3C7', badgeColor:'#B45309', tagline:'Biệt thự đơn lập · Sơ đồ mặt bằng · 3D Tour', audience:'Dự án Villa compound cao cấp', rating:5.0, reviews:84, ribbon:'Matterport 3D', ribbonColor:'#B45309', badgeIcon:<Crown className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },

  // 8. Eco Green Living
  'eco-green': { accent:'#16A34A', badge:'ECO LIVING', badgeBg:'#DCFCE7', badgeColor:'#16A34A', tagline:'Đô thị sinh thái xanh · Ecopark · ESG', audience:'Khu đô thị sinh thái & Nhà vườn xanh', rating:4.8, reviews:58, ribbon:'Chuẩn Xanh ESG', ribbonColor:'#16A34A', badgeIcon:<Zap className="w-3 h-3 text-emerald-600"/>, thumbnail:'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800' },
  'green-eco': { accent:'#16A34A', badge:'ECO LIVING', badgeBg:'#DCFCE7', badgeColor:'#16A34A', tagline:'Đô thị sinh thái xanh · Ecopark · ESG', audience:'Khu đô thị sinh thái & Nhà vườn xanh', rating:4.8, reviews:58, ribbon:'Chuẩn Xanh ESG', ribbonColor:'#16A34A', badgeIcon:<Zap className="w-3 h-3 text-emerald-600"/>, thumbnail:'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800' },
  'eco-living': { accent:'#16A34A', badge:'ECO LIVING', badgeBg:'#DCFCE7', badgeColor:'#16A34A', tagline:'Đô thị sinh thái xanh · Ecopark · ESG', audience:'Khu đô thị sinh thái & Nhà vườn xanh', rating:4.8, reviews:58, ribbon:'Chuẩn Xanh ESG', ribbonColor:'#16A34A', badgeIcon:<Zap className="w-3 h-3 text-emerald-600"/>, thumbnail:'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800' },
  'mock-8': { accent:'#16A34A', badge:'ECO LIVING', badgeBg:'#DCFCE7', badgeColor:'#16A34A', tagline:'Đô thị sinh thái xanh · Ecopark · ESG', audience:'Khu đô thị sinh thái & Nhà vườn xanh', rating:4.8, reviews:58, ribbon:'Chuẩn Xanh ESG', ribbonColor:'#16A34A', badgeIcon:<Zap className="w-3 h-3 text-emerald-600"/>, thumbnail:'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800' },

  // 9. Classic Heritage
  'classic-elegant': { accent:'#9F1239', badge:'CLASSIC HERITAGE', badgeBg:'#FFF1F2', badgeColor:'#9F1239', tagline:'Tân cổ điển Châu Âu · Lâu đài · Indochine', audience:'Doanh nghiệp lâu năm & Khách trung niên', rating:4.8, reviews:44, ribbon:'Tân cổ điển', ribbonColor:'#9F1239', badgeIcon:<Zap className="w-3 h-3 text-rose-600"/>, thumbnail:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800' },
  'heritage-classic': { accent:'#9F1239', badge:'CLASSIC HERITAGE', badgeBg:'#FFF1F2', badgeColor:'#9F1239', tagline:'Tân cổ điển Châu Âu · Lâu đài · Indochine', audience:'Doanh nghiệp lâu năm & Khách trung niên', rating:4.8, reviews:44, ribbon:'Tân cổ điển', ribbonColor:'#9F1239', badgeIcon:<Zap className="w-3 h-3 text-rose-600"/>, thumbnail:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800' },
  'classic-heritage': { accent:'#9F1239', badge:'CLASSIC HERITAGE', badgeBg:'#FFF1F2', badgeColor:'#9F1239', tagline:'Tân cổ điển Châu Âu · Lâu đài · Indochine', audience:'Doanh nghiệp lâu năm & Khách trung niên', rating:4.8, reviews:44, ribbon:'Tân cổ điển', ribbonColor:'#9F1239', badgeIcon:<Zap className="w-3 h-3 text-rose-600"/>, thumbnail:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800' },
  'mock-9': { accent:'#9F1239', badge:'CLASSIC HERITAGE', badgeBg:'#FFF1F2', badgeColor:'#9F1239', tagline:'Tân cổ điển Châu Âu · Lâu đài · Indochine', audience:'Doanh nghiệp lâu năm & Khách trung niên', rating:4.8, reviews:44, ribbon:'Tân cổ điển', ribbonColor:'#9F1239', badgeIcon:<Zap className="w-3 h-3 text-rose-600"/>, thumbnail:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800' },

  // 10. Investment Pro
  'investment-pro': { accent:'#1E40AF', badge:'INVESTMENT PRO', badgeBg:'#EFF6FF', badgeColor:'#1E40AF', tagline:'Tài chính BĐS · Biểu đồ giá · Máy tính ROI', audience:'Nhà đầu tư sành sỏi & Quỹ BĐS', rating:4.9, reviews:71, ribbon:'Phân tích ROI', ribbonColor:'#1E40AF', badgeIcon:<TrendingUp className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800' },
  'tech-hub': { accent:'#1E40AF', badge:'INVESTMENT PRO', badgeBg:'#EFF6FF', badgeColor:'#1E40AF', tagline:'Tài chính BĐS · Biểu đồ giá · Máy tính ROI', audience:'Nhà đầu tư sành sỏi & Quỹ BĐS', rating:4.9, reviews:71, ribbon:'Phân tích ROI', ribbonColor:'#1E40AF', badgeIcon:<TrendingUp className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800' },
  'mock-10': { accent:'#1E40AF', badge:'INVESTMENT PRO', badgeBg:'#EFF6FF', badgeColor:'#1E40AF', tagline:'Tài chính BĐS · Biểu đồ giá · Máy tính ROI', audience:'Nhà đầu tư sành sỏi & Quỹ BĐS', rating:4.9, reviews:71, ribbon:'Phân tích ROI', ribbonColor:'#1E40AF', badgeIcon:<TrendingUp className="w-3 h-3 text-blue-600"/>, thumbnail:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800' },

  // 11. Agency Onepage
  'agency-onepage': { accent:'#DB2777', badge:'LANDING ADS', badgeBg:'#FDF2F8', badgeColor:'#DB2777', tagline:'Landing Page 1 trang · Tối ưu Ads · FOMO', audience:'Agency chạy Ads & Chiến dịch mở bán F1', rating:4.9, reviews:96, ribbon:'Chạy Ads Tốt', ribbonColor:'#DB2777', badgeIcon:<Zap className="w-3 h-3 text-pink-600"/>, thumbnail:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800' },
  'suburban-family': { accent:'#DB2777', badge:'LANDING ADS', badgeBg:'#FDF2F8', badgeColor:'#DB2777', tagline:'Landing Page 1 trang · Tối ưu Ads · FOMO', audience:'Agency chạy Ads & Chiến dịch mở bán F1', rating:4.9, reviews:96, ribbon:'Chạy Ads Tốt', ribbonColor:'#DB2777', badgeIcon:<Zap className="w-3 h-3 text-pink-600"/>, thumbnail:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800' },
  'mock-11': { accent:'#DB2777', badge:'LANDING ADS', badgeBg:'#FDF2F8', badgeColor:'#DB2777', tagline:'Landing Page 1 trang · Tối ưu Ads · FOMO', audience:'Agency chạy Ads & Chiến dịch mở bán F1', rating:4.9, reviews:96, ribbon:'Chạy Ads Tốt', ribbonColor:'#DB2777', badgeIcon:<Zap className="w-3 h-3 text-pink-600"/>, thumbnail:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800' },

  // 12. Mega Developer Portal
  'mega-developer': { accent:'#38BDF8', badge:'MEGA PORTAL', badgeBg:'#0F172A', badgeColor:'#38BDF8', tagline:'Cổng thông tin Đa dự án · Quan hệ cổ đông', audience:'Chủ đầu tư cấp 1 & Tập đoàn niêm yết', rating:5.0, reviews:50, ribbon:'Enterprise', ribbonColor:'#0F172A', badgeIcon:<Crown className="w-3 h-3 text-cyan-400"/>, thumbnail:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },
  'listing-portal': { accent:'#38BDF8', badge:'MEGA PORTAL', badgeBg:'#0F172A', badgeColor:'#38BDF8', tagline:'Cổng thông tin Đa dự án · Quan hệ cổ đông', audience:'Chủ đầu tư cấp 1 & Tập đoàn niêm yết', rating:5.0, reviews:50, ribbon:'Enterprise', ribbonColor:'#0F172A', badgeIcon:<Crown className="w-3 h-3 text-cyan-400"/>, thumbnail:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },
  'riverside-mansion': { accent:'#38BDF8', badge:'MEGA PORTAL', badgeBg:'#0F172A', badgeColor:'#38BDF8', tagline:'Cổng thông tin Đa dự án · Quan hệ cổ đông', audience:'Chủ đầu tư cấp 1 & Tập đoàn niêm yết', rating:5.0, reviews:50, ribbon:'Enterprise', ribbonColor:'#0F172A', badgeIcon:<Crown className="w-3 h-3 text-cyan-400"/>, thumbnail:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },
  'mock-12': { accent:'#38BDF8', badge:'MEGA PORTAL', badgeBg:'#0F172A', badgeColor:'#38BDF8', tagline:'Cổng thông tin Đa dự án · Quan hệ cổ đông', audience:'Chủ đầu tư cấp 1 & Tập đoàn niêm yết', rating:5.0, reviews:50, ribbon:'Enterprise', ribbonColor:'#0F172A', badgeIcon:<Crown className="w-3 h-3 text-cyan-400"/>, thumbnail:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },

  // 13. Sàn Đấu Giá BĐS
  'auction-template': { accent:'#DC2626', badge:'AUCTION PRO', badgeBg:'#FEE2E2', badgeColor:'#DC2626', tagline:'Đấu giá trực tuyến · Countdown · Giá khởi điểm', audience:'Sàn đấu giá & Tài sản phát mãi ngân hàng', rating:4.9, reviews:89, ribbon:'Đấu giá HOT', ribbonColor:'#DC2626', badgeIcon:<Zap className="w-3 h-3 text-red-600"/>, thumbnail:'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800' },
  'auction-bds': { accent:'#DC2626', badge:'AUCTION PRO', badgeBg:'#FEE2E2', badgeColor:'#DC2626', tagline:'Đấu giá trực tuyến · Countdown · Giá khởi điểm', audience:'Sàn đấu giá & Tài sản phát mãi ngân hàng', rating:4.9, reviews:89, ribbon:'Đấu giá HOT', ribbonColor:'#DC2626', badgeIcon:<Zap className="w-3 h-3 text-red-600"/>, thumbnail:'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800' },
  'lake-sanctuary': { accent:'#DC2626', badge:'AUCTION PRO', badgeBg:'#FEE2E2', badgeColor:'#DC2626', tagline:'Đấu giá trực tuyến · Countdown · Giá khởi điểm', audience:'Sàn đấu giá & Tài sản phát mãi ngân hàng', rating:4.9, reviews:89, ribbon:'Đấu giá HOT', ribbonColor:'#DC2626', badgeIcon:<Zap className="w-3 h-3 text-red-600"/>, thumbnail:'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800' },
  'mock-new-1': { accent:'#DC2626', badge:'AUCTION PRO', badgeBg:'#FEE2E2', badgeColor:'#DC2626', tagline:'Đấu giá trực tuyến · Countdown · Giá khởi điểm', audience:'Sàn đấu giá & Tài sản phát mãi ngân hàng', rating:4.9, reviews:89, ribbon:'Đấu giá HOT', ribbonColor:'#DC2626', badgeIcon:<Zap className="w-3 h-3 text-red-600"/>, thumbnail:'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800' },

  // 14. Dự Án Đất Nền
  'landplot-template': { accent:'#D97706', badge:'MASTER LAND PLOT', badgeBg:'#FEF3C7', badgeColor:'#D97706', tagline:'Phân lô bán nền · Bản đồ 1/500 · Vị trí đắc địa', audience:'Chủ đầu tư đất nền & Khu đô thị mới', rating:4.8, reviews:75, ribbon:'Phân Lô 1/500', ribbonColor:'#D97706', badgeIcon:<Zap className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },
  'land-plot': { accent:'#D97706', badge:'MASTER LAND PLOT', badgeBg:'#FEF3C7', badgeColor:'#D97706', tagline:'Phân lô bán nền · Bản đồ 1/500 · Vị trí đắc địa', audience:'Chủ đầu tư đất nền & Khu đô thị mới', rating:4.8, reviews:75, ribbon:'Phân Lô 1/500', ribbonColor:'#D97706', badgeIcon:<Zap className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },
  'mountain-retreat': { accent:'#D97706', badge:'MASTER LAND PLOT', badgeBg:'#FEF3C7', badgeColor:'#D97706', tagline:'Phân lô bán nền · Bản đồ 1/500 · Vị trí đắc địa', audience:'Chủ đầu tư đất nền & Khu đô thị mới', rating:4.8, reviews:75, ribbon:'Phân Lô 1/500', ribbonColor:'#D97706', badgeIcon:<Zap className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },
  'mock-new-2': { accent:'#D97706', badge:'MASTER LAND PLOT', badgeBg:'#FEF3C7', badgeColor:'#D97706', tagline:'Phân lô bán nền · Bản đồ 1/500 · Vị trí đắc địa', audience:'Chủ đầu tư đất nền & Khu đô thị mới', rating:4.8, reviews:75, ribbon:'Phân Lô 1/500', ribbonColor:'#D97706', badgeIcon:<Zap className="w-3 h-3 text-amber-600"/>, thumbnail:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },

  // 15. Retail Podium / Shophouse
  'retail-podium': { accent:'#EA580C', badge:'RETAIL & SHOP', badgeBg:'#FFF7ED', badgeColor:'#EA580C', tagline:'Shophouse khối đế · Mặt bằng kinh doanh TTTM', audience:'Chủ đầu tư trung tâm thương mại & Shophouse', rating:4.8, reviews:68, ribbon:'Mặt Bằng KD', ribbonColor:'#EA580C', badgeIcon:<Crown className="w-3 h-3 text-orange-600"/>, thumbnail:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800' },
  'retail-commercial': { accent:'#EA580C', badge:'RETAIL & SHOP', badgeBg:'#FFF7ED', badgeColor:'#EA580C', tagline:'Shophouse khối đế · Mặt bằng kinh doanh TTTM', audience:'Chủ đầu tư trung tâm thương mại & Shophouse', rating:4.8, reviews:68, ribbon:'Mặt Bằng KD', ribbonColor:'#EA580C', badgeIcon:<Crown className="w-3 h-3 text-orange-600"/>, thumbnail:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800' },
  'commercial-plaza': { accent:'#EA580C', badge:'RETAIL & SHOP', badgeBg:'#FFF7ED', badgeColor:'#EA580C', tagline:'Shophouse khối đế · Mặt bằng kinh doanh TTTM', audience:'Chủ đầu tư trung tâm thương mại & Shophouse', rating:4.8, reviews:68, ribbon:'Mặt Bằng KD', ribbonColor:'#EA580C', badgeIcon:<Crown className="w-3 h-3 text-orange-600"/>, thumbnail:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800' },
  'mock-15': { accent:'#EA580C', badge:'RETAIL & SHOP', badgeBg:'#FFF7ED', badgeColor:'#EA580C', tagline:'Shophouse khối đế · Mặt bằng kinh doanh TTTM', audience:'Chủ đầu tư trung tâm thương mại & Shophouse', rating:4.8, reviews:68, ribbon:'Mặt Bằng KD', ribbonColor:'#EA580C', badgeIcon:<Crown className="w-3 h-3 text-orange-600"/>, thumbnail:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800' },

  // 16. Personal Agent
  'personal-agent': { accent:'#4F46E5', badge:'TOP PERFORMER', badgeBg:'#EEF2FF', badgeColor:'#4F46E5', tagline:'Môi giới triệu đô · One Page · Booking tư vấn', audience:'Chuyên viên môi giới cá nhân & Top Advisor', rating:5.0, reviews:165, ribbon:'Môi Giới VIP', ribbonColor:'#4F46E5', badgeIcon:<TrendingUp className="w-3 h-3 text-indigo-600"/>, thumbnail:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800' },
  'golf-residences': { accent:'#4F46E5', badge:'TOP PERFORMER', badgeBg:'#EEF2FF', badgeColor:'#4F46E5', tagline:'Môi giới triệu đô · One Page · Booking tư vấn', audience:'Chuyên viên môi giới cá nhân & Top Advisor', rating:5.0, reviews:165, ribbon:'Môi Giới VIP', ribbonColor:'#4F46E5', badgeIcon:<TrendingUp className="w-3 h-3 text-indigo-600"/>, thumbnail:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800' },
  'mock-16': { accent:'#4F46E5', badge:'TOP PERFORMER', badgeBg:'#EEF2FF', badgeColor:'#4F46E5', tagline:'Môi giới triệu đô · One Page · Booking tư vấn', audience:'Chuyên viên môi giới cá nhân & Top Advisor', rating:5.0, reviews:165, ribbon:'Môi Giới VIP', ribbonColor:'#4F46E5', badgeIcon:<TrendingUp className="w-3 h-3 text-indigo-600"/>, thumbnail:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800' },
};

export default function ProductCard({ template, onSelect, onOpenDetails }: ProductCardProps) {
  const { wishlists, toggleWishlist, addToCart, isPurchased } = useAuth();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const owned = isPurchased(template.slug || template.id);
  const isFavorite = wishlists?.some((w: any) => w.templateId === template.id || w.template?.id === template.id) || false;

  const cfg = CARD_CONFIG[template.slug] || CARD_CONFIG[template.id] || CARD_CONFIG['luxury-gold'] || CARD_CONFIG['mock-1'];
  
  const badgeText = owned ? 'ĐÃ SỞ HỮU' : (template.badge || cfg?.badge || 'PREMIUM');
  const badgeBg = owned ? '#10B981' : (template.badgeBg || cfg?.badgeBg || '#0F172A');
  const badgeColor = owned ? '#FFFFFF' : (template.badgeColor || cfg?.badgeColor || '#D4AF37');
  const tagline = template.shortDescription || cfg?.tagline || 'Giao diện Bất Động Sản cao cấp';
  const rating = template.rating || cfg?.rating || 4.9;
  const reviewCount = template.reviewCount || cfg?.reviews || 95;
  const targetAudience = template.targetAudience?.[0] || cfg?.audience || 'Chủ đầu tư & Môi giới';
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
          {cfg.ribbon && !owned && (
            <span 
              className="text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider text-white shadow-sm"
              style={{ backgroundColor: cfg.ribbonColor || '#2563EB' }}
            >
              {cfg.ribbon}
            </span>
          )}
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
          {(template.features || []).slice(0, 3).map((f: string, i: number) => (
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
                  {fmt(template.priceBuySource || 799000)}
                </span>
                <span className="text-[9px] bg-rose-50 text-rose-600 font-extrabold px-1 py-0.2 rounded border border-rose-200">
                  -38%
                </span>
              </div>
              <span className="text-xl font-extrabold text-blue-600">
                {fmt(template.priceBuy || 499000)}
              </span>
            </div>
            <span className={`text-[10px] ${owned ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-50 text-emerald-700 border-emerald-200'} font-bold px-2 py-0.5 rounded-md border`}>
              {owned ? 'ĐÃ SỞ HỮU TRỌN ĐỜI' : 'BÀN GIAO NGAY'}
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

