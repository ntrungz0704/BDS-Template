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
  'mock-1': {
    accentColor: '#C5A028', badge: 'LUXURY',
    screenshots: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800','https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800','https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'],
    targetAudience: ['Chủ đầu tư', 'Biệt thự & Villa', 'Penthouse hạng S', 'Luxury Agency'],
    highlights: ['Hero Video Fullscreen', 'Parallax Scrolling', 'Gallery Masonry', 'Dark Mode Luxury', 'Floor Plan 3D', 'Sticky Contact VIP'],
    availablePages: ['Trang chủ', 'Bộ sưu tập biệt thự', 'Chi tiết dự án', 'Gallery', 'Liên hệ', '404'],
    modules: ['Lead Form VIP', 'CRM', 'SEO', 'Google Maps', 'Video', 'Zalo', 'Facebook Pixel'],
    benefits: ['Thu hút khách hàng VIP', 'Tăng uy tín thương hiệu', 'Responsive hoàn hảo', 'Dễ quản lý qua CMS'],
  },
  'mock-2': {
    accentColor: '#2563EB', badge: 'MINIMAL',
    screenshots: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800','https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800','https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'],
    targetAudience: ['Môi giới cá nhân', 'Nhà phố', 'Chung cư hiện đại', 'Startup BĐS'],
    highlights: ['Hero Split Layout', 'Typography Apple Style', 'White Space Chuẩn', 'Card Sạch Bo Góc', 'Sticky Header', 'Lazy Loading'],
    availablePages: ['Trang chủ', 'Dự án', 'Giới thiệu', 'Tin tức', 'Liên hệ', 'FAQ', '404'],
    modules: ['Lead Form', 'SEO', 'Google Analytics', 'Messenger', 'Zalo', 'CMS'],
    benefits: ['Tải nhanh điểm số cao', 'Dễ dùng, không cần IT', 'Thể hiện chuyên nghiệp', 'Tối ưu mobile'],
  },
  'mock-3': {
    accentColor: '#0F4C81', badge: 'CORPORATE',
    screenshots: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800','https://images.unsplash.com/photo-1497366216548-37526070297c?w=800','https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800'],
    targetAudience: ['Tổng công ty BĐS', 'Sàn môi giới lớn', 'Doanh nghiệp', 'Tập đoàn'],
    highlights: ['Grid Dự án lớn', 'Khu vực Đối tác', 'Mega Menu', 'Trang Tuyển dụng', 'Timeline'],
    availablePages: ['Trang chủ', 'Giới thiệu', 'Dự án', 'Đối tác', 'Tuyển dụng', 'Tin tức', 'Liên hệ'],
    modules: ['CRM', 'Lead Form', 'SEO', 'Google Maps', 'Facebook Pixel', 'Zalo OA', 'Banner'],
    benefits: ['Xây dựng thương hiệu mạnh', 'Quản lý nhiều dự án', 'Tuyển dụng hiệu quả', 'Chuẩn doanh nghiệp'],
  },
  'mock-4': {
    accentColor: '#0369A1', badge: 'RESORT',
    screenshots: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800','https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800','https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800'],
    targetAudience: ['Khu nghỉ dưỡng biển', 'Villa resort', 'Condotel ven biển', 'BĐS du lịch'],
    highlights: ['Video Hero Autoplay', 'Booking Module', 'Amenities Gallery', 'Bản đồ Vị trí', '360° Experience'],
    availablePages: ['Trang chủ', 'Resort', 'Tiện ích', 'Gallery', 'Đặt phòng', 'Vị trí', 'Liên hệ'],
    modules: ['Booking Form', 'Video', 'Google Maps', 'Lead Form', 'Zalo', 'SEO'],
    benefits: ['Trải nghiệm nghỉ dưỡng', 'Tăng tỷ lệ đặt cọc', 'Showcase không gian', 'Thu hút khách ngoại tỉnh'],
  },
  'mock-5': {
    accentColor: '#7C3AED', badge: 'URBAN',
    screenshots: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800','https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800','https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=800'],
    targetAudience: ['Chung cư đô thị', 'Smart City', 'Apartment', 'Dự án mới'],
    highlights: ['Hero Smart Search', 'Interactive Map', 'Bộ lọc thông minh', 'Máy tính ROI', 'Stats Realtime'],
    availablePages: ['Trang chủ', 'Tìm kiếm', 'Bản đồ', 'Chi tiết căn hộ', 'Đầu tư', 'Tin tức'],
    modules: ['Smart Filter', 'Google Maps API', 'ROI Calculator', 'Lead Form', 'CRM', 'SEO'],
    benefits: ['Tìm kiếm thông minh', 'Hiển thị bản đồ trực quan', 'Tính toán đầu tư', 'Tăng chuyển đổi'],
  },
  'mock-6': {
    accentColor: '#374151', badge: 'INDUSTRIAL',
    screenshots: ['https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800','https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800','https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800'],
    targetAudience: ['Nhà xưởng', 'Khu công nghiệp', 'Logistics & Kho bãi', 'B2B BĐS'],
    highlights: ['Bản đồ Vị trí KCN', 'Thông số Kỹ thuật', 'Kết nối Hạ tầng', 'B2B Contact', 'Brochure PDF'],
    availablePages: ['Trang chủ', 'Hạ tầng', 'Vị trí & Giao thông', 'Tiện ích', 'Nhà xưởng', 'Liên hệ'],
    modules: ['B2B Lead Form', 'Google Maps', 'Brochure PDF', 'SEO B2B', 'Zalo OA'],
    benefits: ['Phù hợp B2B doanh nghiệp', 'Thể hiện vị trí rõ ràng', 'Thu hút nhà đầu tư FDI', 'Chuẩn professional'],
  },
  'mock-7': {
    accentColor: '#B45309', badge: 'VILLA 3D',
    screenshots: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800','https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800','https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=800'],
    targetAudience: ['Villa cao cấp', 'Biệt thự đơn lẻ', 'Shophouse', 'Dự án villa phân khu'],
    highlights: ['3D Tour Ảo', 'Floor Plan Interactive', 'Gallery Full-Screen', 'Sun Chart', 'Masterplan'],
    availablePages: ['Trang chủ', 'Bộ sưu tập Villa', 'Mặt bằng', 'Tour 3D', 'Gallery', 'Vị trí'],
    modules: ['3D Tour', 'Floor Plan', 'Lead Form', 'Google Maps', 'CRM', 'Zalo'],
    benefits: ['Trải nghiệm tham quan ảo', 'Thuyết phục khách từ xa', 'Showcase không gian sống', 'Tăng tỷ lệ chốt'],
  },
  'mock-8': {
    accentColor: '#16A34A', badge: 'ECO GREEN',
    screenshots: ['https://images.unsplash.com/photo-1448630360428-65456885c650?w=800','https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=800','https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'],
    targetAudience: ['Nhà ở xanh', 'Ecopark', 'Vinhomes sinh thái', 'Nhà vườn sinh thái'],
    highlights: ['Green Hero Toàn màn hình', 'Timeline Cây Xanh', 'Tiện ích Ngoài trời', 'Cộng đồng xanh'],
    availablePages: ['Trang chủ', 'Không gian xanh', 'Tiện ích', 'Cảnh quan', 'Cộng đồng', 'Liên hệ'],
    modules: ['Lead Form', 'Google Maps', 'Gallery', 'Video', 'SEO', 'Zalo', 'CMS'],
    benefits: ['Thu hút gia đình trẻ', 'Định vị sống xanh', 'Showcase thiên nhiên', 'Cộng đồng gắn kết'],
  },
  'mock-9': {
    accentColor: '#9F1239', badge: 'CLASSIC',
    screenshots: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800','https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
    targetAudience: ['Doanh nghiệp lâu năm', 'Sàn truyền thống', 'Thị trường tỉnh thành'],
    highlights: ['Thiết kế Classic Thanh lịch', 'Timeline Lịch sử', 'Thành tích & Giải thưởng', 'Testimonials'],
    availablePages: ['Trang chủ', 'Lịch sử', 'Dự án', 'Thành tích', 'Gallery', 'Đội ngũ', 'Liên hệ'],
    modules: ['CRM', 'Lead Form', 'SEO', 'Google Maps', 'Zalo', 'Messenger'],
    benefits: ['Xây dựng uy tín lâu dài', 'Phù hợp thị trường truyền thống', 'Showcase thành tích'],
  },
  'mock-10': {
    accentColor: '#1E40AF', badge: 'INVESTMENT',
    screenshots: ['https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800','https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800','https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'],
    targetAudience: ['Nhà đầu tư', 'Fund BĐS', 'Financial Advisor', 'Quỹ đầu tư'],
    highlights: ['ROI Calculator', 'Market Chart Realtime', 'Investment Dashboard', 'Cashflow Analysis'],
    availablePages: ['Trang chủ', 'ROI', 'Phân tích thị trường', 'Tăng trưởng', 'Máy tính', 'Tin tức'],
    modules: ['ROI Calculator', 'Chart.js', 'Google Analytics', 'Lead Form', 'CRM', 'SEO'],
    benefits: ['Thuyết phục nhà đầu tư', 'Dữ liệu minh bạch', 'Phân tích chuyên sâu', 'Thu hút FDI'],
  },
  'mock-11': {
    accentColor: '#DB2777', badge: 'ONE PAGE',
    screenshots: ['https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800','https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800','https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800'],
    targetAudience: ['Agency BĐS', 'Event Marketing', 'Mở bán', 'Chiến dịch quảng cáo'],
    highlights: ['One Page Scroll', 'Sticky CTA nổi', 'Lead Capture Tối ưu', 'Popup Form', 'Countdown Timer'],
    availablePages: ['Landing Page (1 trang hoàn chỉnh)'],
    modules: ['Popup Lead', 'Countdown', 'Facebook Pixel', 'Google Ads', 'Zalo Ads', 'CRM'],
    benefits: ['Tối ưu conversion', 'Phù hợp chạy quảng cáo', 'Tải siêu nhanh', 'Lead chất lượng cao'],
  },
  'mock-12': {
    accentColor: '#0F172A', badge: 'MEGA',
    screenshots: ['https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800','https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800','https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
    targetAudience: ['Tập đoàn lớn', 'Multi-Project Developer', 'Portal BĐS', 'IPO Company'],
    highlights: ['Mega Hero Fullscreen', 'Multi-Project Portal', 'Investor Relations', 'Media Center', 'CSR Section'],
    availablePages: ['Trang chủ', 'Dự án', 'Nhà đầu tư', 'Tin tức', 'Sự kiện', 'Media', 'CSR', 'Tuyển dụng'],
    modules: ['CRM', 'Lead Form', 'Google Analytics', 'Facebook Pixel', 'SEO Enterprise', 'CMS Pro'],
    benefits: ['Phù hợp tập đoàn lớn', 'Quản lý đa dự án', 'Investor Relations', 'Media & PR'],
  },
  'mock-new-1': {
    accentColor: '#EF4444', badge: 'AUCTION',
    screenshots: ['https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800','https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800'],
    targetAudience: ['Sàn đấu giá', 'Sàn môi giới lớn'],
    highlights: ['Sàn đấu giá trực tuyến', 'Pháp lý minh bạch', 'Bidding System', 'Timer Countdown'],
    availablePages: ['Trang chủ', 'Đang đấu giá', 'Liên hệ'],
    modules: ['Auction System', 'Payment Gateway'],
    benefits: ['Mua bán giá tốt', 'Cạnh tranh minh bạch'],
  },
  'mock-new-2': {
    accentColor: '#D4A373', badge: 'LAND PLOT',
    screenshots: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800','https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800'],
    targetAudience: ['Chủ đầu tư đất nền', 'Đại lý phân phối'],
    highlights: ['Bản đồ phân lô trực quan', 'Vị trí tiềm năng', 'Mặt bằng phân lô', 'Báo giá'],
    availablePages: ['Trang chủ', 'Mặt bằng', 'Liên hệ'],
    modules: ['Interactive Map', 'Lead Form'],
    benefits: ['Phân lô bán nền dễ dàng', 'Trực quan hóa vị trí'],
  },
  'mock-15': {
    accentColor: '#d97706', badge: 'RETAIL & SHOPHOUSE',
    screenshots: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800','https://images.unsplash.com/photo-1519567281023-eb3e9b1390d4?w=800'],
    targetAudience: ['Chủ đầu tư trung tâm thương mại', 'Shophouse khối đế'],
    highlights: ['Sơ đồ mặt bằng Retail', 'Pop-up Leasing', 'Bản đồ gian hàng 3D', 'Booking mặt bằng kinh doanh'],
    availablePages: ['Trang chủ', 'Gian hàng', 'Liên hệ'],
    modules: ['Store Locator', 'Booking Form'],
    benefits: ['Cho thuê dễ dàng', 'Quản lý mặt bằng'],
  },
  'mock-16': {
    accentColor: '#4f46e5', badge: 'TOP PERFORMER',
    screenshots: ['https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800','https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800'],
    targetAudience: ['Môi giới cá nhân', 'Chuyên viên tư vấn độc lập'],
    highlights: ['Tập trung Personal Branding', 'Review từ khách hàng', 'Profile chuyên nghiệp', 'Slider dự án', 'Booking tư vấn'],
    availablePages: ['Trang chủ (One Page)'],
    modules: ['Booking Calendar', 'Testimonials'],
    benefits: ['Xây dựng thương hiệu cá nhân', 'Tăng độ tin cậy'],
  },
};

export default function DetailsModal({ template, onClose, onSelect }: DetailsModalProps) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [techOpen, setTechOpen] = useState(false);

  const tAny = template as any;
  const fallbackExtra = TEMPLATE_EXTRA[template.id] || TEMPLATE_EXTRA['mock-1'];
  const extra = {
    screenshots: tAny.screenshots && tAny.screenshots.length > 0 ? tAny.screenshots : fallbackExtra.screenshots,
    accentColor: tAny.accentColor || fallbackExtra.accentColor,
    badge: tAny.badge || fallbackExtra.badge,
    targetAudience: tAny.targetAudience || fallbackExtra.targetAudience,
    highlights: tAny.highlights || fallbackExtra.highlights,
    availablePages: tAny.availablePages || fallbackExtra.availablePages,
    modules: tAny.modules || fallbackExtra.modules,
    benefits: tAny.benefits || fallbackExtra.benefits,
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
                        ['Framework', 'Next.js 15 + TypeScript'],
                        ['Database', 'PostgreSQL + Prisma'],
                        ['Styling', 'Tailwind CSS v3'],
                        ['Hosting', 'VPS / Vercel / Docker'],
                        ['Responsive', 'Mobile, Tablet, Desktop'],
                        ['PageSpeed', '90+ / 100'],
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

                <div className="mb-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs text-slate-400 line-through font-semibold">799.000đ</span>
                    <span className="text-[10px] bg-rose-50 text-rose-600 font-extrabold px-1.5 py-0.5 rounded border border-rose-200">
                      Ưu đãi -38%
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-blue-600">499.000đ</span>
                    <span className="text-xs text-slate-500 font-bold">/ trọn gói</span>
                  </div>
                </div>

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
                      href={process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'}
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
