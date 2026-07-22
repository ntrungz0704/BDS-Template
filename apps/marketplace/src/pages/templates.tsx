import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import DetailsModal from '../components/DetailsModal';
import { ALL_TEMPLATES, Template } from '../data/templatesData';
import { DESIGN_COLLECTIONS } from '../data/collectionsData';
import { Search, Sparkles, CheckCircle2, SlidersHorizontal, Layers, Grid } from 'lucide-react';

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | any | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'family'>('family');

  const categories = [
    { id: 'all', label: '🌟 Tất cả 16 Mẫu Độc Quyền' },
    { id: 'luxury', label: '👑 Luxury & Villa' },
    { id: 'minimal', label: '⚡ Apple Minimal' },
    { id: 'corporate', label: '🏢 Corporate & Sàn' },
    { id: 'resort', label: '🏝️ Resort Nghỉ Dưỡng' },
    { id: 'apartment', label: '🏙️ Smart Urban' },
    { id: 'industrial', label: '⚙️ Industrial B2B' },
    { id: 'eco', label: '🌿 Eco Living' },
    { id: 'classic', label: '📜 Classic Heritage' },
    { id: 'investment', label: '📈 Investment Pro' },
    { id: 'agency', label: '🎯 Agency One-Page' },
    { id: 'developer', label: '🌐 Mega Developer Portal' },
  ];

  const filteredTemplates = ALL_TEMPLATES.filter((tpl) => {
    const matchSearch = tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tpl.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tpl.collectionName.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchSearch) return false;

    if (activeCategory === 'all') return true;
    if (activeCategory === 'luxury' && (tpl.collectionSlug === 'luxury' || tpl.collectionSlug === 'villa')) return true;
    if (activeCategory === 'minimal' && tpl.collectionSlug === 'minimal') return true;
    if (activeCategory === 'corporate' && tpl.collectionSlug === 'corporate') return true;
    if (activeCategory === 'resort' && tpl.collectionSlug === 'resort') return true;
    if (activeCategory === 'apartment' && tpl.collectionSlug === 'apartment') return true;
    if (activeCategory === 'industrial' && tpl.collectionSlug === 'industrial') return true;
    if (activeCategory === 'eco' && tpl.collectionSlug === 'eco') return true;
    if (activeCategory === 'classic' && tpl.collectionSlug === 'classic') return true;
    if (activeCategory === 'investment' && tpl.collectionSlug === 'investment') return true;
    if (activeCategory === 'agency' && tpl.collectionSlug === 'agency') return true;
    if (activeCategory === 'developer' && tpl.collectionSlug === 'developer') return true;
    return tpl.collectionSlug === activeCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceBuy - b.priceBuy;
    if (sortBy === 'price-desc') return b.priceBuy - a.priceBuy;
    return a.sortOrder - b.sortOrder;
  });

  return (
    <>
      <Head>
        <title>Bộ Sưu Tập 16 Mẫu Website Bất Động Sản Chuyên Nghiệp | PLATFORMBDS</title>
        <meta name="description" content="16 Mẫu website BĐS độc quyền theo kiến trúc Phase-2 Design Families: Luxury, Minimal, Corporate, Resort, Industrial, Villa, Eco, Classic, Investment, Agency, Developer." />
      </Head>

      <Header 
        onSearch={(q) => setSearchQuery(q)} 
        onOpenConsultation={() => alert('Vui lòng liên hệ hotline 0919 006 030 để được tư vấn chọn mẫu!')} 
        onOpenAuth={() => alert('Vui lòng đăng ký/đăng nhập tại trang chủ!')} 
      />

      <main className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-24 pt-12 px-5 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          {/* Header Banner */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Phase 2 Architecture — Design Families & Scalability
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 mb-4">
              Kho Giao Diện <span className="text-[#2563EB]">16 Mẫu Sản Phẩm Độc Lập</span>
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-medium">
              Mỗi mẫu là một sản phẩm thương mại độc lập với <span className="text-[#2563EB] font-bold">ThemeConfig</span>, <span className="text-cyan-600 font-bold">LayoutConfig</span> và <span className="text-emerald-600 font-bold">Wireframe</span> hoàn toàn khác biệt. Khách hàng có thể trải nghiệm trực tiếp từng demo sống động trước khi lựa chọn.
            </p>
          </div>

          {/* Filter and Search Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 mb-10 shadow-lg shadow-slate-100">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
              {/* Search input */}
              <div className="relative w-full lg:w-[420px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm theo tên mẫu, phân khúc (luxury, villa, KCN)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium shadow-inner"
                />
              </div>

              {/* View Mode & Sort selector */}
              <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-end">
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setViewMode('family')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      viewMode === 'family' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" /> Theo Bộ Sưu Tập (Family)
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      viewMode === 'grid' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" /> Lưới Tất Cả
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-slate-500 shrink-0" />
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 font-bold shadow-sm"
                  >
                    <option value="featured">Nổi bật & Khuyên dùng</option>
                    <option value="price-asc">Giá mua đứt: Thấp đến cao</option>
                    <option value="price-desc">Giá mua đứt: Cao đến thấp</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Categories pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100/80">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Display */}
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <p className="text-lg font-bold text-slate-800 mb-2">Không tìm thấy mẫu website nào phù hợp</p>
              <p className="text-sm text-slate-500 mb-6">Hãy thử từ khóa khác hoặc chọn tất cả phân khúc</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="px-6 py-2.5 bg-[#2563EB] text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-colors shadow-md shadow-blue-500/20"
              >
                Xem toàn bộ 16 mẫu
              </button>
            </div>
          ) : viewMode === 'family' && activeCategory === 'all' && searchQuery === '' ? (
            /* Family Architecture Grouped View */
            <div className="space-y-12">
              {DESIGN_COLLECTIONS.map((col) => {
                const familyTemplates = filteredTemplates.filter(t => t.collectionSlug === col.collectionSlug);
                if (familyTemplates.length === 0) return null;
                return (
                  <div key={col.id} className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                      {/* Left: Family Specifications & Story */}
                      <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-8">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-200">
                              {col.badge}
                            </span>
                          </div>
                          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">{col.name}</h2>
                          <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">{col.description}</p>
                          
                          <div className="space-y-3 bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 text-xs">
                            <div>
                              <span className="font-bold text-slate-900 block mb-0.5">🎨 Design Mood & UI Token:</span>
                              <span className="text-slate-600">{col.designLanguage.mood}</span>
                            </div>
                            <div className="pt-2 border-t border-slate-200/60 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-600">
                              <div><span className="font-bold text-slate-800">Typography:</span> {col.typography.fontHeading}</div>
                              <div><span className="font-bold text-slate-800">Grid:</span> {col.designLanguage.spacingSystem.split('—')[0]}</div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                          <span>Khách hàng: <strong className="text-slate-800">{col.targetMarket.split(',')[0]}</strong></span>
                          <span className="text-[#2563EB] font-bold">1 Sản phẩm Độc lập</span>
                        </div>
                      </div>

                      {/* Right: Template Cards in this Family */}
                      <div className={`lg:col-span-7 grid ${familyTemplates.length > 1 ? 'grid-cols-1 md:grid-cols-2 gap-6' : 'grid-cols-1 max-w-xl mx-auto w-full'}`}>
                        {familyTemplates.map((template) => (
                          <div key={template.id} className="h-full">
                            <ProductCard
                              template={template}
                              onSelect={(tpl) => setSelectedTemplate(tpl)}
                              onOpenDetails={(tpl) => setSelectedTemplate(tpl)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Standard Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template) => (
                <div key={template.id} className="h-full">
                  <ProductCard
                    template={template}
                    onSelect={(tpl) => setSelectedTemplate(tpl)}
                    onOpenDetails={(tpl) => setSelectedTemplate(tpl)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Benefits Banner */}
          <div className="mt-20 rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white p-8 sm:p-12 shadow-xl shadow-blue-600/15">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight">
                Được tích hợp sẵn công nghệ bán hàng BĐS hàng đầu
              </h2>
              <p className="text-blue-100 text-sm mb-8 leading-relaxed font-medium">
                Tất cả 16 mẫu website của PlatformBDS đều đi kèm bộ CMS quản lý tin đăng độc quyền, hỗ trợ cập nhật giá, giỏ hàng, thông báo Zalo OA tự động khi có khách đăng ký.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                {[
                  'Tải trang siêu tốc < 1s',
                  'Tích hợp Zalo & Hotline',
                  'Quản lý Lead trực quan',
                  'Bảo hành & Cập nhật'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-white bg-white/10 backdrop-blur px-3 py-2.5 rounded-xl border border-white/15">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal chi tiết mẫu */}
      {selectedTemplate && (
        <DetailsModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
          onSelect={(tpl) => {
            setSelectedTemplate(null);
            alert(`Bạn đã chọn ${tpl.name}. Đội ngũ PlatformBDS sẽ liên hệ ngay!`);
          }}
        />
      )}

      <Footer />
    </>
  );
}
