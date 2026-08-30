import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { X, Check, ChevronLeft, ChevronRight, ShoppingCart, Play, Monitor, Tablet, Smartphone, ChevronDown, Building, Users, Zap, Globe, BarChart3, Shield, Headphones, Star } from 'lucide-react';
import { getTemplateDemoUrl } from '../utils/demo';
import { useAuth } from '../context/AuthContext';

interface Template {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  screenshots: string[];
  features: string[];
  priceBuy: number;
  priceRentMonthly: number;
  isActive: boolean;
  sortOrder: number;
}

interface DetailsModalProps {
  template: Template;
  onClose: () => void;
  onSelect: (tpl: Template, defaultType?: 'BUY' | 'RENT') => void;
}

const TEMPLATE_EXTRA: Record<string, {
  targetAudience: string[];
  highlights: string[];
  availablePages: string[];
  modules: string[];
  benefits: string[];
  screenshots: string[];
  accentColor: string;
  badge: string;
}> = {
  // 1. Luxury Gold
  'bds-01': {
    accentColor: '#C5A028', badge: 'LUXURY VIP',
    screenshots: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800','https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800','https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'],
    targetAudience: ['Chủ đầu tư biệt thự', 'Biệt thự & Villa', 'Penthouse hạng S', 'Luxury Agency'],
    highlights: ['Hero Video Fullscreen', 'Parallax Scrolling', 'Gallery Masonry Gold', 'Dark Mode Luxury', 'Floor Plan 3D', 'Sticky Contact VIP'],
    availablePages: ['Trang chủ VIP', 'Bộ sưu tập biệt thự', 'Chi tiết dự án', 'Gallery Masonry', 'Liên hệ Concierge'],
    modules: ['VIP Lead Form', 'CRM', 'SEO Enterprise', 'Google Maps Dark', '3D Matterport Tour', 'Zalo VIP'],
    benefits: ['Thu hút khách hàng VIP & giới thượng lưu', 'Nâng tầm uy tín thương hiệu', 'Trải nghiệm 4K mượt mà', 'Dễ quản lý qua CMS'],
  },
  'luxury-gold': {
    accentColor: '#C5A028', badge: 'LUXURY VIP',
    screenshots: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800','https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800','https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'],
    targetAudience: ['Chủ đầu tư biệt thự', 'Biệt thự & Villa', 'Penthouse hạng S', 'Luxury Agency'],
    highlights: ['Hero Video Fullscreen', 'Parallax Scrolling', 'Gallery Masonry Gold', 'Dark Mode Luxury', 'Floor Plan 3D', 'Sticky Contact VIP'],
    availablePages: ['Trang chủ VIP', 'Bộ sưu tập biệt thự', 'Chi tiết dự án', 'Gallery Masonry', 'Liên hệ Concierge'],
    modules: ['VIP Lead Form', 'CRM', 'SEO Enterprise', 'Google Maps Dark', '3D Matterport Tour', 'Zalo VIP'],
    benefits: ['Thu hút khách hàng VIP & giới thượng lưu', 'Nâng tầm uy tín thương hiệu', 'Trải nghiệm 4K mượt mà', 'Dễ quản lý qua CMS'],
  },
  'mock-1': {
    accentColor: '#C5A028', badge: 'LUXURY VIP',
    screenshots: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800','https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800','https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'],
    targetAudience: ['Chủ đầu tư biệt thự', 'Biệt thự & Villa', 'Penthouse hạng S', 'Luxury Agency'],
    highlights: ['Hero Video Fullscreen', 'Parallax Scrolling', 'Gallery Masonry Gold', 'Dark Mode Luxury', 'Floor Plan 3D', 'Sticky Contact VIP'],
    availablePages: ['Trang chủ VIP', 'Bộ sưu tập biệt thự', 'Chi tiết dự án', 'Gallery Masonry', 'Liên hệ Concierge'],
    modules: ['VIP Lead Form', 'CRM', 'SEO Enterprise', 'Google Maps Dark', '3D Matterport Tour', 'Zalo VIP'],
    benefits: ['Thu hút khách hàng VIP & giới thượng lưu', 'Nâng tầm uy tín thương hiệu', 'Trải nghiệm 4K mượt mà', 'Dễ quản lý qua CMS'],
  },

  // 2. Minimal White
  'bds-02': {
    accentColor: '#2563EB', badge: 'APPLE MINIMAL',
    screenshots: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800','https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800','https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'],
    targetAudience: ['Môi giới cá nhân', 'Nhà phố & Căn hộ', 'Studio BĐS trẻ', 'Tư vấn độc lập'],
    highlights: ['Hero Split Layout Apple', 'Typography Apple Style', 'White Space Chuẩn UX', 'Card Sạch Bo Góc 24px', 'Sticky Header Glass'],
    availablePages: ['Trang chủ', 'Dự án', 'Giới thiệu', 'Tin tức', 'Liên hệ', 'FAQ'],
    modules: ['Lead Booking Form', 'SEO Top 100', 'Google Analytics', 'Zalo 1-Touch', 'CMS Quản Trị'],
    benefits: ['Tải nhanh điểm số cao', 'Dễ dùng, không cần IT', 'Thể hiện chuyên nghiệp', 'Tối ưu mobile tuyệt đối'],
  },
  'minimal-white': {
    accentColor: '#2563EB', badge: 'APPLE MINIMAL',
    screenshots: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800','https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800','https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'],
    targetAudience: ['Môi giới cá nhân', 'Nhà phố & Căn hộ', 'Studio BĐS trẻ', 'Tư vấn độc lập'],
    highlights: ['Hero Split Layout Apple', 'Typography Apple Style', 'White Space Chuẩn UX', 'Card Sạch Bo Góc 24px', 'Sticky Header Glass'],
    availablePages: ['Trang chủ', 'Dự án', 'Giới thiệu', 'Tin tức', 'Liên hệ', 'FAQ'],
    modules: ['Lead Booking Form', 'SEO Top 100', 'Google Analytics', 'Zalo 1-Touch', 'CMS Quản Trị'],
    benefits: ['Tải nhanh điểm số cao', 'Dễ dùng, không cần IT', 'Thể hiện chuyên nghiệp', 'Tối ưu mobile tuyệt đối'],
  },
  'mock-2': {
    accentColor: '#2563EB', badge: 'APPLE MINIMAL',
    screenshots: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800','https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800','https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'],
    targetAudience: ['Môi giới cá nhân', 'Nhà phố & Căn hộ', 'Studio BĐS trẻ', 'Tư vấn độc lập'],
    highlights: ['Hero Split Layout Apple', 'Typography Apple Style', 'White Space Chuẩn UX', 'Card Sạch Bo Góc 24px', 'Sticky Header Glass'],
    availablePages: ['Trang chủ', 'Dự án', 'Giới thiệu', 'Tin tức', 'Liên hệ', 'FAQ'],
    modules: ['Lead Booking Form', 'SEO Top 100', 'Google Analytics', 'Zalo 1-Touch', 'CMS Quản Trị'],
    benefits: ['Tải nhanh điểm số cao', 'Dễ dùng, không cần IT', 'Thể hiện chuyên nghiệp', 'Tối ưu mobile tuyệt đối'],
  },

  // 3. Modern Corporate
  'bds-03': {
    accentColor: '#0F4C81', badge: 'CORPORATE PRO',
    screenshots: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800','https://images.unsplash.com/photo-1497366216548-37526070297c?w=800','https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800'],
    targetAudience: ['Tổng công ty BĐS', 'Sàn môi giới lớn', 'Doanh nghiệp F1', 'Tập đoàn đa chi nhánh'],
    highlights: ['Grid Dự án phân phối', 'Khu vực Đối tác Chiến lược', 'Mega Menu Đa Tầng', 'Trang Tuyển dụng', 'Timeline Phát triển'],
    availablePages: ['Trang chủ', 'Giới thiệu', 'Dự án', 'Đối tác', 'Tuyển dụng', 'Tin tức', 'Liên hệ'],
    modules: ['CRM Lead Router', 'Lead Form', 'SEO Multi-Project', 'Google Maps Multi-Branch', 'Zalo OA'],
    benefits: ['Xây dựng thương hiệu mạnh', 'Quản lý nhiều dự án cùng lúc', 'Tuyển dụng nhân tài hiệu quả', 'Chuẩn doanh nghiệp'],
  },
  'modern-corporate': {
    accentColor: '#0F4C81', badge: 'CORPORATE PRO',
    screenshots: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800','https://images.unsplash.com/photo-1497366216548-37526070297c?w=800','https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800'],
    targetAudience: ['Tổng công ty BĐS', 'Sàn môi giới lớn', 'Doanh nghiệp F1', 'Tập đoàn đa chi nhánh'],
    highlights: ['Grid Dự án phân phối', 'Khu vực Đối tác Chiến lược', 'Mega Menu Đa Tầng', 'Trang Tuyển dụng', 'Timeline Phát triển'],
    availablePages: ['Trang chủ', 'Giới thiệu', 'Dự án', 'Đối tác', 'Tuyển dụng', 'Tin tức', 'Liên hệ'],
    modules: ['CRM Lead Router', 'Lead Form', 'SEO Multi-Project', 'Google Maps Multi-Branch', 'Zalo OA'],
    benefits: ['Xây dựng thương hiệu mạnh', 'Quản lý nhiều dự án cùng lúc', 'Tuyển dụng nhân tài hiệu quả', 'Chuẩn doanh nghiệp'],
  },
  'mock-3': {
    accentColor: '#0F4C81', badge: 'CORPORATE PRO',
    screenshots: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800','https://images.unsplash.com/photo-1497366216548-37526070297c?w=800','https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800'],
    targetAudience: ['Tổng công ty BĐS', 'Sàn môi giới lớn', 'Doanh nghiệp F1', 'Tập đoàn đa chi nhánh'],
    highlights: ['Grid Dự án phân phối', 'Khu vực Đối tác Chiến lược', 'Mega Menu Đa Tầng', 'Trang Tuyển dụng', 'Timeline Phát triển'],
    availablePages: ['Trang chủ', 'Giới thiệu', 'Dự án', 'Đối tác', 'Tuyển dụng', 'Tin tức', 'Liên hệ'],
    modules: ['CRM Lead Router', 'Lead Form', 'SEO Multi-Project', 'Google Maps Multi-Branch', 'Zalo OA'],
    benefits: ['Xây dựng thương hiệu mạnh', 'Quản lý nhiều dự án cùng lúc', 'Tuyển dụng nhân tài hiệu quả', 'Chuẩn doanh nghiệp'],
  },

  // 4. Resort Paradise
  'bds-04': {
    accentColor: '#0369A1', badge: 'RESORT PARADISE',
    screenshots: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800','https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800','https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800'],
    targetAudience: ['Khu nghỉ dưỡng biển', 'Villa resort', 'Condotel ven biển', 'BĐS du lịch'],
    highlights: ['Video Hero Autoplay', 'Wave Section Divider', 'Amenities Gallery 4K', 'Bảng tính ROI Cho thuê', 'Bản đồ Vị trí Biển'],
    availablePages: ['Trang chủ', 'Resort & Villa', 'Tiện ích 5 sao', 'Bảng tính ROI', 'Liên hệ Booking'],
    modules: ['Booking Form', 'Video Background', 'Google Maps Resort', 'Lead Capture', 'Zalo VIP Chat'],
    benefits: ['Trải nghiệm nghỉ dưỡng đẳng cấp', 'Tăng tỷ lệ đặt cọc', 'Showcase không gian sống', 'Thu hút khách ngoại tỉnh'],
  },
  'resort-paradise': {
    accentColor: '#0369A1', badge: 'RESORT PARADISE',
    screenshots: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800','https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800','https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800'],
    targetAudience: ['Khu nghỉ dưỡng biển', 'Villa resort', 'Condotel ven biển', 'BĐS du lịch'],
    highlights: ['Video Hero Autoplay', 'Wave Section Divider', 'Amenities Gallery 4K', 'Bảng tính ROI Cho thuê', 'Bản đồ Vị trí Biển'],
    availablePages: ['Trang chủ', 'Resort & Villa', 'Tiện ích 5 sao', 'Bảng tính ROI', 'Liên hệ Booking'],
    modules: ['Booking Form', 'Video Background', 'Google Maps Resort', 'Lead Capture', 'Zalo VIP Chat'],
    benefits: ['Trải nghiệm nghỉ dưỡng đẳng cấp', 'Tăng tỷ lệ đặt cọc', 'Showcase không gian sống', 'Thu hút khách ngoại tỉnh'],
  },
  'mock-4': {
    accentColor: '#0369A1', badge: 'RESORT PARADISE',
    screenshots: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800','https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800','https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800'],
    targetAudience: ['Khu nghỉ dưỡng biển', 'Villa resort', 'Condotel ven biển', 'BĐS du lịch'],
    highlights: ['Video Hero Autoplay', 'Wave Section Divider', 'Amenities Gallery 4K', 'Bảng tính ROI Cho thuê', 'Bản đồ Vị trí Biển'],
    availablePages: ['Trang chủ', 'Resort & Villa', 'Tiện ích 5 sao', 'Bảng tính ROI', 'Liên hệ Booking'],
    modules: ['Booking Form', 'Video Background', 'Google Maps Resort', 'Lead Capture', 'Zalo VIP Chat'],
    benefits: ['Trải nghiệm nghỉ dưỡng đẳng cấp', 'Tăng tỷ lệ đặt cọc', 'Showcase không gian sống', 'Thu hút khách ngoại tỉnh'],
  },

  // 5. Urban City
  'bds-05': {
    accentColor: '#7C3AED', badge: 'SMART URBAN',
    screenshots: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800','https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800','https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=800'],
    targetAudience: ['Chung cư đô thị', 'Smart City', 'Căn hộ cao cấp', 'Gia đình trẻ'],
    highlights: ['Hero Smart Search theo Quận/Giá', 'Bản đồ Tuyến Metro', 'Máy tính Lãi vay Ngân hàng', 'Layout So sánh 1PN/2PN/3PN'],
    availablePages: ['Trang chủ', 'Tìm kiếm Căn hộ', 'Bản đồ Metro', 'Chi tiết căn hộ', 'Tính lãi vay', 'Tin tức'],
    modules: ['Bank Loan Calculator', 'Smart Interactive Map', 'Lead Form', 'CRM', 'Zalo Quick Contact'],
    benefits: ['Tìm kiếm thông minh', 'Hiển thị bản đồ trực quan', 'Tính toán vay mua nhà tự động', 'Tăng chuyển đổi'],
  },
  'urban-city': {
    accentColor: '#7C3AED', badge: 'SMART URBAN',
    screenshots: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800','https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800','https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=800'],
    targetAudience: ['Chung cư đô thị', 'Smart City', 'Căn hộ cao cấp', 'Gia đình trẻ'],
    highlights: ['Hero Smart Search theo Quận/Giá', 'Bản đồ Tuyến Metro', 'Máy tính Lãi vay Ngân hàng', 'Layout So sánh 1PN/2PN/3PN'],
    availablePages: ['Trang chủ', 'Tìm kiếm Căn hộ', 'Bản đồ Metro', 'Chi tiết căn hộ', 'Tính lãi vay', 'Tin tức'],
    modules: ['Bank Loan Calculator', 'Smart Interactive Map', 'Lead Form', 'CRM', 'Zalo Quick Contact'],
    benefits: ['Tìm kiếm thông minh', 'Hiển thị bản đồ trực quan', 'Tính toán vay mua nhà tự động', 'Tăng chuyển đổi'],
  },
  'mock-5': {
    accentColor: '#7C3AED', badge: 'SMART URBAN',
    screenshots: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800','https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800','https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=800'],
    targetAudience: ['Chung cư đô thị', 'Smart City', 'Căn hộ cao cấp', 'Gia đình trẻ'],
    highlights: ['Hero Smart Search theo Quận/Giá', 'Bản đồ Tuyến Metro', 'Máy tính Lãi vay Ngân hàng', 'Layout So sánh 1PN/2PN/3PN'],
    availablePages: ['Trang chủ', 'Tìm kiếm Căn hộ', 'Bản đồ Metro', 'Chi tiết căn hộ', 'Tính lãi vay', 'Tin tức'],
    modules: ['Bank Loan Calculator', 'Smart Interactive Map', 'Lead Form', 'CRM', 'Zalo Quick Contact'],
    benefits: ['Tìm kiếm thông minh', 'Hiển thị bản đồ trực quan', 'Tính toán vay mua nhà tự động', 'Tăng chuyển đổi'],
  },

  // 6. Industrial Estate
  'bds-06': {
    accentColor: '#F59E0B', badge: 'INDUSTRIAL B2B',
    screenshots: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800','https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800','https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800'],
    targetAudience: ['Nhà xưởng xây sẵn', 'Khu công nghiệp', 'Logistics & Kho bãi', 'Doanh nghiệp FDI'],
    highlights: ['Thông số Kỹ thuật Hạ tầng 110kV', 'Bản đồ Kết nối Cảng Nước Sâu', 'Quy trình Đầu tư FDI 5 Bước', 'Tải Brochure PDF B2B'],
    availablePages: ['Trang chủ', 'Hạ tầng Kỹ thuật', 'Vị trí & Cảng biển', 'Nhà xưởng cho thuê', 'Quy trình FDI', 'Liên hệ'],
    modules: ['B2B Lead Form', 'Google Maps Port', 'Brochure PDF Download', 'SEO B2B', 'Zalo OA'],
    benefits: ['Phù hợp B2B doanh nghiệp', 'Thể hiện vị trí kết nối rõ ràng', 'Thu hút nhà đầu tư FDI', 'Chuẩn professional'],
  },
  'industrial-estate': {
    accentColor: '#F59E0B', badge: 'INDUSTRIAL B2B',
    screenshots: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800','https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800','https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800'],
    targetAudience: ['Nhà xưởng xây sẵn', 'Khu công nghiệp', 'Logistics & Kho bãi', 'Doanh nghiệp FDI'],
    highlights: ['Thông số Kỹ thuật Hạ tầng 110kV', 'Bản đồ Kết nối Cảng Nước Sâu', 'Quy trình Đầu tư FDI 5 Bước', 'Tải Brochure PDF B2B'],
    availablePages: ['Trang chủ', 'Hạ tầng Kỹ thuật', 'Vị trí & Cảng biển', 'Nhà xưởng cho thuê', 'Quy trình FDI', 'Liên hệ'],
    modules: ['B2B Lead Form', 'Google Maps Port', 'Brochure PDF Download', 'SEO B2B', 'Zalo OA'],
    benefits: ['Phù hợp B2B doanh nghiệp', 'Thể hiện vị trí kết nối rõ ràng', 'Thu hút nhà đầu tư FDI', 'Chuẩn professional'],
  },
  'mock-6': {
    accentColor: '#F59E0B', badge: 'INDUSTRIAL B2B',
    screenshots: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800','https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800','https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800'],
    targetAudience: ['Nhà xưởng xây sẵn', 'Khu công nghiệp', 'Logistics & Kho bãi', 'Doanh nghiệp FDI'],
    highlights: ['Thông số Kỹ thuật Hạ tầng 110kV', 'Bản đồ Kết nối Cảng Nước Sâu', 'Quy trình Đầu tư FDI 5 Bước', 'Tải Brochure PDF B2B'],
    availablePages: ['Trang chủ', 'Hạ tầng Kỹ thuật', 'Vị trí & Cảng biển', 'Nhà xưởng cho thuê', 'Quy trình FDI', 'Liên hệ'],
    modules: ['B2B Lead Form', 'Google Maps Port', 'Brochure PDF Download', 'SEO B2B', 'Zalo OA'],
    benefits: ['Phù hợp B2B doanh nghiệp', 'Thể hiện vị trí kết nối rõ ràng', 'Thu hút nhà đầu tư FDI', 'Chuẩn professional'],
  },

  // 7. Villa Premium
  'bds-07': {
    accentColor: '#B45309', badge: 'VILLA 3D',
    screenshots: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800','https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800','https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=800'],
    targetAudience: ['Biệt thự đơn lập', 'Villa sân vườn', 'Dự án compound khép kín', 'Khách hàng VIP'],
    highlights: ['Tour 3D Matterport Thực tế ảo', 'Tab Sơ đồ Mặt bằng Từng tầng', 'Biểu đồ Hướng nắng Phong thủy', 'Booking Private Tour'],
    availablePages: ['Trang chủ', 'Bộ sưu tập Villa', 'Mặt bằng tầng', 'Tour 3D', 'Gallery', 'Vị trí'],
    modules: ['3D Tour Engine', 'Floor Plan Viewer', 'Lead Form', 'Google Maps', 'CRM VIP', 'Zalo'],
    benefits: ['Trải nghiệm tham quan ảo', 'Thuyết phục khách từ xa', 'Showcase không gian sống', 'Tăng tỷ lệ chốt cọc'],
  },
  'villa-premium': {
    accentColor: '#B45309', badge: 'VILLA 3D',
    screenshots: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800','https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800','https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=800'],
    targetAudience: ['Biệt thự đơn lập', 'Villa sân vườn', 'Dự án compound khép kín', 'Khách hàng VIP'],
    highlights: ['Tour 3D Matterport Thực tế ảo', 'Tab Sơ đồ Mặt bằng Từng tầng', 'Biểu đồ Hướng nắng Phong thủy', 'Booking Private Tour'],
    availablePages: ['Trang chủ', 'Bộ sưu tập Villa', 'Mặt bằng tầng', 'Tour 3D', 'Gallery', 'Vị trí'],
    modules: ['3D Tour Engine', 'Floor Plan Viewer', 'Lead Form', 'Google Maps', 'CRM VIP', 'Zalo'],
    benefits: ['Trải nghiệm tham quan ảo', 'Thuyết phục khách từ xa', 'Showcase không gian sống', 'Tăng tỷ lệ chốt cọc'],
  },
  'mock-7': {
    accentColor: '#B45309', badge: 'VILLA 3D',
    screenshots: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800','https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800','https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=800'],
    targetAudience: ['Biệt thự đơn lập', 'Villa sân vườn', 'Dự án compound khép kín', 'Khách hàng VIP'],
    highlights: ['Tour 3D Matterport Thực tế ảo', 'Tab Sơ đồ Mặt bằng Từng tầng', 'Biểu đồ Hướng nắng Phong thủy', 'Booking Private Tour'],
    availablePages: ['Trang chủ', 'Bộ sưu tập Villa', 'Mặt bằng tầng', 'Tour 3D', 'Gallery', 'Vị trí'],
    modules: ['3D Tour Engine', 'Floor Plan Viewer', 'Lead Form', 'Google Maps', 'CRM VIP', 'Zalo'],
    benefits: ['Trải nghiệm tham quan ảo', 'Thuyết phục khách từ xa', 'Showcase không gian sống', 'Tăng tỷ lệ chốt cọc'],
  },

  // 8. Eco Green
  'bds-08': {
    accentColor: '#16A34A', badge: 'ECO GREEN',
    screenshots: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800','https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=800','https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'],
    targetAudience: ['Đô thị sinh thái', 'Ecopark', 'Vinhomes sinh thái', 'Nhà vườn ven hồ'],
    highlights: ['Timeline Cảnh quan Cây xanh', 'Chỉ số Bền vững & Không khí sạch', 'Showcase Tiện ích Ngoài trời', 'Giao diện Chiếc Lá Mềm Mại'],
    availablePages: ['Trang chủ', 'Không gian xanh', 'Tiện ích ngoài trời', 'Cảnh quan', 'Cộng đồng', 'Liên hệ'],
    modules: ['Eco Lead Capture', 'Google Maps Green', 'Gallery Nature', 'Video Player', 'SEO', 'Zalo'],
    benefits: ['Thu hút gia đình trẻ', 'Định vị sống xanh trong lành', 'Showcase thiên nhiên tuyệt đẹp', 'Cộng đồng gắn kết'],
  },
  'eco-green': {
    accentColor: '#16A34A', badge: 'ECO GREEN',
    screenshots: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800','https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=800','https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'],
    targetAudience: ['Đô thị sinh thái', 'Ecopark', 'Vinhomes sinh thái', 'Nhà vườn ven hồ'],
    highlights: ['Timeline Cảnh quan Cây xanh', 'Chỉ số Bền vững & Không khí sạch', 'Showcase Tiện ích Ngoài trời', 'Giao diện Chiếc Lá Mềm Mại'],
    availablePages: ['Trang chủ', 'Không gian xanh', 'Tiện ích ngoài trời', 'Cảnh quan', 'Cộng đồng', 'Liên hệ'],
    modules: ['Eco Lead Capture', 'Google Maps Green', 'Gallery Nature', 'Video Player', 'SEO', 'Zalo'],
    benefits: ['Thu hút gia đình trẻ', 'Định vị sống xanh trong lành', 'Showcase thiên nhiên tuyệt đẹp', 'Cộng đồng gắn kết'],
  },
  'mock-8': {
    accentColor: '#16A34A', badge: 'ECO GREEN',
    screenshots: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800','https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=800','https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'],
    targetAudience: ['Đô thị sinh thái', 'Ecopark', 'Vinhomes sinh thái', 'Nhà vườn ven hồ'],
    highlights: ['Timeline Cảnh quan Cây xanh', 'Chỉ số Bền vững & Không khí sạch', 'Showcase Tiện ích Ngoài trời', 'Giao diện Chiếc Lá Mềm Mại'],
    availablePages: ['Trang chủ', 'Không gian xanh', 'Tiện ích ngoài trời', 'Cảnh quan', 'Cộng đồng', 'Liên hệ'],
    modules: ['Eco Lead Capture', 'Google Maps Green', 'Gallery Nature', 'Video Player', 'SEO', 'Zalo'],
    benefits: ['Thu hút gia đình trẻ', 'Định vị sống xanh trong lành', 'Showcase thiên nhiên tuyệt đẹp', 'Cộng đồng gắn kết'],
  },

  // 9. Classic Heritage
  'bds-09': {
    accentColor: '#9F1239', badge: 'CLASSIC HERITAGE',
    screenshots: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800','https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800','https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800'],
    targetAudience: ['Doanh nghiệp lâu năm', 'Sàn truyền thống', 'Thị trường tỉnh thành', 'Khách trung niên'],
    highlights: ['Bố cục Tạp chí Kiến trúc Sang trọng', 'Tư vấn Phong thủy & Hướng nhà', 'Timeline 25 Năm Uy tín', 'Serif Typography Trang nhã'],
    availablePages: ['Trang chủ', 'Lịch sử & Di sản', 'Dự án', 'Thành tích & Giải thưởng', 'Đội ngũ', 'Liên hệ'],
    modules: ['CRM Lead Form', 'SEO Editorial', 'Google Maps Heritage', 'Zalo Connect', 'Messenger'],
    benefits: ['Xây dựng uy tín lâu dài', 'Phù hợp thị trường truyền thống', 'Showcase thành tích ấn tượng'],
  },
  'classic-elegant': {
    accentColor: '#9F1239', badge: 'CLASSIC HERITAGE',
    screenshots: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800','https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800','https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800'],
    targetAudience: ['Doanh nghiệp lâu năm', 'Sàn truyền thống', 'Thị trường tỉnh thành', 'Khách trung niên'],
    highlights: ['Bố cục Tạp chí Kiến trúc Sang trọng', 'Tư vấn Phong thủy & Hướng nhà', 'Timeline 25 Năm Uy tín', 'Serif Typography Trang nhã'],
    availablePages: ['Trang chủ', 'Lịch sử & Di sản', 'Dự án', 'Thành tích & Giải thưởng', 'Đội ngũ', 'Liên hệ'],
    modules: ['CRM Lead Form', 'SEO Editorial', 'Google Maps Heritage', 'Zalo Connect', 'Messenger'],
    benefits: ['Xây dựng uy tín lâu dài', 'Phù hợp thị trường truyền thống', 'Showcase thành tích ấn tượng'],
  },
  'mock-9': {
    accentColor: '#9F1239', badge: 'CLASSIC HERITAGE',
    screenshots: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800','https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800','https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800'],
    targetAudience: ['Doanh nghiệp lâu năm', 'Sàn truyền thống', 'Thị trường tỉnh thành', 'Khách trung niên'],
    highlights: ['Bố cục Tạp chí Kiến trúc Sang trọng', 'Tư vấn Phong thủy & Hướng nhà', 'Timeline 25 Năm Uy tín', 'Serif Typography Trang nhã'],
    availablePages: ['Trang chủ', 'Lịch sử & Di sản', 'Dự án', 'Thành tích & Giải thưởng', 'Đội ngũ', 'Liên hệ'],
    modules: ['CRM Lead Form', 'SEO Editorial', 'Google Maps Heritage', 'Zalo Connect', 'Messenger'],
    benefits: ['Xây dựng uy tín lâu dài', 'Phù hợp thị trường truyền thống', 'Showcase thành tích ấn tượng'],
  },

  // 10. Investment Pro
  'bds-10': {
    accentColor: '#1E40AF', badge: 'INVESTMENT PRO',
    screenshots: ['https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800','https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800','https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'],
    targetAudience: ['Nhà đầu tư BĐS', 'Quỹ đầu tư REITs', 'Chuyên gia tài chính', 'Khách mua dòng tiền'],
    highlights: ['Biểu đồ Tăng trưởng Giá Đất Realtime', 'Máy tính ROI Lợi nhuận Cho thuê', 'Bảng So sánh BĐS vs Vàng/CK', 'Tải Hồ sơ Pháp lý 1/500'],
    availablePages: ['Trang chủ', 'Phân tích ROI', 'Biểu đồ thị trường', 'Tăng trưởng giá', 'Máy tính tài chính', 'Tin tức'],
    modules: ['ROI Financial Calculator', 'Chart.js Engine', 'Google Analytics 4', 'Lead Gate Form', 'CRM'],
    benefits: ['Thuyết phục nhà đầu tư bằng dữ liệu', 'Minh bạch số liệu', 'Phân tích dòng tiền trực quan', 'Thu hút FDI'],
  },
  'investment-pro': {
    accentColor: '#1E40AF', badge: 'INVESTMENT PRO',
    screenshots: ['https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800','https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800','https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'],
    targetAudience: ['Nhà đầu tư BĐS', 'Quỹ đầu tư REITs', 'Chuyên gia tài chính', 'Khách mua dòng tiền'],
    highlights: ['Biểu đồ Tăng trưởng Giá Đất Realtime', 'Máy tính ROI Lợi nhuận Cho thuê', 'Bảng So sánh BĐS vs Vàng/CK', 'Tải Hồ sơ Pháp lý 1/500'],
    availablePages: ['Trang chủ', 'Phân tích ROI', 'Biểu đồ thị trường', 'Tăng trưởng giá', 'Máy tính tài chính', 'Tin tức'],
    modules: ['ROI Financial Calculator', 'Chart.js Engine', 'Google Analytics 4', 'Lead Gate Form', 'CRM'],
    benefits: ['Thuyết phục nhà đầu tư bằng dữ liệu', 'Minh bạch số liệu', 'Phân tích dòng tiền trực quan', 'Thu hút FDI'],
  },
  'mock-10': {
    accentColor: '#1E40AF', badge: 'INVESTMENT PRO',
    screenshots: ['https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800','https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800','https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'],
    targetAudience: ['Nhà đầu tư BĐS', 'Quỹ đầu tư REITs', 'Chuyên gia tài chính', 'Khách mua dòng tiền'],
    highlights: ['Biểu đồ Tăng trưởng Giá Đất Realtime', 'Máy tính ROI Lợi nhuận Cho thuê', 'Bảng So sánh BĐS vs Vàng/CK', 'Tải Hồ sơ Pháp lý 1/500'],
    availablePages: ['Trang chủ', 'Phân tích ROI', 'Biểu đồ thị trường', 'Tăng trưởng giá', 'Máy tính tài chính', 'Tin tức'],
    modules: ['ROI Financial Calculator', 'Chart.js Engine', 'Google Analytics 4', 'Lead Gate Form', 'CRM'],
    benefits: ['Thuyết phục nhà đầu tư bằng dữ liệu', 'Minh bạch số liệu', 'Phân tích dòng tiền trực quan', 'Thu hút FDI'],
  },

  // 11. Agency Onepage
  'bds-11': {
    accentColor: '#DB2777', badge: 'LANDING ADS',
    screenshots: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800','https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800','https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800'],
    targetAudience: ['Agency chạy Ads Facebook/Google', 'Chiến dịch mở bán F1', 'Môi giới thu lead nóng', 'Sự kiện ra mắt'],
    highlights: ['One Page Scroll mượt mà', 'Sticky Mobile CTA Bar', 'Popup Thu lead tỷ lệ cao', 'Countdown Timer Đếm ngược', 'Bảng giá F1'],
    availablePages: ['Landing Page Siêu Chuyển Đổi (1 trang hoàn chỉnh)'],
    modules: ['Popup Lead', 'Countdown Urgency', 'Facebook Pixel', 'Google Ads Tracking', 'Zalo Ads', 'CRM'],
    benefits: ['Tối ưu conversion', 'Phù hợp chạy quảng cáo', 'Tải siêu nhanh dưới 0.8s', 'Lead chất lượng cao'],
  },
  'agency-onepage': {
    accentColor: '#DB2777', badge: 'LANDING ADS',
    screenshots: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800','https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800','https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800'],
    targetAudience: ['Agency chạy Ads Facebook/Google', 'Chiến dịch mở bán F1', 'Môi giới thu lead nóng', 'Sự kiện ra mắt'],
    highlights: ['One Page Scroll mượt mà', 'Sticky Mobile CTA Bar', 'Popup Thu lead tỷ lệ cao', 'Countdown Timer Đếm ngược', 'Bảng giá F1'],
    availablePages: ['Landing Page Siêu Chuyển Đổi (1 trang hoàn chỉnh)'],
    modules: ['Popup Lead', 'Countdown Urgency', 'Facebook Pixel', 'Google Ads Tracking', 'Zalo Ads', 'CRM'],
    benefits: ['Tối ưu conversion', 'Phù hợp chạy quảng cáo', 'Tải siêu nhanh dưới 0.8s', 'Lead chất lượng cao'],
  },
  'mock-11': {
    accentColor: '#DB2777', badge: 'LANDING ADS',
    screenshots: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800','https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800','https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800'],
    targetAudience: ['Agency chạy Ads Facebook/Google', 'Chiến dịch mở bán F1', 'Môi giới thu lead nóng', 'Sự kiện ra mắt'],
    highlights: ['One Page Scroll mượt mà', 'Sticky Mobile CTA Bar', 'Popup Thu lead tỷ lệ cao', 'Countdown Timer Đếm ngược', 'Bảng giá F1'],
    availablePages: ['Landing Page Siêu Chuyển Đổi (1 trang hoàn chỉnh)'],
    modules: ['Popup Lead', 'Countdown Urgency', 'Facebook Pixel', 'Google Ads Tracking', 'Zalo Ads', 'CRM'],
    benefits: ['Tối ưu conversion', 'Phù hợp chạy quảng cáo', 'Tải siêu nhanh dưới 0.8s', 'Lead chất lượng cao'],
  },

  // 12. Mega Developer
  'bds-12': {
    accentColor: '#0F172A', badge: 'MEGA PORTAL',
    screenshots: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800','https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800','https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
    targetAudience: ['Tập đoàn phát triển BĐS', 'Multi-Project Developer', 'Portal Listing BĐS', 'Công ty niêm yết IPO'],
    highlights: ['Mega Hero Fullscreen Slider', 'Danh mục Đa Dự Án Phân Vùng', 'Investor Relations Báo cáo Cổ đông', 'Media Newsroom & CSR'],
    availablePages: ['Trang chủ', 'Dự án phân vùng', 'Nhà đầu tư (IR)', 'Tin tức & Sự kiện', 'CSR', 'Tuyển dụng'],
    modules: ['Enterprise CRM', 'Lead Router', 'Google Analytics 4', 'Facebook Pixel', 'SEO Enterprise', 'CMS Pro'],
    benefits: ['Phù hợp tập đoàn lớn', 'Quản lý đa dự án tập trung', 'Investor Relations chuẩn mực', 'Media & PR chuyên nghiệp'],
  },
  'mega-developer': {
    accentColor: '#0F172A', badge: 'MEGA PORTAL',
    screenshots: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800','https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800','https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
    targetAudience: ['Tập đoàn phát triển BĐS', 'Multi-Project Developer', 'Portal Listing BĐS', 'Công ty niêm yết IPO'],
    highlights: ['Mega Hero Fullscreen Slider', 'Danh mục Đa Dự Án Phân Vùng', 'Investor Relations Báo cáo Cổ đông', 'Media Newsroom & CSR'],
    availablePages: ['Trang chủ', 'Dự án phân vùng', 'Nhà đầu tư (IR)', 'Tin tức & Sự kiện', 'CSR', 'Tuyển dụng'],
    modules: ['Enterprise CRM', 'Lead Router', 'Google Analytics 4', 'Facebook Pixel', 'SEO Enterprise', 'CMS Pro'],
    benefits: ['Phù hợp tập đoàn lớn', 'Quản lý đa dự án tập trung', 'Investor Relations chuẩn mực', 'Media & PR chuyên nghiệp'],
  },
  'mock-12': {
    accentColor: '#0F172A', badge: 'MEGA PORTAL',
    screenshots: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800','https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800','https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
    targetAudience: ['Tập đoàn phát triển BĐS', 'Multi-Project Developer', 'Portal Listing BĐS', 'Công ty niêm yết IPO'],
    highlights: ['Mega Hero Fullscreen Slider', 'Danh mục Đa Dự Án Phân Vùng', 'Investor Relations Báo cáo Cổ đông', 'Media Newsroom & CSR'],
    availablePages: ['Trang chủ', 'Dự án phân vùng', 'Nhà đầu tư (IR)', 'Tin tức & Sự kiện', 'CSR', 'Tuyển dụng'],
    modules: ['Enterprise CRM', 'Lead Router', 'Google Analytics 4', 'Facebook Pixel', 'SEO Enterprise', 'CMS Pro'],
    benefits: ['Phù hợp tập đoàn lớn', 'Quản lý đa dự án tập trung', 'Investor Relations chuẩn mực', 'Media & PR chuyên nghiệp'],
  },

  // 13. Auction Template
  'bds-13': {
    accentColor: '#EF4444', badge: 'AUCTION PRO',
    screenshots: ['https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800','https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800','https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800'],
    targetAudience: ['Sàn đấu giá BĐS', 'Tài sản phát mãi ngân hàng', 'Sàn thanh lý nợ xấu', 'Môi giới tài sản công'],
    highlights: ['Hệ thống Đấu giá Trực tuyến', 'Đồng hồ Đếm ngược Bước giá', 'Hồ sơ Pháp lý Đã kiểm duyệt', 'Đặt cọc Tham gia Đấu giá'],
    availablePages: ['Trang chủ', 'Tài sản đang đấu', 'Thể lệ đấu giá', 'Hồ sơ pháp lý', 'Liên hệ'],
    modules: ['Auction Engine', 'Live Countdown Timer', 'Legal Gate', 'Payment Gateway', 'Zalo Support'],
    benefits: ['Mua bán giá tốt', 'Cạnh tranh minh bạch', 'Quy trình đấu giá trực tuyến rõ ràng', 'An toàn pháp lý'],
  },
  'auction-template': {
    accentColor: '#EF4444', badge: 'AUCTION PRO',
    screenshots: ['https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800','https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800','https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800'],
    targetAudience: ['Sàn đấu giá BĐS', 'Tài sản phát mãi ngân hàng', 'Sàn thanh lý nợ xấu', 'Môi giới tài sản công'],
    highlights: ['Hệ thống Đấu giá Trực tuyến', 'Đồng hồ Đếm ngược Bước giá', 'Hồ sơ Pháp lý Đã kiểm duyệt', 'Đặt cọc Tham gia Đấu giá'],
    availablePages: ['Trang chủ', 'Tài sản đang đấu', 'Thể lệ đấu giá', 'Hồ sơ pháp lý', 'Liên hệ'],
    modules: ['Auction Engine', 'Live Countdown Timer', 'Legal Gate', 'Payment Gateway', 'Zalo Support'],
    benefits: ['Mua bán giá tốt', 'Cạnh tranh minh bạch', 'Quy trình đấu giá trực tuyến rõ ràng', 'An toàn pháp lý'],
  },

  // 14. Land Plot
  'bds-14': {
    accentColor: '#D97706', badge: 'MASTER LAND PLOT',
    screenshots: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800','https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800','https://images.unsplash.com/photo-1448630360428-65456885c650?w=800'],
    targetAudience: ['Chủ đầu tư đất nền', 'Đại lý phân phối đất nền', 'Sàn bán đất quy hoạch', 'Khu dân cư mới'],
    highlights: ['Bản đồ Phân lô Tương tác 1/500', 'Tra cứu Tình trạng Lô đất Trực tiếp', 'Bảng Giá & Tiến độ Hạ tầng', 'Đăng ký Giữ chỗ Lô đẹp'],
    availablePages: ['Trang chủ', 'Sơ đồ mặt bằng 1/500', 'Vị trí & Hạ tầng', 'Pháp lý', 'Liên hệ'],
    modules: ['Interactive Masterplan Map', 'Plot Booking Form', 'Legal Documents Download', 'Zalo Lead'],
    benefits: ['Phân lô bán nền dễ dàng', 'Trực quan hóa vị trí lô đất', 'Khách hàng yên tâm pháp lý sổ đỏ'],
  },
  'landplot-template': {
    accentColor: '#D97706', badge: 'MASTER LAND PLOT',
    screenshots: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800','https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800','https://images.unsplash.com/photo-1448630360428-65456885c650?w=800'],
    targetAudience: ['Chủ đầu tư đất nền', 'Đại lý phân phối đất nền', 'Sàn bán đất quy hoạch', 'Khu dân cư mới'],
    highlights: ['Bản đồ Phân lô Tương tác 1/500', 'Tra cứu Tình trạng Lô đất Trực tiếp', 'Bảng Giá & Tiến độ Hạ tầng', 'Đăng ký Giữ chỗ Lô đẹp'],
    availablePages: ['Trang chủ', 'Sơ đồ mặt bằng 1/500', 'Vị trí & Hạ tầng', 'Pháp lý', 'Liên hệ'],
    modules: ['Interactive Masterplan Map', 'Plot Booking Form', 'Legal Documents Download', 'Zalo Lead'],
    benefits: ['Phân lô bán nền dễ dàng', 'Trực quan hóa vị trí lô đất', 'Khách hàng yên tâm pháp lý sổ đỏ'],
  },

  // 15. Retail Podium
  'bds-15': {
    accentColor: '#EA580C', badge: 'RETAIL & SHOP',
    screenshots: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800','https://images.unsplash.com/photo-1519567281023-eb3e9b1390d4?w=800','https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
    targetAudience: ['Chủ đầu tư TTTM', 'Shophouse khối đế chung cư', 'Chuỗi bán lẻ & F&B', 'Nhà phố thương mại'],
    highlights: ['Sơ đồ Gian hàng 3D Trung tâm Thương mại', 'Booking Mặt bằng Kinh doanh', 'Thống kê Lưu lượng Khách Mua sắm', 'Biểu Phí Thuê & Đặt Cọc'],
    availablePages: ['Trang chủ', 'Danh mục Gian hàng', 'Sơ đồ TTTM', 'Chính sách cho thuê', 'Liên hệ'],
    modules: ['Store Locator 3D', 'Booking Lease Form', 'Foot-traffic Analytics', 'Zalo Commercial'],
    benefits: ['Cho thuê mặt bằng dễ dàng', 'Quản lý gian hàng trực quan', 'Tối ưu công suất khai thác'],
  },
  'retail-podium': {
    accentColor: '#EA580C', badge: 'RETAIL & SHOP',
    screenshots: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800','https://images.unsplash.com/photo-1519567281023-eb3e9b1390d4?w=800','https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
    targetAudience: ['Chủ đầu tư TTTM', 'Shophouse khối đế chung cư', 'Chuỗi bán lẻ & F&B', 'Nhà phố thương mại'],
    highlights: ['Sơ đồ Gian hàng 3D Trung tâm Thương mại', 'Booking Mặt bằng Kinh doanh', 'Thống kê Lưu lượng Khách Mua sắm', 'Biểu Phí Thuê & Đặt Cọc'],
    availablePages: ['Trang chủ', 'Danh mục Gian hàng', 'Sơ đồ TTTM', 'Chính sách cho thuê', 'Liên hệ'],
    modules: ['Store Locator 3D', 'Booking Lease Form', 'Foot-traffic Analytics', 'Zalo Commercial'],
    benefits: ['Cho thuê mặt bằng dễ dàng', 'Quản lý gian hàng trực quan', 'Tối ưu công suất khai thác'],
  },

  // 16. Personal Agent
  'bds-16': {
    accentColor: '#4F46E5', badge: 'TOP PERFORMER',
    screenshots: ['https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800','https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800','https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'],
    targetAudience: ['Môi giới cá nhân', 'Top Performer sàn BĐS', 'Chuyên viên tư vấn độc lập', 'Trưởng nhóm kinh doanh'],
    highlights: ['Profile Chuyên nghiệp Top Broker', 'Slider Dự án Đang Nắm Giữ', 'Đánh giá Khách hàng 5 Sao', 'Đặt Lịch Tư Vấn 1-1 qua Zalo'],
    availablePages: ['Trang chủ (One Page Portfolio Tối Ưu)'],
    modules: ['Booking Calendar', 'Testimonials Slider', 'Portfolio Showcase', 'Zalo 1-Touch'],
    benefits: ['Xây dựng thương hiệu cá nhân triệu đô', 'Tăng độ tin cậy tuyệt đối', 'Khách hàng dễ liên hệ tư vấn'],
  },
  'personal-agent': {
    accentColor: '#4F46E5', badge: 'TOP PERFORMER',
    screenshots: ['https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800','https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800','https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'],
    targetAudience: ['Môi giới cá nhân', 'Top Performer sàn BĐS', 'Chuyên viên tư vấn độc lập', 'Trưởng nhóm kinh doanh'],
    highlights: ['Profile Chuyên nghiệp Top Broker', 'Slider Dự án Đang Nắm Giữ', 'Đánh giá Khách hàng 5 Sao', 'Đặt Lịch Tư Vấn 1-1 qua Zalo'],
    availablePages: ['Trang chủ (One Page Portfolio Tối Ưu)'],
    modules: ['Booking Calendar', 'Testimonials Slider', 'Portfolio Showcase', 'Zalo 1-Touch'],
    benefits: ['Xây dựng thương hiệu cá nhân triệu đô', 'Tăng độ tin cậy tuyệt đối', 'Khách hàng dễ liên hệ tư vấn'],
  },

  // 17. Portal Listing (HOT)
  'bds-17': {
    accentColor: '#2563EB', badge: 'PORTAL TOP 1',
    screenshots: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800','https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800','https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
    targetAudience: ['Sàn giao dịch BĐS quy mô lớn', 'Cổng thông tin & niêm yết nhà đất', 'Tập đoàn môi giới đa tỉnh thành', 'Chủ đầu tư phân phối nhiều dự án'],
    highlights: ['Bộ lọc đa năng thông minh theo Loại hình & Khu vực', 'Lưới 8 BĐS Cho Bán & 8 BĐS Cho Thuê', 'Spotlight Dự án tiêu biểu với hình ảnh 4K', 'Máy tính Lãi vay Ngân hàng tự động', 'Form Ký gửi Nhà đất trực tuyến'],
    availablePages: ['Trang chủ Cổng thông tin', 'Nhà đất bán', 'Nhà đất cho thuê', 'Dự án BĐS', 'Chi tiết tin đăng BĐS', 'Tin tức thị trường', 'Liên hệ & Ký gửi'],
    modules: ['Omni-Search Engine', 'Bank Loan Calculator', 'City Directory Cards', 'Rental Split Cards', 'Property Booking Modal', 'Online Listing Submission', 'Zalo OA Lead Router'],
    benefits: ['Giao diện chuẩn cổng thông tin số 1 tạo uy tín vượt trội', 'Khách hàng dễ dàng tìm kiếm BĐS theo nhu cầu bán hoặc thuê', 'Tự động thu thập khách hàng tiềm năng qua form ký gửi và tính lãi vay'],
  },
  'portal-listing': {
    accentColor: '#2563EB', badge: 'PORTAL TOP 1',
    screenshots: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800','https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800','https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
    targetAudience: ['Sàn giao dịch BĐS quy mô lớn', 'Cổng thông tin & niêm yết nhà đất', 'Tập đoàn môi giới đa tỉnh thành', 'Chủ đầu tư phân phối nhiều dự án'],
    highlights: ['Bộ lọc đa năng thông minh theo Loại hình & Khu vực', 'Lưới 8 BĐS Cho Bán & 8 BĐS Cho Thuê', 'Spotlight Dự án tiêu biểu với hình ảnh 4K', 'Máy tính Lãi vay Ngân hàng tự động', 'Form Ký gửi Nhà đất trực tuyến'],
    availablePages: ['Trang chủ Cổng thông tin', 'Nhà đất bán', 'Nhà đất cho thuê', 'Dự án BĐS', 'Chi tiết tin đăng BĐS', 'Tin tức thị trường', 'Liên hệ & Ký gửi'],
    modules: ['Omni-Search Engine', 'Bank Loan Calculator', 'City Directory Cards', 'Rental Split Cards', 'Property Booking Modal', 'Online Listing Submission', 'Zalo OA Lead Router'],
    benefits: ['Giao diện chuẩn cổng thông tin số 1 tạo uy tín vượt trội', 'Khách hàng dễ dàng tìm kiếm BĐS theo nhu cầu bán hoặc thuê', 'Tự động thu thập khách hàng tiềm năng qua form ký gửi và tính lãi vay'],
  },
  'vietnam-portal': {
    accentColor: '#2563EB', badge: 'PORTAL TOP 1',
    screenshots: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800','https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800','https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
    targetAudience: ['Sàn giao dịch BĐS quy mô lớn', 'Cổng thông tin & niêm yết nhà đất', 'Tập đoàn môi giới đa tỉnh thành', 'Chủ đầu tư phân phối nhiều dự án'],
    highlights: ['Bộ lọc đa năng thông minh theo Loại hình & Khu vực', 'Lưới 8 BĐS Cho Bán & 8 BĐS Cho Thuê', 'Spotlight Dự án tiêu biểu với hình ảnh 4K', 'Máy tính Lãi vay Ngân hàng tự động', 'Form Ký gửi Nhà đất trực tuyến'],
    availablePages: ['Trang chủ Cổng thông tin', 'Nhà đất bán', 'Nhà đất cho thuê', 'Dự án BĐS', 'Chi tiết tin đăng BĐS', 'Tin tức thị trường', 'Liên hệ & Ký gửi'],
    modules: ['Omni-Search Engine', 'Bank Loan Calculator', 'City Directory Cards', 'Rental Split Cards', 'Property Booking Modal', 'Online Listing Submission', 'Zalo OA Lead Router'],
    benefits: ['Giao diện chuẩn cổng thông tin số 1 tạo uy tín vượt trội', 'Khách hàng dễ dàng tìm kiếm BĐS theo nhu cầu bán hoặc thuê', 'Tự động thu thập khách hàng tiềm năng qua form ký gửi và tính lãi vay'],
  },
  'mock-17': {
    accentColor: '#2563EB', badge: 'PORTAL TOP 1',
    screenshots: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800','https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800','https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
    targetAudience: ['Sàn giao dịch BĐS quy mô lớn', 'Cổng thông tin & niêm yết nhà đất', 'Tập đoàn môi giới đa tỉnh thành', 'Chủ đầu tư phân phối nhiều dự án'],
    highlights: ['Bộ lọc đa năng thông minh theo Loại hình & Khu vực', 'Lưới 8 BĐS Cho Bán & 8 BĐS Cho Thuê', 'Spotlight Dự án tiêu biểu với hình ảnh 4K', 'Máy tính Lãi vay Ngân hàng tự động', 'Form Ký gửi Nhà đất trực tuyến'],
    availablePages: ['Trang chủ Cổng thông tin', 'Nhà đất bán', 'Nhà đất cho thuê', 'Dự án BĐS', 'Chi tiết tin đăng BĐS', 'Tin tức thị trường', 'Liên hệ & Ký gửi'],
    modules: ['Omni-Search Engine', 'Bank Loan Calculator', 'City Directory Cards', 'Rental Split Cards', 'Property Booking Modal', 'Online Listing Submission', 'Zalo OA Lead Router'],
    benefits: ['Giao diện chuẩn cổng thông tin số 1 tạo uy tín vượt trội', 'Khách hàng dễ dàng tìm kiếm BĐS theo nhu cầu bán hoặc thuê', 'Tự động thu thập khách hàng tiềm năng qua form ký gửi và tính lãi vay'],
  },

  // 18. Bds123 Bến Thành Portal
  'bds-18': {
    accentColor: '#0072BC', badge: 'SÀN BẾN THÀNH',
    screenshots: ['https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800','https://images.unsplash.com/photo-1509030450996-93781297593c?w=800','https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'],
    targetAudience: ['Sàn giao dịch & Cổng đấu giá Bến Thành', 'Đại lý phân phối dự án toàn quốc', 'Công ty địa ốc chuyên nghiệp'],
    highlights: ['Bộ lọc tìm kiếm 2 tab Mua/Thuê', 'Showcase 6 Vùng kinh tế trọng điểm', 'Lưới BĐS Đang Bán 4 Cột Hiện Đại', 'Showcase Chủ đầu tư uy tín'],
    availablePages: ['Trang chủ Bến Thành', 'Nhà đất bán', 'Nhà đất cho thuê', 'Dự án mở bán', 'Chi tiết BĐS', 'Liên hệ & Trụ sở'],
    modules: ['Search Box Phân Tầng', 'Region Cards Grid', 'Developer Showcase', 'Call Center Strip', 'Interactive Google Maps', 'Zalo Booking'],
    benefits: ['Đầy đủ module cho sàn giao dịch chuyên nghiệp', 'Khách hàng dễ tra cứu bất động sản theo tỉnh thành', 'Tích hợp tổng đài hỗ trợ 24/7'],
  },
  'bds123-portal': {
    accentColor: '#0072BC', badge: 'SÀN BẾN THÀNH',
    screenshots: ['https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800','https://images.unsplash.com/photo-1509030450996-93781297593c?w=800','https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'],
    targetAudience: ['Sàn giao dịch & Cổng đấu giá Bến Thành', 'Đại lý phân phối dự án toàn quốc', 'Công ty địa ốc chuyên nghiệp'],
    highlights: ['Bộ lọc tìm kiếm 2 tab Mua/Thuê', 'Showcase 6 Vùng kinh tế trọng điểm', 'Lưới BĐS Đang Bán 4 Cột Hiện Đại', 'Showcase Chủ đầu tư uy tín'],
    availablePages: ['Trang chủ Bến Thành', 'Nhà đất bán', 'Nhà đất cho thuê', 'Dự án mở bán', 'Chi tiết BĐS', 'Liên hệ & Trụ sở'],
    modules: ['Search Box Phân Tầng', 'Region Cards Grid', 'Developer Showcase', 'Call Center Strip', 'Interactive Google Maps', 'Zalo Booking'],
    benefits: ['Đầy đủ module cho sàn giao dịch chuyên nghiệp', 'Khách hàng dễ tra cứu bất động sản theo tỉnh thành', 'Tích hợp tổng đài hỗ trợ 24/7'],
  },

  // 19. Nhadatso Density Portal
  'bds-19': {
    accentColor: '#1E8449', badge: 'NHÀ ĐẤT SỐ',
    screenshots: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800','https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800','https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'],
    targetAudience: ['Sàn môi giới thổ cư & dự án', 'Cộng đồng môi giới tự do', 'Báo điện tử bất động sản'],
    highlights: ['Thanh lọc đa tiêu chí (Tỉnh/Quận/Phường/Hướng/Giá)', 'Danh sách tin List View mật độ cao', 'Cẩm nang Phong thủy xem hướng nhà', 'Widget Fanpage & Banner Quảng cáo'],
    availablePages: ['Trang chủ Nhà Đất Số', 'Nhà đất bán', 'Nhà đất cho thuê', 'Nhà đất sang nhượng', 'Tin tức & Phong thủy', 'Liên hệ sàn'],
    modules: ['Multi-Criteria Filter Bar', 'High-Density Listing List', 'Fengshui Calculator', 'Sidebar Province Directory', 'Facebook Fanpage Widget'],
    benefits: ['Mật độ thông tin cao, trải nghiệm xem nhiều tin nhanh chóng', 'Phù hợp thói quen người dùng Việt Nam', 'Dễ dàng đăng tin miễn phí'],
  },
  'nhadatso-density': {
    accentColor: '#1E8449', badge: 'NHÀ ĐẤT SỐ',
    screenshots: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800','https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800','https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'],
    targetAudience: ['Sàn môi giới thổ cư & dự án', 'Cộng đồng môi giới tự do', 'Báo điện tử bất động sản'],
    highlights: ['Thanh lọc đa tiêu chí (Tỉnh/Quận/Phường/Hướng/Giá)', 'Danh sách tin List View mật độ cao', 'Cẩm nang Phong thủy xem hướng nhà', 'Widget Fanpage & Banner Quảng cáo'],
    availablePages: ['Trang chủ Nhà Đất Số', 'Nhà đất bán', 'Nhà đất cho thuê', 'Nhà đất sang nhượng', 'Tin tức & Phong thủy', 'Liên hệ sàn'],
    modules: ['Multi-Criteria Filter Bar', 'High-Density Listing List', 'Fengshui Calculator', 'Sidebar Province Directory', 'Facebook Fanpage Widget'],
    benefits: ['Mật độ thông tin cao, trải nghiệm xem nhiều tin nhanh chóng', 'Phù hợp thói quen người dùng Việt Nam', 'Dễ dàng đăng tin miễn phí'],
  },

  // 20. Minh Khai Luxury
  'bds-20': {
    accentColor: '#D97706', badge: 'MINH KHAI LUXURY',
    screenshots: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800','https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
    targetAudience: ['Đại lý phân phối chung cư cao cấp', 'Sàn F1 chuyên dự án Times City', 'Chủ đầu tư tòa nhà cao tầng'],
    highlights: ['Hero Đẳng Cấp Thượng Lưu', '8 Card dự án căn hộ Minh Khai có specs chi tiết', 'FAQ Accordion tương tác', 'Form thu lead tích hợp Zalo'],
    availablePages: ['Trang chủ', 'Giới thiệu', 'Dự án căn hộ', 'Tin tức', 'Thư viện', 'Kiến thức', 'Tuyển dụng', 'Liên hệ & Bản đồ'],
    modules: ['Apartment Grid Showcase', 'FAQ Accordion System', 'Lead Consultation Box', 'Strategic Partners Carousel'],
    benefits: ['Tăng uy tín và tỷ lệ chốt khách căn hộ cao cấp', 'Khách hàng tra cứu nhanh câu hỏi và giá từng dự án', 'Tối ưu thu lead tự động qua Zalo'],
  },
  'minhkhai-apartment': {
    accentColor: '#D97706', badge: 'MINH KHAI LUXURY',
    screenshots: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800','https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
    targetAudience: ['Đại lý phân phối chung cư cao cấp', 'Sàn F1 chuyên dự án Times City', 'Chủ đầu tư tòa nhà cao tầng'],
    highlights: ['Hero Đẳng Cấp Thượng Lưu', '8 Card dự án căn hộ Minh Khai có specs chi tiết', 'FAQ Accordion tương tác', 'Form thu lead tích hợp Zalo'],
    availablePages: ['Trang chủ', 'Giới thiệu', 'Dự án căn hộ', 'Tin tức', 'Thư viện', 'Kiến thức', 'Tuyển dụng', 'Liên hệ & Bản đồ'],
    modules: ['Apartment Grid Showcase', 'FAQ Accordion System', 'Lead Consultation Box', 'Strategic Partners Carousel'],
    benefits: ['Tăng uy tín và tỷ lệ chốt khách căn hộ cao cấp', 'Khách hàng tra cứu nhanh câu hỏi và giá từng dự án', 'Tối ưu thu lead tự động qua Zalo'],
  },

  // 21. Hanoi Rental Portal
  'bds-21': {
    accentColor: '#0066B2', badge: 'THUÊ CHUNG CƯ HN',
    screenshots: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800','https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800','https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800'],
    targetAudience: ['Môi giới chuyên cho thuê chung cư', 'Văn phòng nhà đất khu vực Hà Nội', 'Sàn giao dịch căn hộ thứ cấp'],
    highlights: ['Pills lọc nhanh 5 quận (Nam Từ Liêm, Cầu Giấy...)', 'Visual District Cards đếm số lượng tin', 'Lưới 8 căn hộ cho thuê & 4 căn hộ bán', 'Google Maps tích hợp ở chân trang'],
    availablePages: ['Trang chủ', 'Chung cư cho thuê', 'Chung cư bán', 'Dự án Hà Nội', 'Cần mua - Cần thuê', 'Đăng tin', 'Liên hệ'],
    modules: ['District Visual Directory', 'Hanoi Rental 8-Grid', 'Hanoi Sale 4-Grid', 'Footer Google Maps Embed'],
    benefits: ['Khách thuê tìm nhà nhanh chóng theo đúng quận mong muốn', 'Giao diện thân thiện, chuẩn văn hóa tìm nhà tại Hà Nội', 'Tỷ lệ chuyển đổi liên hệ thuê nhà rất cao'],
  },
  'hanoi-rental': {
    accentColor: '#0066B2', badge: 'THUÊ CHUNG CƯ HN',
    screenshots: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800','https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800','https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800'],
    targetAudience: ['Môi giới chuyên cho thuê chung cư', 'Văn phòng nhà đất khu vực Hà Nội', 'Sàn giao dịch căn hộ thứ cấp'],
    highlights: ['Pills lọc nhanh 5 quận (Nam Từ Liêm, Cầu Giấy...)', 'Visual District Cards đếm số lượng tin', 'Lưới 8 căn hộ cho thuê & 4 căn hộ bán', 'Google Maps tích hợp ở chân trang'],
    availablePages: ['Trang chủ', 'Chung cư cho thuê', 'Chung cư bán', 'Dự án Hà Nội', 'Cần mua - Cần thuê', 'Đăng tin', 'Liên hệ'],
    modules: ['District Visual Directory', 'Hanoi Rental 8-Grid', 'Hanoi Sale 4-Grid', 'Footer Google Maps Embed'],
    benefits: ['Khách thuê tìm nhà nhanh chóng theo đúng quận mong muốn', 'Giao diện thân thiện, chuẩn văn hóa tìm nhà tại Hà Nội', 'Tỷ lệ chuyển đổi liên hệ thuê nhà rất cao'],
  },

  // 22. Happy Land Nha Trang
  'bds-22': {
    accentColor: '#EA580C', badge: 'ZOHOTELS RESORT',
    screenshots: ['https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800','https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800','https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'],
    targetAudience: ['Khách sạn căn hộ Condotel biển', 'Chủ chuỗi căn hộ Homestay du lịch', 'Resort nghỉ dưỡng ven biển'],
    highlights: ['6 Phân hạng căn hộ nghỉ dưỡng view biển', 'Tab tiện ích Nội Khu / Ngoại Khu trực quan', 'Banner khuyến mãi Grand Opening 50% OFF', 'Dải đăng ký nhận ưu đãi màu cam nổi bật'],
    availablePages: ['Trang chủ', 'Giới thiệu', 'Căn hộ nghỉ dưỡng', 'Dịch vụ', 'Thư viện ảnh', 'Tin tức', 'Liên hệ & Đặt phòng'],
    modules: ['Room Showcase Grid', 'Tabbed Amenities System', 'Customer Review Videos', 'Promo 50% Banner Box'],
    benefits: ['Thu hút khách du lịch đặt phòng trực tiếp', 'Tôn vinh vẻ đẹp cảnh quan và tiện ích 5 sao', 'Tích hợp hotline & Zalo đặt phòng nhanh'],
  },
  'happyland-resort': {
    accentColor: '#EA580C', badge: 'ZOHOTELS RESORT',
    screenshots: ['https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800','https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800','https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'],
    targetAudience: ['Khách sạn căn hộ Condotel biển', 'Chủ chuỗi căn hộ Homestay du lịch', 'Resort nghỉ dưỡng ven biển'],
    highlights: ['6 Phân hạng căn hộ nghỉ dưỡng view biển', 'Tab tiện ích Nội Khu / Ngoại Khu trực quan', 'Banner khuyến mãi Grand Opening 50% OFF', 'Dải đăng ký nhận ưu đãi màu cam nổi bật'],
    availablePages: ['Trang chủ', 'Giới thiệu', 'Căn hộ nghỉ dưỡng', 'Dịch vụ', 'Thư viện ảnh', 'Tin tức', 'Liên hệ & Đặt phòng'],
    modules: ['Room Showcase Grid', 'Tabbed Amenities System', 'Customer Review Videos', 'Promo 50% Banner Box'],
    benefits: ['Thu hút khách du lịch đặt phòng trực tiếp', 'Tôn vinh vẻ đẹp cảnh quan và tiện ích 5 sao', 'Tích hợp hotline & Zalo đặt phòng nhanh'],
  },

  // 23. Homeo Agency
  'bds-23': {
    accentColor: '#881337', badge: 'HOMEO NHÀ PHỐ',
    screenshots: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800','https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800','https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'],
    targetAudience: ['Công ty môi giới nhà phố thổ cư', 'Sàn phân phối biệt thự liền kề', 'Đội ngũ chuyên viên tư vấn BĐS'],
    highlights: ['Card sản phẩm 1 ảnh to + 3 ảnh nhỏ chi tiết', 'Tabs tìm kiếm Mua Bán / Cho Thuê / Dự Án', 'Khối Người mua hàng thông minh (6 cẩm nang)', 'Nút Đăng Tin Miễn Phí tone đỏ rượu vang'],
    availablePages: ['Trang chủ', 'Dự án mới', 'Bán nhà', 'Cho thuê', 'Cẩm nang người mua', 'Đăng tin', 'Liên hệ'],
    modules: ['Multi-Thumbnail Card Component', 'Smart Buyer Knowledge Grid', 'Search Tabs Engine', 'Lead Capture Modal'],
    benefits: ['Khách hàng xem được nhiều ảnh nhà trực quan', 'Xây dựng hình ảnh chuyên nghiệp và đáng tin cậy', 'Tối ưu hóa chuyển đổi liên hệ trực tiếp'],
  },
  'homeo-multithumb': {
    accentColor: '#881337', badge: 'HOMEO NHÀ PHỐ',
    screenshots: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800','https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800','https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'],
    targetAudience: ['Công ty môi giới nhà phố thổ cư', 'Sàn phân phối biệt thự liền kề', 'Đội ngũ chuyên viên tư vấn BĐS'],
    highlights: ['Card sản phẩm 1 ảnh to + 3 ảnh nhỏ chi tiết', 'Tabs tìm kiếm Mua Bán / Cho Thuê / Dự Án', 'Khối Người mua hàng thông minh (6 cẩm nang)', 'Nút Đăng Tin Miễn Phí tone đỏ rượu vang'],
    availablePages: ['Trang chủ', 'Dự án mới', 'Bán nhà', 'Cho thuê', 'Cẩm nang người mua', 'Đăng tin', 'Liên hệ'],
    modules: ['Multi-Thumbnail Card Component', 'Smart Buyer Knowledge Grid', 'Search Tabs Engine', 'Lead Capture Modal'],
    benefits: ['Khách hàng xem được nhiều ảnh nhà trực quan', 'Xây dựng hình ảnh chuyên nghiệp và đáng tin cậy', 'Tối ưu hóa chuyển đổi liên hệ trực tiếp'],
  },

  // 24. RealtyBuild Tech Portal
  'bds-24': {
    accentColor: '#0284C7', badge: 'REALTYBUILD TECH',
    screenshots: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800','https://images.unsplash.com/photo-1509030450996-93781297593c?w=800'],
    targetAudience: ['Tập đoàn công nghệ bất động sản PropTech', 'Cổng thông tin tin đăng niêm yết', 'Sàn giao dịch BĐS đa tỉnh thành'],
    highlights: ['Hero Search kèm Icon Pills loại hình BĐS', 'Spotlight dự án nổi bật Vinhomes Green Bay', 'Grid 6 thành phố lớn toàn quốc', 'Lưới 8 BĐS Đang Bán chuẩn công nghệ'],
    availablePages: ['Trang chủ', 'Nhà đất bán', 'Nhà đất cho thuê', 'Dự án tiêu điểm', 'Tin tức', 'Liên hệ & Bản đồ'],
    modules: ['Icon Pills Search Engine', 'Spotlight Project Banner', 'City Directory Cards', 'Realty Tech 8-Grid'],
    benefits: ['Giao diện hiện đại công nghệ tạo uy tín vượt bậc', 'Khách hàng dễ dàng tìm kiếm theo loại hình và tỉnh thành', 'Tối ưu trải nghiệm trên mọi thiết bị'],
  },
  'realtybuild-tech': {
    accentColor: '#0284C7', badge: 'REALTYBUILD TECH',
    screenshots: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800','https://images.unsplash.com/photo-1509030450996-93781297593c?w=800'],
    targetAudience: ['Tập đoàn công nghệ bất động sản PropTech', 'Cổng thông tin tin đăng niêm yết', 'Sàn giao dịch BĐS đa tỉnh thành'],
    highlights: ['Hero Search kèm Icon Pills loại hình BĐS', 'Spotlight dự án nổi bật Vinhomes Green Bay', 'Grid 6 thành phố lớn toàn quốc', 'Lưới 8 BĐS Đang Bán chuẩn công nghệ'],
    availablePages: ['Trang chủ', 'Nhà đất bán', 'Nhà đất cho thuê', 'Dự án tiêu điểm', 'Tin tức', 'Liên hệ & Bản đồ'],
    modules: ['Icon Pills Search Engine', 'Spotlight Project Banner', 'City Directory Cards', 'Realty Tech 8-Grid'],
    benefits: ['Giao diện hiện đại công nghệ tạo uy tín vượt bậc', 'Khách hàng dễ dàng tìm kiếm theo loại hình và tỉnh thành', 'Tối ưu trải nghiệm trên mọi thiết bị'],
  },
};

export default function DetailsModal({ template, onClose, onSelect }: DetailsModalProps) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [techOpen, setTechOpen] = useState(false);

  const tAny = template as any;
  const fallbackExtra = TEMPLATE_EXTRA[template.slug] || TEMPLATE_EXTRA[template.id] || {
    screenshots: [], accentColor: '#2563EB', badge: 'TEMPLATE', targetAudience: [],
    highlights: [], availablePages: [], modules: [], benefits: [],
  };
  const extra = {
    screenshots: tAny.screenshots && tAny.screenshots.length > 0 ? tAny.screenshots : fallbackExtra.screenshots,
    accentColor: tAny.accentColor || fallbackExtra.accentColor,
    badge: tAny.badge || fallbackExtra.badge,
    targetAudience: tAny.targetAudience && tAny.targetAudience.length > 0 ? tAny.targetAudience : fallbackExtra.targetAudience,
    highlights: tAny.highlights && tAny.highlights.length > 0 ? tAny.highlights : fallbackExtra.highlights,
    availablePages: tAny.availablePages && tAny.availablePages.length > 0 ? tAny.availablePages : fallbackExtra.availablePages,
    modules: tAny.modules && tAny.modules.length > 0 ? tAny.modules : fallbackExtra.modules,
    benefits: tAny.benefits && tAny.benefits.length > 0 ? tAny.benefits : fallbackExtra.benefits,
  };
  const shots = extra.screenshots;
  const accent = extra.accentColor;

  const router = useRouter();
  const { addToCart, isPurchased } = useAuth();
  const owned = isPurchased(template.slug || template.id);

  const fmt = (v: number) =>
    new Intl.NumberFormat('vi-VN').format(v) + 'đ';

  const demoUrl = getTemplateDemoUrl(template.slug);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-[980px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: '92vh' }}>

        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest shrink-0"
              style={{ backgroundColor: accent, color: '#fff' }}
            >
              {extra.badge}
            </span>
            <h2 className="text-base font-bold text-slate-900 truncate">{template.name}</h2>
            <div className="hidden sm:flex items-center gap-0.5 shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-600">5.0</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-3 p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── BODY: scroll container ── */}
        <div className="overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0">

            {/* ── LEFT: Gallery ── */}
            <div className="p-5 border-r border-slate-50">
              {/* Main image - compact height */}
              <div className="relative rounded-xl overflow-hidden bg-slate-100 group"
                style={{ aspectRatio: '16/9', maxHeight: 260 }}>
                <img
                  src={shots[activeImgIdx]}
                  alt={template.name}
                  className="w-full h-full object-cover transition-all duration-400"
                />
                <button
                  onClick={() => setActiveImgIdx(p => p === 0 ? shots.length - 1 : p - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-700" />
                </button>
                <button
                  onClick={() => setActiveImgIdx(p => p === shots.length - 1 ? 0 : p + 1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
                </button>
                {/* Device icons */}
                <div className="absolute bottom-2 right-2 flex gap-1">
                  {[Monitor, Tablet, Smartphone].map((Icon, i) => (
                    <span key={i} className="bg-black/50 text-white p-1 rounded-md backdrop-blur-sm">
                      <Icon className="w-2.5 h-2.5" />
                    </span>
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-2 mt-2.5">
                {shots.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`rounded-lg overflow-hidden border-2 transition-all ${activeImgIdx === idx ? 'ring-2' : 'border-slate-100 hover:border-slate-300'}`}
                    style={{
                      aspectRatio: '16/9',
                      borderColor: activeImgIdx === idx ? accent : undefined,
                      boxShadow: activeImgIdx === idx ? `0 0 0 2px ${accent}30` : undefined
                    }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>

              {/* Info sections (below gallery, left col) */}
              <div className="mt-5 space-y-5">

                {/* Target audience */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Users className="w-3 h-3" /> Phù hợp với ai
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {extra.targetAudience.map((a, i) => (
                      <span key={i}
                        className="text-[11px] font-semibold px-2 py-1 rounded-lg flex items-center gap-1"
                        style={{ backgroundColor: accent + '12', color: accent }}>
                        <Check className="w-2.5 h-2.5" />{a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Zap className="w-3 h-3" /> Điểm nổi bật
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {extra.highlights.map((h, i) => (
                      <div key={i} className="text-[11px] text-slate-700 font-medium flex items-center gap-1.5 bg-slate-50 rounded-lg px-2.5 py-1.5">
                        <Check className="w-3 h-3 text-emerald-500 shrink-0" />{h}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pages */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Globe className="w-3 h-3" /> Trang có sẵn
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {extra.availablePages.map((pg, i) => (
                      <span key={i} className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{pg}</span>
                    ))}
                  </div>
                </div>

                {/* Modules */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Building className="w-3 h-3" /> Module tích hợp
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {extra.modules.map((m, i) => (
                      <span key={i}
                        className="text-[10px] font-bold px-2 py-1 rounded-full"
                        style={{ backgroundColor: accent + '15', color: accent }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Accordion */}
                <div className="border-t border-slate-100 pt-3">
                  <button
                    onClick={() => setTechOpen(!techOpen)}
                    className="w-full flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                  >
                    <span>Thông số kỹ thuật</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${techOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {techOpen && (
                    <div className="mt-3 space-y-1.5">
                      {[
                        ['Định dạng', 'Landing Page BĐS Độc Lập'],
                        ['Giao diện', 'HTML5, CSS3, JavaScript Thuần'],
                        ['Backend & DB', 'PHP 8.x + MySQL Database'],
                        ['Mã nguồn', 'Trọn bộ Full Source ZIP'],
                        ['Hosting', 'cPanel / XAMPP / Vercel / GitHub'],
                        ['Responsive', '100% Mobile, Tablet, Desktop'],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between text-[11px] py-1 border-b border-slate-50">
                          <span className="text-slate-400 font-semibold">{k}</span>
                          <span className="text-slate-700 font-medium">{v}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Pricing + Benefits ── */}
            <div className="p-5 flex flex-col gap-5 bg-slate-50/50">

              {/* Pricing box */}
              <div className="rounded-xl border p-4" style={{ borderColor: accent + '30', backgroundColor: '#fff' }}>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Giá dịch vụ</p>

                {(() => {
                  const buyPrice = template.priceBuy || 499000;
                  const originalPrice = buyPrice <= 499000 ? 799000 : 999000;
                  const discountPercent = Math.round(((originalPrice - buyPrice) / originalPrice) * 100);
                  return (
                    <div className="mb-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-xs text-slate-400 line-through font-semibold">
                          {new Intl.NumberFormat('vi-VN').format(originalPrice)}đ
                        </span>
                        <span className="text-[10px] bg-rose-50 text-rose-600 font-extrabold px-1.5 py-0.5 rounded border border-rose-200">
                          Ưu đãi -{discountPercent}%
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-blue-600">
                          {new Intl.NumberFormat('vi-VN').format(buyPrice)}đ
                        </span>
                        <span className="text-xs text-slate-500 font-bold">/ trọn gói</span>
                      </div>
                    </div>
                  );
                })()}

                <div className="space-y-2">
                  <button
                    onClick={() => window.open(demoUrl, '_blank')}
                    className="w-full h-9 text-sm font-bold rounded-xl border-2 flex items-center justify-center gap-2 transition-all hover:opacity-80"
                    style={{ borderColor: accent, color: accent }}
                  >
                    <Play className="w-3.5 h-3.5" /> Xem Demo Trực Tuyến
                  </button>
                  
                  {owned ? (
                    <a
                      href={process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}
                      className="w-full h-10 text-[13px] font-bold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-1.5 transition-all shadow-md"
                    >
                      <Check className="w-4 h-4" /> Bạn Đã Sở Hữu - Vào CMS Quản Trị
                    </a>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          addToCart(template, 'BUY');
                          onClose();
                          router.push('/cart');
                        }}
                        className="h-10 text-[13px] font-bold rounded-xl text-white flex items-center justify-center gap-1.5 transition-all hover:opacity-90 shadow-md"
                        style={{ backgroundColor: accent }}
                      >
                        <Zap className="w-3.5 h-3.5" /> Mua ngay
                      </button>
                      <button
                        onClick={() => {
                          addToCart(template, 'BUY');
                          onClose();
                        }}
                        className="h-10 text-[13px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all hover:opacity-80 border border-slate-200"
                        style={{ backgroundColor: accent + '15', color: accent }}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> Thêm vào giỏ
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-1.5">
                  <span className="text-[10px] text-slate-500 flex items-center gap-1.5"><Shield className="w-3 h-3 text-emerald-500" /> Hoàn tiền trong 7 ngày</span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1.5"><Headphones className="w-3 h-3 text-blue-500" /> Hỗ trợ kỹ thuật 24/7</span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1.5"><Star className="w-3 h-3 text-amber-400 fill-current" /> Cập nhật tính năng miễn phí</span>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                  <BarChart3 className="w-3 h-3" /> Lợi ích nhận được
                </p>
                <div className="space-y-2">
                  {extra.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[12px] text-slate-700 font-medium py-2 border-b border-slate-100 last:border-0">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: accent + '20' }}>
                        <Check className="w-3 h-3" style={{ color: accent }} />
                      </div>
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl p-4 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Mô tả</p>
                <p className="text-[12px] text-slate-600 leading-relaxed">{template.description}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

