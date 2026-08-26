import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';

// ─── Global Axios: Auto Token Refresh + 401 handler ──────────────────────────
if (typeof window !== 'undefined') {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  let isRefreshing = false;
  let refreshQueue: Array<(token: boolean) => void> = [];

  // Attach CSRF token and Bearer token to requests
  axios.interceptors.request.use((config) => {
    const match = document.cookie.match(new RegExp('(^| )csrf_token=([^;]+)'));
    if (match) {
      config.headers['x-csrf-token'] = match[2];
    }
    const token = localStorage.getItem('platformbds_token');
    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  // Global 401 handler — auto-refresh token, then redirect if refresh fails
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const status = error?.response?.status;
      const errorCode = error?.response?.data?.error?.code;

      // Nếu 401 và chưa retry và không phải đang gọi /refresh hay /login
      if (
        status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url?.includes('/api/auth/refresh') &&
        !originalRequest.url?.includes('/api/auth/login')
      ) {
        const currentPath = window.location.pathname;
        if (currentPath.startsWith('/login')) {
          return Promise.reject(error);
        }

        if (isRefreshing) {
          // Đang refresh — xếp hàng request này lại
          return new Promise((resolve, reject) => {
            refreshQueue.push((success: boolean) => {
              if (success) {
                resolve(axios(originalRequest));
              } else {
                reject(error);
              }
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Thử refresh token
          await axios.post(`${API_URL}/api/auth/refresh`, {}, { withCredentials: true });
          // Refresh thành công — retry tất cả requests đang đợi
          refreshQueue.forEach(cb => cb(true));
          refreshQueue = [];
          isRefreshing = false;
          return axios(originalRequest);
        } catch (refreshError) {
          // Refresh thất bại — redirect về login
          refreshQueue.forEach(cb => cb(false));
          refreshQueue = [];
          isRefreshing = false;
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
}

// ─── QueryClient: suppress 401/403 errors from React Query ───────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        // Không retry khi bị 401 hoặc 403
        const status = error?.response?.status;
        if (status === 401 || status === 403) return false;
        return failureCount < 1;
      },
      // Không throw error ra UI — để component tự handle qua isError
      throwOnError: false,
    },
    mutations: {
      throwOnError: false,
    },
  },
});

if (typeof window !== 'undefined') {
  const isExtensionError = (msg?: string, filename?: string, stack?: string) => {
    const text = `${msg || ''} ${filename || ''} ${stack || ''}`;
    return (
      text.includes('chrome-extension://') ||
      text.includes('moz-extension://') ||
      text.includes('safari-extension://') ||
      text.includes('M_ID') ||
      text.includes('eppiocemhmnlbhjplcgkofciiegomcon')
    );
  };

  window.addEventListener(
    'error',
    (event) => {
      if (isExtensionError(event.message, event.filename, event.error?.stack)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    (event) => {
      const reason = event.reason;
      const status = reason?.response?.status;
      // Suppress 401, 403, and Axios errors from triggering Next.js dev overlay
      if (status === 401 || status === 403 || reason?.isAxiosError) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      if (isExtensionError(reason?.message, reason?.filename, reason?.stack)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );
}

import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (
        event.filename?.includes('chrome-extension://') ||
        event.filename?.includes('moz-extension://') ||
        event.message?.includes('chrome-extension://') ||
        event.message?.includes('M_ID')
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    window.addEventListener('error', handleError, true);
    return () => window.removeEventListener('error', handleError, true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
