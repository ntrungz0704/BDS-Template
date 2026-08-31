import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import DetailsModal from '../components/DetailsModal';
import { Search, Sparkles, CheckCircle2, SlidersHorizontal, Grid } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { WEBSITE_TEMPLATES } from '../data/templatesData';

const API_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com');

export default function TemplatesPage() {
  const router = useRouter();
  const { addToCart } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);
  const [templates, setTemplates] = useState<any[]>(WEBSITE_TEMPLATES);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [isCatalogLoading, setIsCatalogLoading] = useState(false);
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

  useEffect(() => {
    let active = true;
    const loadCatalog = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/marketplace/templates`, {
          params: { limit: 100, productType: 'WEBSITE_TEMPLATE' },
          timeout: 8000,
        });
        if (!response.data?.success || !Array.isArray(response.data?.data)) throw new Error('Danh mục không hợp lệ.');
        // Filter strictly to canonical 24 BDS website templates (bds-01..bds-24)
        const canonicalSlugs = new Set(WEBSITE_TEMPLATES.map(w => w.slug));
        const canonicalOnly = response.data.data.filter((tpl: any) => 
          canonicalSlugs.has(tpl.slug) || tpl.slug.startsWith('bds-')
        );
        if (active && canonicalOnly.length > 0) {
          setTemplates(canonicalOnly);
        }
      } catch (error) {
        // Fallback to static WEBSITE_TEMPLATES
        if (active) setTemplates(WEBSITE_TEMPLATES);
      }
    };
    loadCatalog();
    return () => { active = false; };
  }, []);

  const categories = [
    { id: 'all', label: 'Tất cả', count: templates.length },
    ...Array.from(new Set(templates.map((t) => t.category || t.collectionSlug).filter(Boolean))).map((id: string) => {
      const tplForLabel = templates.find(t => (t.category || t.collectionSlug) === id);
      return {
        id,
        label: tplForLabel?.collectionName || id.replace(/_/g, ' '),
        count: templates.filter((t) => (t.category || t.collectionSlug) === id).length,
      };
    }),
  ];

  const filteredTemplates = templates.filter((tpl) => {
    const haystack = [tpl.name, tpl.description, tpl.shortDescription, tpl.category || tpl.collectionSlug, tpl.slug]
      .filter(Boolean).join(' ').toLocaleLowerCase('vi-VN');
    const matchSearch = haystack.includes(searchQuery.toLocaleLowerCase('vi-VN'));
    if (!matchSearch) return false;
    return activeCategory === 'all' || (tpl.category || tpl.collectionSlug) === activeCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return (a.salePrice ?? a.priceBuy ?? 0) - (b.salePrice ?? b.priceBuy ?? 0);
    if (sortBy === 'price-desc') return (b.salePrice ?? b.priceBuy ?? 0) - (a.salePrice ?? a.priceBuy ?? 0);
    return a.sortOrder - b.sortOrder;
  });

  return (
    <>
      <Head>
        <title>{`Bộ Sưu Tập ${templates.length} Mẫu Website Bất Động Sản Việt Nam | TEMPLATES BDS`}</title>
        <meta name="description" content={`${templates.length} mẫu website BĐS đang được phát hành.`} />
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
              {templates.length} Mẫu Website <span className="text-[#2563EB]">Bất Động Sản Việt Nam</span>
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
                  placeholder="Tìm theo số mẫu hoặc loại hình BĐS..."
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
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Templates Display */}
          {isCatalogLoading ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm text-sm text-slate-600">Đang tải danh mục sản phẩm…</div>
          ) : catalogError ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-base font-bold text-slate-800 mb-1">Không thể tải danh mục</p>
              <p className="text-xs text-slate-500">{catalogError}</p>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-base font-bold text-slate-800 mb-1">Không tìm thấy mẫu website nào phù hợp</p>
              <p className="text-xs text-slate-500 mb-4">Hãy thử từ khóa khác hoặc chọn tất cả phân khúc</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="px-5 py-2 bg-[#2563EB] text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-colors shadow-sm"
              >
                Xem toàn bộ {templates.length} mẫu
              </button>
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
                Tất cả {templates.length} mẫu website đang phát hành đều đi kèm CMS theo cấu hình sản phẩm.
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
