import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

export default function CMSProjects() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('APARTMENT');
  const [status, setStatus] = useState('SELLING');

  // Lấy tenantId từ localStorage
  const getTenantId = () => typeof window !== 'undefined' ? localStorage.getItem('tenantId') || '' : '';

  // 1. Query danh sách dự án
  const { data: projectsRes, isLoading } = useQuery({
    queryKey: ['cmsProjects'],
    queryFn: async () => {
      const tenantId = getTenantId();
      const res = await axios.get('http://localhost:5000/api/cms/projects', {
        headers: { 'x-tenant-id': tenantId },
        withCredentials: true,
      });
      return res.data;
    },
  });

  // 2. Mutation tạo dự án
  const createMutation = useMutation({
    mutationFn: async (newProj: any) => {
      const tenantId = getTenantId();
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.post(
        'http://localhost:5000/api/cms/projects',
        newProj,
        {
          headers: {
            'x-tenant-id': tenantId,
            'X-CSRF-Token': csrfToken || '',
          },
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      alert('Đã thêm dự án bất động sản thành công!');
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['cmsProjects'] });
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Có lỗi xảy ra khi tạo dự án.');
    },
  });

  // 3. Mutation cập nhật dự án (có Version Optimistic Locking)
  const updateMutation = useMutation({
    mutationFn: async ({ id, version, updatedData }: { id: string; version: number; updatedData: any }) => {
      const tenantId = getTenantId();
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.put(
        `http://localhost:5000/api/cms/projects/${id}`,
        { ...updatedData, version },
        {
          headers: {
            'x-tenant-id': tenantId,
            'X-CSRF-Token': csrfToken || '',
          },
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      alert('Cập nhật dự án thành công!');
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['cmsProjects'] });
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Có lỗi xảy ra khi cập nhật dự án.');
    },
  });

  // 4. Mutation xóa dự án (Soft Delete)
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const tenantId = getTenantId();
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.delete(`http://localhost:5000/api/cms/projects/${id}`, {
        headers: {
          'x-tenant-id': tenantId,
          'X-CSRF-Token': csrfToken || '',
        },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      alert('Đã xóa dự án thành công (Xóa mềm).');
      queryClient.invalidateQueries({ queryKey: ['cmsProjects'] });
    },
  });

  const resetForm = () => {
    setIsEditing(false);
    setSelectedProject(null);
    setTitle('');
    setSlug('');
    setPrice('');
    setAddress('');
    setType('APARTMENT');
    setStatus('SELLING');
  };

  const handleEditClick = (proj: any) => {
    setSelectedProject(proj);
    setIsEditing(true);
    setTitle(proj.title);
    setSlug(proj.slug);
    setPrice(proj.price || '');
    setAddress(proj.address || '');
    setType(proj.type);
    setStatus(proj.status);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { title, slug, price, address, type, status };
    if (selectedProject) {
      updateMutation.mutate({ id: selectedProject.id, version: selectedProject.version, updatedData: data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F6F3]">
        <div className="text-lg font-medium text-[#7F7F8F]">Đang tải danh sách dự án...</div>
      </div>
    );
  }

  const projects = projectsRes?.data || [];

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      {/* Navbar */}
      <nav className="border-b border-[#E5E0D8] bg-white px-8 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-8">
            <span className="text-xl font-bold text-[#1A1A2E]">WEBSITE CMS PANEL</span>
            <div className="flex space-x-6 text-sm font-medium text-[#7F7F8F]">
              <Link href="/" className="hover:text-[#1A1A2E]">Tổng quan</Link>
              <Link href="/projects" className="text-[#C5A572] hover:text-[#B8941F]">Quản lý dự án BĐS</Link>
              <Link href="/company" className="hover:text-[#1A1A2E]">Thông tin giới thiệu</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A2E]">Danh Sách Dự Án</h1>
            <p className="text-sm text-[#7F7F8F] mt-1">Cập nhật tin đăng dự án bất động sản hiển thị lên website.</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg bg-[#C5A572] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#B8941F]"
            >
              Thêm Dự Án Mới
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="rounded-xl border border-[#E5E0D8] bg-white p-6 shadow-sm mb-10 max-w-2xl">
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-6">
              {selectedProject ? `Cập nhật dự án (Version ${selectedProject.version})` : 'Tạo Dự Án BĐS Mới'}
            </h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">Tên dự án</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E0D8] px-3 py-2 text-sm focus:border-[#C5A572] focus:outline-none"
                    placeholder="Vinhomes Grand Park"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E0D8] px-3 py-2 text-sm focus:border-[#C5A572] focus:outline-none"
                    placeholder="vinhomes-grand-park"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">Giá hiển thị</label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E0D8] px-3 py-2 text-sm focus:border-[#C5A572] focus:outline-none"
                    placeholder="2.5 - 4 tỷ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">Địa chỉ</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E0D8] px-3 py-2 text-sm focus:border-[#C5A572] focus:outline-none"
                    placeholder="Quận 9, TP. HCM"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">Loại hình</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E0D8] px-3 py-2 text-sm focus:border-[#C5A572] focus:outline-none"
                  >
                    <option value="APARTMENT">Chung cư / Căn hộ</option>
                    <option value="VILLA">Biệt thự</option>
                    <option value="TOWNHOUSE">Nhà phố</option>
                    <option value="LAND">Đất nền</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">Trạng thái bán</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E0D8] px-3 py-2 text-sm focus:border-[#C5A572] focus:outline-none"
                  >
                    <option value="COMING_SOON">Sắp mở bán</option>
                    <option value="SELLING">Đang mở bán</option>
                    <option value="SOLD_OUT">Đã bán hết</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-[#E5E0D8]">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-[#E5E0D8] px-4 py-2 text-sm font-semibold text-[#1A1A2E] hover:bg-gray-50"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#C5A572] px-4 py-2 text-sm font-semibold text-white hover:bg-[#B8941F]"
                >
                  Lưu Dự Án
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="rounded-xl border border-[#E5E0D8] bg-white shadow-sm overflow-hidden mb-10">
            <table className="w-full border-collapse text-left text-sm text-[#1A1A2E]">
              <thead className="bg-[#F8F6F3] text-xs font-semibold text-[#7F7F8F]">
                <tr>
                  <th className="px-6 py-3">Tên dự án</th>
                  <th className="px-6 py-3">Loại hình</th>
                  <th className="px-6 py-3">Giá bán</th>
                  <th className="px-6 py-3">Địa chỉ</th>
                  <th className="px-6 py-3">Trạng thái</th>
                  <th className="px-6 py-3 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E0D8]">
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-[#7F7F8F]">Chưa có dự án nào được tạo.</td>
                  </tr>
                ) : (
                  projects.map((proj: any) => (
                    <tr key={proj.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold">{proj.title}</td>
                      <td className="px-6 py-4">{proj.type}</td>
                      <td className="px-6 py-4 font-semibold text-green-600">{proj.price || 'Liên hệ'}</td>
                      <td className="px-6 py-4 text-[#7F7F8F]">{proj.address || 'Chưa cập nhật'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          proj.status === 'SELLING' ? 'bg-green-100 text-green-800' :
                          proj.status === 'COMING_SOON' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {proj.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleEditClick(proj)}
                          className="text-xs font-semibold text-[#C5A572] hover:underline"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => {
                            if(confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
                              deleteMutation.mutate(proj.id);
                            }
                          }}
                          className="text-xs font-semibold text-red-600 hover:underline"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
