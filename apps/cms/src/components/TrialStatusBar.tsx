import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface TrialInfo {
  status: string | null;
  startAt: string | null;
  endAt: string | null;
  saveCount: number;
  saveLimit: number;
  remainingSaves: number;
}

interface SubscriptionInfo {
  id: string;
  plan: string;
  status: string;
  startDate: string;
  endDate: string;
}

const ZALO_URL = 'https://zalo.me/platformbds';

export default function TrialStatusBar() {
  const [trial, setTrial] = useState<TrialInfo | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';
      const res = await axios.get(`${API_URL}/api/cms/builder/subscription`, {
        withCredentials: true,
      });
      const data = res.data.data;
      setTrial(data.trial || null);
      setSubscription(data.subscription || null);
    } catch (err) {
      console.error('Failed to fetch trial status:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Update countdown every minute
  useEffect(() => {
    if (!trial?.endAt) return;

    const updateCountdown = () => {
      const end = new Date(trial.endAt!).getTime();
      const now = Date.now();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft('Đã hết hạn');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days} ngày ${hours} giờ`);
      } else if (hours > 0) {
        setTimeLeft(`${hours} giờ ${minutes} phút`);
      } else {
        setTimeLeft(`${minutes} phút`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [trial?.endAt]);

  if (loading) return null;

  // Has active subscription — no banner needed
  if (subscription && subscription.status === 'ACTIVE') {
    return null;
  }

  // No trial info at all
  if (!trial || !trial.status) return null;

  const isExpired = trial.status === 'EXPIRED' || timeLeft === 'Đã hết hạn';
  const isExpiring = trial.status === 'EXPIRING' || (
    trial.endAt && (new Date(trial.endAt).getTime() - Date.now()) < 24 * 60 * 60 * 1000
  );

  // EXPIRED: Full-screen lock overlay
  if (isExpired) {
    return (
      <>
        <div className="bg-red-600 text-white px-4 py-3 text-center text-sm font-medium">
          <span>⚠️ Thời gian dùng thử đã hết. CMS đã bị khóa. </span>
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold hover:text-red-100 ml-1"
          >
            Liên hệ Zalo để đăng ký gói sử dụng
          </a>
        </div>
        {/* Lock overlay that prevents interactions */}
        <div className="fixed inset-0 bg-black/30 z-40 pointer-events-auto" style={{ top: '48px' }}>
          <div className="flex items-center justify-center h-full">
            <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4 text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">CMS đã bị khóa</h2>
              <p className="text-gray-600 mb-1">Thời gian dùng thử đã kết thúc.</p>
              <p className="text-gray-500 text-sm mb-4">Dữ liệu của bạn vẫn được lưu giữ an toàn.</p>
              <p className="text-gray-500 text-sm mb-6">
                Lưu đã dùng: {trial.saveCount}/{trial.saveLimit} lượt
              </p>
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Liên hệ qua Zalo để đăng ký
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  // EXPIRING: Yellow warning banner
  if (isExpiring) {
    return (
      <div className="bg-amber-500 text-white px-4 py-2.5 text-center text-sm font-medium flex items-center justify-center gap-3">
        <span>⏰ Dùng thử sắp hết hạn: còn {timeLeft} | Lưu: {trial.saveCount}/{trial.saveLimit}</span>
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-amber-700 px-3 py-1 rounded-md text-xs font-bold hover:bg-amber-50 transition-colors"
        >
          Liên hệ Zalo
        </a>
      </div>
    );
  }

  // ACTIVE: Subtle info banner
  return (
    <div className="bg-emerald-600 text-white px-4 py-2 text-center text-sm flex items-center justify-center gap-3">
      <span>🟢 Dùng thử: còn {timeLeft} | Lưu: {trial.saveCount}/{trial.saveLimit} lượt</span>
    </div>
  );
}

