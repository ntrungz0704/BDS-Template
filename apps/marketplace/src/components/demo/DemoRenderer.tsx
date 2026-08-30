import React, { useState, useEffect, useMemo } from 'react';
import { Template } from '../../data/templatesData';
import { 
  Phone, Mail, MapPin, Search, CheckCircle2, Star, ArrowRight, Play, 
  Building, ShieldCheck, Zap, Heart, Share2, Compass, SlidersHorizontal, 
  Calendar, Users, Award, TrendingUp, ChevronDown, Check, DollarSign, Clock, 
  HelpCircle, Sparkles, Lock, FileText, BarChart3, Home, Trees, Coffee, Briefcase, ChevronRight, Eye
} from 'lucide-react';

import dynamic from 'next/dynamic';

const LoadingSkeleton = () => (
  <div className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-400 font-medium">
    <div className="w-10 h-10 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin mb-4"></div>
    Đang tải không gian trải nghiệm...
  </div>
);

const BDS01Template = dynamic(() => import('./templates/BDS01Template'), { loading: () => <LoadingSkeleton /> });
const BDS02Template = dynamic(() => import('./templates/BDS02Template'), { loading: () => <LoadingSkeleton /> });
const BDS03Template = dynamic(() => import('./templates/BDS03Template'), { loading: () => <LoadingSkeleton /> });
const BDS04Template = dynamic(() => import('./templates/BDS04Template'), { loading: () => <LoadingSkeleton /> });
const BDS05Template = dynamic(() => import('./templates/BDS05Template'), { loading: () => <LoadingSkeleton /> });
const BDS06Template = dynamic(() => import('./templates/BDS06Template'), { loading: () => <LoadingSkeleton /> });
const BDS07Template = dynamic(() => import('./templates/BDS07Template'), { loading: () => <LoadingSkeleton /> });
const BDS08Template = dynamic(() => import('./templates/BDS08Template'), { loading: () => <LoadingSkeleton /> });
const BDS09Template = dynamic(() => import('./templates/BDS09Template'), { loading: () => <LoadingSkeleton /> });
const BDS10Template = dynamic(() => import('./templates/BDS10Template'), { loading: () => <LoadingSkeleton /> });
const BDS11Template = dynamic(() => import('./templates/BDS11Template'), { loading: () => <LoadingSkeleton /> });
const BDS12Template = dynamic(() => import('./templates/BDS12Template'), { loading: () => <LoadingSkeleton /> });
const BDS13Template = dynamic(() => import('./templates/BDS13Template'), { loading: () => <LoadingSkeleton /> });
const BDS14Template = dynamic(() => import('./templates/BDS14Template'), { loading: () => <LoadingSkeleton /> });
const BDS15Template = dynamic(() => import('./templates/BDS15Template'), { loading: () => <LoadingSkeleton /> });
const BDS16Template = dynamic(() => import('./templates/BDS16Template'), { loading: () => <LoadingSkeleton /> });
const BDS17Template = dynamic(() => import('./templates/BDS17Template'), { loading: () => <LoadingSkeleton /> });
const BDS18Template = dynamic(() => import('./templates/BDS18Template'), { loading: () => <LoadingSkeleton /> });
const BDS19Template = dynamic(() => import('./templates/BDS19Template'), { loading: () => <LoadingSkeleton /> });
const BDS20Template = dynamic(() => import('./templates/BDS20Template'), { loading: () => <LoadingSkeleton /> });
const BDS21Template = dynamic(() => import('./templates/BDS21Template'), { loading: () => <LoadingSkeleton /> });
const BDS22Template = dynamic(() => import('./templates/BDS22Template'), { loading: () => <LoadingSkeleton /> });
const BDS23Template = dynamic(() => import('./templates/BDS23Template'), { loading: () => <LoadingSkeleton /> });
const BDS24Template = dynamic(() => import('./templates/BDS24Template'), { loading: () => <LoadingSkeleton /> });
const LP01Template = dynamic(() => import('./templates/LP01Template'), { loading: () => <LoadingSkeleton /> });
const LP02Template = dynamic(() => import('./templates/LP02Template'), { loading: () => <LoadingSkeleton /> });
const LP03Template = dynamic(() => import('./templates/LP03Template'), { loading: () => <LoadingSkeleton /> });
const LP04Template = dynamic(() => import('./templates/LP04Template'), { loading: () => <LoadingSkeleton /> });
import { AIChatWidget } from '../ai/AIChatWidget';

interface DemoRendererProps {
  template: Template;
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
}

export const normalizePageSlug = (p?: string): string => {
  if (!p) return 'home';
  const clean = p.toLowerCase().trim();
  if (['lien-he', 'contact', 'tu-van', 'dat-lich', 'ky-gui'].includes(clean)) return 'contact';
  if (['gioi-thieu', 'about', 've-chung-toi', 'nang-luc'].includes(clean)) return 'about';
  if (['du-an', 'projects', 'san-pham', 'can-ho', 'bat-dong-san', 'danh-muc', 'properties', 'listings'].includes(clean)) return 'projects';
  if (['thu-vien', 'gallery', 'hinh-anh', 'album'].includes(clean)) return 'gallery';
  if (['tin-tuc', 'news', 'bai-viet', 'blog', 'thi-truong', 'cam-nang'].includes(clean)) return 'news';
  if (['vi-tri', 'location', 'khu-vuc', 'ha-tang'].includes(clean)) return 'location';
  if (['tien-ich', 'amenities', 'dich-vu', 'services'].includes(clean)) return 'amenities';
  if (['mat-bang', 'floorplans', 'so-do', 'units'].includes(clean)) return 'floorplans';
  if (['nha-dat-ban', 'ban', 'sale', 'ban-nha'].includes(clean)) return 'sale';
  if (['cho-thue', 'thue', 'rent', 'thue-nha'].includes(clean)) return 'rent';
  if (['sang-nhuong', 'transfer'].includes(clean)) return 'transfer';
  if (['phong-thuy', 'fengshui', 'xem-tuoi-xay-nha', 'huong-nha', 'xem-tuoi-xay---huong-nha'].includes(clean)) return 'fengshui';
  if (['dau-gia', 'auctions', 'auction'].includes(clean)) return 'auctions';
  if (['tinh-thanh', 'cities'].includes(clean)) return 'cities';
  if (['kien-thuc', 'knowledge'].includes(clean)) return 'knowledge';
  if (['tuyen-dung', 'career', 'careers'].includes(clean)) return 'career';
  if (['can-mua', 'can-thue', 'requests', 'can-mua-can-thue'].includes(clean)) return 'requests';
  if (['dang-tin', 'post'].includes(clean)) return 'post';
  return clean;
};

// ─────────────────────────────────────────────────────────────────────────────
// COMMERCIAL REAL ESTATE CONFIGURATION & DATA ENGINE (THEMEVIP / MAUTHEMEWP)
// ─────────────────────────────────────────────────────────────────────────────

interface RealEstateConfig {
  projectName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  badge: string;
  theme: {
    bgHeader: string;
    textHeader: string;
    borderAccent: string;
    primaryBg: string;
    primaryText: string;
    secondaryBg: string;
    accentBtn: string;
    accentText: string;
    cardBg: string;
    cardBorder: string;
    badgeStyle: string;
    fontStyle: string;
  };
  stats: { label: string; value: string }[];
  overview: { label: string; value: string }[];
  location: { title: string; desc: string; highlights: string[] };
  amenities: { icon: string; title: string; desc: string }[];
  floorPlans: { floor: string; name: string; specs: string; price: string; area: string; bedrooms: string }[];
  policies: { title: string; desc: string; tag: string }[];
  gallery: string[];
  progress: { status: string; date: string; desc: string };
}

const TEMPLATE_CONFIGS: Record<string, RealEstateConfig> = {
  'luxury-gold': {
    projectName: 'VINHOMES ROYAL RIVERSIDE',
    tagline: '★ ROYAL RESIDENCE EXCLUSIVE ★',
    heroTitle: 'DINH THỰ HOÀNG GIA BÊN DÒNG SÔNG NGỌC',
    heroSubtitle: 'Kiệt tác kiến trúc Ý độc tôn dành cho 18 vị chủ nhân giới tinh hoa, sở hữu bến du thuyền riêng và tầm nhìn bao trọn sông Sài Gòn.',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    badge: 'LUXURY VILLA COMPOUND',
    theme: {
      bgHeader: 'bg-[#070C1E]/95 backdrop-blur-md border-[#D4AF37]/30 text-white',
      textHeader: 'text-[#D4AF37]',
      borderAccent: 'border-[#D4AF37]',
      primaryBg: 'bg-[#070C1E]',
      primaryText: 'text-white',
      secondaryBg: 'bg-[#111831]',
      accentBtn: 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#070C1E] hover:brightness-110 font-serif uppercase tracking-widest',
      accentText: 'text-[#D4AF37]',
      cardBg: 'bg-[#111831]',
      cardBorder: 'border-[#D4AF37]/40',
      badgeStyle: 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 font-serif',
      fontStyle: 'Playfair Display, Georgia, serif',
    },
    stats: [
      { label: 'Quy mô khuôn viên', value: '850 - 1.200 m²' },
      { label: 'Mặt tiền sông Sài Gòn', value: '28m riêng biệt' },
      { label: 'Số lượng giới hạn', value: '18 Dinh thự' },
      { label: 'Pháp lý sở hữu', value: 'Sổ đỏ vĩnh viễn' },
    ],
    overview: [
      { label: 'Chủ đầu tư chính thức', value: 'Tập đoàn Vinhomes Luxury Division' },
      { label: 'Vị trí độc tôn', value: 'Bán đảo Thảo Điền - Quận 2, TP. Thủ Đức' },
      { label: 'Đơn vị kiến trúc', value: 'Foster + Partners (Anh Quốc)' },
      { label: 'Đơn vị vận hành 6 sao', value: 'Vinhomes Royal Concierge 24/7' },
      { label: 'Mật độ xây dựng', value: 'Chỉ 18.5% (81.5% mặt nước & cây xanh)' },
      { label: 'Giá bán tham khảo', value: 'Từ 185 Tỷ - 350 Tỷ VNĐ' },
    ],
    location: {
      title: 'Vị Trí Độc Tôn Trung Tâm Thảo Điền',
      desc: 'Tọa lạc tại mũi bán đảo đẹp nhất Thảo Điền với 3 mặt giáp sông Sài Gòn, kết nối hoàn hảo với trung tâm tài chính Quận 1 chỉ trong vài phút di chuyển bằng du thuyền hoặc siêu xe.',
      highlights: [
        '3 phút đến Bến du thuyền hoàng gia và Câu lạc bộ VIP Thảo Điền',
        '5 phút đến Hệ thống trường Quốc tế BIS, TAS, ISHCMC',
        '10 phút kết nối trực tiếp Trung tâm kinh tế Quận 1 qua cầu Thủ Thiêm',
        'Sân bay trực thăng Helipad riêng biệt ngay trong khuôn viên dự án',
      ],
    },
    amenities: [
      { icon: '🛥️', title: 'Bến Du Thuyền Thượng Lưu', desc: 'Sở hữu chỗ đậu du thuyền cá nhân dài 30m ngay trước hiên nhà kèm dịch vụ bảo dưỡng 24/7.' },
      { icon: '🏊‍♂️', title: 'Hồ Bơi Vô Cực Nước Mặn', desc: 'Hồ bơi riêng dài 25m sử dụng công nghệ lọc điện phân muối tiêu chuẩn Olympic.' },
      { icon: '🍷', title: 'Hầm Rượu & Cigar Lounge', desc: 'Không gian lưu trữ rượu vang và phòng Cigar VIP thiết kế theo phong cách Hoàng gia Anh.' },
      { icon: '🛡️', title: 'An Ninh 4 Lớp Kẽm Gai K9', desc: 'Bảo vệ riêng, camera nhiệt AI hồng ngoại và hệ thống nhận diện khuôn mặt tuyệt đối kín đáo.' },
      { icon: '🏌️', title: 'Sân Golf Putting Green', desc: 'Sân tập golf cỏ tự nhiên tiêu chuẩn PGA dành riêng cho chủ nhân luyện tập mỗi sáng.' },
      { icon: '✈️', title: 'Dịch Vụ Concierge Maybach', desc: 'Đội xe Maybach và quản gia riêng phục vụ đặt tiệc, đưa đón VIP 24/7 toàn cầu.' },
    ],
    floorPlans: [
      { floor: 'Dinh Thự Đơn Lập (Palace)', name: 'Mẫu Dinh Thự Hoàng Gia #01', specs: '5 Phòng ngủ Master + 2 Phòng Giúp việc + Hầm rượu + Hồ bơi riêng', area: '1,050 m²', bedrooms: '5 PN + 7 WC', price: '245 Tỷ VNĐ' },
      { floor: 'Biệt Thự Sông (Riverside)', name: 'Mẫu Biệt Thự Ven Sông #08', specs: '4 Phòng ngủ Master + Sân vườn 300m² + Bến du thuyền cá nhân', area: '850 m²', bedrooms: '4 PN + 6 WC', price: '189 Tỷ VNĐ' },
      { floor: 'Penthouse Duplex (Sky Villa)', name: 'Sky Dinh Thự Tầng 38-39', specs: 'Hồ bơi vô cực trên không + Sân vườn BBQ + Thang máy riêng', area: '680 m²', bedrooms: '4 PN + 5 WC', price: '165 Tỷ VNĐ' },
    ],
    policies: [
      { title: 'Chiết Khấu Đặc Quyền 10%', desc: 'Dành cho khách hàng thanh toán sớm 95% bằng vốn tự có ngay khi ký hợp đồng.', tag: 'ƯU ĐÃI VIP' },
      { title: 'Hỗ Trợ Lãi Suất 0% trong 36 Tháng', desc: 'Ân hạn nợ gốc và miễn phí trả nợ trước hạn trong suốt 3 năm đầu tiên.', tag: 'TÀI CHÍNH 0%' },
      { title: 'Tặng Gói Nội Thất Ý 5 Tỷ VNĐ', desc: 'Được thiết kế riêng bởi nhà mốt Fendi Casa hoặc Versace Home theo gu thẩm mỹ chủ nhân.', tag: 'QUÀ TẶNG 5 TỶ' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
    ],
    progress: { status: 'Đang hoàn thiện nội thất cảnh quan', date: 'Tháng 07/2026', desc: 'Đã hoàn tất thi công kết cấu chính 18 dinh thự, đang trồng cây xanh công viên ven sông và lắp đặt hệ thống bến du thuyền.' },
  },

  'minimal-white': {
    projectName: 'LUMIÈRE RIVERSIDE SANCTUARY',
    tagline: 'APPLE-STYLE MINIMALIST LIVING',
    heroTitle: 'KHÔNG GIAN SỐNG TỐI GIẢN CHO NGƯỜI TINH TẾ',
    heroSubtitle: 'Tuyển tập 48 căn hộ cao cấp và Penthouse tại trung tâm Quận 1, tối ưu ánh sáng tự nhiên với tầm nhìn toàn cảnh sông Sài Gòn tuyệt mỹ.',
    heroImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
    badge: 'BOUTIQUE APARTMENT · Q1',
    theme: {
      bgHeader: 'bg-white/90 backdrop-blur-xl border-slate-100 text-slate-900 shadow-sm',
      textHeader: 'text-blue-600',
      borderAccent: 'border-blue-600',
      primaryBg: 'bg-white',
      primaryText: 'text-slate-900',
      secondaryBg: 'bg-slate-50',
      accentBtn: 'bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-xl shadow-blue-600/20 font-bold tracking-tight',
      accentText: 'text-blue-600',
      cardBg: 'bg-white',
      cardBorder: 'border-slate-200/80 shadow-sm rounded-3xl',
      badgeStyle: 'bg-blue-50 text-blue-600 font-bold rounded-full border border-blue-100',
      fontStyle: 'Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    stats: [
      { label: 'Vị trí huyết mạch', value: 'Trung tâm Quận 1' },
      { label: 'Số lượng sản phẩm', value: '48 Căn Giới Hạn' },
      { label: 'Bàn giao thiết bị', value: 'Miele & Kohler chuẩn 5★' },
      { label: 'Pháp lý minh bạch', value: 'Sổ hồng lâu dài' },
    ],
    overview: [
      { label: 'Chủ đầu tư', value: 'Masterise Homes (Thành viên Masterise Group)' },
      { label: 'Vị trí dự án', value: '629 Nguyễn Xiển, Phường Long Bình, TP. Thủ Đức' },
      { label: 'Đơn vị kiến trúc', value: 'Atkins (Anh Quốc) - Thiết kế Apple Style tối giản' },
      { label: 'Đơn vị quản lý', value: 'Savills Premium Management' },
      { label: 'Mật độ xây dựng', value: '24.5% (Không gian mở tối đa)' },
      { label: 'Giá bán khởi điểm', value: 'Từ 95 Triệu/m² - 135 Triệu/m²' },
    ],
    location: {
      title: 'Vị Trí Kim Cương Kết Nối Trọn Vẹn',
      desc: 'Nằm ngay tâm điểm kết nối giữa Quận 1 và Thủ Thiêm, Lumière Riverside sở hữu khả năng di chuyển linh hoạt tối đa, mang lại đặc quyền sống thanh lịch cho giới chuyên gia quốc tế.',
      highlights: [
        '1 phút đến Ga Metro số 1 Bến Thành - Suối Tiên ngay sát dự án',
        '3 phút đến Trung tâm thương mại Takashimaya & Phố đi bộ Nguyễn Huệ',
        '5 phút qua Cầu Thủ Thiêm 2 sang Trung tâm tài chính mới Thủ Thiêm',
        '15 phút đến Sân bay Tân Sơn Nhất theo tuyến đại lộ Võ Văn Kiệt',
      ],
    },
    amenities: [
      { icon: '🌟', title: 'Sky Pool Vô Cực Tầng 44', desc: 'Hồ bơi tràn bờ view 360 độ ngắm trọn hoàng hôn trung tâm thành phố.' },
      { icon: '🧘', title: 'Zen Garden & Meditation', desc: 'Vườn thiền phong cách Nhật Bản tối giản, mang lại sự cân bằng tĩnh lặng mỗi ngày.' },
      { icon: '🏋️', title: 'Gym Technogym AI 24/7', desc: 'Phòng tập trang bị thiết bị AI tự động nhận diện và cá nhân hóa lộ trình tập luyện.' },
      { icon: '☕', title: 'Apple-Style Co-working Lounge', desc: 'Không gian làm việc chung sang trọng với đường truyền Internet tốc độ 10Gbps và trà cafe miễn phí.' },
      { icon: '📦', title: 'Smart Locker & Amazon Delivery', desc: 'Hệ thống nhận hàng tự động thông minh qua face-ID đảm bảo quyền riêng tư tuyệt đối.' },
      { icon: '⚡', title: 'Trạm Sạc Nhanh EV Tesla/VinFast', desc: 'Bãi đỗ xe thông minh định danh từng vị trí có sẵn trạm sạc điện công suất lớn.' },
    ],
    floorPlans: [
      { floor: 'Căn Hộ 1 Phòng Ngủ (Executive Suite)', name: 'Unit #LMR-1208 · View Sông Sài Gòn', specs: '1 PN Master + 1 Phòng đa năng + Ban công kính tràn viền', area: '58.5 m²', bedrooms: '1 PN + 1 WC', price: '5.8 Tỷ VNĐ' },
      { floor: 'Căn Hộ 2 Phòng Ngủ (Family Deluxe)', name: 'Unit #LMR-1805 · View Sky Garden', specs: '2 PN Master + Bếp mở kiểu Mỹ + Phòng giặt riêng biệt', area: '82.0 m²', bedrooms: '2 PN + 2 WC', price: '8.2 Tỷ VNĐ' },
      { floor: 'Căn Hộ 3 Phòng Ngủ (Presidential)', name: 'Unit #LMR-2501 · Căn Góc 2 Mặt Tiền', specs: '3 PN lớn + Phòng làm việc riêng + Thang máy riêng tận cửa', area: '124.5 m²', bedrooms: '3 PN + 3 WC', price: '13.5 Tỷ VNĐ' },
    ],
    policies: [
      { title: 'Chiết Khấu Thanh Toán Nhờ Đợt 8%', desc: 'Khách hàng thanh toán theo tiến độ chuẩn trong 18 tháng được hưởng ưu đãi giảm trực tiếp vào giá.', tag: 'TIẾN ĐỘ LINH HOẠT' },
      { title: 'Ngân Hàng Vietcombank Hỗ Trợ 80%', desc: 'Lãi suất 0% và ân hạn gốc đến khi nhận bàn giao nhà (Dự kiến Quý 4/2026).', tag: 'VAY 80% LÃI 0%' },
      { title: 'Tặng Gói Smart Home Apple Kit', desc: 'Trang bị trọn bộ điều khiển thông minh cảm ứng tự động đồng bộ qua iPhone/iPad.', tag: 'SMART HOME 4.0' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    ],
    progress: { status: 'Đã cất nóc & Thi công mặt kính Facade', date: 'Tháng 07/2026', desc: 'Đã hoàn tất lắp đặt 90% hệ thống kính Low-E mặt ngoài, đang tiến hành lát đá cẩm thạch sảnh đón lounge và lắp đặt thang máy Mitshubishi tốc độ cao.' },
  },

  'modern-corporate': {
    projectName: 'NOVALAND REALTY GROUP',
    tagline: 'TẬP ĐOÀN ĐẦU TƯ & PHÁT TRIỂN BĐS HÀNG ĐẦU',
    heroTitle: 'HỆ SINH THÁI ĐẠI ĐÔ THỊ & BĐS THƯƠNG MẠI',
    heroSubtitle: 'Quản lý danh mục tài sản quy mô hơn 50,000 ha, tiên phong kiến tạo các tổ hợp đô thị xanh, khu công nghiệp và bất động sản nghỉ dưỡng quốc tế.',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    badge: 'CORPORATE ENTERPRISE PORTAL',
    theme: {
      bgHeader: 'bg-[#0F4C81] text-white border-b border-[#0F4C81]/20 shadow-md',
      textHeader: 'text-white font-bold',
      borderAccent: 'border-[#0F4C81]',
      primaryBg: 'bg-[#F8FAFC]',
      primaryText: 'text-slate-900',
      secondaryBg: 'bg-white',
      accentBtn: 'bg-[#0F4C81] hover:bg-[#083358] text-white font-bold uppercase tracking-wider rounded-lg shadow-lg',
      accentText: 'text-[#0F4C81]',
      cardBg: 'bg-white',
      cardBorder: 'border-slate-200 rounded-2xl shadow-sm',
      badgeStyle: 'bg-[#0F4C81]/10 text-[#0F4C81] font-bold rounded border border-[#0F4C81]/30 uppercase',
      fontStyle: 'Inter, -apple-system, sans-serif',
    },
    stats: [
      { label: 'Tổng quỹ đất quản lý', value: '10,600 ha' },
      { label: 'Dự án đang phát triển', value: '45+ Dự án lớn' },
      { label: 'Tổng tài sản quản lý', value: '240,000 Tỷ VNĐ' },
      { label: 'Mạng lưới đối tác', value: '60+ Quốc gia' },
    ],
    overview: [
      { label: 'Tên tập đoàn', value: 'Công ty Cổ phần Tập đoàn Đầu tư Địa ốc Nova (Novaland Group)' },
      { label: 'Trụ sở chính', value: 'Tòa nhà Novaland Office Tower, 65 Nguyễn Du, Quận 1, TP. HCM' },
      { label: 'Lĩnh vực mũi nhọn', value: 'BĐS Đô thị, BĐS Nghỉ dưỡng, BĐS Công nghiệp & Logistics' },
      { label: 'Đối tác chiến lược toàn cầu', value: 'Accor, Marriott, Meliá Hotels, Greg Norman Golf Course' },
      { label: 'Tổng số nhân sự', value: 'Hơn 4,500 chuyên gia & kỹ sư cao cấp' },
      { label: 'Mã chứng khoán', value: 'NVL (HOSE - Niêm yết từ 2016)' },
    ],
    location: {
      title: 'Mạng Lưới Dự Án Phân Bổ Trọng Điểm Toàn Quốc',
      desc: 'Tập trung phát triển tại các cực tăng trưởng kinh tế trọng điểm của Việt Nam, kết nối hạ tầng giao thông quốc gia: cao tốc, sân bay quốc tế và cảng biển.',
      highlights: [
        'Khu vực TP. Hồ Chí Minh & Vùng ven: Aqua City (1.000 ha), Palm Marina, Lakeview City',
        'Khu vực Nghỉ dưỡng biển: NovaWorld Phan Thiết (1.000 ha), NovaWorld Hồ Tràm (1.000 ha)',
        'Khu vực Tây Nguyên & Nam Trung Bộ: NovaWorld Đà Lạt, Nova Beach Cam Ranh',
        'Hệ thống 50+ Sàn giao dịch chính thức tại Hà Nội, TP.HCM, Đà Nẵng, Quảng Ninh',
      ],
    },
    amenities: [
      { icon: '⛳', title: 'Sân Golf PGA 36 Hố Độc Quyền', desc: 'Hệ thống sân Golf tiêu chuẩn PGA duy nhất tại Việt Nam đủ điều kiện tổ chức giải đấu quốc tế.' },
      { icon: '🏥', title: 'Hệ Thống Y Tế & Bệnh Viện Quốc Tế', desc: 'Hợp tác cùng các tập đoàn y tế Đức và Singapore mang lại dịch vụ chăm sóc sức khỏe 5 sao.' },
      { icon: '🎓', title: 'Hệ Thống Trường Học Liên Cấp', desc: 'Trường học quốc tế từ mầm non đến trung học phổ thông ngay trong nội khu các đại đô thị.' },
      { icon: '🎡', title: 'Tổ hợp Vui Chơi Giải Trí Theme Park', desc: 'Công viên giải trí quy mô 25 ha với các trò chơi cảm giác mạnh và công viên nước hiện đại.' },
      { icon: '⚓', title: 'Bến Cảng Du Thuyền Quốc Tế', desc: 'Bến du thuyền nước sâu đón tàu du lịch quốc tế và du thuyền cá nhân của cư dân.' },
      { icon: '🏢', title: 'Tháp Văn Phòng & Trung Tâm Hội Nghị', desc: 'Tổ hợp văn phòng hạng A và trung tâm hội nghị quốc tế sức chứa 5,000 đại biểu.' },
    ],
    floorPlans: [
      { floor: 'Đại Đô Thị Sinh Thái Aqua City (Đồng Nai)', name: 'Biệt Thự Đảo Phượng Hoàng (Phoenix Island)', specs: 'Biệt thự song lập / đơn lập giáp sông + Bến thuyền riêng', area: '250 - 600 m²', bedrooms: '4 PN + 5 WC', price: 'Từ 18.5 Tỷ VNĐ' },
      { floor: 'Siêu Thành Phố Biển NovaWorld Phan Thiết', name: 'Biệt Thự PGA Golf Villas & Florida Beach', specs: 'Biệt thự sân Golf view biển trọn vẹn + Tặng thẻ thành viên Golf PGA 20 năm', area: '200 - 400 m²', bedrooms: '3 PN + 4 WC', price: 'Từ 14.2 Tỷ VNĐ' },
      { floor: 'Tổ Hợp Nghỉ Dưỡng NovaWorld Hồ Tràm', name: 'Biệt Thự Khoáng Nóng Minera Hot Spring & Beach', specs: 'Biệt thự biển có nguồn suối khoáng nóng dẫn trực tiếp vào từng phòng ngủ', area: '300 m²', bedrooms: '3 PN + 3 WC', price: 'Từ 16.8 Tỷ VNĐ' },
    ],
    policies: [
      { title: 'Cam Kết Thuê Lại Lợi Nhuận 10%/Năm', desc: 'Áp dụng cho các dòng biệt thự nghỉ dưỡng và shophouse thương mại khi đưa vào vận hành.', tag: 'CAM KẾT DÒNG TIỀN' },
      { title: 'Chương Trình Cổ Đông Loyalty NVL', desc: 'Chiết khấu thêm từ 1% - 5% tùy theo số lượng cổ phiếu NVL sở hữu từ 6 tháng trở lên.', tag: 'ƯU ĐÃI CỔ ĐÔNG' },
      { title: 'Thanh Toán Nhẹ Nhàng 1%/Tháng', desc: 'Phương thức thanh toán giãn lịch, hỗ trợ tối đa dòng tiền cho các nhà đầu tư doanh nghiệp.', tag: 'GIÃN TIẾN ĐỘ 36T' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80',
    ],
    progress: { status: 'Đang bàn giao đồng loạt & Vận hành tiện ích', date: 'Tháng 07/2026', desc: 'Đã hoàn tất bàn giao hơn 3,500 căn biệt thự tại Aqua City và NovaWorld Phan Thiết. Sân Golf PGA 36 hố và khách sạn Meliá đã chính thức đón khách.' },
  },

  'landing-high-convert': {
    projectName: 'THE GLORY HEIGHTS',
    tagline: '🔥 PHÂN KHU MỞ BÁN TRỰC TIẾP TỪ CHỦ ĐẦU TƯ 🔥',
    heroTitle: 'CĂN HỘ BIỂN HỒ GRAND PARK — NHẬN NHÀ NGAY 2026',
    heroSubtitle: 'Sở hữu tầm nhìn triệu đô ôm trọn Quảng trường Golden Eagle và Trung tâm thương mại Vincom Mega Mall lớn nhất miền Nam. Số lượng ưu đãi có hạn!',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    badge: 'MỞ BÁN FLASH SALE · ĐỢT CUỐI',
    theme: {
      bgHeader: 'bg-[#0F172A] text-white border-b border-rose-600 shadow-xl',
      textHeader: 'text-rose-500 font-extrabold',
      borderAccent: 'border-rose-600',
      primaryBg: 'bg-[#FFF1F2]',
      primaryText: 'text-slate-900',
      secondaryBg: 'bg-white',
      accentBtn: 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black uppercase rounded-2xl shadow-2xl shadow-rose-600/40 tracking-wider animate-bounce',
      accentText: 'text-rose-600',
      cardBg: 'bg-white',
      cardBorder: 'border-rose-200 rounded-3xl shadow-lg',
      badgeStyle: 'bg-rose-600 text-white font-black rounded-full uppercase tracking-wider px-3 py-1 animate-pulse',
      fontStyle: 'Plus Jakarta Sans, Inter, sans-serif',
    },
    stats: [
      { label: 'Giá ưu đãi đặc biệt', value: 'Chỉ từ 45 Tr/m²' },
      { label: 'Chiết khấu mua nhanh', value: 'Giảm ngay 12%' },
      { label: 'Quà tặng tân gia', value: 'Tặng 3 Chỉ Vàng SJC' },
      { label: 'Thời hạn giữ chỗ VIP', value: 'Hoàn tiền 100%' },
    ],
    overview: [
      { label: 'Tên phân khu chốt sales', value: 'The Glory Heights - Vinhomes Grand Park' },
      { label: 'Vị trí đắc địa nhất', value: 'Đối diện trực tiếp Vincom Mega Mall Thrice & Công viên 36 ha' },
      { label: 'Quy mô phân khu', value: '5 Tòa tháp căn hộ biểu tượng được thắp sáng LED toàn phần' },
      { label: 'Tiêu chuẩn bàn giao', value: 'Nội thất sang trọng + Máy lạnh âm trần Daikin + Thiết bị Kohler' },
      { label: 'Ngân hàng bảo lãnh', value: 'Techcombank / MB Bank (Hỗ trợ 80% giá trị căn hộ)' },
      { label: 'Tình trạng mở bán', value: 'Đang mở giỏ hàng 30 căn góc tầng đẹp nhất hôm nay!' },
    ],
    location: {
      title: 'Vị Trí Trung Tâm Mua Sắm & Giải Trí Sầm Uất Nhất',
      desc: 'Vị trí độc tôn ngay trục đại lộ mua sắm Rodeo dài 500m lấy cảm hứng từ Beverly Hills, kết nối trực tiếp với tuyến xe buýt điện VinBus và đường Vành Đai 3.',
      highlights: [
        '0 bước chân ngang đường là tới Vincom Mega Mall & Quảng trường Golden Eagle',
        '2 phút đến Công viên ánh sáng 36 ha quy mô lớn nhất Đông Nam Á',
        '5 phút kết nối trực tiếp lên Đường cao tốc Long Thành - Dầu Giây & Vành Đai 3',
        'Hệ sinh thái trọn gói: Bệnh viện Vinmec, Trường liên cấp Vinschool ngay dưới chân nhà',
      ],
    },
    amenities: [
      { icon: '⚡', title: 'Hệ Thống LED Facade Ngoại Thất', desc: 'Toàn bộ 5 tòa tháp được trang bị hệ thống đèn LED chiếu sáng nghệ thuật rực rỡ mỗi tối.' },
      { icon: '🏝️', title: 'Hồ Bơi Malibu Cascade 845m²', desc: 'Hồ bơi phong cách Malibu lấy cảm hứng từ thiên đường nghỉ dưỡng Mỹ với suối bậc thang.' },
      { icon: '🦖', title: 'Công Viên Khủng Long Jura Park', desc: 'Khu vui chơi giải trí chủ đề kỷ Jura đầu tiên tại Sài Gòn dành riêng cho con em cư dân.' },
      { icon: '🧖‍♀️', title: 'Phòng Xông Hơi Sauna & Jacuzzi', desc: 'Tổ hợp chăm sóc sức khỏe và làm đẹp thủy liệu pháp ngay trong nội khu tầng trệt.' },
      { icon: '🎤', title: 'Phòng Karaoke & Family Lounge', desc: 'Phòng giải trí karaoke gia đình cách âm tuyệt đối và phòng tiệc riêng tư sang trọng.' },
      { icon: '🚌', title: 'Đặc Quyền Xe Buýt Điện VinBus', desc: 'Đưa đón cư dân miễn phí kết nối thẳng tới Bến Thành Quận 1 và sân bay Tân Sơn Nhất.' },
    ],
    floorPlans: [
      { floor: 'Căn Hộ Studio (Đầu Tư Cho Thuê Siêu Lợi Nhuận)', name: 'Unit #GH-0812 · View Trực Diện Vincom Mega Mall', specs: 'Thiết kế tối ưu công năng + Ban công thoáng + Nội thất liền tường sang trọng', area: '33.5 m²', bedrooms: 'Studio + 1 WC', price: '1.68 Tỷ VNĐ' },
      { floor: 'Căn Hộ 2 Phòng Ngủ + 1 (Căn Hộ Gia Đình Bán Chạy Nhất)', name: 'Unit #GH-1506 · Căn Góc View Biển Hồ 36 Ha', specs: '2 Phòng ngủ lớn + 1 Phòng đa năng làm phòng học/làm việc + 2 Logia riêng', area: '69.0 m²', bedrooms: '2 PN + 2 WC', price: '3.45 Tỷ VNĐ' },
      { floor: 'Căn Hộ 3 Phòng Ngủ (Không Gian Rộng Rãi Cho 3 Thế Hệ)', name: 'Unit #GH-2201 · Căn Góc VIP Hướng Đông Nam', specs: '3 Phòng ngủ Master tràn ngập ánh sáng + Bếp khép kín có thông gió tự nhiên', area: '92.5 m²', bedrooms: '3 PN + 2 WC', price: '4.85 Tỷ VNĐ' },
    ],
    policies: [
      { title: '⚡ ĐẶT CHỖ CHỈ 50 TRIỆU / CĂN', desc: 'Hoàn tiền 100% trong 24 giờ nếu quý khách đổi ý hoặc không chọn được căn ưng ý trong ngày mở bán.', tag: 'HOÀN TIỀN 100%' },
      { title: '🔥 CHIẾT KHẤU KHỦNG 12% + TẶNG 3 CHỈ VÀNG', desc: 'Áp dụng duy nhất cho 20 khách hàng đăng ký qua form VIP hôm nay trước khi đóng giỏ hàng.', tag: 'FLASH SALE 12%' },
      { title: '🏦 MUA NHÀ KHÔNG CẦN TRẢ GỐC LÃI 3 NĂM', desc: 'Chỉ cần thanh toán 15% vốn tự có nhận nhà ngay, ngân hàng hỗ trợ 80% miễn lãi đến tận năm 2028.', tag: 'ÂN HẠN ĐẾN 2028' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
    ],
    progress: { status: 'Đã hoàn thiện 100% tiện ích & sẵn sàng bàn giao', date: 'Tháng 07/2026', desc: 'Vincom Mega Mall đã chính thức khai trương sầm uất. Toàn bộ 5 tòa tháp The Glory Heights đã thắp sáng đèn LED và đang bàn giao chìa khóa cho cư dân.' },
  },

  'resort-paradise': {
    projectName: 'SUN PREMIER VILLAGE PHÚ QUỐC',
    tagline: '★ COASTAL RESORT & BEACH VILLA ★',
    heroTitle: 'THIÊN ĐƯỜNG NGHỈ DƯỠNG BIỂN ĐẢO NGỌC PHÚ QUỐC',
    heroSubtitle: 'Biệt thự biển ghềnh đá độc bản giáp biển 2 mặt tiền, cam kết lợi nhuận cho thuê 12%/năm cùng đặc quyền 15 đêm nghỉ dưỡng VIP toàn cầu.',
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80',
    badge: 'SECOND HOME CONDOTEL · PHÚ QUỐC',
    theme: {
      bgHeader: 'bg-[#0369A1]/95 backdrop-blur-md text-white border-b border-[#0EA5E9]/30 shadow-lg',
      textHeader: 'text-[#38BDF8] font-bold',
      borderAccent: 'border-[#0284C7]',
      primaryBg: 'bg-[#F0F9FF]',
      primaryText: 'text-slate-900',
      secondaryBg: 'bg-white',
      accentBtn: 'bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] hover:from-[#0369A1] hover:to-[#0284C7] text-white font-bold tracking-wider rounded-2xl shadow-xl shadow-cyan-600/30 uppercase px-8 py-4',
      accentText: 'text-[#0284C7]',
      cardBg: 'bg-white',
      cardBorder: 'border-cyan-100 rounded-3xl shadow-sm',
      badgeStyle: 'bg-cyan-50 text-cyan-700 font-bold rounded-full border border-cyan-200 px-3 py-1',
      fontStyle: 'Montserrat, Plus Jakarta Sans, sans-serif',
    },
    stats: [
      { label: 'Cam kết lợi nhuận', value: '12% / Năm USD' },
      { label: 'Số đêm nghỉ dưỡng', value: '15 Đêm VIP/Năm' },
      { label: 'Đơn vị vận hành', value: 'Accor Hotels 6★' },
      { label: 'Bãi biển riêng tư', value: '800m bờ biển cát trắng' },
    ],
    overview: [
      { label: 'Chủ đầu tư chính thức', value: 'Tập đoàn Sun Group (Người khai mở BĐS Nghỉ dưỡng)' },
      { label: 'Vị trí độc quyền', value: 'Mũi Ông Đội, An Thới, TP. Phú Quốc, Kiên Giang' },
      { label: 'Đơn vị thiết kế cảnh quan', value: 'Bensley Design Studios (Bill Bensley)' },
      { label: 'Đơn vị quản lý vận hành', value: 'Premier Village by Accor Hotels & Resorts' },
      { label: 'Quy mô tổng dự án', value: '73 ha - Cảnh quan rừng nguyên sinh & biển xanh' },
      { label: 'Giá trị đầu tư', value: 'Từ 28 Tỷ - 120 Tỷ VNĐ / Biệt Thự' },
    ],
    location: {
      title: 'Mũi Ông Đội — Vị Trí Ngắm Bình Minh & Hoàng Hôn Độc Nhất',
      desc: 'Sở hữu địa thế 2 mặt biển hiếm hoi tại Đông Nam Á, nơi duy nhất bạn có thể ngắm mặt trời mọc và lặn trên biển tại cùng một vị trí biệt thự của mình.',
      highlights: [
        '15 phút đến Sân bay Quốc tế Phú Quốc bằng tuyến đường ven biển nam đảo',
        'Liền kề cáp treo Hòn Thơm vượt biển dài nhất thế giới và Thị trấn Hoàng Hôn Sunset Town',
        'Kết nối trực tiếp Bến du thuyền Quốc tế An Thới đón khách quốc tế hạng sang',
        'Bãi biển riêng cát trắng mịn dài 800m không gian hoàn toàn biệt lập',
      ],
    },
    amenities: [
      { icon: '🏖️', title: 'Bãi Biển Cát Trắng Riêng Tư', desc: '800m đường bờ biển riêng biệt với dịch vụ ghế lười bãi biển và phục vụ cocktail 24/7.' },
      { icon: '🏊‍♀️', title: 'Hồ Bơi Vô Cực Nối Biển Nhiều Tầng', desc: 'Hồ bơi tràn bờ đa tầng trải dài từ đỉnh đồi xuống sát mép nước biển ngọc bích.' },
      { icon: '💆‍♀️', title: 'Plumeria Spa Trên Ghềnh Đá', desc: 'Khu chăm sóc sức khỏe trị liệu mát-xa thư giãn nằm ẩn mình trên các ghềnh đá tự nhiên.' },
      { icon: '🍷', title: 'Nhà Hàng Overwater Seafood Dining', desc: 'Nhà hàng hải sản tươi sống vươn ra mặt nước biển với tầm nhìn hoàng hôn tuyệt sắc.' },
      { icon: '⛵', title: 'Dịch Vụ Lặn Biển & Câu Lạc Bộ Du Thuyền', desc: 'Đặc quyền trải nghiệm lặn ngắm san hô tự nhiên và các môn thể thao dưới nước cao cấp.' },
      { icon: '🚁', title: 'Bãi Đáp Trực Thăng Helipad VIP', desc: 'Đón tiếp chủ nhân và khách mời quan trọng trực tiếp từ TP.HCM / Singapore bằng trực thăng.' },
    ],
    floorPlans: [
      { floor: 'Biệt Thự Trên Ghềnh Đá (On The Rock Villa)', name: 'Villa #OTR-05 · 4 Phòng Ngủ View Biển Toàn Cảnh', specs: 'Biệt thự xây dựng trên vách đá tự nhiên + Hồ bơi vô cực nhô ra biển', area: '650 m²', bedrooms: '4 PN + 6 WC', price: '68.5 Tỷ VNĐ' },
      { floor: 'Biệt Thự Sát Biển (Beachfront Villa)', name: 'Villa #BF-12 · Bước Chân Xuống Biển Cát Trắng', specs: 'Biệt thự 2 tầng + Sân vườn nhiệt đới + Lối đi riêng xuống bãi biển', area: '500 m²', bedrooms: '3 PN + 4 WC', price: '45.0 Tỷ VNĐ' },
      { floor: 'Biệt Thự Trên Đồi (Hillside Ocean Villa)', name: 'Villa #HS-08 · Tầm Nhìn 360 Độ Biển & Rừng', specs: 'Biệt thự ở vị trí cao nhất dự án ngắm trọn bình minh và hoàng hôn', area: '450 m²', bedrooms: '3 PN + 4 WC', price: '32.8 Tỷ VNĐ' },
    ],
    policies: [
      { title: 'Cam Kết Lợi Nhuận 12% Trong 10 Năm', desc: 'Đảm bảo dòng tiền USD ổn định, chia sẻ 85% lợi nhuận từ chương trình cho thuê của Accor.', tag: 'LỢI NHUẬN 12%/NĂM' },
      { title: 'Tặng 15 Đêm Nghỉ Dưỡng Thượng Lưu/Năm', desc: 'Được trao đổi kỳ nghỉ trên toàn bộ hệ thống resort 5-6 sao của Sun Group tại Việt Nam.', tag: '15 ĐÊM FREE VIP' },
      { title: 'Chiết Khấu Thanh Toán Sớm 10%', desc: 'Giảm trực tiếp vào giá trị hợp đồng cùng quà tặng thẻ hội viên Sun Loyalty Platinum.', tag: 'CHIẾT KHẤU 10%' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    ],
    progress: { status: 'Đã hoàn thành 100% & Vận hành bởi Accor Hotels', date: 'Tháng 07/2026', desc: 'Toàn bộ 163 biệt thự đã hoàn tất bàn giao và đang vận hành với công suất lấp đầy phòng trung bình đạt 82%/tháng, đem lại doanh thu vượt kỳ vọng cho nhà đầu tư.' },
  },

  'urban-city': {
    projectName: 'MASTERISE SMART URBAN CITY',
    tagline: '★ IOT SMART HOME 4.0 METROPOLIS ★',
    heroTitle: 'ĐẠI ĐÔ THỊ CÔNG NGHỆ THÔNG MINH 4.0 TẠI THỦ ĐỨC',
    heroSubtitle: 'Trải nghiệm phong cách sống tương lai điều khiển bằng AI, tự động hóa 100% ngôi nhà và kết nối trực tiếp công viên công nghệ cao 50 ha.',
    heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80',
    badge: 'SMART CITY CONDOS · THỦ ĐỨC',
    theme: {
      bgHeader: 'bg-purple-950/95 backdrop-blur-md text-white border-b border-purple-500/30 shadow-lg',
      textHeader: 'text-purple-400 font-extrabold tracking-wide',
      borderAccent: 'border-purple-600',
      primaryBg: 'bg-[#FAF5FF]',
      primaryText: 'text-slate-900',
      secondaryBg: 'bg-white',
      accentBtn: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black tracking-wider rounded-2xl shadow-xl shadow-purple-600/30 uppercase px-8 py-4',
      accentText: 'text-purple-600',
      cardBg: 'bg-white',
      cardBorder: 'border-purple-100 rounded-3xl shadow-sm',
      badgeStyle: 'bg-purple-100 text-purple-700 font-extrabold rounded-full border border-purple-200 px-3 py-1',
      fontStyle: 'Outfit, Plus Jakarta Sans, sans-serif',
    },
    stats: [
      { label: 'Hệ thống AI tự động', value: '100% Căn hộ Smart' },
      { label: 'Công viên cây xanh IoT', value: '50.000 m² cảm biến' },
      { label: 'Bãi đỗ xe tự động AI', value: 'Nhận diện Face ID' },
      { label: 'Tiêu chuẩn xanh quốc tế', value: 'LEED Gold Certified' },
    ],
    overview: [
      { label: 'Chủ đầu tư', value: 'Masterise Homes & Đối tác Công nghệ Microsoft IoT' },
      { label: 'Vị trí chiến lược', value: 'Vành Đai 2 & Xa lộ Hà Nội, P. Trường Thọ, TP. Thủ Đức' },
      { label: 'Hệ sinh thái thông minh', value: 'Tích hợp trợ lý ảo giọng nói tiếng Việt & FaceID 3D' },
      { label: 'Đơn vị kiến trúc', value: 'Kume Sekkei (Nhật Bản)' },
      { label: 'Quy mô dự án', value: '14.5 ha - 6 Tòa tháp Smart Tower' },
      { label: 'Giá bán khởi điểm', value: 'Từ 65 Triệu/m² - Bàn giao Full Smart Home Kit' },
    ],
    location: {
      title: 'Tâm Điểm Công Nghệ & Sáng Tạo TP. Thủ Đức',
      desc: 'Nằm tại vùng lõi đô thị sáng tạo phía Đông TP.HCM, kết nối thuận tiện đến các trung tâm R&D, làng đại học và các khu công nghiệp công nghệ cao.',
      highlights: [
        '2 phút đến Ga Metro số 1 Bình Thái & Trạm điều hành buýt điện AI',
        '5 phút đến Khu Công nghệ cao TP.HCM (Nhà máy Intel, Samsung, Nidec)',
        '10 phút đến Làng Đại học Quốc gia & Khu Đô thị Đại học Fullbright',
        'Hạ tầng mạng 5G phủ sóng 100% nội khu tốc độ truyền tải gigabit',
      ],
    },
    amenities: [
      { icon: '🤖', title: 'Trợ Lý Ảo AI Điều Khiển Giọng Nói', desc: 'Điều khiển rèm, đèn, điều hòa và nghe bản tin tự động chỉ bằng lệnh giọng nói.' },
      { icon: '🚗', title: 'Bãi Đỗ Xe Thông Minh AI Parking', desc: 'Tự động định danh biển số, chỉ đường đến chỗ trống gần nhất qua app trên điện thoại.' },
      { icon: '🛡️', title: 'An Ninh FaceID Không Chạm 100%', desc: 'Từ cổng chính, thang máy đến cửa căn hộ đều tự động mở bằng nhận diện khuôn mặt.' },
      { icon: '⚡', title: 'Hệ Thống Năng Lượng Mặt Trời IoT', desc: 'Tiết kiệm 40% chi phí điện năng chung và hiển thị chỉ số carbon footprint realtime.' },
      { icon: '🏊‍♂️', title: 'Hồ Bơi Điện Phân Muối Gia Nhiệt', desc: 'Hồ bơi thông minh tự động điều chỉnh nhiệt độ nước theo thời tiết bốn mùa.' },
      { icon: '📦', title: 'Robot Giao Nhận Hàng Tự Động', desc: 'Robot thông minh giao bưu phẩm và thức ăn nhanh trực tiếp đến tận cửa từng hộ gia đình.' },
    ],
    floorPlans: [
      { floor: 'Căn Hộ 1PN+ Smart (Giải Pháp Chuyên Gia Tech)', name: 'Unit #SU-1012 · Căn Hộ Thông Minh Tối Ưu', specs: '1 PN Master + 1 Phòng làm việc Pod + Hệ thống Smart Home Apple/Google', area: '55.0 m²', bedrooms: '1 PN + 1 WC', price: '3.65 Tỷ VNĐ' },
      { floor: 'Căn Hộ 2PN Smart Family (Căn Hộ Đô Thị Phổ Biến)', name: 'Unit #SU-1808 · Ban Công View Công Viên IoT 50 Ha', specs: '2 PN Master + Bếp thông minh cảm ứng khói + Khóa FaceID thế hệ mới', area: '76.5 m²', bedrooms: '2 PN + 2 WC', price: '4.95 Tỷ VNĐ' },
      { floor: 'Căn Hộ 3PN Dual-Key (Vừa Ở Vừa Cho Thuê Tự Động)', name: 'Unit #SU-2601 · Căn Hộ 2 Lối Đi Riêng Biệt', specs: 'Thiết kế Dual-Key thông minh tối đa dòng tiền cho thuê chuyên gia nước ngoài', area: '105.0 m²', bedrooms: '3 PN + 3 WC', price: '6.85 Tỷ VNĐ' },
    ],
    policies: [
      { title: 'Tặng Trọn Bộ Smart Home Apple Kit 200 Triệu', desc: 'Bao gồm khóa FaceID, rèm tự động, cảm biến nhiệt độ và loa HomePod Mini.', tag: 'SMART KIT 200 TR' },
      { title: 'Thanh Toán Nhẹ Nhàng 1.5%/Tháng', desc: 'Chính sách giãn lịch thanh toán đến 30 tháng không áp lực dòng tiền cho người trẻ.', tag: 'GIÃN LỊCH 30 THÁNG' },
      { title: 'Ngân Hàng MB Bank Vay Lãi Suất 0%', desc: 'Miễn lãi và ân hạn nợ gốc đến 24 tháng hoặc đến thời điểm bàn giao nhà.', tag: 'VAY 80% LÃI 0%' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    ],
    progress: { status: 'Đang lắp đặt hệ thống cảm biến IoT toàn khu', date: 'Tháng 07/2026', desc: 'Đã cất nóc 6 tòa tháp chính, đang hoàn thiện hệ thống mạng cáp quang tốc độ cao và thử nghiệm các trạm kiểm soát an ninh FaceID thông minh.' },
  },

  'industrial-estate': {
    projectName: 'VSIP LOGISTICS & INDUSTRIAL HUB',
    tagline: '★ B2B INDUSTRIAL PARK & DEEP SEA PORT ★',
    heroTitle: 'TỔ HỢP CÔNG NGHIỆP & KHO VẬN LOGISTICS LONG THÀNH',
    heroSubtitle: 'Quy mô 1,200 ha hạ tầng hoàn chỉnh chuẩn quốc tế, cách Sân bay Long Thành 10km và Cảng biển Cái Mép - Thị Vải 15km.',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
    badge: 'INDUSTRIAL PARK · LONG THÀNH',
    theme: {
      bgHeader: 'bg-[#0F172A] text-white border-b border-sky-500/30 shadow-lg',
      textHeader: 'text-sky-400 font-extrabold',
      borderAccent: 'border-sky-500',
      primaryBg: 'bg-slate-900',
      primaryText: 'text-white',
      secondaryBg: 'bg-slate-800/80',
      accentBtn: 'bg-sky-500 hover:bg-sky-600 text-slate-950 font-extrabold uppercase rounded-xl shadow-xl px-8 py-4',
      accentText: 'text-sky-400',
      cardBg: 'bg-slate-800/60 border-slate-700',
      cardBorder: 'border-slate-700 rounded-2xl shadow-sm',
      badgeStyle: 'bg-sky-500/20 text-sky-400 font-bold rounded border border-sky-500/40 uppercase px-3 py-1',
      fontStyle: 'Roboto, Inter, sans-serif',
    },
    stats: [
      { label: 'Tải trọng sàn kho', value: '5.0 Tấn / m²' },
      { label: 'Chiều cao trần tối đa', value: '14.5 m (4 tầng kệ)' },
      { label: 'Trạm điện áp riêng', value: '110kV / 22kV 50MVA' },
      { label: 'Miễn thuế thu nhập', value: 'Miễn 4 Năm & Giảm 50% 9 Năm' },
    ],
    overview: [
      { label: 'Chủ đầu tư hạ tầng', value: 'Tập đoàn Liên doanh VSIP & Sembcorp Singapore' },
      { label: 'Vị trí khu công nghiệp', value: 'Khu Công nghiệp Long Thành - Đồng Nai (Mặt tiền Quốc lộ 51)' },
      { label: 'Loại hình cho thuê', value: 'Đất công nghiệp có hạ tầng, Nhà xưởng xây sẵn, Kho Logistics' },
      { label: 'Tiêu chuẩn môi trường', value: 'Nhà máy xử lý nước thải công suất 20.000 m³/ngày đêm (Chuẩn A)' },
      { label: 'Đơn giá thuê đất', value: 'Từ 145 USD / m² / Chu kỳ 50 năm' },
      { label: 'Đơn giá thuê kho xưởng', value: 'Từ 4.8 USD / m² / Tháng (Xưởng RBF xây sẵn)' },
    ],
    location: {
      title: 'Vị Trí Vàng Tiếp Giáp Sân Bay & Cảng Nước Sâu Quốc Tế',
      desc: 'Nằm ngay tâm điểm tam giác kinh tế trọng điểm phía Nam, tối ưu hóa chi phí vận chuyển hàng hóa xuất nhập khẩu toàn cầu cho doanh nghiệp FDI.',
      highlights: [
        'Chỉ 10 km đến Sân bay Quốc tế Long Thành (Đang hoàn thiện giai đoạn 1)',
        'Chỉ 15 km đến Cảng nước sâu Cái Mép - Thị Vải (Đón tàu siêu trọng tải 200.000 DWT)',
        'Kết nối trực tiếp Cao tốc TP.HCM - Long Thành - Dầu Giây & Cao tốc Biên Hòa - Vũng Tàu',
        'Cách trung tâm TP. Hồ Chí Minh 35 km đi theo đường cao tốc không kẹt xe',
      ],
    },
    amenities: [
      { icon: '⚡', title: 'Trạm Biến Áp 110/22kV Nguồn Kép', desc: 'Đảm bảo nguồn điện liên tục 24/7 với đường dây cáp ngầm mạch kép tự động chuyển nguồn.' },
      { icon: '💧', title: 'Nhà Máy Nước Sạch 30.000m³/Ngày', desc: 'Hệ thống cung cấp nước sạch tiêu chuẩn cao phục vụ sản xuất công nghiệp nặng và điện tử.' },
      { icon: '🚒', title: 'Trạm Cứu Hỏa & PCCC Chuyên Nghiệp', desc: 'Trạm PCCC nội khu với xe chữa cháy chuyên dụng phục vụ trong vòng 3 phút khi có sự cố.' },
      { icon: '🏢', title: 'Tòa Nhà Hải Quan & Dịch Vụ Một Cửa', desc: 'Văn phòng làm thủ tục hải quan, cấp phép đầu tư FDI ngay tại trung tâm điều hành KCN.' },
      { icon: '🏡', title: 'Khu Ký Túc Xá & Chuyên Gia 5.000 Chỗ', desc: 'Khu lưu trú chất lượng cao dành cho chuyên gia nước ngoài và công nhân kỹ thuật cao.' },
      { icon: '🌐', title: 'Cáp Quang Mạng Riêng 100Gbps', desc: 'Hạ tầng viễn thông cáp quang ngầm sẵn sàng cho tự động hóa nhà máy thông minh Industry 4.0.' },
    ],
    floorPlans: [
      { floor: 'Nhà Xưởng Xây Sẵn (Ready-Built Factory - RBF)', name: 'Module Xưởng Tiêu Chuẩn 2.500m² - 5.000m²', specs: 'Khung thép tiền chế Zamil + Văn phòng 2 tầng đi kèm + PCCC tự động Sprinkler', area: '2,500 m²', bedrooms: 'Xưởng + Văn phòng', price: '4.8 USD/m²/tháng' },
      { floor: 'Kho Logistics Chuyên Dụng (Modern Warehouse)', name: 'Kho Cross-Docking Sàn Cao 1.5m Có Dock Leveler', specs: 'Tải trọng sàn 5 tấn/m² + Trần cao 14.5m + Hệ thống thông gió tự nhiên', area: '10,000 m²', bedrooms: 'Kho Logistics lớn', price: '5.2 USD/m²/tháng' },
      { floor: 'Đất Công Nghiệp Có Hạ Tầng (Industrial Land)', name: 'Lô Đất Quy Mô Lớn Dành Cho Nhà Máy FDI', specs: 'Đất đã san lấp mặt bằng chuẩn 100% + Đấu nối sẵn điện thoại, nước, nước thải, PCCC', area: '50,000 m² (5 ha)', bedrooms: 'Lô đất công nghiệp', price: '145 USD/m²/50 năm' },
    ],
    policies: [
      { title: 'Miễn Thuế TNDN 4 Năm & Giảm 50% 9 Năm Tiếp Theo', desc: 'Chính sách ưu đãi thuế cao nhất theo nghị định chính phủ dành cho KCN công nghệ cao.', tag: 'MIỄN THUẾ 4 NĂM' },
      { title: 'Hỗ Trợ Trọn Gói Thủ Tục Cấp Phép FDI Trong 15 Ngày', desc: 'Trung tâm dịch vụ một cửa hỗ trợ xin giấy phép đầu tư IRC, ERC và giấy phép xây dựng hoàn toàn miễn phí.', tag: 'FREE THỦ TỤC FDI' },
      { title: 'Chính Sách Linh Hoạt Thanh Toán Theo Tiến Độ', desc: 'Khách hàng thuê đất hoặc nhà xưởng được chia nhỏ thanh toán theo 5 đợt trong vòng 12 tháng.', tag: 'TIẾN ĐỘ 12 THÁNG' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1000&q=80',
    ],
    progress: { status: 'Hạ tầng giai đoạn 2 đã hoàn tất san lấp & Đấu nối điện nước', date: 'Tháng 07/2026', desc: 'Đã hoàn thiện 100% trục đường chính rộng 45m và nhà máy xử lý nước thải chuẩn A. Đang bàn giao xưởng cho các tập đoàn điện tử của Nhật Bản và Đài Loan.' },
  },

  'villa-premium': {
    projectName: 'THE BEVERLY HILLS THẢO ĐIỀN',
    tagline: '★ PRIVATE COMPOUND & YACHT CLUB ★',
    heroTitle: 'KHU BIỆT THỰ BIỆT LẬP SIÊU SANG TẠI THẢO ĐIỀN',
    heroSubtitle: 'Cộng đồng 28 gia tộc tinh hoa với đặc quyền bảo vệ an ninh 4 lớp tuyệt đối, sân vườn nhiệt đới riêng và bến du thuyền cao cấp ven sông Sài Gòn.',
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
    badge: 'COMPOUND VILLA · QUẬN 2',
    theme: {
      bgHeader: 'bg-[#064E3B]/95 backdrop-blur-md text-white border-b border-emerald-500/30 shadow-lg',
      textHeader: 'text-emerald-400 font-bold',
      borderAccent: 'border-emerald-600',
      primaryBg: 'bg-[#ECFDF5]',
      primaryText: 'text-slate-900',
      secondaryBg: 'bg-white',
      accentBtn: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold tracking-wider rounded-2xl shadow-xl shadow-emerald-600/30 uppercase px-8 py-4',
      accentText: 'text-emerald-700',
      cardBg: 'bg-white',
      cardBorder: 'border-emerald-200 rounded-3xl shadow-sm',
      badgeStyle: 'bg-emerald-100 text-emerald-800 font-bold rounded-full border border-emerald-300 px-3 py-1',
      fontStyle: 'Playfair Display, Plus Jakarta Sans, serif',
    },
    stats: [
      { label: 'Quy mô compound', value: '4.5 ha biệt lập' },
      { label: 'Số lượng gia tộc', value: '28 Biệt thự VIP' },
      { label: 'An ninh bảo vệ', value: '4 Lớp K9 & FaceID' },
      { label: 'Pháp lý sở hữu', value: 'Sổ hồng lâu dài' },
    ],
    overview: [
      { label: 'Chủ đầu tư compound', value: 'Beverly Thảo Điền Luxury Development' },
      { label: 'Vị trí kim cương', value: 'Đường Nguyễn Văn Hưởng, Phường Thảo Điền, TP. Thủ Đức' },
      { label: 'Quy chuẩn an ninh', value: 'Hệ thống rào chắn điện tử & Đội tuần tra cựu quân nhân 24/7' },
      { label: 'Đơn vị kiến trúc', value: 'HBA (Hirsch Bedner Associates - Hoa Kỳ)' },
      { label: 'Tiêu chuẩn bàn giao', value: 'Hoàn thiện biệt thự + Hồ bơi riêng + Vườn nhiệt đới' },
      { label: 'Giá bán tham khảo', value: 'Từ 115 Tỷ - 220 Tỷ VNĐ' },
    ],
    location: {
      title: 'Tâm Điểm Thảo Điền — Khu Vực Đáng Sống Nhất Sài Gòn',
      desc: 'Nằm tại vị trí yên tĩnh nhất trên trục đường Nguyễn Văn Hưởng giáp sông, nơi tập trung cộng đồng người nước ngoài và các gia đình thương gia đẳng cấp nhất.',
      highlights: [
        '3 phút đến Hệ thống 8 Trường Quốc tế danh tiếng (BIS, ISHCMC, TAS, AIS)',
        '5 phút đến Siêu thị cao cấp Annam Gourmet, Thảo Điền Pearl & Vincom Mega Mall',
        '10 phút di chuyển qua cầu Sài Gòn vào thẳng trung tâm kinh tế Quận 1',
        'Sở hữu bến thuyền riêng ngay phía trước khu compound kết nối sông Sài Gòn',
      ],
    },
    amenities: [
      { icon: '🛡️', title: 'An Ninh 4 Lớp Biệt Lập Kín Đáo', desc: 'Kiểm soát ra vào tuyệt đối bằng nhận diện biển số, FaceID, tuần tra K9 và rào cản hồng ngoại.' },
      { icon: '🛥️', title: 'Bến Du Thuyền Thảo Điền Yacht Club', desc: 'Khu bến đậu du thuyền và cano cao tốc phục vụ các chuyến dạo sông hoặc di chuyển vào Q1.' },
      { icon: '🏊‍♂️', title: 'Hồ Bơi Nước Mặn Cá Nhân Từng Căn', desc: 'Mỗi biệt thự đều sở hữu một hồ bơi riêng biệt dài 15m với hệ thống sục Jacuzzi thư giãn.' },
      { icon: '🌲', title: 'Công Viên Cổ Thụ & Đường Chạy Bộ Ven Sông', desc: 'Cảnh quan giữ lại 100% cây cổ tự nhiên thảm cỏ xanh mướt mát mẻ quanh năm.' },
      { icon: '🍷', title: 'Nhà Câu Lạc Bộ & Cigar Lounge Thượng Lưu', desc: 'Nơi chủ nhân tiếp đón đối tác kinh doanh hoặc thưởng thức các bữa tiệc riêng tư sang trọng.' },
      { icon: '🤵', title: 'Dịch Vụ Quản Gia & Chăm Sóc Sân Vườn', desc: 'Đội ngũ nhân viên chăm sóc hồ bơi, cắt tỉa cây cảnh và làm sạch biệt thự tiêu chuẩn 6 sao.' },
    ],
    floorPlans: [
      { floor: 'Biệt Thự Đơn Lập Sông (Riverfront Mansion)', name: 'Mansion #BH-01 · Trực Diện Sông Sài Gòn', specs: '5 Phòng ngủ Master + Hồ bơi vô cực sát sông + Hầm để 4 ô tô siêu xe', area: '820 m²', bedrooms: '5 PN + 7 WC', price: '215 Tỷ VNĐ' },
      { floor: 'Biệt Thự Song Lập Vườn (Garden Villa)', name: 'Villa #BH-12 · Sân Vườn Nhiệt Đới 200m²', specs: '4 Phòng ngủ lớn + Phòng sinh hoạt chung + Gara 2 ô tô sang trọng', area: '450 m²', bedrooms: '4 PN + 5 WC', price: '128 Tỷ VNĐ' },
      { floor: 'Biệt Thự Hồ Bơi Trung Tâm (Pool Villa)', name: 'Villa #BH-08 · Trung Tâm Khu Compound', specs: 'Thiết kế chữ U ôm trọn hồ bơi trung tâm + Tầm nhìn công viên nội khu', area: '550 m²', bedrooms: '4 PN + 6 WC', price: '155 Tỷ VNĐ' },
    ],
    policies: [
      { title: 'Tặng Thẻ Thành Viên Yacht Club 20 Năm', desc: 'Đặc quyền sử dụng du thuyền sang trọng của khu compound cho các bữa tiệc gia đình.', tag: 'VIP YACHT CLUB' },
      { title: 'Chiết Khấu Thanh Toán Nhờ Đợt 8%', desc: 'Ưu đãi giảm giá trực tiếp dành cho chủ nhân ký hợp đồng mua bán sớm trong tháng 07.', tag: 'CHIẾT KHẤU 8%' },
      { title: 'Miễn Phí Phí Quản Lý Compound 5 Năm', desc: 'Hưởng trọn vẹn dịch vụ bảo vệ 4 lớp và chăm sóc cảnh quan hoàn toàn miễn phí.', tag: 'FREE 5 NĂM QL' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80',
    ],
    progress: { status: 'Đã bàn giao hoàn tất 100% & Cộng đồng cư dân đã vào ở', date: 'Tháng 07/2026', desc: 'Toàn bộ 28 căn biệt thự đã có chủ nhân sở hữu, an ninh 4 lớp vận hành nghiêm ngặt 24/7. Hiện chỉ còn 2 căn chuyển nhượng độc quyền qua Sàn PlatformBDS.' },
  },

  'eco-green': {
    projectName: 'ECOPARK GREEN VILLAGE & SWAN LAKE',
    tagline: '★ NET-ZERO CARBON & FOREST RESIDENCE ★',
    heroTitle: 'THÀNH PHỐ RỪNG CỌ & HỒ THIÊN NGA SINH THÁI',
    heroSubtitle: 'Quy mô 500 ha cây xanh và mặt nước, nơi chỉ số chất lượng không khí AQI luôn duy trì ở mức lý tưởng tuyệt đối tốt cho sức khỏe 3 thế hệ.',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    badge: 'ECO GREEN CITY · 500 HA',
    theme: {
      bgHeader: 'bg-emerald-900/95 backdrop-blur-md text-white border-b border-green-500/30 shadow-lg',
      textHeader: 'text-emerald-400 font-bold',
      borderAccent: 'border-emerald-600',
      primaryBg: 'bg-[#F0FDF4]',
      primaryText: 'text-slate-900',
      secondaryBg: 'bg-white',
      accentBtn: 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold tracking-wider rounded-2xl shadow-xl shadow-green-600/30 uppercase px-8 py-4',
      accentText: 'text-emerald-700',
      cardBg: 'bg-white',
      cardBorder: 'border-green-200 rounded-3xl shadow-sm',
      badgeStyle: 'bg-green-100 text-green-800 font-bold rounded-full border border-green-300 px-3 py-1',
      fontStyle: 'Nunito, Plus Jakarta Sans, sans-serif',
    },
    stats: [
      { label: 'Mật độ cây xanh', value: '125 Cây / Người' },
      { label: 'Diện tích mặt nước', value: '100 ha Hồ Thiên Nga' },
      { label: 'Chỉ số không khí AQI', value: 'Luôn dưới mức 15' },
      { label: 'Pháp lý biệt thự', value: 'Sổ hồng vĩnh viễn' },
    ],
    overview: [
      { label: 'Chủ đầu tư sinh thái', value: 'Tập đoàn Ecopark Corporation' },
      { label: 'Vị trí khu đô thị', value: 'Khu Đô Thị Sinh Thái Ecopark (Cách trung tâm Hà Nội 15 phút)' },
      { label: 'Quy mô tổng thể', value: '500 ha (Lớn nhất miền Bắc)' },
      { label: 'Hệ thống giáo dục', value: 'Trường Quốc tế Chadwick, Đại học Anh Quốc BUV, Y khoa Tokyo' },
      { label: 'Đặc quyền sức khỏe', value: 'Dẫn nguồn khoáng nóng Onsen trực tiếp vào từng căn biệt thự' },
      { label: 'Giá bán sản phẩm', value: 'Từ 15.5 Tỷ - 65 Tỷ VNĐ / Biệt thự đảo xanh' },
    ],
    location: {
      title: 'Tâm Điểm Xanh Cách Trung Tâm Thủ Đô Chỉ 15 Phút',
      desc: 'Sở hữu khả năng kết nối siêu tốc thông qua các cây cầu trọng điểm vượt sông Hồng, mang lại cuộc sống nghỉ dưỡng mỗi ngày ngay kế bên nội thành.',
      highlights: [
        'Chỉ 15 phút đến Hồ Hoàn Kiếm qua cầu Chương Dương hoặc cầu Vĩnh Tuy',
        'Tuyến xe buýt xanh Ecobus 150 chuyến/ngày đưa đón cư dân đi khắp các quận Hà Nội',
        'Liền kề hệ thống sân Golf 18 hố PGA và khu thể thao liên hợp ngoài trời',
        'Kết nối trực tiếp đường cao tốc Hà Nội - Hải Phòng thuận tiện ra biển',
      ],
    },
    amenities: [
      { icon: '🦢', title: 'Hồ Thiên Nga 50 Ha & Rừng Cọ Cổ Thụ', desc: 'Không gian sống chung hòa bình với hàng ngàn chú thiên nga trắng đen và chim tự nhiên.' },
      { icon: '♨️', title: 'Suối Khoáng Nóng Onsen Nhật Bản', desc: 'Tổ hợp khoáng nóng khoáng chất trị liệu cao cấp hợp tác cùng tập đoàn Nomura Nhật Bản.' },
      { icon: '🏫', title: 'Hệ Thống Trường Học Quốc Tế Hàng Đầu', desc: 'Trường Chadwick (Mỹ), Đại học BUV, Đại học Y khoa Tokyo ngay trong khuôn viên 500 ha.' },
      { icon: '🚲', title: '100 km Đường Đạp Xe & Dạo Bộ Dưới Cây', desc: 'Hệ thống đường đi bộ dạo mát len lỏi qua các thảm cỏ và vườn hoa nở bốn mùa.' },
      { icon: '⛺', title: 'Khu Cắm Trại Glamping & BBQ Sân Vườn', desc: 'Khu vực tổ chức tiệc BBQ và cắm trại ngoài trời bên bờ hồ vào mỗi cuối tuần cho gia đình.' },
      { icon: '🛡️', title: 'An Ninh & Bệnh Viện Sinh Thái Y Khoa', desc: 'Trung tâm y tế cao cấp phục vụ riêng cho cư dân với thời gian phản ứng dưới 3 phút.' },
    ],
    floorPlans: [
      { floor: 'Biệt Thự Đảo Grand Island (Siêu Phẩm Biệt Lập Sông)', name: 'Biệt Thự Đảo Nước Vô Cực #GI-08', specs: 'Biệt thự xây dựng trên các nhánh đảo giáp sông + Bến thuyền + Hồ bơi vô cực', area: '450 m²', bedrooms: '4 PN + 5 WC', price: '42.5 Tỷ VNĐ' },
      { floor: 'Biệt Thự Vườn Rừng Cọ (Palm Garden Villa)', name: 'Biệt Thự Song Lập Vườn Hoa #PG-15', specs: '3 Phòng ngủ Master + Sân vườn 150m² trồng sẵn hoa hồng cổ + Hướng hồ mát mẻ', area: '250 m²', bedrooms: '3 PN + 4 WC', price: '18.8 Tỷ VNĐ' },
      { floor: 'Căn Hộ Khoáng Nóng Swanlake Residences', name: 'Penthouse Onsen #SL-3801 · View Trọn Hồ Thiên Nga', specs: 'Căn hộ có phòng tắm khoáng nóng Jacuzzi riêng ngoài ban công ngắm toàn cảnh hồ', area: '145 m²', bedrooms: '3 PN + 3 WC', price: '9.5 Tỷ VNĐ' },
    ],
    policies: [
      { title: 'Tặng Gói Khám Sức Khỏe & Khoáng Nóng 10 Năm', desc: 'Đặc quyền sử dụng tổ hợp Onsen Nhật Bản và tầm soát sức khỏe miễn phí hàng năm.', tag: 'VIP ONSEN 10 NĂM' },
      { title: 'Hỗ Trợ Vay Lãi Suất 0% Trong 24 Tháng', desc: 'Chỉ cần thanh toán 15% vốn tự có ký HĐMB, ngân hàng hỗ trợ giải ngân 80% giá trị.', tag: 'VAY 0% 24 THÁNG' },
      { title: 'Miễn Phí Xe Buýt Ecobus VIP 5 Năm', desc: 'Cấp thẻ đi xe buýt xanh cao cấp miễn phí cho toàn bộ thành viên trong gia đình.', tag: 'FREE ECOBUS VIP' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    ],
    progress: { status: 'Đã hoàn tất cảnh quan hồ Thiên Nga & Đang bàn giao biệt thự đảo', date: 'Tháng 07/2026', desc: 'Hàng ngàn cây xanh đã tỏa bóng mát rượi toàn khu. Các phân khu biệt thự Đảo Grand Island đã chính thức bàn giao và chào đón các gia chủ mới chuyển về an cư.' },
  },

  'classic-heritage': {
    projectName: 'GRAND MARINA SAIGON',
    tagline: '★ INDOCHINE FRENCH HERITAGE PALACE ★',
    heroTitle: 'KIỆT TÁC DI SẢN INDOCHINE BÊN DÒNG SÔNG SÀI GÒN',
    heroSubtitle: 'Lấy cảm hứng từ kiến trúc thuộc địa Pháp 1920 mang tính lịch sử, tọa lạc tại mảnh đất vàng Ba Son lịch sử với sự quản lý của Marriott International.',
    heroImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80',
    badge: 'MARRIOTT BRANDED RESIDENCES',
    theme: {
      bgHeader: 'bg-[#450A0A]/95 backdrop-blur-md text-[#FDE68A] border-b border-[#D97706]/40 shadow-lg',
      textHeader: 'text-[#FDE68A] font-serif font-bold tracking-widest',
      borderAccent: 'border-[#B45309]',
      primaryBg: 'bg-[#FFFBEB]',
      primaryText: 'text-[#450A0A]',
      secondaryBg: 'bg-[#FEF3C7]/60',
      accentBtn: 'bg-gradient-to-r from-[#B45309] to-[#991B1B] hover:brightness-110 text-[#FEF3C7] font-serif font-bold uppercase tracking-widest rounded-none shadow-2xl border border-[#D97706]/60 px-8 py-4',
      accentText: 'text-[#B45309]',
      cardBg: 'bg-white',
      cardBorder: 'border-[#D97706]/40 shadow-md',
      badgeStyle: 'bg-[#78350F] text-[#FDE68A] font-serif font-bold border border-[#D97706]/50 uppercase px-3 py-1',
      fontStyle: 'Cinzel, Playfair Display, Georgia, serif',
    },
    stats: [
      { label: 'Vị trí di sản', value: 'Cảng Ba Son Lịch Sử' },
      { label: 'Thương hiệu quản lý', value: 'Marriott & JW Marriott' },
      { label: 'Nội thất thủ công', value: 'Gạch bông & Gỗ gõ đỏ Ý' },
      { label: 'Pháp lý sở hữu', value: 'Sổ hồng vĩnh viễn' },
    ],
    overview: [
      { label: 'Chủ đầu tư uy tín', value: 'Masterise Homes & Marriott International Branded Residences' },
      { label: 'Vị trí kim cương', value: 'Số 2 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, TP. HCM' },
      { label: 'Quy mô diện tích', value: '10 ha (Khu phức hợp căn hộ hàng hiệu lớn nhất thế giới)' },
      { label: 'Phong cách thiết kế', value: 'Kiến trúc Indochine Pháp kết hợp hiện đại sang trọng' },
      { label: 'Dịch vụ quản gia', value: 'Tiêu chuẩn khách sạn Marriott 5 sao toàn cầu tại nhà' },
      { label: 'Giá bán tham khảo', value: 'Từ 350 Triệu/m² - 500 Triệu/m²' },
    ],
    location: {
      title: 'Mảnh Đất Vàng Di Sản Cảng Ba Son Bên Sông Sài Gòn',
      desc: 'Tọa lạc tại góc 2 mặt tiền đường Tôn Đức Thắng và Nguyễn Hữu Cảnh giáp sông Sài Gòn, có nhà ga ngầm Metro số 1 nằm trực tiếp ngay dưới chân tòa tháp.',
      highlights: [
        'Kết nối trực tiếp ga Metro ngầm Ba Son (Tuyến Metro số 1) không cần dầm mưa nắng',
        '2 phút đi bộ sang Phố đi bộ Nguyễn Huệ, Nhà hát Thành phố & Khách sạn Park Hyatt',
        'Sở hữu công viên ven sông Sài Gòn và bến du thuyền Grand Marina riêng biệt',
        'Tầm nhìn tuyệt đẹp không bao giờ bị che chắn ra sông và bán đảo Thủ Thiêm',
      ],
    },
    amenities: [
      { icon: '🤵', title: 'Quản Gia Marriott Butler 24/7', desc: 'Đặc quyền yêu cầu đầu bếp riêng chuẩn Michelin, phục vụ dọn phòng và đặt tiệc 24/7.' },
      { icon: '🍷', title: 'Phòng trà Indochine Cigar Lounge', desc: 'Không gian đậm chất quý tộc Pháp với gạch bông cổ điển, lưu trữ các dòng cigar thượng hạng.' },
      { icon: '🏊‍♂️', title: 'Hồ Bơi Vô Cực Rooftop View Sông Sài Gòn', desc: 'Hồ bơi nhiệt đới trên tầng cao với dịch vụ khăn tắm và cocktail phục vụ tại chỗ.' },
      { icon: '📚', title: 'Thư Viện Lịch Sử & Phòng Đọc Sách VIP', desc: 'Thư viện tĩnh lặng trang bị nội thất gỗ gõ đỏ sang trọng dành cho chủ nhân và đối tác.' },
      { icon: '⚓', title: 'Bến Du Thuyền Di Sản Grand Marina', desc: 'Bến đậu du thuyền sang trọng ngay trước công viên ven sông phục vụ cư dân.' },
      { icon: '🛍️', title: 'Khách Sạn & TTTM Hàng Hiệu JW Marriott', desc: 'Tổ hợp mua sắm hàng hiệu Gucci, Chanel, Louis Vuitton ngay tại tầng trệt khu phức hợp.' },
    ],
    floorPlans: [
      { floor: 'Căn Hộ 1PN Heritage (Dành Cho Doanh Nhân Quốc Tế)', name: 'Unit #GM-1205 · View Hồ Bơi & Thảo Cầm Viên', specs: 'Thiết kế Indochine tinh tế + Nội thất Miele cao cấp nhất + Sàn gỗ xương cá hoàng gia', area: '62 m²', bedrooms: '1 PN + 1 WC', price: '21.5 Tỷ VNĐ' },
      { floor: 'Căn Hộ 2PN Marriott Signature (Căn Hộ Hàng Hiệu Chuẩn 5★)', name: 'Unit #GM-2208 · Trực Diện Sông Sài Gòn & Thủ Thiêm', specs: '2 Phòng ngủ lớn + Phòng ăn kiểu Pháp + Bàn giao theo tiêu chuẩn Marriott toàn cầu', area: '98 m²', bedrooms: '2 PN + 2 WC', price: '36.8 Tỷ VNĐ' },
      { floor: 'Penthouse Indochine Palace (Dinh Thự Trên Không)', name: 'Sky Palace #GM-4501 · Căn Góc 3 Mặt Tiền Sông', specs: 'Trần cao 6m thông tầng + Sân vườn ban công rộng 50m² + Hồ bơi sục riêng tư trên cao', area: '260 m²', bedrooms: '4 PN + 5 WC', price: '125.0 Tỷ VNĐ' },
    ],
    policies: [
      { title: 'Tặng Thẻ Marriott Bonvoy Platinum Elite Toàn Cầu', desc: 'Hưởng ưu đãi thăng hạng phòng và giảm giá đặc biệt tại hơn 8,000 khách sạn Marriott toàn cầu.', tag: 'PLATINUM ELITE VIP' },
      { title: 'Chiết Khấu Đặc Quyền 6% Khi Thanh Toán Sớm', desc: 'Ưu đãi dành riêng cho khách hàng VIP ký hợp đồng chính thức trong tháng.', tag: 'CHIẾT KHẤU 6%' },
      { title: 'Miễn Phí Phí Quản Lý Marriott 3 Năm Đầu Tiên', desc: 'Trải nghiệm trọn vẹn dịch vụ quản gia 5 sao tiêu chuẩn quốc tế không tốn phí vận hành.', tag: 'FREE 3 NĂM MARRIOTT' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    ],
    progress: { status: 'Tòa Lake & Sea đã hoàn tất bàn giao & Vận hành chính thức', date: 'Tháng 07/2026', desc: 'Tòa tháp Lake do Marriott quản lý đã bàn giao thành công cho cộng đồng chủ nhân hạng sang. Các tòa tháp Cove và Sea đang hoàn thiện giai đoạn cuối đúng tiến độ cam kết.' },
  },

  'investment-pro': {
    projectName: 'THỦ THIÊM ZEIT RIVER & ROI INVESTMENT',
    tagline: '★ HIGH-YIELD CASH FLOW & ASSET GROWTH ★',
    heroTitle: 'CĂN HỘ ĐẦU TƯ DÒNG TIỀN VÀNG TẠI LÕI THỦ THIÊM',
    heroSubtitle: 'Dự án sở hữu biên độ tăng giá mạnh mẽ nhất khi hoàn thành cầu Thủ Thiêm 3 & Metro số 2, cam kết tỷ suất cho thuê thực tế đạt 8.5%/năm.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    badge: 'INVESTMENT CONDOS · ROI 8.5%',
    theme: {
      bgHeader: 'bg-[#0D9488]/95 backdrop-blur-md text-white border-b border-teal-500/30 shadow-lg',
      textHeader: 'text-teal-300 font-black',
      borderAccent: 'border-teal-600',
      primaryBg: 'bg-[#F0FDFA]',
      primaryText: 'text-slate-900',
      secondaryBg: 'bg-white',
      accentBtn: 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-black tracking-wider rounded-2xl shadow-xl shadow-teal-600/30 uppercase px-8 py-4',
      accentText: 'text-teal-700',
      cardBg: 'bg-white',
      cardBorder: 'border-teal-200 rounded-3xl shadow-sm',
      badgeStyle: 'bg-teal-100 text-teal-800 font-extrabold rounded-full border border-teal-300 px-3 py-1',
      fontStyle: 'Inter, Plus Jakarta Sans, sans-serif',
    },
    stats: [
      { label: 'Tỷ suất cho thuê (ROI)', value: '8.5% / Năm (Thực tế)' },
      { label: 'Tăng giá dự kiến 2027', value: '+28% Khi Xong Metro' },
      { label: 'Hỗ trợ vay ngân hàng', value: 'Vay 80% Lãi suất 0%' },
      { label: 'Tỷ lệ lấp đầy thuê', value: 'Luôn trên mức 95%' },
    ],
    overview: [
      { label: 'Chủ đầu tư quốc tế', value: 'Tập đoàn GS E&C (Tập đoàn xây dựng số 1 Hàn Quốc)' },
      { label: 'Vị trí chiến lược', value: 'Mặt tiền Nguyễn Cơ Thạch & Đại lộ Vòng Cung, Thủ Thiêm, Q2' },
      { label: 'Loại hình đầu tư', value: 'Căn hộ cao cấp 1-3PN, Shophouse khối đế kinh doanh, Duplex' },
      { label: 'Đơn vị quản lý cho thuê', value: 'Savills Vietnam Rental Management (Tự động hóa tìm khách)' },
      { label: 'Pháp lý minh bạch', value: 'Sổ hồng lâu dài - Sẵn sàng công chứng ngay' },
      { label: 'Giá trị đầu tư tối ưu', value: 'Từ 7.5 Tỷ - 18 Tỷ VNĐ / Căn hoàn thiện Full nội thất' },
    ],
    location: {
      title: 'Trái Tim Tài Chính Thủ Thiêm — Vị Trí Vàng Sinh Lời Kép',
      desc: 'Nằm ngay giao lộ 2 trục đường quan trọng nhất Thủ Thiêm (Nguyễn Cơ Thạch & Đại lộ Vòng Cung), liền kề Trung tâm Hội nghị Triển lãm Quốc tế và Nhà hát Giao hưởng.',
      highlights: [
        'Chỉ 2 phút di chuyển qua Cầu Thủ Thiêm 1 sang thẳng trung tâm Quận Bình Thạnh & Q1',
        'Liền kề tuyến Metro số 2 (Bến Thành - Thủ Thiêm - Tham Lương) gia tăng giá trị đột phá',
        'Hưởng trọn vẹn hạ tầng Quảng trường trung tâm Thủ Thiêm quy mô 20 ha lớn nhất Đông Nam Á',
        'Khu vực tập trung các trụ sở ngân hàng quốc tế, quỹ đầu tư và chuyên gia Hàn Quốc/Châu Âu',
      ],
    },
    amenities: [
      { icon: '📈', title: 'Dịch Vụ Quản Lý Cho Thuê Trọn Gói AI', desc: 'Hệ thống tự động tìm kiếm khách thuê chuyên gia nước ngoài, thu tiền và bảo trì căn hộ cho bạn.' },
      { icon: '🏊', title: 'Hồ Bơi Muối Khoáng Trên Cao Tầng 5', desc: 'Hồ bơi phong cách resort sang trọng là điểm nhấn thu hút cộng đồng cư dân cao cấp thuê dài hạn.' },
      { icon: '☕', title: 'Co-working Space & Business Lounge', desc: 'Phòng họp và không gian làm việc trang bị màn hình tương tác dành cho doanh nhân làm việc tại nhà.' },
      { icon: '🛒', title: 'Shophouse Khối Đế Thương Mại Sầm Uất', desc: 'Quy tụ siêu thị GS25, Starbucks, nhà hàng Hàn Quốc ngay dưới chân nhà vô cùng tiện lợi.' },
      { icon: '💪', title: 'Phòng Gym & Yoga 360 View Thủ Thiêm', desc: 'Trang thiết bị hiện đại giúp cư dân thư giãn sau những giờ làm việc căng thẳng tại trung tâm tài chính.' },
      { icon: '🛡️', title: 'An Ninh Thẻ Từ & Camera AI 24/7', desc: 'Đảm bảo môi trường sống an toàn, văn minh tuyệt đối đáp ứng tiêu chuẩn khắt khe của chuyên gia Nhật/Hàn.' },
    ],
    floorPlans: [
      { floor: 'Căn Hộ 1PN (Thỏi Nam Châm Cho Thuê Chuyên Gia Hàn Quốc)', name: 'Unit #ZR-0908 · Căn Hộ Đầu Tư Tối Ưu Dòng Tiền', specs: '1 PN Master + Phòng khách ban công thoáng + Full nội thất chỉ việc xách vali vào ở/cho thuê', area: '60.5 m²', bedrooms: '1 PN + 1 WC', price: '7.8 Tỷ VNĐ (Thuê 28 Tr/tháng)' },
      { floor: 'Căn Hộ 2PN (Sản Phẩm Quốc Dân Dễ Mua Dễ Bán)', name: 'Unit #ZR-1605 · View Trực Diện Đại Lộ Vòng Cung', specs: '2 PN rộng rãi + Bếp có lô-gia thông gió riêng + Bàn giao thiết bị thông minh Hàn Quốc', area: '88.0 m²', bedrooms: '2 PN + 2 WC', price: '11.5 Tỷ VNĐ (Thuê 42 Tr/tháng)' },
      { floor: 'Căn Hộ 3PN Góc (Tích Sản Gia Tăng Giá Trị Bền Vững)', name: 'Unit #ZR-2201 · Căn Góc View Sông & Q1 Tuyệt Đẹp', specs: '3 Phòng ngủ Master tràn ngập ánh sáng tự nhiên + 2 Ban công riêng biệt sang trọng', area: '125.0 m²', bedrooms: '3 PN + 2 WC', price: '17.2 Tỷ VNĐ (Thuê 65 Tr/tháng)' },
    ],
    policies: [
      { title: 'Cam Kết Cho Thuê 2 Năm Đầu Tiên Lợi Nhuận 8.5%', desc: 'Được trả trước ngay tiền thuê 1 năm đầu bằng tiền mặt hoặc trừ trực tiếp vào giá mua căn hộ.', tag: 'CAM KẾT THUÊ 8.5%' },
      { title: 'Ngân Hàng BIDV & Shinhan Bank Hỗ Trợ 80%', desc: 'Lãi suất 0% và ân hạn nợ gốc trong 24 tháng, giúp tối ưu đòn bẩy tài chính cho nhà đầu tư.', tag: 'ĐÒN BẨY LÃI 0%' },
      { title: 'Chiết Khấu Thanh Toán Nhờ Đợt 7.5%', desc: 'Giảm ngay vào giá trị hợp đồng khi nhà đầu tư thanh toán theo lịch trình nhanh trong 30 ngày.', tag: 'CHIẾT KHẤU 7.5%' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80',
    ],
    progress: { status: 'Đã hoàn thiện & Bàn giao sổ hồng đúng cam kết', date: 'Tháng 07/2026', desc: 'Tòa tháp T1 và T2 đã sáng đèn 100% với cộng đồng chuyên gia Hàn Quốc và Âu Mỹ đang sinh sống đông đảo. Đang tiếp tục mở bán giỏ hàng Shophouse khối đế đợt cuối.' },
  },

  'mega-portal': {
    projectName: 'VINHOMES MULTI-PROJECT PORTAL SYSTEM',
    tagline: '★ REAL ESTATE DIRECTORY & MEGA PORTAL ★',
    heroTitle: 'HỆ THỐNG TRUY VẤN & PHÂN PHỐI ĐA DỰ ÁN TOÀN QUỐC',
    heroSubtitle: 'Quy tụ hơn 45+ đại đô thị và khu phức hợp đang mở bán trên toàn quốc, cập nhật bảng giá gốc trực tiếp từ chủ đầu tư cùng sơ đồ quỹ căn realtime.',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    badge: 'MULTI-PROJECT DIRECTORY · 45+ DỰ ÁN',
    theme: {
      bgHeader: 'bg-[#0F172A] text-white border-b border-indigo-500/30 shadow-lg',
      textHeader: 'text-indigo-400 font-extrabold',
      borderAccent: 'border-indigo-600',
      primaryBg: 'bg-[#F8FAFC]',
      primaryText: 'text-slate-900',
      secondaryBg: 'bg-white',
      accentBtn: 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-extrabold tracking-wider rounded-2xl shadow-xl shadow-indigo-600/30 uppercase px-8 py-4',
      accentText: 'text-indigo-600',
      cardBg: 'bg-white',
      cardBorder: 'border-slate-200 rounded-3xl shadow-sm',
      badgeStyle: 'bg-indigo-100 text-indigo-800 font-bold rounded-full border border-indigo-300 px-3 py-1',
      fontStyle: 'Inter, Plus Jakarta Sans, sans-serif',
    },
    stats: [
      { label: 'Tổng số dự án mở bán', value: '45+ Đại Đô Thị' },
      { label: 'Quỹ căn realtime', value: '12,500+ Căn Hộ & Biệt Thự' },
      { label: 'Mạng lưới đại lý F1', value: '120+ Sàn Giao Dịch' },
      { label: 'Cập nhật bảng giá', value: 'Trực Tiếp 24/7 từ CĐT' },
    ],
    overview: [
      { label: 'Hệ thống vận hành', value: 'Cổng thông tin tổng hợp PlatformBDS Mega Portal' },
      { label: 'Phạm vi phân phối', value: 'Toàn quốc (Hà Nội, TP.HCM, Hải Phòng, Quảng Ninh, Phú Quốc)' },
      { label: 'Chức năng nổi bật', value: 'Bộ lọc tìm kiếm thông minh theo mức giá, vị trí và loại hình BĐS' },
      { label: 'Tích hợp API trực tiếp', value: 'Đồng bộ giỏ hàng và khóa căn tự động theo thời gian thực' },
      { label: 'Hỗ trợ đối tác sàn F1', value: 'Cấp tài khoản Sub-agency riêng cho từng môi giới bán hàng' },
      { label: 'Phí bản quyền mẫu Portal', value: '8.500.000 VNĐ (Trọn gói Source Code + Database)' },
    ],
    location: {
      title: 'Mạng Lưới 45+ Dự Án Trải Dài Khắp Các Tỉnh Thành Trọng Điểm',
      desc: 'Hệ thống bản đồ tương tác GIS hiển thị chính xác vị trí, quy hoạch hạ tầng xung quanh và tiến độ thực tế của từng dự án trên toàn quốc.',
      highlights: [
        'Khu vực Miền Bắc: Vinhomes Ocean Park 1-2-3, Vinhomes Smart City, Vinhomes Royal Island Hải Phòng',
        'Khu vực Miền Nam: Vinhomes Grand Park Q9, Vinhomes Central Park, Masteri Centre Point',
        'Khu vực Nghỉ dưỡng biển: Phú Quốc United Center, Grand World, Vinpearl Nha Trang & Đà Nẵng',
        'Kết nối trực tiếp hệ thống dữ liệu quy hoạch giao thông quốc gia đến năm 2030',
      ],
    },
    amenities: [
      { icon: '🔍', title: 'Bộ Lọc Tìm Kiếm BĐS Thông Minh AI', desc: 'Truy xuất ngay lập tức quỹ căn theo yêu cầu khắt khe: hướng ban công, số tầng, tầm tài chính chính xác đến từng triệu đồng.' },
      { icon: '📊', title: 'Biểu Đồ So Sánh Giá Tự Động Realtime', desc: 'Công cụ giúp khách hàng so sánh giá bán, đơn giá m² và chính sách ưu đãi giữa 3-4 dự án cùng lúc.' },
      { icon: '📱', title: 'Ứng Dụng Khóa Căn & Đặt Cọc Online', desc: 'Môi giới và khách hàng có thể thao tác giữ chỗ và thanh toán cọc trực tuyến bảo mật tuyệt đối.' },
      { icon: '📂', title: 'Thư Viện Tài Liệu Sales Kit Trọn Gói', desc: 'Tải ngay Brochure HD, Bản vẽ CAD, Chính sách bán hàng PDF và Video 4K của tất cả dự án chỉ với 1 cú nhấp chuột.' },
      { icon: '💬', title: 'Tích Hợp Chat Zalo & CRM Quản Lý Khách', desc: 'Tự động phân bổ khách hàng đăng ký tư vấn về cho từng chuyên viên sale trực ca theo thời gian thực.' },
      { icon: '🗺️', title: 'Bản Đồ Quy Hoạch & VR 360 Toàn Cảnh', desc: 'Trải nghiệm bay flycam 360 độ và xem bản đồ quy hoạch chi tiết 1/500 của từng đại đô thị.' },
    ],
    floorPlans: [
      { floor: 'Phân Khu Đô Thị Biển Vinhomes Ocean Park 2-3 (Hưng Yên)', name: 'Siêu Quần Thể Đô Thị Biển 1.000 Ha', specs: 'Quy tụ 8 phân khu biệt thự phong cách Thế giới + Hồ tạo sóng lớn nhất thế giới Royal Wave Park', area: '1.000 ha', bedrooms: 'Liền kề / Biệt thự', price: 'Từ 8.5 Tỷ VNĐ' },
      { floor: 'Đại Đô Thị Công Viên Vinhomes Grand Park (TP. Thủ Đức)', name: 'Thành Phố Công Viên Thông Minh 271 Ha', specs: 'Công viên ánh sáng 36 ha + Trung tâm thương mại Vincom Mega Mall + Hệ thống trường Vinschool', area: '271 ha', bedrooms: 'Căn hộ / Dinh thự', price: 'Từ 2.5 Tỷ VNĐ' },
      { floor: 'Thành Phố Đảo Hoàng Gia Vinhomes Royal Island (Vũ Yên)', name: 'Đảo Hoàng Gia Riêng Biệt 877 Ha Tại Hải Phòng', specs: 'Biệt thự có bãi biển nước mặn riêng sau nhà + Sân Golf 36 hố + Học viện cưỡi ngựa Hoàng Gia', area: '877 ha', bedrooms: 'Biệt thự đảo sang trọng', price: 'Từ 18.5 Tỷ VNĐ' },
    ],
    policies: [
      { title: 'Chính Sách Đặc Quyền Dành Riêng Cho Khách Hàng Thân Thiết', desc: 'Hưởng chiết khấu thành viên Vinhomes Elite Club lên đến 1.5% cho tất cả các lần mua nhà tiếp theo.', tag: 'VIP ELITE CLUB 1.5%' },
      { title: 'Gói Giải Pháp Tài Chính An Cư 3 Không', desc: 'Không vốn đầu tư ban đầu (Vay 100% bằng tài sản đảm bảo) - Không áp lực tài chính - Không chờ đợi.', tag: 'VAY 100% LÃI 0%' },
      { title: 'Hỗ Trợ Chuyển Nhượng & Cho Thuê Lại Nhờ Hệ Thống Portal', desc: 'Đăng tin ký gửi chuyển nhượng và cho thuê miễn phí trên toàn hệ thống mạng lưới 120 sàn giao dịch F1.', tag: 'KÝ GỬI FREE 120 SÀN' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80',
    ],
    progress: { status: 'Hệ thống dữ liệu Portal đã cập nhật 100% giỏ hàng tháng 07/2026', date: 'Tháng 07/2026', desc: 'Tất cả 45 dự án trên Portal đều hiển thị thông số chính xác theo thời gian thực từ CĐT. Sẵn sàng phục vụ hàng triệu lượt truy cập tra cứu mỗi ngày.' },
  },
};

function getTemplateConfig(slug: string, template: Template): RealEstateConfig {
  if (TEMPLATE_CONFIGS[slug]) return TEMPLATE_CONFIGS[slug];

  const colors = [
    { primaryText: 'text-slate-900', accentBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white', accentText: 'text-emerald-600', borderAccent: 'border-emerald-600', bgHeader: 'bg-emerald-950 text-white' },
    { primaryText: 'text-slate-900', accentBtn: 'bg-indigo-600 hover:bg-indigo-700 text-white', accentText: 'text-indigo-600', borderAccent: 'border-indigo-600', bgHeader: 'bg-indigo-950 text-white' },
    { primaryText: 'text-slate-900', accentBtn: 'bg-purple-600 hover:bg-purple-700 text-white', accentText: 'text-purple-600', borderAccent: 'border-purple-600', bgHeader: 'bg-purple-950 text-white' },
    { primaryText: 'text-slate-900', accentBtn: 'bg-cyan-600 hover:bg-cyan-700 text-white', accentText: 'text-cyan-600', borderAccent: 'border-cyan-600', bgHeader: 'bg-cyan-950 text-white' },
  ];
  const colorIndex = Math.abs(slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
  const col = colors[colorIndex];

  return {
    projectName: template.name.toUpperCase() + ' ARCHITECTURAL COMPLEX',
    tagline: `★ ${template.collectionName.toUpperCase()} EXCLUSIVES ★`,
    heroTitle: template.sectionConfig?.heroTitle || `DỰ ÁN BIỂU TƯỢNG ${template.name.toUpperCase()}`,
    heroSubtitle: template.sectionConfig?.heroSubtitle || template.description || 'Không gian sống chuẩn mực quốc tế kết hợp cùng hạ tầng tiện ích xanh vượt trội, mang lại cơ hội an cư và đầu tư sinh lời vượt bậc.',
    heroImage: template.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    badge: template.badge || 'EXCLUSIVE RELEASE',
    theme: {
      bgHeader: col.bgHeader + ' backdrop-blur-md border-b border-white/10 shadow-lg',
      textHeader: 'text-white font-bold',
      borderAccent: col.borderAccent,
      primaryBg: 'bg-slate-50',
      primaryText: 'text-slate-900',
      secondaryBg: 'bg-white',
      accentBtn: col.accentBtn + ' rounded-2xl font-bold shadow-xl px-8 py-4 uppercase tracking-wider',
      accentText: col.accentText,
      cardBg: 'bg-white',
      cardBorder: 'border-slate-200/80 rounded-3xl shadow-sm',
      badgeStyle: col.accentBtn + ' text-xs px-3 py-1 font-bold rounded-full',
      fontStyle: template.themeConfig?.fontBody || 'Plus Jakarta Sans, sans-serif',
    },
    stats: [
      { label: 'Quy mô tổng thể', value: '18.5 ha cao cấp' },
      { label: 'Loại hình sản phẩm', value: 'Biệt thự & Căn hộ VIP' },
      { label: 'Tiêu chuẩn bàn giao', value: 'Full nội thất 5 sao' },
      { label: 'Pháp lý sở hữu', value: 'Sổ hồng vĩnh viễn' },
    ],
    overview: [
      { label: 'Tên chính thức', value: `${template.name} Premier Residences` },
      { label: 'Chủ đầu tư chiến lược', value: 'Tập đoàn Phát triển Đô thị Quốc tế PlatformBDS' },
      { label: 'Vị trí trọng điểm', value: 'Trung tâm hành chính mới - TP. Thủ Đức, Hồ Chí Minh' },
      { label: 'Đơn vị quản lý vận hành', value: 'CBRE Premium Management Services' },
      { label: 'Mật độ xây dựng cảnh quan', value: 'Chỉ 22% (78% dành cho hồ nước & tiện ích xanh)' },
      { label: 'Mức giá tham khảo', value: `${new Intl.NumberFormat('vi-VN').format(template.priceBuy || 499000)} VNĐ / Trọn Gói` },
    ],
    location: {
      title: 'Vị Trí Vàng Tâm Điểm Kết Nối Hạ Tầng Đô Thị',
      desc: 'Sở hữu địa thế đắt giá ngay giao điểm các tuyến trục huyết mạch, thuận tiện kết nối tới trung tâm kinh tế và các sân bay quốc tế trong khu vực.',
      highlights: [
        'Cách tuyến Metro số 1 và Trạm trung chuyển hành khách chỉ 3 phút di chuyển',
        'Liền kề cụm trường đại học quốc tế, Bệnh viện đa khoa quốc tế 1000 giường',
        'Cung đường đại lộ kết nối thẳng tới Trung tâm tài chính Thủ Thiêm và Quận 1',
        'Hạ tầng giao thông nội bộ lộ giới 30m, không gian thoáng đãng không ùn tắc',
      ],
    },
    amenities: [
      { icon: '🏊', title: 'Hồ Bơi Vô Cực Nhiệt Đới', desc: 'Hồ bơi chuẩn resort 5 sao với khu vực thư giãn tắm nắng dưới tán cọ xanh mát.' },
      { icon: '🌿', title: 'Công Viên Sinh Thái 5 Ha', desc: 'Đường dạo bộ ven hồ và khu vực cắm trại BBQ ngoài trời dành riêng cho gia đình.' },
      { icon: '🛡️', title: 'Hệ Thống An Ninh Smart K9', desc: 'Bảo vệ tuần tra 24/7 kết hợp camera AI tự động cảnh báo xâm nhập tuyệt đối an toàn.' },
      { icon: '🍷', title: 'Clubhouse & Lounge Ban Công', desc: 'Nhà câu lạc bộ với phòng tiếp khách sang trọng, thư viện và quán cafe độc quyền.' },
      { icon: '💪', title: 'Phòng Gym & Spa Thủy Liệu', desc: 'Trang thiết bị tập luyện hiện đại cùng phòng xông hơi thảo dược giúp tái tạo năng lượng.' },
      { icon: '🧸', title: 'Khu Vui Chơi Trẻ Em Trong Nhà', desc: 'Không gian phát triển thể chất và trí tuệ an toàn cho các cư dân nhí mỗi ngày.' },
    ],
    floorPlans: [
      { floor: 'Phân Khu Biệt Thự Song Lập (Villas)', name: 'Biệt Thự Vườn Cảnh Quan #01', specs: '3 Phòng ngủ Master + Sân vườn riêng 150m² + Gara ô tô đôi', area: '240 m²', bedrooms: '3 PN + 4 WC', price: '18.5 Tỷ VNĐ' },
      { floor: 'Phân Khu Căn Hộ Hạng Sang (Towers)', name: 'Căn Hộ Góc 3PN View Trực Diện Hồ', specs: 'Phòng khách thông thoáng kính tràn viền + Logia đôi rộng rãi', area: '112 m²', bedrooms: '3 PN + 2 WC', price: '7.8 Tỷ VNĐ' },
      { floor: 'Phân Khu Shophouse Thương Mại', name: 'Shophouse Mặt Tiền Đại Lộ 30m', specs: 'Tầng trệt kinh doanh trần cao 5.5m + 2 Tầng trên để ở tiện nghi', area: '180 m²', bedrooms: '2 PN + 3 WC', price: '22.0 Tỷ VNĐ' },
    ],
    policies: [
      { title: 'Chiết Khấu Thanh Toán Trực Tiếp 9%', desc: 'Giảm ngay vào giá trị hợp đồng khi khách hàng thanh toán sớm trong 15 ngày.', tag: 'CHIẾT KHẤU 9%' },
      { title: 'Hỗ Trợ Vay Ngân Hàng Lãi Suất 0%', desc: 'Miễn gốc và lãi trong 24 tháng hoặc đến khi nhận bàn giao nhà thực tế.', tag: 'VAY 0% 24T' },
      { title: 'Tặng Gói Quản Lý Dịch Vụ 5 Năm', desc: 'Miễn phí hoàn toàn phí quản lý vận hành từ đơn vị quốc tế trong 5 năm đầu.', tag: 'FREE 5 NĂM QL' },
    ],
    gallery: [
      template.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      template.screenshots?.[0] || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      template.screenshots?.[1] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      template.screenshots?.[2] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80',
    ],
    progress: { status: 'Đang triển khai thi công phần thân & hạ tầng', date: 'Tháng 07/2026', desc: 'Đã hoàn tất 100% phần móng hầm và cảnh quan đường giao thông nội khu. Đang đẩy nhanh thi công lên tầng 15 của các tòa tháp chính.' },
  };
}

export default function DemoRenderer({ template, viewport = 'desktop', initialPage = 'home' }: DemoRendererProps) {
  const slug = template.slug?.toLowerCase() || '';
  const sourceSlug = String(template.sectionConfig?.sourceSlug || slug).toLowerCase();
  const colSlug = template.collectionSlug?.toLowerCase() || '';
  const page = normalizePageSlug(initialPage);

  const renderContent = () => {
    // 01. Luxury Gold
    if (['01', 'bds-01', 'portal-01', 'luxury-gold', 'portal-classic'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS01Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 02. Minimal White
    if (['02', 'bds-02', 'portal-02', 'minimal-white', 'minimal-zen', 'portal-modern'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS02Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 03. Modern Corporate
    if (['03', 'bds-03', 'portal-03', 'modern-corporate', 'portal-luxury'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS03Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 04. Resort Paradise
    if (['04', 'bds-04', 'portal-04', 'resort-paradise', 'ocean-view'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS04Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 05. Smart Urban City (An Viên Nha Trang)
    if (['05', 'bds-05', 'portal-05', 'urban-city', 'smart-urban', 'smartcity'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS05Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 06. Industrial Estate
    if (['06', 'bds-06', 'portal-06', 'industrial-estate', 'industrial-logistics'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS06Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 07. Villa Royal Garden
    if (['07', 'bds-07', 'portal-07', 'villa-royal', 'villa-premium', 'luxury-villa'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS07Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 08. Green Eco Living
    if (['08', 'bds-08', 'portal-08', 'eco-green', 'eco-living', 'green-eco'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS08Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 09. Classic Heritage
    if (['09', 'bds-09', 'portal-09', 'classic-heritage', 'heritage-colonial', 'classic-elegant'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS09Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 10. Investment Pro Hub
    if (['10', 'bds-10', 'portal-10', 'investment-pro', 'invest-yield'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS10Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 11. Agency Marketing OnePage
    if (['11', 'bds-11', 'portal-11', 'agency-onepage', 'agency-marketing'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS11Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 12. Mega Developer Portal
    if (['12', 'bds-12', 'portal-12', 'mega-developer', 'listing-portal'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS12Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 13. Auction Bidding Platform
    if (['13', 'bds-13', 'portal-13', 'auction-platform', 'auction-template'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS13Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 14. LandPlot Masterplan
    if (['14', 'bds-14', 'portal-14', 'landplot-masterplan', 'landplot-template', 'land-plot'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS14Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 15. Retail & Shophouse Podium
    if (['15', 'bds-15', 'portal-15', 'retail-shophouse', 'retail-podium'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS15Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 16. Top Personal Broker
    if (['16', 'bds-16', 'portal-16', 'personal-top-broker', 'personal-agent', 'elite-broker'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS16Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 17. Portal BĐS Số 1 (Hà Nội Heritage)
    if (['17', 'bds-17', 'portal-17', 'portal-bds-so1', 'portal-listing', 'hanoi-capital'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS17Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 18. Sàn Giao Dịch & Đấu Giá Bến Thành Bds123
    if (['18', 'bds-18', 'portal-18', 'bds123-benthanh', 'bds123-portal', 'saigon-riverfront'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS18Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 19. Sàn Niêm Yết Mật Độ Cao Nhà Đất Số
    if (['19', 'bds-19', 'portal-19', 'nhadatso-density', 'nhadatso-portal'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS19Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 20. Chung Cư Minh Khai & Times City
    if (['20', 'bds-20', 'portal-20', 'minhkhai-timescity', 'minhkhai-apartment'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS20Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 21. Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội
    if (['21', 'bds-21', 'portal-21', 'hanoi-rental-portal', 'hanoi-rental'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS21Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 22. ZoHotels & Happy Land Nha Trang
    if (['22', 'bds-22', 'portal-22', 'happyland-zohotels', 'happyland-resort'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS22Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 23. Sàn Giao Dịch Nhà Phố Homeo
    if (['23', 'bds-23', 'portal-23', 'homeo-agency', 'homeo-multithumb'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS23Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // 24. RealtyBuild Trang Tin BĐS Số 1 Việt Nam
    if (['24', 'bds-24', 'portal-24', 'realtybuild-tech', 'realtybuild-portal'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <BDS24Template template={template} viewport={viewport} initialPage={initialPage} />;
    }

    // ─── SPECIALIZED HIGH-CONVERTING SALES LANDING PAGES ───
    // LP-01: Landing Page Căn Hộ Chung Cư Cao Cấp
    if (['lp-01', 'landing-01', 'luxury-condo-lp', 'condos-sales'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <LP01Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // LP-02: Landing Page Biệt Thự & Nghỉ Dưỡng Hoàng Gia
    if (['lp-02', 'landing-02', 'villa-resort-lp', 'resort-sales'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <LP02Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // LP-03: Landing Page Đất Nền Phân Lô F0
    if (['lp-03', 'landing-03', 'landplot-lp', 'land-sales'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <LP03Template template={template} viewport={viewport} initialPage={initialPage} />;
    }
    // LP-04: Landing Page Sale BĐS Cá Nhân / Broker Uy Tín
    if (['lp-04', 'landing-04', 'broker-authority-lp', 'personal-broker-sales'].some(k => slug.includes(k) || sourceSlug.includes(k))) {
      return <LP04Template template={template} viewport={viewport} initialPage={initialPage} />;
    }

    return <BDS17Template template={template} viewport={viewport} initialPage={initialPage} />;
  };

  return (
    <div className={`demo-viewport-wrapper demo-viewport-${viewport || 'desktop'} w-full relative`}>
      <div className="demo-core-content">{renderContent()}</div>
      <AIChatWidget
        websiteName={template.name}
        hotline="0905.568.888"
        zalo="0905.568.888"
      />
    </div>
  );
}

function DefaultFallbackTemplate({ template, viewport = 'desktop' }: DemoRendererProps) {
  const cfg = useMemo(() => getTemplateConfig(template.slug, template), [template]);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState(0);
  const [leadFormSubmitted, setLeadSubmitted] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadUnitType, setLeadUnitType] = useState('3 Phòng Ngủ Master');

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadPhone) {
      alert('Vui lòng nhập số điện thoại để chuyên viên tư vấn gửi bảng giá qua Zalo!');
      return;
    }
    setLeadSubmitted(true);
    alert(`🎉 Đã tiếp nhận đăng ký của khách hàng: ${leadName || 'Quý khách'} (${leadPhone}).\nChuyên viên tư vấn senior sẽ gửi bảng giá chi tiết đợt mới nhất qua Zalo trong 3 phút!`);
  };

  return (
    <div className={`min-h-screen ${cfg.theme.primaryBg} ${cfg.theme.primaryText} transition-all duration-300`} style={{ fontFamily: cfg.theme.fontStyle }}>
      
      {/* ── 1. STICKY TOP HEADER & NAVIGATION ── */}
      <header style={{ top: viewport === 'desktop' ? '56px' : 0 }} className={`sticky z-40 px-4 sm:px-8 h-20 flex items-center justify-between transition-all ${cfg.theme.bgHeader}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-black text-amber-500 text-lg shadow-sm">
            👑
          </div>
          <div>
            <span className={`font-black text-lg tracking-wider block leading-tight ${cfg.theme.textHeader}`}>
              {cfg.projectName}
            </span>
            <span className="text-[10px] tracking-widest text-slate-400 block uppercase font-medium">
              {cfg.badge}
            </span>
          </div>
        </div>

        <nav className="hidden xl:flex items-center gap-7 text-xs font-bold tracking-wider uppercase opacity-90">
          <a href="#hero" className="hover:text-blue-500 transition-colors">Trang chủ</a>
          <a href="#overview" className="hover:text-blue-500 transition-colors">Tổng quan</a>
          <a href="#location" className="hover:text-blue-500 transition-colors">Vị trí</a>
          <a href="#amenities" className="hover:text-blue-500 transition-colors">Tiện ích</a>
          <a href="#floorplans" className="hover:text-blue-500 transition-colors">Mặt bằng</a>
          <a href="#pricing" className="hover:text-blue-500 transition-colors">Bảng giá</a>
          <a href="#gallery" className="hover:text-blue-500 transition-colors">Thư viện</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:0919006030"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 hover:border-blue-500 text-xs font-bold uppercase transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>Hotline: 0919 006 030</span>
          </a>
          <a
            href="#lead-form"
            className={`px-5 py-2.5 text-xs font-black rounded-xl shadow-lg transition-all ${cfg.theme.accentBtn}`}
          >
            Tải Bảng Giá VIP
          </a>
        </div>
      </header>

      {/* ── 2. HERO SHOWCASE & LEAD CAPTURE FORM ── */}
      <section id="hero" className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-8 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Project Branding & Selling Points */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase shadow-sm ${cfg.theme.badgeStyle}`}>
              {cfg.tagline}
            </span>
            
            <h1 className="text-4xl sm:text-6xl font-black leading-[1.12] tracking-tight">
              {cfg.heroTitle}
            </h1>
            
            <p className="text-base sm:text-lg opacity-80 leading-relaxed max-w-2xl font-normal">
              {cfg.heroSubtitle}
            </p>

            {/* Key Metrics Grid right on Hero */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 pb-2">
              {cfg.stats.map((st, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <p className="text-[11px] font-bold uppercase tracking-wider opacity-60 mb-1">{st.label}</p>
                  <p className={`text-base sm:text-lg font-black ${cfg.theme.accentText}`}>{st.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="#floorplans" 
                className={`flex items-center gap-2 px-8 py-4 text-sm shadow-xl hover:scale-105 transition-all ${cfg.theme.accentBtn}`}
              >
                Khám Phá Sơ Đồ Mặt Bằng <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#gallery" 
                className="px-8 py-4 rounded-2xl border border-slate-300 dark:border-slate-700 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <Eye className="w-4 h-4" /> Xem Nhà Mẫu Thực Tế
              </a>
            </div>
          </div>

          {/* Right: Lead Capture Box right above the fold */}
          <div className="lg:col-span-5">
            <div className={`p-8 sm:p-10 rounded-[32px] shadow-2xl border ${cfg.theme.cardBorder} ${cfg.theme.cardBg} relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="text-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 block w-fit mx-auto mb-3 animate-pulse">
                  🔥 ĐĂNG KÝ NHẬN BẢNG GIÁ ĐỢT 1
                </span>
                <h3 className="text-2xl font-black">Chốt Ưu Đãi Chiết Khấu 10%</h3>
                <p className="text-xs opacity-70 mt-1.5">Bảng giá gốc trực tiếp CĐT & Chính sách vay lãi suất 0%</p>
              </div>

              {leadFormSubmitted ? (
                <div className="p-8 text-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h4 className="text-lg font-bold text-emerald-500">Đã Nhận Yêu Cầu Thành Công!</h4>
                  <p className="text-xs opacity-80 leading-relaxed">
                    Chuyên viên tư vấn dự án <strong>{cfg.projectName}</strong> đang chuẩn bị file Bảng Giá PDF & Mặt Bằng HD để gửi qua Zalo cho quý khách ngay.
                  </p>
                  <button 
                    onClick={() => setLeadSubmitted(false)}
                    className="text-xs font-bold underline opacity-80 hover:opacity-100 pt-2 block mx-auto"
                  >
                    Đăng ký cho người thân
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">Họ & Tên Quý Khách (*)</label>
                    <input 
                      type="text" 
                      placeholder="Ví dụ: Nguyễn Văn A..." 
                      value={leadName}
                      onChange={e => setLeadName(e.target.value)}
                      required 
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm font-medium focus:outline-none focus:border-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">Số Điện Thoại / Zalo Nhận Bảng Giá (*)</label>
                    <input 
                      type="tel" 
                      placeholder="Ví dụ: 0919 006 030..." 
                      value={leadPhone}
                      onChange={e => setLeadPhone(e.target.value)}
                      required 
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm font-bold focus:outline-none focus:border-blue-500 text-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">Dòng Sản Phẩm Quan Tâm</label>
                    <select 
                      value={leadUnitType}
                      onChange={e => setLeadUnitType(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm font-medium focus:outline-none focus:border-blue-500"
                    >
                      <option className="bg-slate-900 text-white value">Căn 1 Phòng Ngủ / Studio VIP</option>
                      <option className="bg-slate-900 text-white value">Căn 2 Phòng Ngủ Family</option>
                      <option className="bg-slate-900 text-white value">Căn 3 Phòng Ngủ Master</option>
                      <option className="bg-slate-900 text-white value">Biệt Thự / Penthouse Sân Vườn</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className={`w-full py-4 text-sm shadow-2xl transition-all ${cfg.theme.accentBtn}`}
                  >
                    🚀 Gửi Yêu Cầu Nhận Bảng Giá Ngay
                  </button>
                  <p className="text-[11px] text-center opacity-60 pt-1">
                    🔒 Thông tin của quý khách được bảo mật tuyệt đối 100% theo tiêu chuẩn CĐT.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. PROJECT OVERVIEW & QUICK FACTS TABLE ── */}
      <section id="overview" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className={`text-xs font-bold uppercase tracking-widest block mb-2 ${cfg.theme.accentText}`}>
            ★ PROJECT QUICK FACTS ★
          </span>
          <h2 className="text-3xl sm:text-4xl font-black">Tổng Quan & Thông Số Kỹ Thuật Dự Án</h2>
          <p className="text-sm opacity-70 mt-2">Thông tin minh bạch, đầy đủ pháp lý và thông số quy hoạch chính thức từ chủ đầu tư.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-800">
            <img src={cfg.heroImage} alt="Overview" className="w-full h-[460px] object-cover hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cfg.overview.map((ov, idx) => (
              <div key={idx} className={`p-6 rounded-2xl border ${cfg.theme.cardBorder} ${cfg.theme.cardBg} shadow-sm`}>
                <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1.5">{ov.label}</p>
                <p className="text-base font-extrabold leading-snug">{ov.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. STRATEGIC LOCATION & CONNECTIVITY ── */}
      <section id="location" className={`py-20 px-4 sm:px-8 border-t border-b border-slate-200/60 ${cfg.theme.secondaryBg}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className={`text-xs font-bold uppercase tracking-widest block ${cfg.theme.accentText}`}>
              ★ LOCATION & CONNECTIVITY ★
            </span>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">
              {cfg.location.title}
            </h2>
            <p className="text-base opacity-80 leading-relaxed">
              {cfg.location.desc}
            </p>

            <div className="space-y-4 pt-2">
              {cfg.location.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 shadow-sm">
                  <div className={`p-2 rounded-xl bg-blue-500/10 shrink-0 ${cfg.theme.accentText}`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold leading-snug">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-[32px] overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 relative bg-slate-900 text-white p-8 text-center min-h-[420px] flex flex-col justify-center items-center">
              <Compass className="w-16 h-16 text-blue-400 mb-4 animate-spin-slow" />
              <h4 className="text-2xl font-black mb-2">Bản Đồ Vị Trí & Hạ Tầng Giao Thông</h4>
              <p className="text-xs text-slate-400 max-w-md mb-6">Sơ đồ vị trí kim cương kết nối trực tiếp các tuyến Metro, Cao tốc trọng điểm và Trung tâm thành phố.</p>
              <button 
                onClick={() => alert('Đang tải bản đồ chỉ đường Google Maps độ phân giải cao 4K...')}
                className={`px-8 py-4 text-xs shadow-xl transition-all ${cfg.theme.accentBtn}`}
              >
                🗺️ Mở Bản Đồ Chỉ Đường Trực Tiếp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. 5-STAR AMENITIES SHOWCASE ── */}
      <section id="amenities" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className={`text-xs font-bold uppercase tracking-widest block mb-2 ${cfg.theme.accentText}`}>
            ★ WORLD-CLASS AMENITIES ★
          </span>
          <h2 className="text-3xl sm:text-4xl font-black">Hệ Thống Tiện Ích Đỉnh Cao Dành Riêng Cho Cư Dân</h2>
          <p className="text-sm opacity-70 mt-2">Trải nghiệm phong cách sống nghỉ dưỡng 5 sao ngay tại ngôi nhà của mình với đặc quyền tiện ích riêng biệt.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cfg.amenities.map((am, idx) => (
            <div key={idx} className={`p-8 rounded-3xl border ${cfg.theme.cardBorder} ${cfg.theme.cardBg} shadow-sm hover:shadow-xl transition-all`}>
              <span className="text-4xl block mb-4">{am.icon}</span>
              <h4 className="text-lg font-black mb-2.5">{am.title}</h4>
              <p className="text-xs opacity-75 leading-relaxed">{am.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. INTERACTIVE FLOOR PLAN & UNIT SPECIFIER ── */}
      <section id="floorplans" className={`py-20 px-4 sm:px-8 border-t border-b border-slate-200/60 ${cfg.theme.secondaryBg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className={`text-xs font-bold uppercase tracking-widest block mb-2 ${cfg.theme.accentText}`}>
              ★ INTERACTIVE UNIT SELECTOR ★
            </span>
            <h2 className="text-3xl sm:text-4xl font-black">Mặt Bằng & Chọn Căn Hộ Tương Tác</h2>
            <p className="text-sm opacity-70 mt-2">Bấm chọn từng dòng sản phẩm để xem thông số diện tích, thiết kế bố trí phòng và giá bán tham khảo trọn gói.</p>
          </div>

          {/* Tab Selector */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {cfg.floorPlans.map((fp, i) => (
              <button
                key={i}
                onClick={() => setSelectedFloorPlan(i)}
                className={`px-6 py-3.5 rounded-2xl text-xs font-black transition-all ${
                  selectedFloorPlan === i
                    ? cfg.theme.accentBtn
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 opacity-80 hover:opacity-100'
                }`}
              >
                {fp.floor}
              </button>
            ))}
          </div>

          {/* Active Floor Plan Card */}
          {cfg.floorPlans[selectedFloorPlan] && (
            <div className={`p-8 sm:p-12 rounded-[32px] border ${cfg.theme.cardBorder} ${cfg.theme.cardBg} shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}>
              <div className="lg:col-span-5 space-y-5">
                <span className={`inline-block px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${cfg.theme.badgeStyle}`}>
                  {cfg.floorPlans[selectedFloorPlan].floor}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black leading-snug">
                  {cfg.floorPlans[selectedFloorPlan].name}
                </h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  {cfg.floorPlans[selectedFloorPlan].specs}
                </p>

                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-slate-200/60 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] font-bold uppercase opacity-60 block">Diện tích thông thủy</span>
                    <strong className="text-lg font-black">{cfg.floorPlans[selectedFloorPlan].area}</strong>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase opacity-60 block">Bố trí phòng</span>
                    <strong className="text-lg font-black">{cfg.floorPlans[selectedFloorPlan].bedrooms}</strong>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase opacity-60 block">Giá bán trọn gói dự kiến</span>
                  <p className={`text-3xl font-black mt-1 ${cfg.theme.accentText}`}>
                    {cfg.floorPlans[selectedFloorPlan].price}
                  </p>
                </div>

                <a
                  href="#lead-form"
                  className={`block w-full text-center py-4 text-xs font-black rounded-xl shadow-lg transition-all ${cfg.theme.accentBtn}`}
                >
                  🚀 Đặt Lịch Xem Căn Mẫu #{selectedFloorPlan + 1}08 Ngay
                </a>
              </div>

              <div className="lg:col-span-7 rounded-3xl overflow-hidden bg-slate-900/10 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 p-4 sm:p-8 flex items-center justify-center min-h-[380px]">
                <div className="text-center space-y-4 max-w-md">
                  <SlidersHorizontal className="w-16 h-16 text-blue-500 mx-auto opacity-80" />
                  <h4 className="text-xl font-bold">Bản Vẽ Chi Tiết Mặt Bằng 2D / 3D</h4>
                  <p className="text-xs opacity-70">Mặt bằng bố trí chuẩn công năng cho căn hộ <strong>{cfg.floorPlans[selectedFloorPlan].name}</strong> với góc nhìn tối ưu ánh sáng tự nhiên.</p>
                  <button 
                    onClick={() => alert(`Đang tải file CAD / PDF Mặt bằng chi tiết căn ${cfg.floorPlans[selectedFloorPlan].name}...`)}
                    className="px-6 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold shadow hover:scale-105 transition-transform"
                  >
                    📥 Tải Bản Vẽ Mặt Bằng Full HD (PDF)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 7. PRICING & SALES POLICIES ── */}
      <section id="pricing" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className={`text-xs font-bold uppercase tracking-widest block mb-2 ${cfg.theme.accentText}`}>
            ★ PRICING & SPECIAL POLICIES ★
          </span>
          <h2 className="text-3xl sm:text-4xl font-black">Chính Sách Bán Hàng & Ưu Đãi Tài Chính VIP</h2>
          <p className="text-sm opacity-70 mt-2">Cơ hội đầu tư an toàn với giải pháp hỗ trợ tài chính vượt trội từ các ngân hàng đối tác hàng đầu.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cfg.policies.map((pol, i) => (
            <div key={i} className={`p-8 rounded-3xl border ${cfg.theme.cardBorder} ${cfg.theme.cardBg} shadow-sm relative flex flex-col justify-between`}>
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-500 mb-4">
                  🔥 {pol.tag}
                </span>
                <h4 className="text-xl font-black mb-3 leading-snug">{pol.title}</h4>
                <p className="text-xs opacity-75 leading-relaxed mb-6">{pol.desc}</p>
              </div>
              <a
                href="#lead-form"
                className="text-xs font-bold flex items-center gap-1.5 opacity-80 hover:opacity-100 hover:translate-x-1 transition-all pt-4 border-t border-slate-200/60 dark:border-slate-800"
              >
                <span>Nhận tư vấn điều khoản cụ thể</span> <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. PROJECT GALLERY & 360 VIRTUAL TOUR ── */}
      <section id="gallery" className={`py-20 px-4 sm:px-8 border-t border-b border-slate-200/60 ${cfg.theme.secondaryBg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className={`text-xs font-bold uppercase tracking-widest block mb-2 ${cfg.theme.accentText}`}>
              ★ REALITY PHOTO GALLERY ★
            </span>
            <h2 className="text-3xl sm:text-4xl font-black">Thư Viện Hình Ảnh Thực Tế & Không Gian Mẫu</h2>
            <p className="text-sm opacity-70 mt-2">Hình ảnh chất lượng 4K mô tả kiến trúc mặt ngoài, sảnh đón tiếp khách sạn 6 sao và nội thất căn hộ mẫu.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cfg.gallery.map((imgUrl, idx) => (
              <div key={idx} className="group relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-800 aspect-[16/10]">
                <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Kiến trúc mẫu #{idx + 1}</span>
                  <h4 className="text-lg font-extrabold">{cfg.projectName} — Góc Nhìn Độc Quyền</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CONSTRUCTION PROGRESS UPDATE ── */}
      <section id="progress" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className={`p-8 sm:p-14 rounded-[32px] border ${cfg.theme.cardBorder} ${cfg.theme.cardBg} shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}>
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-xs uppercase tracking-wider">
              🟢 CẬP NHẬT TIẾN ĐỘ THỰC TẾ
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              {cfg.progress.status} ({cfg.progress.date})
            </h3>
            <p className="text-sm opacity-80 leading-relaxed max-w-2xl">
              {cfg.progress.desc}
            </p>
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <a
              href="#lead-form"
              className={`inline-flex items-center justify-center px-8 py-4 text-xs font-black shadow-xl transition-all ${cfg.theme.accentBtn}`}
            >
              📋 Nhận Báo Cáo Thi Công Hàng Tháng
            </a>
          </div>
        </div>
      </section>

      {/* ── 10. BOTTOM STICKY LEAD FORM & FOOTER ── */}
      <section id="lead-form" className={`py-24 px-4 sm:px-8 border-t border-slate-200/60 ${cfg.theme.secondaryBg}`}>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className={`text-xs font-bold uppercase tracking-widest block ${cfg.theme.accentText}`}>
            ★ BOOK PRIVATE VIEWING & CONSULTATION ★
          </span>
          <h2 className="text-3xl sm:text-5xl font-black leading-tight">
            Đăng Ký Tham Quan Nhà Mẫu & Nhận Bảng Giá Trực Tiếp
          </h2>
          <p className="text-base opacity-80 leading-relaxed">
            Chuyên viên tư vấn cao cấp sẵn sàng đồng hành cùng quý khách 24/7 để lựa chọn căn đẹp nhất với mức giá chiết khấu tối ưu.
          </p>

          <form onSubmit={handleLeadSubmit} className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">Họ & Tên (*)</label>
                <input 
                  type="text" 
                  placeholder="Họ và tên..." 
                  value={leadName}
                  onChange={e => setLeadName(e.target.value)}
                  required 
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm font-medium focus:outline-none focus:border-blue-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">Số Điện Thoại / Zalo (*)</label>
                <input 
                  type="tel" 
                  placeholder="0919 006 030..." 
                  value={leadPhone}
                  onChange={e => setLeadPhone(e.target.value)}
                  required 
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm font-bold focus:outline-none focus:border-blue-500 text-blue-500" 
                />
              </div>
            </div>
            <button 
              type="submit" 
              className={`w-full py-4 text-sm shadow-2xl transition-all ${cfg.theme.accentBtn}`}
            >
              🔥 XÁC NHẬN ĐĂNG KÝ NHẬN BẢNG GIÁ VIP & CHỌN CĂN ĐẸP
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 dark:border-slate-800 py-16 px-4 sm:px-8 bg-slate-950 text-slate-400 text-xs text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="font-extrabold text-white text-base uppercase tracking-wider">
            {cfg.projectName} — SÀN GIAO DỊCH & PHÂN PHỐI CHÍNH THỨC F1
          </p>
          <p className="max-w-2xl mx-auto leading-relaxed">
            Trụ sở sàn giao dịch: Tòa nhà Platform Tower, 68 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh. Hotline Concierge 24/7: <strong>0919 006 030</strong>.
          </p>
          <p className="opacity-60 pt-4 border-t border-slate-800">
            Bản quyền mẫu website <strong>{template.name}</strong> thuộc về kho giao diện TEMPLATES BDS Marketplace. Tích hợp sẵn hệ thống CMS Quản lý tin đăng tự động & Tối ưu SEO Google 100/100.
          </p>
        </div>
      </footer>

    </div>
  );
}

