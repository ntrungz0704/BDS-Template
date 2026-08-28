import React, { useState } from 'react';
import Head from 'next/head';
import CMSLayout from '../components/layout/CMSLayout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Users, MoreVertical, Trash2, Mail, Edit2, CheckCircle, XCircle, Clock } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';

export default function MembersPage() {
  const queryClient = useQueryClient();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({ email: '', role: 'STAFF' });
  
  const { data: members = [], isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/members`, { withCredentials: true });
      return res.data.data;
    }
  });

  const inviteMutation = useMutation({
    mutationFn: async (data: { email: string, role: string }) => {
      await axios.post(`${API_URL}/api/cms/members/invite`, data, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      setShowInviteModal(false);
      setInviteForm({ email: '', role: 'STAFF' });
    }
  });

  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/api/cms/members/${id}`, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    }
  });
  
  const resendMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.post(`${API_URL}/api/cms/members/${id}/resend`, {}, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      alert('Đã gửi lại lời mời');
    }
  });

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteForm.email) {
      inviteMutation.mutate(inviteForm);
    }
  };

  const activeMembers = members.filter((m: any) => m.inviteStatus === 'ACTIVE');
  const pendingInvites = members.filter((m: any) => m.inviteStatus !== 'ACTIVE');

  return (
    <>
      <Head>
        <title>Quản lý nhân sự - PlatformBDS</title>
      </Head>
      <CMSLayout>
        <div className="flex flex-col h-full bg-slate-50 min-h-screen">
          <div className="px-6 py-5 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Quản lý nhân sự</h1>
              <p className="text-sm text-slate-500 mt-0.5">Quản lý thành viên trong website của bạn</p>
            </div>
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              <Users className="w-4 h-4" />
              Mời thành viên
            </button>
          </div>

          <div className="flex-1 p-6 space-y-8">
            {/* Active Members */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h3 className="font-semibold text-slate-800">Thành viên hiện tại</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold">
                    <tr>
                      <th className="px-6 py-3">Thành viên</th>
                      <th className="px-6 py-3">Quyền</th>
                      <th className="px-6 py-3">Ngày tham gia</th>
                      <th className="px-6 py-3 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoading ? (
                      <tr><td colSpan={4} className="text-center py-8">Đang tải...</td></tr>
                    ) : activeMembers.length === 0 ? (
                      <tr><td colSpan={4} className="text-center py-8 text-slate-500">Chưa có thành viên nào.</td></tr>
                    ) : activeMembers.map((member: any) => (
                      <tr key={member.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                              {member.user?.fullName?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <div className="font-medium text-slate-900">{member.user?.fullName}</div>
                              <div className="text-slate-500 text-xs">{member.user?.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            member.role === 'TENANT_OWNER' ? 'bg-purple-100 text-purple-700' :
                            member.role === 'EDITOR' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {member.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          {new Date(member.createdAt).toLocaleDateString('vi-VN')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {member.role !== 'TENANT_OWNER' && (
                            <button 
                              onClick={() => {
                                if (confirm('Bạn có chắc chắn muốn xóa thành viên này?')) {
                                  removeMutation.mutate(member.id);
                                }
                              }}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pending Invites */}
            {pendingInvites.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <h3 className="font-semibold text-slate-800">Lời mời đang chờ</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold">
                      <tr>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Quyền</th>
                        <th className="px-6 py-3">Trạng thái</th>
                        <th className="px-6 py-3 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {pendingInvites.map((invite: any) => (
                        <tr key={invite.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-medium text-slate-900">{invite.invitedEmail}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700">
                              {invite.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {invite.inviteStatus === 'PENDING' ? (
                              <span className="flex items-center gap-1 text-amber-600 text-xs font-medium">
                                <Clock className="w-3.5 h-3.5" /> Chờ xác nhận
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-red-600 text-xs font-medium">
                                <XCircle className="w-3.5 h-3.5" /> Đã hết hạn
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 flex items-center justify-end gap-2">
                            <button
                              onClick={() => resendMutation.mutate(invite.id)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                              title="Gửi lại lời mời"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Bạn có chắc chắn muốn hủy lời mời này?')) {
                                  removeMutation.mutate(invite.id);
                                }
                              }}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                              title="Hủy lời mời"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Invite Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Mời thành viên mới</h2>
              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email người được mời</label>
                  <input
                    type="email"
                    required
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Quyền truy cập</label>
                  <select
                    value={inviteForm.role}
                    onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="STAFF">Nhân viên (Staff)</option>
                    <option value="EDITOR">Biên tập viên (Editor)</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={inviteMutation.isPending}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition disabled:opacity-50"
                  >
                    {inviteMutation.isPending ? 'Đang gửi...' : 'Gửi lời mời'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </CMSLayout>
    </>
  );
}

