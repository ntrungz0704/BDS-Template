import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import AdminLayout from '../components/AdminLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminTemplates() {
  const queryClient = useQueryClient();

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

  const templates = templatesRes?.data || [];

  return (
    <AdminLayout title="Quản Lý Giao Diện (Templates)" subtitle="Ẩn hoặc hiển thị các mẫu thiết kế website bất động sản trên trang chủ Marketplace.">
      {/* Table */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden mb-10">
        <table className="w-full border-collapse text-left text-sm text-slate-700">
          <thead className="bg-slate-50/50 text-xs font-bold text-slate-400 border-b border-slate-100">
            <tr>
              <th className="px-8 py-4">Ảnh mẫu</th>
              <th className="px-8 py-4">Tên giao diện</th>
              <th className="px-8 py-4">Slug</th>
              <th className="px-8 py-4">Giá mua đứt</th>
              <th className="px-8 py-4">Giá thuê tháng</th>
              <th className="px-8 py-4">Marketplace</th>
              <th className="px-8 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {templates.map((template: any) => (
              <tr key={template.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-4">
                  <img 
                    src={template.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100'} 
                    alt={template.name} 
                    className="w-16 h-10 object-cover rounded-xl border border-slate-200"
                  />
                </td>
                <td className="px-8 py-4 font-bold text-slate-800">{template.name}</td>
                <td className="px-8 py-4 font-mono text-xs font-semibold text-slate-500">{template.slug}</td>
                <td className="px-8 py-4 font-extrabold text-slate-855">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(template.priceBuy || 0)}
                </td>
                <td className="px-8 py-4 font-extrabold text-slate-855">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(template.priceRentMonthly || 0)}
                </td>
                <td className="px-8 py-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                    template.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${template.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                    {template.isActive ? 'Đang Hiển Thị' : 'Đang Ẩn'}
                  </span>
                </td>
                <td className="px-8 py-4 text-right space-x-2">
                  <Link
                    href={`/studio?id=${template.id}`}
                    className="inline-block text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100/70 px-4 py-2 rounded-xl transition-all shadow-sm"
                  >
                    Studio
                  </Link>
                  {template.isActive ? (
                    <button
                      onClick={() => updateStatusMutation.mutate({ id: template.id, isActive: false })}
                      className="text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100/70 px-4 py-2 rounded-xl transition-all shadow-sm"
                    >
                      Ẩn giao diện
                    </button>
                  ) : (
                    <button
                      onClick={() => updateStatusMutation.mutate({ id: template.id, isActive: true })}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 px-4 py-2 rounded-xl transition-all shadow-sm"
                    >
                      Hiển thị
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
