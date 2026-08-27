import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import DetailsModal from '../components/DetailsModal';
import { ALL_TEMPLATES, Template } from '../data/templatesData';
import { DESIGN_COLLECTIONS } from '../data/collectionsData';
import { Search, Sparkles, CheckCircle2, SlidersHorizontal, Layers, Grid } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function TemplatesPage() {
  const router = useRouter();
  const { addToCart } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | any | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'family'>('grid');

  useEffect(() => {
    if (router.isReady) {
      const q = (router.query.search || router.query.q) as string;
      if (q) {
        setSearchQuery(q);
      }
    }
  }, [router.isReady, router.query]);

  const categories = [
    { id: 'all', label: '🌟 Tất cả 16 Mẫu' },
    { id: 'luxury', label: '👑 Luxury & Villa' },
    { id: 'minimal', label: '⚡ Apple Minimal' },
    { id: 'corporate', label: '🏢 Corporate & Sàn' },
    { id: 'resort', label: '🏝️ Resort Nghỉ Dưỡng' },
    { id: 'apartment', label: '🏙️ Smart Urban' },
    { id: 'industrial', label: '⚙️ Industrial B2B' },
    { id: 'eco', label: '🌿 Eco Living' },
    { id: 'classic', label: '📜 Classic Heritage' },
    { id: 'investment', label: '📈 Investment Pro' },
    { id: 'agency', label: '🎯 Agency Ads' },
    { id: 'developer', label: '🌐 Mega Portal' },
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
        <title>Bộ Sưu Tập 16 Mẫu Website Bất Động Sản Chuyên Nghiệp | TEMPLATES BDS</title>
        <meta name="description" content="16 Mẫu website BĐS độc quyền: Luxury, Minimal, Corporate, Resort, Industrial, Villa, Eco, Classic, Investment, Agency, Developer." />
      </Head>

      <Header 
        onSearch={(q) => setSearchQuery(q)} 
        onOpenConsultation={() => router.push('/contact')} 
        onOpenAuth={() => router.push('/login')} 
      />

      <main className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-24 pt-8 sm:pt-12 px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          {/* Header Banner */}
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-600 mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Kho Giao Diện BĐS Độc Quyền
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-3">
              16 Mẫu Website <span className="text-[#2563EB]">Chuẩn SEO & Đẳng Cấp</span>
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-medium">
              Mỗi mẫu được thiết kế riêng biệt cho từng phân khúc BĐS, tích hợp sẵn CMS quản trị tin đăng, form thu thập khách hàng (Leads) và tối ưu chuyển đổi cao.
            </p>
          </div>

          {/* Filter and Search Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-3 items-center justify-between mb-4">
              {/* Search input */}
              <form onSubmit={(e) => { e.preventDefault(); }} className="relative w-full lg:w-[380px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm mẫu, phân khúc (luxury, villa, shophouse)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                />
              </form>

              {/* View Mode & Sort selector */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      viewMode === 'grid' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" /> Lưới xem nhanh
                  </button>
                  <button
                    onClick={() => setViewMode('family')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      viewMode === 'family' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" /> Theo Bộ Sưu Tập
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 font-bold shadow-sm"
                  >
                    <option value="featured">Nổi bật nhất</option>
                    <option value="price-asc">Giá: Thấp đến cao</option>
                    <option value="price-desc">Giá: Cao đến thấp</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Categories pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-500/25 scale-[1.02]'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Display */}
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-base font-bold text-slate-800 mb-1">Không tìm thấy mẫu website nào phù hợp</p>
              <p className="text-xs text-slate-500 mb-4">Hãy thử từ khóa khác hoặc chọn tất cả phân khúc</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="px-5 py-2 bg-[#2563EB] text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-colors shadow-sm"
              >
                Xem toàn bộ 17 mẫu
              </button>

            </div>
          ) : viewMode === 'family' && activeCategory === 'all' && searchQuery === '' ? (
            /* Family Architecture Grouped View */
            <div className="space-y-8">
              {DESIGN_COLLECTIONS.map((col) => {
                const familyTemplates = filteredTemplates.filter(t => t.collectionSlug === col.collectionSlug);
                if (familyTemplates.length === 0) return null;
                return (
                  <div key={col.id} className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                      {/* Left: Family Specifications & Story */}
                      <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100 pb-5 lg:pb-0 lg:pr-6">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200">
                              {col.badge}
                            </span>
                          </div>
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">{col.name}</h2>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">{col.description}</p>
                          
                          <div className="space-y-2 bg-slate-50 rounded-xl p-3.5 text-xs border border-slate-100">
                            <div className="flex items-center gap-2 text-slate-700 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                              <span>Phong cách: <strong>{col.designLanguage.mood}</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-700 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                              <span>Tối ưu chuẩn SEO & Tốc độ tải trang &lt; 1s</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-700 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0"></span>
                              <span>Tích hợp CMS quản trị & CRM thu thập Leads</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                          <span>Phù hợp: <strong className="text-slate-800">{col.targetMarket.split(',')[0]}</strong></span>
                          <span className="text-blue-600 font-bold">{familyTemplates.length} Mẫu thiết kế</span>
                        </div>
                      </div>

                      {/* Right: Template Cards in this Family */}
                      <div className={`lg:col-span-7 grid ${familyTemplates.length > 1 ? 'grid-cols-1 md:grid-cols-2 gap-4' : 'grid-cols-1 max-w-md mx-auto w-full'}`}>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          onSelect={(tpl, defaultType) => {
            setSelectedTemplate(null);
            addToCart(tpl, defaultType || 'BUY');
            router.push('/cart');
          }}
        />
      )}

      <Footer />
    </>
  );
}
