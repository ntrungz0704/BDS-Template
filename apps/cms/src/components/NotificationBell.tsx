import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Bell, CheckCheck, ExternalLink, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';

interface NotificationItem {
  id: string;
  type?: string;
  title: string;
  content: string;
  actionUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export default function CMSNotificationBell() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com');
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/notifications?limit=15`, { withCredentials: true });
      if (res.data?.success) {
        setNotifications(res.data.data.notifications || []);
        setUnreadCount(res.data.data.unreadCount || 0);
      }
    } catch {}
  };

  useEffect(() => {
    fetchNotifications();

    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource(`${API_URL}/api/notifications/stream`, { withCredentials: true });

      eventSource.addEventListener('notification', (event: MessageEvent) => {
        try {
          const parsed = JSON.parse(event.data);
          const newNotif = parsed.data;
          if (newNotif) {
            setNotifications(prev => [newNotif, ...prev.filter(n => n.id !== newNotif.id)]);
            setUnreadCount(c => c + 1);
          }
        } catch {}
      });
    } catch {}

    return () => {
      if (eventSource) eventSource.close();
    };
  }, [API_URL]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await axios.patch(`${API_URL}/api/notifications/${id}/read`, {}, { withCredentials: true });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      setUnreadCount(c => Math.max(0, c - 1));
    } catch {}
  };

  const handleMarkAllAsRead = async () => {
    try {
      await axios.post(`${API_URL}/api/notifications/read-all`, {}, { withCredentials: true });
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch {}
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all focus:outline-none"
        title="Thông báo"
        aria-label="Thông báo"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-rose-500 text-white text-[9px] font-black rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center ring-2 ring-white animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 text-slate-800 animate-fadeIn">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-900">Thông báo</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.2 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full">
                  {unreadCount} mới
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" /> Đã đọc tất cả
              </button>
            )}
          </div>

          <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs font-medium">Bạn chưa có thông báo nào.</div>
            ) : (
              notifications.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => handleMarkAsRead(notif.id)}
                  className={`p-3.5 flex items-start gap-3 transition-colors hover:bg-slate-50 cursor-pointer ${
                    !notif.isRead ? 'bg-blue-50/40' : ''
                  }`}
                >
                  <div className="mt-0.5">
                    {notif.type === 'NEW_LEAD' ? (
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    ) : notif.type === 'ORDER_APPROVED' ? (
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Bell className="w-4 h-4 text-blue-500 shrink-0" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className={`text-xs ${!notif.isRead ? 'font-bold text-slate-900' : 'font-medium text-slate-700'} truncate`}>
                        {notif.title}
                      </p>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                      {notif.content}
                    </p>
                    <div className="flex items-center justify-between mt-1.5 text-[10px] text-slate-400 font-mono">
                      <span>{new Date(notif.createdAt).toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                      {notif.actionUrl && (
                        <Link
                          href={notif.actionUrl}
                          className="text-blue-600 hover:underline flex items-center gap-0.5 font-bold"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(false);
                            handleMarkAsRead(notif.id);
                          }}
                        >
                          Xem chi tiết <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
