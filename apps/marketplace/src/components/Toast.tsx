import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, AlertCircle, Info, X, ArrowRight } from 'lucide-react';

export default function Toast() {
  const { toast, hideToast } = useAuth();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      hideToast();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, hideToast]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';
  const isInfo = toast.type === 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-slide-up">
      <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-800 flex items-start gap-3">
        {/* Icon */}
        <div className="mt-0.5 shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {isInfo && <Info className="w-5 h-5 text-blue-400" />}
        </div>

        {/* Content */}
        <div className="flex-1 text-xs">
          <p className="font-semibold text-slate-100 leading-snug">{toast.message}</p>
          {toast.actionLabel && toast.onAction && (
            <button
              onClick={() => {
                toast.onAction?.();
                hideToast();
              }}
              className="mt-2 inline-flex items-center gap-1 font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>{toast.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={hideToast}
          className="text-slate-400 hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded-lg"
          title="��ng"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

