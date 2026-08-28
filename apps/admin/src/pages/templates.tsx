import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import AdminLayout from '../components/AdminLayout';
import { formatVND } from '@repo/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';

export default function AdminTemplates() {
  const queryClient = useQueryClient();
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [editPriceBuy, setEditPriceBuy] = useState<number>(499000);
  const [editPriceBuySource, setEditPriceBuySource] = useState<number>(799000);
  const [editPriceRent, setEditPriceRent] = useState<number>(199000);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // 1. Lấy danh sách toàn bộ mẫu giao diện
  const { data: templatesRes, isLoading } = useQuery({
    queryKey: ['adminTemplates'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/admin/templates`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  // 2. Phép thay đổi trạng thái ẩn/hiển thị của template trên Marketplace
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.put(
        `${API_URL}/api/admin/templates/${id}/status`,
        { isActive },
        {
          headers: { 'X-CSRF-Token': csrfToken || '' },
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTemplates'] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.error?.message || 'Có lỗi xảy ra khi cập nhật giao diện.');
    },
  });

  // 3. Cập nhật giá bán & giá gốc
  const updatePriceMutation = useMutation({
    mutationFn: async ({ id, priceBuy, priceBuySource, priceRentMonthly }: any) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.put(
        `${API_URL}/api/admin/templates/${id}/price`,
        { priceBuy, priceBuySource, priceRentMonthly },
        {
          headers: { 'X-CSRF-Token': csrfToken || '' },
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTemplates'] });
      setEditingTemplate(null);
    },
    onError: (error: any) => {
      alert(error.response?.data?.error?.message || 'Có lỗi xảy ra khi lưu giá.');
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm font-bold text-slate-500">Đang tải danh sách mẫu giao diện...</span>
        </div>
      </div>
    );
  }

  const templates: any[] = templatesRes?.data || [];
  const filteredTemplates = templates.filter((t) => {
    const matchSearch =
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.slug?.toLowerCase().includes(search.toLowerCase()) ||
      t.category?.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === 'ALL' ||
      (filterStatus === 'ACTIVE' && t.isActive) ||
      (filterStatus === 'HIDDEN' && !t.isActive);
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout title="Quản Lý Mẫu Giao Diện (Master Templates)" subtitle="Quản lý kho 16+ template bất động sản, cấu hình giá bán theo năm và mở Template Studio.">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm tên mẫu, slug, phong cách..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 w-64"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="ACTIVE">Đang hiển thị (Published)</option>
            <option value="HIDDEN">Đang ẩn (Hidden)</option>
          </select>
        </div>

        <div className="text-xs font-bold text-slate-500">
          Tổng cộng: <span className="text-indigo-600 font-extrabold">{filteredTemplates.length}</span> mẫu giao diện
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden mb-10">
        <table className="w-full border-collapse text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-xs font-bold text-slate-400 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Ảnh mẫu</th>
              <th className="px-6 py-4">Tên giao diện</th>
              <th className="px-6 py-4">Giá gốc</th>
              <th className="px-6 py-4">Giá ưu đãi / Năm</th>
              <th className="px-6 py-4">Duy trì / Năm</th>
              <th className="px-6 py-4">Marketplace</th>
              <th className="px-6 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTemplates.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400 font-semibold">
                  Không tìm thấy mẫu giao diện nào phù hợp.
                </td>
              </tr>
            ) : (
              filteredTemplates.map((template: any) => (
                <tr key={template.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <img 
                      src={template.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100'} 
                      alt={template.name} 
                      className="w-16 h-10 object-cover rounded-xl border border-slate-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="40" viewBox="0 0 64 40"><rect width="64" height="40" rx="8" fill="%23e2e8f0"/><text x="32" y="24" text-anchor="middle" fill="%2394a3b8" font-size="10" font-family="Arial">🏠</text></svg>');
                      }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800">{template.name}</div>
                    <div className="font-mono text-xs text-indigo-600">{template.slug}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-400 line-through">
                    {formatVND(template.priceBuySource || 799000)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-extrabold text-blue-600">
                      {formatVND(template.priceBuy || 499000)}
                    </span>
                    <span className="ml-1.5 text-[10px] bg-rose-50 text-rose-600 font-bold px-1.5 py-0.5 rounded border border-rose-200">
                      -38%
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-600">
                    {formatVND(template.priceRentMonthly || 199000)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                      template.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${template.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                      {template.isActive ? 'Đang Hiển Thị' : 'Đang Ẩn'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/studio?id=${template.id}`}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition-all shadow-sm"
                      >
                        Studio
                      </Link>
                      <button
                        onClick={() => {
                          setEditingTemplate(template);
                          setEditPriceBuy(template.priceBuy || 499000);
                          setEditPriceBuySource(template.priceBuySource || 799000);
                          setEditPriceRent(template.priceRentMonthly || 199000);
                        }}
                        className="text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-xl transition-all shadow-sm"
                      >
                        Sửa giá
                      </button>
                      <button
                        onClick={() => updateStatusMutation.mutate({ id: template.id, isActive: !template.isActive })}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                          template.isActive
                            ? 'text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100'
                            : 'text-emerald-600 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100'
                        }`}
                      >
                        {template.isActive ? 'Ẩn' : 'Bật'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Price Edit Modal */}
      {editingTemplate && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">
              Chỉnh Sửa Giá Mẫu: {editingTemplate.name}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Cập nhật giá gốc niêm yết và giá khuyến mãi bán ra hiển thị trên Marketplace.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updatePriceMutation.mutate({
                  id: editingTemplate.id,
                  priceBuy: editPriceBuy,
                  priceBuySource: editPriceBuySource,
                  priceRentMonthly: editPriceRent,
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Giá gốc niêm yết (VND)
                </label>
                <input
                  type="number"
                  step="1000"
                  required
                  value={editPriceBuySource}
                  onChange={(e) => setEditPriceBuySource(Number(e.target.value))}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-500"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Hiển thị gạch ngang (VD: 799.000 đ)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Giá bán ưu đãi thực tế (VND)
                </label>
                <input
                  type="number"
                  step="1000"
                  required
                  value={editPriceBuy}
                  onChange={(e) => setEditPriceBuy(Number(e.target.value))}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-500"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Giá khách thanh toán khi mua (VD: 499.000 đ)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Giá duy trì gia hạn (VND/năm)
                </label>
                <input
                  type="number"
                  step="1000"
                  required
                  value={editPriceRent}
                  onChange={(e) => setEditPriceRent(Number(e.target.value))}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-500"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Phí duy trì máy chủ & bảo trì sau 1 năm (VD: 499.000 đ/năm)
                </span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingTemplate(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={updatePriceMutation.isPending}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                >
                  {updatePriceMutation.isPending ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

