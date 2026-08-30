import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import AdminLayout from '../components/AdminLayout';
import { KeyRound, Copy, Check, Sparkles } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';
const CMS_APP_URL = process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com';

export default function AdminUsers() {
  const queryClient = useQueryClient();

  // Restore password modal state
  const [restoreUser, setRestoreUser] = useState<any>(null);
  const [customPassword, setCustomPassword] = useState('');
  const [useDefaultPassword, setUseDefaultPassword] = useState(true);
  const [restoredResult, setRestoredResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

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

  // 2. Direct Reset / Restore Password Mutation
  const directResetMutation = useMutation({
    mutationFn: async ({ userId, newPassword }: { userId: string; newPassword?: string }) => {
      const csrfToken = document.cookie.split('; ').find(r => r.startsWith('csrf_token='))?.split('=')[1];
      const res = await axios.post(`${API_URL}/api/admin/users/${userId}/direct-reset-password`, { newPassword }, {
        headers: { 'X-CSRF-Token': csrfToken || '' },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (res) => {
      setRestoreUser(null);
      setRestoredResult(res.data);
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    },
    onError: (err: any) => alert(err.response?.data?.error?.message || 'Lỗi khi khôi phục mật khẩu'),
  });

  // 3. Phép khóa/mở khóa tài khoản người dùng
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, isActive }: { id: string; status: string; isActive: boolean }) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];
      const headers: Record<string, string> = {
        'X-CSRF-Token': csrfToken || '',
      };

      const res = await axios.put(
        `${API_URL}/api/admin/users/${id}/status`,
        { status, isActive },
        {
          headers,
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

  // 4. Phép xóa người dùng
  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];
      const headers: Record<string, string> = {
        'X-CSRF-Token': csrfToken || '',
      };

      const res = await axios.delete(`${API_URL}/api/admin/users/${id}`, {
        headers,
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      alert('Đã xóa tài khoản thành công!');
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.error?.message || 'Có lỗi xảy ra khi xóa người dùng.');
    },
  });

  const handleCopyText = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

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
    <AdminLayout 
      title={`Quản Lý Thành Viên (${users.length})`} 
      subtitle="Khôi phục mật khẩu tức thì, phân quyền và khóa/mở khóa tài khoản thành viên."
    >
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
              <th className="px-8 py-4 text-right">Khôi phục & Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-8 py-12 text-center text-sm font-semibold text-slate-400">
                  Chưa có thành viên nào trong hệ thống.
                </td>
              </tr>
            ) : (
              users.map((user: any) => {
                const defaultPwd = user.email ? user.email.split('@')[0] : '123456';
                return (
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
                        <span className="bg-slate-100 px-2 py-1 rounded text-slate-600 font-mono">{user.tenant.slug || user.tenant.name}</span>
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
                      <div className="flex items-center justify-end gap-2">
                        {/* Nút Khôi Phục Mật Khẩu */}
                        <button
                          onClick={() => {
                            setRestoreUser(user);
                            setCustomPassword(defaultPwd);
                            setUseDefaultPassword(true);
                          }}
                          title="Khôi phục mật khẩu Marketplace & CMS ngay lập tức"
                          className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold rounded-lg transition-all flex items-center gap-1 shadow-2xs"
                        >
                          <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                          <span>Khôi Phục MK</span>
                        </button>

                        {user.email === 'admin@aireviewbds.com' ? (
                          <span className="text-xs text-purple-600 font-bold bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                            👑 Super Admin
                          </span>
                        ) : (
                          <>
                            {user.isActive && user.status === 'ACTIVE' ? (
                              <button
                                onClick={() => updateStatusMutation.mutate({ id: user.id, status: 'BANNED', isActive: false })}
                                className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100/70 px-3 py-1.5 rounded-xl transition-all shadow-sm"
                              >
                                Khóa
                              </button>
                            ) : (
                              <button
                                onClick={() => updateStatusMutation.mutate({ id: user.id, status: 'ACTIVE', isActive: true })}
                                className="text-xs font-bold text-emerald-600 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 px-3 py-1.5 rounded-xl transition-all shadow-sm"
                              >
                                Mở Khóa
                              </button>
                            )}
                            <button
                              onClick={() => {
                                if (confirm(`Bạn có chắc chắn muốn XÓA vĩnh viễn tài khoản ${user.email}? Hành động này không thể khôi phục!`)) {
                                  deleteUserMutation.mutate(user.id);
                                }
                              }}
                              className="text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100/70 px-3 py-1.5 rounded-xl transition-all shadow-sm"
                            >
                              Xóa
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          MODAL 1: KHÔI PHỤC MẬT KHẨU CHO KHÁCH (DIRECT RESET PASSWORD MODAL)
          ═══════════════════════════════════════════════════════════════════════ */}
      {restoreUser && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Khôi Phục Mật Khẩu Khách Hàng</h3>
                  <p className="text-[11px] text-slate-400 font-mono">{restoreUser.email}</p>
                </div>
              </div>
              <button type="button" onClick={() => setRestoreUser(null)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">
                ✕
              </button>
            </div>

            <div className="my-5 space-y-4">
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900">
                <p className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Quyền Super Admin: Ghi đè & Khôi phục tức thì</span>
                </p>
                <p className="mt-1 text-amber-700 leading-relaxed">
                  Khách có thể dùng mật khẩu này để đăng nhập ngay vào cả <strong>Sàn Marketplace (Port 3000)</strong> lẫn <strong>CMS Quản Trị Website Riêng (Port 3001)</strong> mà không lo bị kẹt mật khẩu cũ.
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Lựa chọn mật khẩu cấp mới:
                </label>

                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:border-indigo-300 cursor-pointer bg-slate-50/50">
                    <input
                      type="radio"
                      name="pwdOption"
                      checked={useDefaultPassword}
                      onChange={() => {
                        setUseDefaultPassword(true);
                        setCustomPassword(restoreUser.email ? restoreUser.email.split('@')[0] : '123456');
                      }}
                      className="accent-indigo-600 w-4 h-4"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-800">Khôi phục về mật khẩu chuẩn (Theo đầu Email)</span>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                        Mật khẩu: <strong className="text-emerald-700">{restoreUser.email ? restoreUser.email.split('@')[0] : '123456'}</strong>
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:border-indigo-300 cursor-pointer bg-slate-50/50">
                    <input
                      type="radio"
                      name="pwdOption"
                      checked={!useDefaultPassword}
                      onChange={() => setUseDefaultPassword(false)}
                      className="accent-indigo-600 w-4 h-4"
                    />
                    <div className="w-full">
                      <span className="text-xs font-bold text-slate-800">Tùy chỉnh mật khẩu mới theo ý Admin</span>
                      {!useDefaultPassword && (
                        <input
                          type="text"
                          value={customPassword}
                          onChange={(e) => setCustomPassword(e.target.value)}
                          placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)..."
                          className="mt-2 w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                        />
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setRestoreUser(null)}
                className="px-4 py-2.5 border border-slate-300 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all"
              >
                Hủy
              </button>
              <button
                type="button"
                disabled={directResetMutation.isPending || (!useDefaultPassword && customPassword.trim().length < 6)}
                onClick={() => {
                  const finalPwd = useDefaultPassword 
                    ? (restoreUser.email ? restoreUser.email.split('@')[0] : '123456')
                    : customPassword.trim();
                  directResetMutation.mutate({
                    userId: restoreUser.id,
                    newPassword: finalPwd,
                  });
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center gap-1.5"
              >
                {directResetMutation.isPending ? 'Đang cập nhật...' : 'Xác Nhận Khôi Phục MK'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          MODAL 2: HIỂN THỊ KẾT QUẢ KHÔI PHỤC & SAO CHÉP GỬI ZALO
          ═══════════════════════════════════════════════════════════════════════ */}
      {restoredResult && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-emerald-200 text-center animate-scale-in">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-200">
              <Check className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-black text-slate-900">Mật Khẩu Đã Được Khôi Phục!</h3>
            <p className="text-xs text-slate-500 mt-1">
              Tài khoản thành viên đã được cấp lại quyền truy cập thành công.
            </p>

            <div className="my-5 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs font-mono space-y-2 select-all">
              <div><span className="text-slate-400 font-sans">Email:</span> <strong className="text-slate-800">{restoredResult.email}</strong></div>
              <div><span className="text-slate-400 font-sans">Mật khẩu mới:</span> <strong className="text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-300 text-sm">{restoredResult.newPassword}</strong></div>
              <div><span className="text-slate-400 font-sans">Đăng nhập Marketplace:</span> <span className="text-blue-600 font-bold">{process.env.NEXT_PUBLIC_MARKETPLACE_URL || 'http://localhost:3000'}</span></div>
              <div><span className="text-slate-400 font-sans">Đăng nhập CMS:</span> <span className="text-indigo-600 font-bold">{CMS_APP_URL}</span></div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  const info = `🔐 THÔNG TIN KHÔI PHỤC MẬT KHẨU TÀI KHOẢN:\n\n` +
                    `- Email: ${restoredResult.email}\n` +
                    `- Mật khẩu mới: ${restoredResult.newPassword}\n` +
                    `- Đăng nhập Sàn Mua Bán: ${process.env.NEXT_PUBLIC_MARKETPLACE_URL || 'http://localhost:3000'}/login\n` +
                    `- Đăng nhập Quản Trị Website CMS: ${CMS_APP_URL}/login\n\n` +
                    `👉 Quý khách có thể đăng nhập ngay bằng mật khẩu trên!`;
                  handleCopyText(info);
                }}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? '✓ Đã Sao Chép Toàn Bộ' : 'Sao Chép Gửi Zalo'}</span>
              </button>
              <button
                type="button"
                onClick={() => setRestoredResult(null)}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
