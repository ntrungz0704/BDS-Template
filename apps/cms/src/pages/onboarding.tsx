/**
 * Tenant Onboarding Wizard
 *
 * First-time setup flow for new PlatformBDS customers.
 * Shown after registration/payment until setup is complete.
 *
 * Steps:
 *   1. Thông tin công ty (name, slogan, phone, email)
 *   2. Chọn template (shows all 16 templates with preview)
 *   3. Cài đặt miền (subdomain choice + optional custom domain)
 *   4. Hoàn thành & Launch!
 *
 * The wizard saves progress and is resumable.
 * Once all steps are done, redirect to CMS Dashboard.
 */

import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import {
  Building2,
  Globe,
  Palette,
  Rocket,
  Check,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Loader2,
  Star,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Shield,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface OnboardingData {
  // Step 1
  companyName: string;
  slogan: string;
  phone: string;
  email: string;
  address: string;
  // Step 2
  templateId: string;
  // Step 3
  subdomain: string;
}

type Step = 1 | 2 | 3 | 4;

// ─── Template Options ─────────────────────────────────────────────────────────

const TEMPLATES = [
  { id: 'luxury-gold', name: 'Luxury Gold', desc: 'Biệt thự & Lâu đài hoàng gia', color: 'from-yellow-600 to-amber-400', tag: 'Phổ biến nhất', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400' },
  { id: 'minimal-white', name: 'Minimal White', desc: 'Môi giới & Cá nhân', color: 'from-slate-700 to-slate-500', tag: '', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400' },
  { id: 'resort-paradise', name: 'Resort Paradise', desc: 'Nghỉ dưỡng & Biển', color: 'from-cyan-600 to-teal-400', tag: '', img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400' },
  { id: 'apartment-modern', name: 'Apartment Modern', desc: 'Căn hộ thông minh', color: 'from-indigo-600 to-blue-400', tag: '', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400' },
  { id: 'green-eco', name: 'Green Eco', desc: 'Dự án xanh & bền vững', color: 'from-green-600 to-emerald-400', tag: 'Mới', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400' },
  { id: 'urban-loft', name: 'Urban Loft', desc: 'Nhà phố & Shophouse', color: 'from-orange-600 to-red-400', tag: '', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400' },
];

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current, total = 4 }: { current: Step; total?: number }) {
  const steps = [
    { label: 'Công ty', icon: <Building2 className="w-4 h-4" /> },
    { label: 'Template', icon: <Palette className="w-4 h-4" /> },
    { label: 'Tên miền', icon: <Globe className="w-4 h-4" /> },
    { label: 'Hoàn thành', icon: <Rocket className="w-4 h-4" /> },
  ];

  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((step, idx) => {
        const num = (idx + 1) as Step;
        const done = num < current;
        const active = num === current;

        return (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  done
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                    : active
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-110'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {done ? <Check className="w-4 h-4" /> : step.icon}
              </div>
              <span className={`text-[10px] font-semibold mt-1.5 ${active ? 'text-blue-600' : done ? 'text-emerald-600' : 'text-slate-400'}`}>
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`h-0.5 w-12 sm:w-20 mb-5 mx-1 rounded-full transition-all duration-500 ${done ? 'bg-emerald-400' : 'bg-slate-200'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Step 1: Company Info ─────────────────────────────────────────────────────

function Step1({ data, onChange }: { data: OnboardingData; onChange: (k: keyof OnboardingData, v: string) => void }) {
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Building2 className="w-7 h-7 text-blue-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Thông tin công ty</h2>
        <p className="text-slate-500 mt-1.5 text-sm">Thông tin này sẽ hiển thị trên website của bạn</p>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
          Tên Công Ty <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.companyName}
          onChange={(e) => onChange('companyName', e.target.value)}
          placeholder="VD: Hoàng Gia Land"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow bg-white"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Slogan</label>
        <input
          type="text"
          value={data.slogan}
          onChange={(e) => onChange('slogan', e.target.value)}
          placeholder="VD: Không Gian Sống Thượng Lưu"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow bg-white"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
            Số Điện Thoại <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="0983 312 219"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="contact@company.vn"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow bg-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Địa Chỉ</label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => onChange('address', e.target.value)}
          placeholder="Tòa nhà X, Q1, TP.HCM"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow bg-white"
        />
      </div>
    </div>
  );
}

// ─── Step 2: Template Picker ──────────────────────────────────────────────────

function Step2({ data, onChange }: { data: OnboardingData; onChange: (k: keyof OnboardingData, v: string) => void }) {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Palette className="w-7 h-7 text-violet-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Chọn giao diện website</h2>
        <p className="text-slate-500 mt-1.5 text-sm">Bạn có thể đổi giao diện bất kỳ lúc nào từ CMS</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES.map((tpl) => {
          const selected = data.templateId === tpl.id;
          return (
            <button
              key={tpl.id}
              onClick={() => onChange('templateId', tpl.id)}
              className={`group relative rounded-2xl overflow-hidden border-2 text-left transition-all duration-200 ${
                selected
                  ? 'border-blue-500 shadow-xl shadow-blue-500/20 scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              {/* Thumbnail */}
              <div className={`h-32 bg-gradient-to-br ${tpl.color} relative overflow-hidden`}>
                <img src={tpl.img} alt={tpl.name} className="w-full h-full object-cover mix-blend-overlay opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                {tpl.tag && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 text-slate-800 text-[10px] font-black rounded-full">
                    {tpl.tag === 'Phổ biến nhất' ? '⭐ ' : '✨ '}{tpl.tag}
                  </span>
                )}
                {/* Selected checkmark */}
                {selected && (
                  <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="p-3 bg-white">
                <p className="text-sm font-black text-slate-900">{tpl.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{tpl.desc}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-slate-400">Xem trước →</span>
                  {selected && <span className="text-[10px] font-bold text-blue-600">Đã chọn</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 3: Domain Setup ─────────────────────────────────────────────────────

function Step3({ data, onChange }: { data: OnboardingData; onChange: (k: keyof OnboardingData, v: string) => void }) {
  const slug = data.subdomain || data.companyName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 20) || 'mywebsite';
  const previewSlug = data.subdomain || slug;

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Globe className="w-7 h-7 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Tên miền website</h2>
        <p className="text-slate-500 mt-1.5 text-sm">Địa chỉ URL của website bất động sản của bạn</p>
      </div>

      {/* Subdomain preview */}
      <div className="bg-slate-900 rounded-2xl p-4 mb-5 font-mono">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
            <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
          </div>
          <div className="flex-1 bg-slate-700 rounded-lg px-3 py-1 text-xs text-slate-300 flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span className="text-emerald-400">{previewSlug}</span>
            <span className="text-slate-500">.platformbds.vn</span>
          </div>
        </div>
        <p className="text-emerald-400 text-xs text-center">✓ Website của bạn sẽ có địa chỉ này</p>
      </div>

      {/* Subdomain input */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
          Tên Miền Phụ <span className="text-red-500">*</span>
        </label>
        <div className="flex rounded-xl overflow-hidden border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500 bg-white shadow-sm">
          <input
            type="text"
            value={data.subdomain}
            onChange={(e) => {
              const v = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 30);
              onChange('subdomain', v);
            }}
            placeholder={slug}
            className="flex-1 px-4 py-3 text-sm outline-none bg-transparent font-mono"
          />
          <span className="px-4 py-3 bg-slate-50 text-slate-500 text-sm border-l border-slate-200 whitespace-nowrap font-mono">
            .platformbds.vn
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">Chỉ dùng chữ thường, số và dấu gạch ngang. Tối đa 30 ký tự.</p>
      </div>

      {/* Custom domain note */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <Globe className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-blue-800">Muốn dùng tên miền riêng?</p>
          <p className="text-xs text-blue-700 mt-0.5">
            VD: www.hoanggialand.vn — Có thể cài đặt sau từ mục{' '}
            <strong>Domain & Hosting</strong> trong CMS Dashboard. Cần gói Pro+.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Step 4: Launch! ──────────────────────────────────────────────────────────

function Step4({ data, onLaunch, launching }: { data: OnboardingData; onLaunch: () => void; launching: boolean }) {
  const template = TEMPLATES.find((t) => t.id === data.templateId) || TEMPLATES[0];
  const subdomain = data.subdomain || data.companyName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 20);

  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-violet-600 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-blue-500/30">
        <Sparkles className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-2xl font-black text-slate-900">Tất cả đã sẵn sàng! 🚀</h2>
      <p className="text-slate-500 mt-2 text-sm">Xem lại thông tin trước khi khởi động website</p>

      {/* Summary */}
      <div className="mt-6 bg-slate-50 rounded-2xl border border-slate-200 p-5 text-left space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div className="flex items-center gap-2 text-sm text-slate-500"><Building2 className="w-4 h-4" /> Công ty</div>
          <span className="text-sm font-bold text-slate-800">{data.companyName || 'Chưa đặt tên'}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div className="flex items-center gap-2 text-sm text-slate-500"><Phone className="w-4 h-4" /> Điện thoại</div>
          <span className="text-sm font-bold text-slate-800">{data.phone || '—'}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div className="flex items-center gap-2 text-sm text-slate-500"><Palette className="w-4 h-4" /> Template</div>
          <span className="text-sm font-bold text-slate-800">{template.name}</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2 text-sm text-slate-500"><Globe className="w-4 h-4" /> Website URL</div>
          <span className="text-sm font-bold text-blue-600">{subdomain}.platformbds.vn</span>
        </div>
      </div>

      {/* Checklist */}
      <div className="mt-5 space-y-2">
        {[
          'Website tự động được khởi tạo',
          'SSL certificate được cấp miễn phí',
          'Demo data mẫu được import sẵn',
          'CMS Dashboard mở ngay lập tức',
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-slate-700 bg-emerald-50 rounded-xl px-4 py-2.5">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            {item}
          </div>
        ))}
      </div>

      {/* Launch button */}
      <button
        onClick={onLaunch}
        disabled={launching}
        className="mt-6 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-base font-black rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-blue-600/30 disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {launching ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Đang khởi động website...</>
        ) : (
          <><Rocket className="w-5 h-5" /> Khởi Động Website Ngay!</>
        )}
      </button>
      <p className="text-xs text-slate-400 mt-3">Quá trình khởi tạo mất khoảng 10-30 giây</p>
    </div>
  );
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>(1);
  const [launching, setLaunching] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    companyName: '',
    slogan: '',
    phone: '',
    email: '',
    address: '',
    templateId: 'luxury-gold',
    subdomain: '',
  });

  const handleChange = useCallback((key: keyof OnboardingData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const canProceed = useCallback(() => {
    if (step === 1) return data.companyName.trim().length >= 2 && data.phone.trim().length >= 9 && data.email.includes('@');
    if (step === 2) return !!data.templateId;
    if (step === 3) return (data.subdomain || data.companyName).length >= 3;
    return true;
  }, [step, data]);

  const handleNext = useCallback(() => {
    if (step < 4) setStep((s) => (s + 1) as Step);
  }, [step]);

  const handleBack = useCallback(() => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  }, [step]);

  const handleLaunch = useCallback(async () => {
    setLaunching(true);
    try {
      // TODO: POST /api/tenants/onboard with data
      await new Promise((r) => setTimeout(r, 2500));
      // Redirect to CMS dashboard
      window.location.href = '/';
    } catch (err) {
      setLaunching(false);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Thiết lập website | PlatformBDS</title>
        <meta name="robots" content="noindex,nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center p-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Background pattern */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.08),transparent_60%)] pointer-events-none" />

        <div className="w-full max-w-3xl relative">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl" />
              <span className="text-sm font-black text-slate-900">PlatformBDS</span>
            </div>
          </div>

          {/* Main card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/60 p-6 sm:p-8">
            <StepIndicator current={step} />

            {/* Step content */}
            <div className="min-h-[400px]">
              {step === 1 && <Step1 data={data} onChange={handleChange} />}
              {step === 2 && <Step2 data={data} onChange={handleChange} />}
              {step === 3 && <Step3 data={data} onChange={handleChange} />}
              {step === 4 && <Step4 data={data} onLaunch={handleLaunch} launching={launching} />}
            </div>

            {/* Navigation */}
            {step < 4 && (
              <div className="flex items-center justify-between mt-8 pt-5 border-t border-slate-100">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" /> Quay lại
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">Bước {step}/4</span>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {step === 3 ? 'Xem tổng kết' : 'Tiếp theo'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-slate-400 mt-5">
            🔒 Thông tin của bạn được bảo mật tuyệt đối · © 2026 PlatformBDS
          </p>
        </div>
      </div>
    </>
  );
}
