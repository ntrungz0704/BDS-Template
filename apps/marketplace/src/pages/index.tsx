import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function MarketplaceHome() {
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);
  const [orderType, setOrderType] = useState<'BUY' | 'RENT'>('BUY');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [note, setNote] = useState('');

  // 1. Query danh sách Template từ API Marketplace
  const { data: templatesRes, isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/marketplace/templates');
      return res.data;
    },
  });

  // 2. Mutation tạo đơn hàng mới
  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const res = await axios.post('http://localhost:5000/api/marketplace/orders', orderData);
      return res.data;
    },
    onSuccess: (res) => {
      alert(`Đặt hàng thành công! Mã đơn hàng của bạn là: ${res.data.orderNumber}. Vui lòng chuyển khoản thanh toán.`);
      setSelectedTemplate(null);
      resetForm();
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Có lỗi xảy ra khi đặt mua.');
    },
  });

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setSubdomain('');
    setNote('');
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      templateId: selectedTemplate.id,
      type: orderType,
      fullName,
      email,
      phone,
      subdomain: orderType === 'RENT' ? subdomain : undefined,
      note,
    };
    createOrderMutation.mutate(data);
  };

  const templates = templatesRes?.data || [];

  return (
    <div className="min-h-screen bg-[#F8F6F3] text-[#1A1A2E]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E0D8] px-8 py-6 shadow-sm">
        <div className="mx-auto max-w-7xl flex justify-between items-center">
          <span className="text-2xl font-extrabold tracking-wider text-[#C5A572]">REAL ESTATE TEMPLATE</span>
          <span className="text-sm font-medium text-[#7F7F8F]">MVP Marketplace</span>
        </div>
      </header>

      {/* Hero section */}
      <section className="mx-auto max-w-7xl px-8 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">Chọn Mẫu Giao Diện Website BĐS Đẹp Nhất</h1>
        <p className="text-md text-[#7F7F8F] max-w-xl mx-auto">Sở hữu website môi giới chuyên nghiệp chỉ sau vài phút kích hoạt tự động.</p>
      </section>

      {/* Grid List */}
      <main className="mx-auto max-w-7xl px-8 pb-20">
        {isLoading ? (
          <div className="text-center py-20 text-[#7F7F8F]">Đang tải danh sách mẫu thiết kế...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((tpl: any) => (
              <div key={tpl.id} className="rounded-xl border border-[#E5E0D8] bg-white overflow-hidden shadow-sm flex flex-col justify-between">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600"
                  alt={tpl.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{tpl.name}</h3>
                  <p className="text-sm text-[#7F7F8F] mb-6 line-clamp-2">{tpl.description}</p>
                  
                  <div className="border-t border-[#E5E0D8] pt-4 mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#7F7F8F]">Mua source code:</span>
                      <span className="font-bold text-[#1A1A2E]">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tpl.priceBuy)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#7F7F8F]">Thuê SaaS tháng:</span>
                      <span className="font-bold text-[#C5A572]">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tpl.priceRentMonthly)}/tháng</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTemplate(tpl)}
                    className="w-full rounded-lg bg-[#C5A572] py-2.5 text-sm font-semibold text-white hover:bg-[#B8941F]"
                  >
                    Đăng Ký Sở Hữu
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Đăng Ký Đơn Hàng */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg border border-[#E5E0D8] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-2">Đăng ký mua: {selectedTemplate.name}</h2>
            <p className="text-xs text-[#7F7F8F] mb-6">Nhập thông tin đăng ký của bạn. Hệ thống sẽ cấp thông tin chuyển khoản ngay sau khi xác nhận.</p>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#7F7F8F] mb-2">Hình thức đăng ký</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setOrderType('BUY')}
                    className={`rounded-lg py-2 text-sm font-semibold border ${
                      orderType === 'BUY' ? 'border-[#C5A572] bg-[#FDFBF7] text-[#C5A572]' : 'border-[#E5E0D8]'
                    }`}
                  >
                    Mua đứt Source Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('RENT')}
                    className={`rounded-lg py-2 text-sm font-semibold border ${
                      orderType === 'RENT' ? 'border-[#C5A572] bg-[#FDFBF7] text-[#C5A572]' : 'border-[#E5E0D8]'
                    }`}
                  >
                    Thuê Subdomain SaaS
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7F7F8F] mb-2">Họ & tên</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E0D8] px-3 py-2 text-sm focus:border-[#C5A572] focus:outline-none"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#7F7F8F] mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E0D8] px-3 py-2 text-sm focus:border-[#C5A572] focus:outline-none"
                    placeholder="nguyenvana@gmail.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#7F7F8F] mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E0D8] px-3 py-2 text-sm focus:border-[#C5A572] focus:outline-none"
                    placeholder="0901234567"
                    required
                  />
                </div>
              </div>

              {orderType === 'RENT' && (
                <div>
                  <label className="block text-xs font-semibold text-[#7F7F8F] mb-2">Subdomain đăng ký (.myplatform.com)</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value)}
                      className="w-full rounded-l-lg border-y border-l border-[#E5E0D8] px-3 py-2 text-sm focus:border-[#C5A572] focus:outline-none"
                      placeholder="hoanggialand"
                      required
                    />
                    <span className="inline-flex items-center px-3 rounded-r-lg border border-[#E5E0D8] bg-[#F8F6F3] text-sm text-[#7F7F8F]">
                      .myplatform.com
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#7F7F8F] mb-2">Lời nhắn / Yêu cầu riêng</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E0D8] px-3 py-2 text-sm focus:border-[#C5A572] focus:outline-none"
                  placeholder="Tôi muốn chỉnh sửa thêm màu phong thủy..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-3 border-t border-[#E5E0D8] pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedTemplate(null)}
                  className="rounded-lg border border-[#E5E0D8] px-4 py-2 text-sm font-semibold text-[#1A1A2E] hover:bg-gray-50"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={createOrderMutation.isPending}
                  className="rounded-lg bg-[#C5A572] px-4 py-2 text-sm font-semibold text-white hover:bg-[#B8941F] disabled:opacity-50"
                >
                  {createOrderMutation.isPending ? 'Đang gửi...' : 'Xác Nhận Đăng Ký'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
