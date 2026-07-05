import React from 'react';
import Link from 'next/link';

export default function CMSDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      {/* Navbar */}
      <nav className="border-b border-[#E5E0D8] bg-white px-8 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-8">
            <span className="text-xl font-bold text-[#1A1A2E]">WEBSITE CMS PANEL</span>
            <div className="flex space-x-6 text-sm font-medium text-[#7F7F8F]">
              <Link href="/" className="text-[#C5A572] hover:text-[#B8941F]">Tổng quan</Link>
              <Link href="/projects" className="hover:text-[#1A1A2E]">Quản lý dự án BĐS</Link>
              <Link href="/company" className="hover:text-[#1A1A2E]">Thông tin giới thiệu</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1A2E]">Bảng Điều Khiển CMS</h1>
          <p className="text-sm text-[#7F7F8F] mt-1">Quản lý giao diện, tin đăng dự án bất động sản và các thông số hoạt động.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-[#E5E0D8] bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">Quản Lý Dự Án BĐS</h2>
              <p className="text-sm text-[#7F7F8F] mb-6">Thêm mới, sửa đổi thông tin 27 trường dữ liệu dự án BĐS của bạn. Thiết lập ảnh đại diện, giá cả, vị trí.</p>
            </div>
            <Link
              href="/projects"
              className="inline-block text-center rounded-lg bg-[#C5A572] py-2.5 text-sm font-semibold text-white hover:bg-[#B8941F]"
            >
              Vào Quản Lý Dự Án
            </Link>
          </div>

          <div className="rounded-xl border border-[#E5E0D8] bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">Thông Tin Giới Thiệu & Branding</h2>
              <p className="text-sm text-[#7F7F8F] mb-6">Cập nhật logo, slogan, số điện thoại hotline, thông tin liên hệ Facebook/Zalo và cấu hình bản đồ định vị của văn phòng.</p>
            </div>
            <Link
              href="/company"
              className="inline-block text-center rounded-lg bg-[#1A1A2E] py-2.5 text-sm font-semibold text-white hover:bg-[#16213E]"
            >
              Cập Nhật Branding
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
