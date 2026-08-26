import * as React from 'react';

export interface ContactFormProps {
  onSubmit?: (data: { fullName: string; phone: string; email?: string; message?: string }) => Promise<void> | void;
  hotline?: string;
  className?: string;
  submitLabel?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  hotline = '0983 312 219',
  className = '',
  submitLabel = 'Gửi Yêu Cầu Tư Vấn',
}) => {
  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      setError('Vui lòng điền họ tên và số điện thoại liên hệ.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      if (onSubmit) {
        await onSubmit({ fullName, phone, email, message });
      }
      setSent(true);
    } catch (err: any) {
      setError(err?.message || 'Có lỗi xảy ra khi gửi thông tin.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className={`p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center ${className}`}>
        <span className="text-3xl block mb-2">🎉</span>
        <h4 className="text-base font-bold text-emerald-900">Gửi thông tin thành công!</h4>
        <p className="text-xs text-emerald-700 mt-1.5 leading-relaxed">
          Đội ngũ chuyên viên sẽ liên hệ lại với Quý khách qua số <strong>{phone}</strong> trong vòng 10 phút.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-4 text-xs font-bold text-emerald-800 underline"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3.5 ${className}`}>
      <h3 className="text-base font-bold text-slate-900">Đăng Ký Tư Vấn & Nhận Bảng Giá</h3>
      <p className="text-xs text-slate-500">Nhập thông tin bên dưới, chuyên viên BĐS sẽ hỗ trợ Quý khách 24/7.</p>

      {error && (
        <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-medium">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Họ và tên *</label>
        <input
          type="text"
          required
          placeholder="Nguyễn Văn A"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-slate-900"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Số điện thoại *</label>
        <input
          type="tel"
          required
          placeholder="0983 312 219"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-slate-900"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Email (tùy chọn)</label>
        <input
          type="email"
          placeholder="email@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-slate-900"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Nội dung quan tâm</label>
        <textarea
          rows={2}
          placeholder="Tôi muốn nhận thông tin mặt bằng và chính sách ưu đãi..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-slate-900 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md"
      >
        {loading ? 'Đang gửi thông tin...' : submitLabel}
      </button>

      {hotline && (
        <p className="text-[11px] text-center text-slate-400 pt-1">
          Hoặc gọi hotline trực tiếp: <strong className="text-slate-800 font-mono">{hotline}</strong>
        </p>
      )}
    </form>
  );
};
