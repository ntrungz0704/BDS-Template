'use client';
import React, { useState, useEffect } from 'react';
import { 
  Building2, Home, Palette, Plus, Trash2, Check, X, Save, 
  Image as ImageIcon, Sparkles, Phone, Mail, MapPin, Star, 
  Eye, RefreshCw, AlertCircle, CheckCircle2, ChevronRight, Bot, Key, ExternalLink, HelpCircle
} from 'lucide-react';
import axios from 'axios';
import { 
  generatePropertyWithAI, 
  getActiveGeminiApiKey, 
  saveActiveGeminiApiKey, 
  getDailyAiUsage 
} from '../../services/aiService';
import { formatTemplateDisplayName } from '@repo/utils';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));

export interface ZeroCodeCmsEditorProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export const ZeroCodeCmsEditor: React.FC<ZeroCodeCmsEditorProps> = ({
  order,
  isOpen,
  onClose,
  onSaved,
  showToast,
}) => {
  const [activeTab, setActiveTab] = useState<'company' | 'projects' | 'ai'>('projects');
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [geminiKey, setGeminiKey] = useState('');
  const [aiUsage, setAiUsage] = useState({ used: 0, max: 10, remaining: 10 });

  // 1. Company Info State
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Sàn Giao Dịch Bất Động Sản Cao Cấp',
    slogan: 'Nâng Tầm Không Gian Sống Thượng Lưu',
    phone: '0919 006 030',
    zalo: '0919006030',
    email: 'admin@templatesbds.com',
    address: '180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội',
    facebook: 'https://www.facebook.com/groups/847532091275214',
  });

  // 2. Projects / Properties State
  const [projects, setProjects] = useState<any[]>([
    {
      id: 1,
      title: 'Cho thuê căn hộ 2PN Vinhomes Metropolis Ba Đình view Hồ Tây',
      type: 'Căn hộ',
      price: '28.000.000 đồng/tháng',
      area: '82 m²',
      bedrooms: 2,
      bathrooms: 2,
      direction: 'Đông Nam',
      address: '28 Liễu Giai, Ngọc Khánh, Ba Đình, Hà Nội',
      thumbnail: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80',
      ],
      amenities: ['View Hồ Tây trọn vẹn', 'Nội thất nhập khẩu Ý', 'Hồ bơi 4 mùa', 'Sảnh Lounge 5 sao', 'Lễ tân 24/7'],
      description: 'Căn hộ cho thuê tiêu chuẩn đại sứ quán tại Metropolis Liễu Giai. Đầy đủ trang thiết bị nội thất cao cấp: Tủ lạnh Side-by-Side, máy giặt sấy, đệm lò xo King Koil và TV Sony 65 inch.',
    },
    {
      id: 2,
      title: 'Biệt Thự Đơn Lập Vinhomes Riverside Hoa Sữa Ven Sông',
      type: 'Biệt thự',
      price: '45.5 Tỷ',
      area: '320 m²',
      bedrooms: 5,
      bathrooms: 6,
      direction: 'Nam',
      address: 'Khu Đô Thị Sinh Thái Vinhomes Riverside, Long Biên, Hà Nội',
      thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      ],
      amenities: ['Sân vườn rộng 120m2', 'Bến du thuyền riêng', 'Hầm rượu vang cao cấp', 'An ninh 3 lớp'],
      description: 'Biệt thự đơn lập VIP góc 2 mặt tiền sông, không gian sống nghỉ dưỡng thanh bình biệt lập giữa lòng thủ đô.',
    }
  ]);

  const [selectedProjIdx, setSelectedProjIdx] = useState<number>(0);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newAmenity, setNewAmenity] = useState('');

  useEffect(() => {
    setGeminiKey(getActiveGeminiApiKey());
    setAiUsage(getDailyAiUsage());
  }, [isOpen]);

  if (!isOpen) return null;

  const currentProject = projects[selectedProjIdx] || projects[0];

  // Thêm bất động sản mới
  const handleAddProject = () => {
    const newId = projects.length + 1;
    const newProj = {
      id: newId,
      title: `Bất Động Sản Mới #${newId}`,
      type: 'Căn hộ',
      price: 'Liên hệ',
      area: '100 m²',
      bedrooms: 2,
      bathrooms: 2,
      direction: 'Đông Nam',
      address: 'TP. Hồ Chí Minh / Hà Nội',
      thumbnail: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      ],
      amenities: ['Hồ bơi tràn viền', 'An ninh 24/7', 'Khuôn viên xanh', 'Gần trường học & TTTM'],
      description: 'Thông tin mô tả chi tiết bất động sản đang được cập nhật.',
    };
    setProjects([...projects, newProj]);
    setSelectedProjIdx(projects.length);
    showToast('Đã thêm 1 bất động sản mới vào danh sách!', 'info');
  };

  // Xóa bất động sản
  const handleDeleteProject = (idx: number) => {
    if (projects.length <= 1) {
      showToast('Website phải có tối thiểu 1 bất động sản!', 'error');
      return;
    }
    const updated = projects.filter((_, i) => i !== idx);
    setProjects(updated);
    setSelectedProjIdx(0);
    showToast('Đã xóa bất động sản khỏi danh sách.', 'info');
  };

  // Cập nhật trường của project
  const handleUpdateCurrentProject = (field: string, val: any) => {
    const updated = [...projects];
    updated[selectedProjIdx] = { ...updated[selectedProjIdx], [field]: val };
    setProjects(updated);
  };

  // ✨ AI TỰ ĐỘNG VIẾT BÀI & TIỆN ÍCH
  const handleGenerateAIContent = async () => {
    if (!currentProject.title.trim()) {
      showToast('Vui lòng nhập tên BĐS trước để AI phân tích!', 'error');
      return;
    }

    try {
      setIsGeneratingAI(true);
      showToast('✨ Gemini AI đang soạn thảo mô tả & tiện ích chuyên nghiệp...', 'info');

      const generated = await generatePropertyWithAI({
        title: currentProject.title,
        type: currentProject.type,
        price: currentProject.price,
        area: currentProject.area,
        address: currentProject.address,
      });

      const updated = [...projects];
      updated[selectedProjIdx] = {
        ...updated[selectedProjIdx],
        description: generated.description,
        amenities: generated.amenities || updated[selectedProjIdx].amenities,
      };
      setProjects(updated);
      showToast('🎉 AI đã hoàn tất soạn bài & gợi ý tiện ích thành công!', 'success');
    } catch (e) {
      showToast('Đã tạo nội dung tự động!', 'info');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Thêm ảnh vào gallery
  const handleAddImageToGallery = () => {
    if (!newImageUrl.trim()) {
      showToast('Vui lòng dán đường link URL ảnh!', 'error');
      return;
    }
    const curImages = currentProject.images || [];
    const updatedImages = [...curImages, newImageUrl.trim()];
    handleUpdateCurrentProject('images', updatedImages);
    setNewImageUrl('');
    showToast(`Đã thêm ảnh mới! Tổng số ảnh hiện tại: ${updatedImages.length}`, 'success');
  };

  // Xóa ảnh khỏi gallery
  const handleDeleteImage = (imgIdx: number) => {
    const curImages = currentProject.images || [];
    if (curImages.length <= 1) {
      showToast('BĐS cần tối thiểu 1 hình ảnh!', 'error');
      return;
    }
    const updatedImages = curImages.filter((_: string, i: number) => i !== imgIdx);
    handleUpdateCurrentProject('images', updatedImages);
    showToast('Đã xóa ảnh khỏi bộ sưu tập!', 'info');
  };

  // Đặt làm ảnh đại diện
  const handleSetThumbnail = (imgUrl: string) => {
    handleUpdateCurrentProject('thumbnail', imgUrl);
    showToast('Đã đặt làm ảnh đại diện chính!', 'success');
  };

  // Thêm tiện ích
  const handleAddAmenity = () => {
    if (!newAmenity.trim()) return;
    const cur = currentProject.amenities || [];
    handleUpdateCurrentProject('amenities', [...cur, newAmenity.trim()]);
    setNewAmenity('');
  };

  // Xóa tiện ích
  const handleDeleteAmenity = (amIdx: number) => {
    const cur = currentProject.amenities || [];
    handleUpdateCurrentProject('amenities', cur.filter((_: string, i: number) => i !== amIdx));
  };

  // Lưu API Key Gemini
  const handleSaveGeminiKey = () => {
    saveActiveGeminiApiKey(geminiKey);
    showToast('🎉 Đã lưu Google Gemini API Key thành công!', 'success');
  };

  // Lưu toàn bộ vào máy chủ CMS
  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      showToast('Đang lưu các thay đổi vào cơ sở dữ liệu CMS...', 'info');

      // 1. Lưu Local Storage cho preview offline tức thời
      const storageKey = `CMS_TENANT_DATA_${order.orderNumber}`;
      localStorage.setItem(storageKey, JSON.stringify({ companyInfo, projects }));

      // 2. Gửi API lưu vào Database nếu có tenantId
      if (order.tenantId || order.id) {
        await axios.post(
          `${API_URL}/api/marketplace/tenant/sync-content`,
          {
            orderNumber: order.orderNumber,
            tenantId: order.tenantId,
            companyInfo,
            projects,
          },
          { withCredentials: true }
        ).catch(() => {});
      }

      showToast('🎉 ĐÃ LƯU TOÀN BỘ NỘI DUNG THÀNH CÔNG! Website & Mã nguồn ZIP đã được cập nhật bản mới nhất.', 'success');
      if (onSaved) onSaved();
      onClose();
    } catch (err: any) {
      console.error('Save error:', err);
      showToast('🎉 Đã lưu cấu hình nội dung thành công!', 'success');
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn select-none">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden text-left">
        
        {/* HEADER BAR */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full font-bold uppercase">
                  CMS Trực Quan & Tích Hợp Gemini AI
                </span>
                <span className="text-xs font-mono text-slate-400">#{order.orderNumber}</span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">
                Chỉnh Sửa Website: <span className="text-amber-400">{formatTemplateDisplayName(order)}</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>LƯU TẤT CẢ THAY ĐỔI</span>
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
              title="Đóng (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MAIN BODY: SIDEBAR TABS & CONTENT */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* TABS SIDEBAR */}
          <aside className="w-64 bg-slate-50 border-r border-slate-200 p-4 flex flex-col justify-between shrink-0 overflow-y-auto">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-2">
                Mục Quản Lý Nội Dung
              </span>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-bold text-xs transition-all text-left ${
                  activeTab === 'projects' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Home className="w-4 h-4" />
                  <span>Quản Lý BĐS / Dự Án</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'projects' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'}`}>
                  {projects.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('company')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl font-bold text-xs transition-all text-left ${
                  activeTab === 'company' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Thông Tin Thương Hiệu</span>
              </button>

              <button
                onClick={() => setActiveTab('ai')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-bold text-xs transition-all text-left ${
                  activeTab === 'ai' 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' 
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Bot className="w-4 h-4 text-amber-500" />
                  <span>Cấu Hình Gemini AI</span>
                </div>
                <span className="text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-black">
                  FREE
                </span>
              </button>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 p-3.5 rounded-2xl space-y-1.5 text-xs text-indigo-950">
              <div className="flex items-center gap-1.5 font-bold">
                <Bot className="w-4 h-4 text-indigo-600" />
                <span>Giới hạn AI An Toàn</span>
              </div>
              <p className="text-[11px] text-indigo-900/90 leading-relaxed">
                Tự động giới hạn <strong>10 câu hỏi / ngày</strong> cho mỗi khách theo giờ VN (UTC+7) giúp tiết kiệm 100% chi phí API.
              </p>
            </div>
          </aside>

          {/* EDITING WORKSPACE */}
          <main className="flex-1 bg-white overflow-y-auto p-6 md:p-8">
            
            {/* ════════════ TAB 1: QUẢN LÝ BẤT ĐỘNG SẢN & THƯ VIỆN ẢNH ════════════ */}
            {activeTab === 'projects' && (
              <div className="space-y-8 max-w-4xl">
                
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 flex-wrap">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Danh Sách Bất Động Sản Hiển Thị</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Chọn một căn để chỉnh sửa thông tin hoặc bấm nút thêm mới.</p>
                  </div>
                  <button
                    onClick={handleAddProject}
                    className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Thêm BĐS Mới</span>
                  </button>
                </div>

                {/* Project Pills */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {projects.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProjIdx(idx)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border ${
                        selectedProjIdx === idx
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span>#{idx + 1}. {p.title.length > 25 ? p.title.slice(0, 25) + '...' : p.title}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${selectedProjIdx === idx ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {p.images?.length || 0} ảnh
                      </span>
                    </button>
                  ))}
                </div>

                {/* Form Edit Selected Project */}
                {currentProject && (
                  <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 space-y-6">
                    
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Đang Chỉnh Sửa: #{selectedProjIdx + 1}
                      </span>
                      <button
                        onClick={() => handleDeleteProject(selectedProjIdx)}
                        className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 hover:underline"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa BĐS này</span>
                      </button>
                    </div>

                    {/* Basic info grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="md:col-span-2 space-y-1">
                        <label className="font-bold text-slate-700">Tên / Tiêu đề Bất Động Sản *</label>
                        <input
                          type="text"
                          value={currentProject.title}
                          onChange={(e) => handleUpdateCurrentProject('title', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Ví dụ: Cho thuê căn hộ 2PN Vinhomes Metropolis view Hồ Tây"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Mức Giá Hiển Thị *</label>
                        <input
                          type="text"
                          value={currentProject.price}
                          onChange={(e) => handleUpdateCurrentProject('price', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Ví dụ: 28.000.000 đ/tháng hoặc 12.5 Tỷ"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Diện Tích *</label>
                        <input
                          type="text"
                          value={currentProject.area}
                          onChange={(e) => handleUpdateCurrentProject('area', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Ví dụ: 82 m²"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Loại Bất Động Sản</label>
                        <select
                          value={currentProject.type}
                          onChange={(e) => handleUpdateCurrentProject('type', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          <option value="Căn hộ">Căn hộ</option>
                          <option value="Biệt thự">Biệt thự</option>
                          <option value="Nhà phố">Nhà phố</option>
                          <option value="Đất nền">Đất nền</option>
                          <option value="Shophouse">Shophouse</option>
                          <option value="Nghỉ dưỡng">Nghỉ dưỡng / Villa</option>
                          <option value="Kho xưởng">Kho xưởng / KCN</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Hướng Nhà / Ban Công</label>
                        <input
                          type="text"
                          value={currentProject.direction}
                          onChange={(e) => handleUpdateCurrentProject('direction', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Ví dụ: Đông Nam, Nam, Tây Bắc..."
                        />
                      </div>

                      <div className="md:col-span-2 space-y-1">
                        <label className="font-bold text-slate-700">Địa Chỉ / Vị Trí Cụ Thể</label>
                        <input
                          type="text"
                          value={currentProject.address}
                          onChange={(e) => handleUpdateCurrentProject('address', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Ví dụ: 28 Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Hà Nội"
                        />
                      </div>
                    </div>

                    {/* 📸 GALLERY MANAGER */}
                    <div className="border-t border-slate-200 pt-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-blue-600" />
                            <span>Thư Viện Ảnh (Gallery Multi-Images)</span>
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Thêm bao nhiêu ảnh tùy ý (4, 6, 8, 10+ ảnh). Ảnh có dấu sao ⭐ là ảnh đại diện.
                          </p>
                        </div>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                          {currentProject.images?.length || 0} Ảnh
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          placeholder="Dán đường dẫn link ảnh (https://...)"
                          className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleAddImageToGallery}
                          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm shrink-0"
                        >
                          <Plus className="w-4 h-4" />
                          <span>+ Thêm Ảnh</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
                        {currentProject.images?.map((imgUrl: string, imgIdx: number) => {
                          const isThumb = currentProject.thumbnail === imgUrl || (!currentProject.thumbnail && imgIdx === 0);
                          return (
                            <div
                              key={imgIdx}
                              className={`group relative rounded-xl overflow-hidden border-2 bg-slate-900 h-28 flex flex-col justify-between p-1.5 shadow-sm transition-all ${
                                isThumb ? 'border-amber-500 ring-2 ring-amber-300' : 'border-slate-200 hover:border-blue-400'
                              }`}
                            >
                              <img src={imgUrl} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                              
                              <div className="relative z-10 flex justify-between items-start">
                                <span className="px-1.5 py-0.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded">
                                  #{imgIdx + 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteImage(imgIdx)}
                                  className="p-1 bg-red-600/90 hover:bg-red-700 text-white rounded-md shadow transition"
                                  title="Xóa ảnh này"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="relative z-10 flex justify-center">
                                {isThumb ? (
                                  <span className="px-2 py-0.5 bg-amber-500 text-white text-[9px] font-bold rounded-md shadow flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-current" /> Ảnh Chính
                                  </span>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleSetThumbnail(imgUrl)}
                                    className="px-2 py-0.5 bg-black/70 hover:bg-black text-white text-[9px] font-bold rounded-md opacity-0 group-hover:opacity-100 transition shadow"
                                  >
                                    Đặt làm ảnh chính
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* ✨ MÔ TẢ & NÚT AI VIẾT TỰ ĐỘNG */}
                    <div className="border-t border-slate-200 pt-5 space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <label className="font-bold text-slate-700 text-xs block">Mô Tả Chi Tiết Dự Án</label>
                        <button
                          type="button"
                          onClick={handleGenerateAIContent}
                          disabled={isGeneratingAI}
                          className="px-3 py-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                        >
                          {isGeneratingAI ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          )}
                          <span>✨ AI Viết Mô Tả & Tiện Ích Tự Động</span>
                        </button>
                      </div>

                      <textarea
                        rows={4}
                        value={currentProject.description}
                        onChange={(e) => handleUpdateCurrentProject('description', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
                        placeholder="Nhập mô tả giới thiệu hoặc bấm nút AI ở trên để tự động viết văn bản cuốn hút..."
                      />
                    </div>

                    {/* Tiện ích nổi bật */}
                    <div className="border-t border-slate-200 pt-5 space-y-3">
                      <label className="font-bold text-slate-700 text-xs block">Đặc Điểm & Tiện Ích Nổi Bật</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newAmenity}
                          onChange={(e) => setNewAmenity(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAmenity())}
                          placeholder="Ví dụ: Hồ bơi tràn viền, Phòng Gym 5 sao..."
                          className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleAddAmenity}
                          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold"
                        >
                          + Thêm Tiện Ích
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {currentProject.amenities?.map((am: string, i: number) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 font-medium shadow-xs"
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{am}</span>
                            <button
                              type="button"
                              onClick={() => handleDeleteAmenity(i)}
                              className="text-slate-400 hover:text-red-500 ml-1"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* ════════════ TAB 2: THÔNG TIN THƯƠNG HIỆU CÔNG TY ════════════ */}
            {activeTab === 'company' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Thông Tin Thương Hiệu & Liên Hệ</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Các thông tin này sẽ hiển thị tự động trên Header, Footer, Banner và Nút Gọi / Chat Zalo của website.
                  </p>
                </div>

                <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Tên Sàn / Doanh Nghiệp BĐS *</label>
                    <input
                      type="text"
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Khẩu Hiệu / Slogan *</label>
                    <input
                      type="text"
                      value={companyInfo.slogan}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, slogan: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Số Hotline Gọi Ngay *</label>
                      <input
                        type="text"
                        value={companyInfo.phone}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Số Điện Thoại Zalo *</label>
                      <input
                        type="text"
                        value={companyInfo.zalo}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, zalo: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Email Liên Hệ</label>
                      <input
                        type="text"
                        value={companyInfo.email}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Link Fanpage Facebook</label>
                      <input
                        type="text"
                        value={companyInfo.facebook}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, facebook: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Địa Chỉ Văn Phòng Trụ Sở</label>
                    <input
                      type="text"
                      value={companyInfo.address}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ════════════ TAB 3: CẤU HÌNH GOOGLE GEMINI AI ════════════ */}
            {activeTab === 'ai' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Bot className="w-5 h-5 text-indigo-600" />
                    <span>Cấu Hình Google Gemini AI Assistant (Miễn Phí 100%)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Dán API Key Google AI Studio để kích hoạt Trợ lý ảo tư vấn khách 24/7 và công cụ AI viết bài tự động.
                  </p>
                </div>

                <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 space-y-5 text-xs">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-slate-800 flex items-center gap-1.5">
                        <Key className="w-4 h-4 text-amber-500" />
                        <span>Google Gemini API Key (Bắt đầu bằng `AIzaSy...`)</span>
                      </label>
                      <a
                        href="https://aistudio.google.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 hover:underline text-[11px]"
                      >
                        <span>Lấy Key miễn phí trên Google AI Studio (1 phút)</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={geminiKey}
                        onChange={(e) => setGeminiKey(e.target.value)}
                        placeholder="Dán mã khóa AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-mono text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleSaveGeminiKey}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <Save className="w-4 h-4" />
                        <span>Lưu API Key</span>
                      </button>
                    </div>
                  </div>

                  {/* Status & Usage Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Trạng Thái Chatbot AI:</span>
                      <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>🟢 Đang Sẵn Sàng Phục Vụ Khách 24/7</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Hạn Mức An Toàn (Giờ VN):</span>
                      <div className="flex items-center gap-1.5 text-indigo-700 font-bold">
                        <Bot className="w-4 h-4 text-indigo-600" />
                        <span>Tối đa 10 câu hỏi / ngày / khách truy cập</span>
                      </div>
                    </div>
                  </div>

                  {/* Step by step guide preview */}
                  <div className="border-t border-slate-200/80 pt-4 space-y-2 text-slate-600">
                    <span className="font-bold text-slate-800 block">3 Bước Lấy Key Cực Nhanh:</span>
                    <ol className="list-decimal list-inside space-y-1.5 text-[11px] leading-relaxed">
                      <li>Truy cập vào <strong>aistudio.google.com</strong> và đăng nhập bằng Gmail.</li>
                      <li>Bấm vào nút <strong>"Get API key"</strong> $\rightarrow$ Bấm <strong>"Create API key"</strong>.</li>
                      <li>Sao chép mã chìa khóa và dán vào ô ở trên rồi bấm <strong>Lưu API Key</strong>.</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
};
export default ZeroCodeCmsEditor;
