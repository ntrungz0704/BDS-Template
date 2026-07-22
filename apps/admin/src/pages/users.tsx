import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import AdminLayout from '../components/AdminLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminUsers() {
  const queryClient = useQueryClient();

  // 1. Lấy danh sách toàn bộ người dùng
  const { data: usersRes, isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/admin/users`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  // 2. Phép khóa/mở khóa tài khoản người dùng
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, isActive }: { id: string; status: string; isActive: boolean }) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.put(
        `${API_URL}/api/admin/users/${id}/status`,
        { status, isActive },
        {
          headers: { 'X-CSRF-Token': csrfToken || '' },
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.error?.message || 'Có lỗi xảy ra khi cập nhật người dùng.');
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
          <span className="text-sm font-bold text-slate-500">Đang tải danh sách người dùng...</span>
        </div>
      </div>
    );
  }

  const users = usersRes?.data || [];

  return (
    <AdminLayout title="Quản Lý Thành Viên" subtitle="Khóa hoặc mở khóa quyền truy cập hệ thống của các tài khoản thành viên.">
      {/* Table */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden mb-10">
        <table className="w-full border-collapse text-left text-sm text-slate-700">
          <thead className="bg-slate-50/50 text-xs font-bold text-slate-400 border-b border-slate-100">
            <tr>
              <th className="px-8 py-4">Họ & Tên</th>
              <th className="px-8 py-4">Địa chỉ Email</th>
              <th className="px-8 py-4">Vai trò</th>
              <th className="px-8 py-4">Website quản trị</th>
              <th className="px-8 py-4">Trạng thái</th>
              <th className="px-8 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user: any) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-4 font-bold text-slate-800">{user.fullName}</td>
                <td className="px-8 py-4 font-mono text-xs font-semibold text-slate-500">{user.email}</td>
                <td className="px-8 py-4">
                  <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold ${
                    user.role === 'SUPER_ADMIN' ? 'bg-purple-50 text-purple-700 border border-purple-100' : 'bg-blue-50 text-blue-700 border border-blue-100'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-8 py-4 text-xs font-bold text-slate-600">
                  {user.tenant ? (
                    <span className="bg-slate-100 px-2 py-1 rounded text-slate-600">{user.tenant.name}</span>
                  ) : (
                    <span className="text-slate-400 italic font-normal">Không có</span>
                  )}
                </td>
                <td className="px-8 py-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                    user.isActive && user.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.isActive && user.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                    {user.isActive && user.status === 'ACTIVE' ? 'Hoạt động' : 'Đã Khóa'}
                  </span>
                </td>
                <td className="px-8 py-4 text-right">
                  {user.role === 'SUPER_ADMIN' ? (
                    <span className="text-xs text-slate-400 italic font-semibold">Quyền tối cao</span>
                  ) : user.isActive && user.status === 'ACTIVE' ? (
                    <button
                      onClick={() => updateStatusMutation.mutate({ id: user.id, status: 'BANNED', isActive: false })}
                      className="text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100/70 px-3.5 py-2 rounded-xl transition-all shadow-sm"
                    >
                      Khóa Tài Khoản
                    </button>
                  ) : (
                    <button
                      onClick={() => updateStatusMutation.mutate({ id: user.id, status: 'ACTIVE', isActive: true })}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 px-3.5 py-2 rounded-xl transition-all shadow-sm"
                    >
                      Mở Khóa
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
