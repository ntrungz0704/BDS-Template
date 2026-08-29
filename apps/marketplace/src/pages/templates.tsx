import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import DetailsModal from '../components/DetailsModal';
import { ALL_TEMPLATES, Template } from '../data/templatesData';
import { DESIGN_COLLECTIONS } from '../data/collectionsData';
import { Search, Sparkles, CheckCircle2, SlidersHorizontal, Grid } from 'lucide-react';
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
    { id: 'all', label: 'Tất cả', count: ALL_TEMPLATES.length },
    { id: 'PORTAL_SAN', label: 'Cổng Tin & Sàn BĐS', count: 5 },
    { id: 'CHUNG_CU', label: 'Căn Hộ & Chung Cư', count: 3 },
    { id: 'BIET_THU', label: 'Biệt Thự & Villa', count: 4 },
    { id: 'NGHI_DUONG', label: 'Nghỉ Dưỡng & Biển', count: 3 },
    { id: 'CA_NHAN', label: 'Nhà Phố & Môi Giới', count: 4 },
    { id: 'DAT_THUONG_MAI', label: 'Đất Nền & Đầu Tư', count: 4 },
    { id: 'KCN_NHA_XUONG', label: 'KCN & Nhà Xưởng', count: 1 },
  ];

  const filteredTemplates = ALL_TEMPLATES.filter((tpl) => {
    const matchSearch = tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tpl.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tpl.collectionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tpl.slug.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchSearch) return false;

    if (activeCategory === 'all') return true;
    if (activeCategory === 'PORTAL_SAN') {
      return ['bds-17', 'bds-18', 'bds-19', 'bds-21', 'bds-24'].includes(tpl.slug);
    }
    if (activeCategory === 'CHUNG_CU') {
      return ['bds-02', 'bds-05', 'bds-20'].includes(tpl.slug);
    }
    if (activeCategory === 'BIET_THU') {
      return ['bds-01', 'bds-07', 'bds-09', 'bds-12'].includes(tpl.slug);
    }
    if (activeCategory === 'NGHI_DUONG') {
      return ['bds-04', 'bds-08', 'bds-22'].includes(tpl.slug);
    }
    if (activeCategory === 'CA_NHAN') {
      return ['bds-11', 'bds-13', 'bds-16', 'bds-23'].includes(tpl.slug);
    }
    if (activeCategory === 'DAT_THUONG_MAI') {
      return ['bds-03', 'bds-10', 'bds-14', 'bds-15'].includes(tpl.slug);
    }
    if (activeCategory === 'KCN_NHA_XUONG') {
      return ['bds-06'].includes(tpl.slug);
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceBuy - b.priceBuy;
    if (sortBy === 'price-desc') return b.priceBuy - a.priceBuy;
    return a.sortOrder - b.sortOrder;
  });

  return (
    <>
      <Head>
        <title>Bộ Sưu Tập {ALL_TEMPLATES.length} Mẫu Website Bất Động Sản Việt Nam | TEMPLATES BDS</title>
        <meta name="description" content={`${ALL_TEMPLATES.length} mẫu website BĐS Việt Nam: sàn giao dịch, căn hộ, đất nền, villa, nghỉ dưỡng, công nghiệp và môi giới cá nhân.`} />
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
              {ALL_TEMPLATES.length} Mẫu Website <span className="text-[#2563EB]">Bất Động Sản Việt Nam</span>
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
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-base font-bold text-slate-800 mb-1">Không tìm thấy mẫu website nào phù hợp</p>
              <p className="text-xs text-slate-500 mb-4">Hãy thử từ khóa khác hoặc chọn tất cả phân khúc</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="px-5 py-2 bg-[#2563EB] text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-colors shadow-sm"
              >
                Xem toàn bộ {ALL_TEMPLATES.length} mẫu
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
                Tất cả {ALL_TEMPLATES.length} mẫu website của PlatformBDS đều đi kèm bộ CMS quản lý tin đăng độc quyền, hỗ trợ cập nhật giá, giỏ hàng, thông báo Zalo OA tự động khi có khách đăng ký.
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
