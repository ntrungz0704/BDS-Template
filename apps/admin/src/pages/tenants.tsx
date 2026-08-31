import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import AdminLayout from '../components/AdminLayout';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));
const PLATFORM_DOMAIN = process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'templates.aireviewbds.com';

export default function AdminTenants() {
  const queryClient = useQueryClient();

  // Create Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState<any>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [templateId, setTemplateId] = useState('luxury-gold');
  const [plan, setPlan] = useState('STARTER');

  // Mutation to create Tenant manually
  const createTenantMutation = useMutation({
    mutationFn: async (payload: any) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.post(
        `${API_URL}/api/admin/tenants`,
        payload,
        {
          headers: { 'X-CSRF-Token': csrfToken || '' },
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['adminTenants'] });
      setCreatedCredentials(res.data?.credentials);
      setShowCreateModal(false);
      setShowResultModal(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setSubdomain('');
      setTemplateId('luxury-gold');
      setPlan('STARTER');
    },
    onError: (error: any) => {
      alert(error.response?.data?.error?.message || error.response?.data?.message || 'Có lỗi xảy ra khi tạo website.');
    },
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !subdomain) {
      alert('Vui lòng nhập đầy đủ các trường thông tin bắt buộc.');
      return;
    }
    createTenantMutation.mutate({
      fullName,
      email,
      phone,
      subdomain,
      templateId,
      plan
    });
  };

  // 1. Lấy danh sách website khách thuê
  const { data: tenantsRes, isLoading } = useQuery({
    queryKey: ['adminTenants'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/admin/tenants`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  // 2. Phép thay đổi trạng thái hoạt động của Tenant
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.put(
        `${API_URL}/api/admin/tenants/${id}/status`,
        { status },
        {
          headers: { 'X-CSRF-Token': csrfToken || '' },
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTenants'] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.error?.message || 'Có lỗi xảy ra khi cập nhật trạng thái.');
    },
  });

  const deleteTenantMutation = useMutation({
    mutationFn: async (id: string) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.delete(
        `${API_URL}/api/admin/tenants/${id}`,
        {
          headers: { 'X-CSRF-Token': csrfToken || '' },
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTenants'] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.error?.message || 'Có lỗi xảy ra khi xóa website.');
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
          <span className="text-sm font-bold text-slate-500">Đang tải danh sách Website...</span>
        </div>
      </div>
    );
  }

  const tenants = tenantsRes?.data || [];

  return (
    <AdminLayout title="Quản Lý Website Khách Hàng" subtitle="Tạo website mới từ Template, kích hoạt, tạm ngưng hoặc quản lý website bất động sản của khách hàng.">
      {/* Header action button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-indigo-600/10 hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Tạo Website Mới
        </button>
      </div>

      {/* Tenants Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="w-full">
          <table className="w-full table-fixed text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="px-3 py-3 w-[18%]">Tên Website</th>
                <th className="px-3 py-3 w-[18%]">Subdomain</th>
                <th className="px-3 py-3 w-[15%]">Template</th>
                <th className="px-3 py-3 w-[15%]">Chủ sở hữu</th>
                <th className="px-3 py-3 w-[14%]">Thời hạn / Gói</th>
                <th className="px-3 py-3 w-[10%]">Trạng thái</th>
                <th className="px-3 py-3 w-[10%] text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {tenants.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400 font-medium">
                    Chưa có website nào được tạo. Nhấn &quot;Tạo Website Mới&quot; hoặc duyệt đơn hàng để bắt đầu.
                  </td>
                </tr>
              ) : (
                tenants.map((tenant: any) => {
                  const owner = tenant.users?.[0] || tenant.memberships?.[0]?.user;
                  return (
                  <tr key={tenant.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-3 py-3">
                      <div className="font-bold text-slate-900 truncate">{tenant.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">ID: {tenant.id.slice(0, 8)}...</div>
                    </td>
                    <td className="px-3 py-3">
                      <a
                        href={`https://${tenant.slug}.${PLATFORM_DOMAIN}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-indigo-600 hover:underline truncate max-w-full"
                      >
                        <span className="truncate">{tenant.slug}.{PLATFORM_DOMAIN}</span>
                      </a>
                    </td>
                    <td className="px-3 py-3">
                      <span className="bg-blue-50 border border-blue-200 text-blue-800 px-2 py-0.5 rounded text-[10px] font-bold font-sans truncate inline-block max-w-full">
                        {tenant.template?.name || tenant.template?.slug || 'Green Eco Living'}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="text-[11px] font-bold text-slate-700 truncate">{owner?.fullName || 'Chưa cập nhật'}</div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">{owner?.email || ''}</div>
                    </td>
                    <td className="px-3 py-3 text-[11px] font-medium">
                      {tenant.trialStatus === 'ACTIVE' || tenant.trialStatus === 'EXPIRED' ? (
                        <div>
                          <span className="text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block text-[10px]">
                            Dùng thử ({tenant.trialSaveCount || 0}/{tenant.trialSaveLimit || 3})
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-block text-[10px]">
                            Sở hữu trọn đời
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        tenant.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${tenant.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                        {tenant.status === 'ACTIVE' ? 'Chạy' : 'Khóa'}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`https://${tenant.slug}.${PLATFORM_DOMAIN}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded transition-all"
                          title="Xem Website"
                        >
                          Web
                        </a>
                        <a
                          href={process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded transition-all"
                          title="Mở CMS"
                        >
                          CMS
                        </a>
                        <button
                          onClick={() => {
                            if (confirm(`Bạn có chắc muốn XÓA VĨNH VIỄN website ${tenant.name}?`)) {
                              deleteTenantMutation.mutate(tenant.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-all"
                          title="Xóa"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Tenant Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-200/50 relative overflow-hidden animate-scale-in">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all text-lg"
            >
              ✕
            </button>
            <h3 className="text-lg font-extrabold text-slate-800 mb-6 uppercase tracking-wider">Tạo Website Mới Từ Template</h3>
            
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Họ và Tên Khách Hàng *</label>
                <input
                  required
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Địa chỉ Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Số điện thoại *</label>
                  <input
                    required
                    type="tel"
                    placeholder="0983xxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Subdomain mong muốn *</label>
                <div className="flex items-center">
                  <input
                    required
                    type="text"
                    placeholder="hoanggialand"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase())}
                    className="flex-1 px-3.5 py-2.5 border border-slate-300 rounded-l-xl text-sm focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
                  />
                  <span className="bg-slate-100 border border-l-0 border-slate-300 px-4 py-2.5 rounded-r-xl text-sm font-mono text-slate-500">
                    .{PLATFORM_DOMAIN}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5 font-medium">Chỉ sử dụng chữ cái viết thường, chữ số và dấu gạch ngang (-).</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Mẫu giao diện thiết kế</label>
                  <select
                    value={templateId}
                    onChange={(e) => setTemplateId(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:border-indigo-500 focus:outline-none transition-all"
                  >
                    <option value="luxury-gold">Luxury Gold (Lumière)</option>
                    <option value="minimal-dark">Minimalist (Dark/Modern)</option>
                    <option value="eco-green">Eco-friendly (Green)</option>
                    <option value="agency-modern">Real Estate Agency</option>
                    <option value="apartment-sky">Apartment / Tower Page</option>
                    <option value="auction-deal">Property Auctions</option>
                    <option value="classic-estate">Classic Property</option>
                    <option value="corporate-bds">Corporate Real Estate</option>
                    <option value="industrial-park">Industrial & Warehouses</option>
                    <option value="investment-yield">Investment Properties</option>
                    <option value="landplot-project">Land & Plots</option>
                    <option value="personal-agent">Personal Agent Portfolio</option>
                    <option value="resort-villa">Resorts & Vacation Villas</option>
                    <option value="retail-space">Commercial & Retail Space</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Gói dịch vụ</label>
                  <select
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:border-indigo-500 focus:outline-none transition-all"
                  >
                    <option value="STARTER">Gói Thiết Kế 499k (STARTER)</option>
                    <option value="PRO">Gói Chuyên Nghiệp 12M (PRO)</option>
                    <option value="ENTERPRISE">Gói Doanh Nghiệp (ENTERPRISE)</option>
                  </select>
                </div>
              </div>

              <div className="h-px bg-slate-100 my-4"></div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50 transition-all"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={createTenantMutation.isPending}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md disabled:opacity-50 flex items-center gap-1.5 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  {createTenantMutation.isPending ? 'Đang tạo...' : 'Kích Hoạt Ngay'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Result Credentials Modal */}
      {showResultModal && createdCredentials && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-100 flex flex-col items-center text-center animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-100">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Website Đã Kích Hoạt Thành Công!</h3>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed font-medium">
              Website của khách thuê đã được khởi tạo hoàn tất trên hệ thống. Hãy copy thông tin bàn giao này gửi qua Zalo cho khách hàng.
            </p>
            
            <div className="w-full mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200/60 text-left text-xs space-y-3 font-semibold text-slate-700 shadow-inner">
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Địa chỉ Website:</span>
                <a href={`https://${createdCredentials.subdomain}.${PLATFORM_DOMAIN}`} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline font-mono">
                  https://{createdCredentials.subdomain}.{PLATFORM_DOMAIN}
                </a>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Quản trị Website (CMS):</span>
                <a href={process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline font-mono">
                  {process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}
                </a>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Email Đăng Nhập:</span>
                <span className="font-mono text-slate-800">{createdCredentials.email}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Mật Khẩu Tạm Thời:</span>
                <span className="font-mono text-slate-800 select-all bg-yellow-50 px-2 py-0.5 border border-yellow-200 rounded">{createdCredentials.password}</span>
              </div>
            </div>

            <button
              onClick={() => {
                const text = `THÔNG TIN BÀN GIAO WEBSITE BĐS:\n- Địa chỉ Website: https://${createdCredentials.subdomain}.${PLATFORM_DOMAIN}\n- Trang quản trị CMS: ${process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}\n- Email đăng nhập: ${createdCredentials.email}\n- Mật khẩu tạm thời: ${createdCredentials.password}`;
                navigator.clipboard.writeText(text);
                alert('Đã sao chép thông tin bàn giao vào Clipboard!');
                setShowResultModal(false);
              }}
              className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              Sao Chép & Gửi Qua Zalo
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

