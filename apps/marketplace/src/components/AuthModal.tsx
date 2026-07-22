import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Key, User, Phone, CheckCircle2, Shield, Sparkles, ArrowRight, Lock } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, authTab, closeAuthModal, openAuthModal, login, register } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Đăng nhập không thành công. Vui lòng kiểm tra lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!fullName || !email || !password) {
      setErrorMsg('Vui lòng điền đủ họ tên, email và mật khẩu.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Mật khẩu cần tối thiểu 6 ký tự.');
      return;
    }
    setLoading(true);
    try {
      await register({ fullName, email, phone, password });
    } catch (err: any) {
      setErrorMsg(err?.message || 'Đăng ký không thành công. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = () => {
    setEmail('nguyentrung.bds@gmail.com');
    setPassword('vip2026demo');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] p-6 text-white relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#C5A572] text-[#0F172A] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded">
              VIP MEMBER PORTAL
            </span>
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Bảo mật 256-bit SSL
            </span>
          </div>
          <h3 className="text-xl font-bold text-white font-serif">
            {authTab === 'login' ? 'Đăng Nhập Tài Khoản' : 'Đăng Ký Thành Viên VIP'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {authTab === 'login'
              ? 'Quản lý kho giao diện, tải source code & theo dõi tiến độ deployment.'
              : 'Trải nghiệm toàn bộ hệ sinh thái 16 mẫu template BĐS độc quyền.'}
          </p>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 gap-1 bg-slate-800/80 p-1 rounded-xl mt-5 border border-slate-700">
            <button
              type="button"
              onClick={() => { openAuthModal('login'); setErrorMsg(''); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authTab === 'login'
                  ? 'bg-[#C5A572] text-[#0F172A] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              Đăng Nhập
            </button>
            <button
              type="button"
              onClick={() => { openAuthModal('register'); setErrorMsg(''); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authTab === 'register'
                  ? 'bg-[#C5A572] text-[#0F172A] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Đăng Ký Mới
            </button>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              {errorMsg}
            </div>
          )}

          {authTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Email của bạn
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vidu@domain.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0F172A] focus:bg-white transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Mật khẩu
                  </label>
                  <a href="#" className="text-[11px] font-semibold text-[#2563EB] hover:underline">
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0F172A] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                <span>{loading ? 'Đang xác thực...' : 'Đăng Nhập Ngay'}</span>
                <ArrowRight className="w-4 h-4 text-[#C5A572] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* 1-Click VIP Demo Account */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={fillDemoAccount}
                  className="w-full py-2 bg-[#C5A572]/15 hover:bg-[#C5A572]/25 text-[#9C7A43] border border-[#C5A572]/30 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Điền nhanh Tài khoản VIP Demo (1-Click Test)
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Họ và tên
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0F172A] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Số điện thoại (Zalo / Call)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0919006030"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0F172A] focus:bg-white transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@company.vn"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0F172A] focus:bg-white transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0F172A] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  <span>{loading ? 'Đang tạo tài khoản...' : 'Tạo Tài Khoản VIP'}</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A572] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          )}

          <div className="mt-5 text-center text-slate-400 text-xs flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Tài khoản đồng bộ 100% với kho template & dịch vụ SaaS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
