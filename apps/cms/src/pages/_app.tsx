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

  // Attach CSRF token to every mutating request
  axios.interceptors.request.use((config) => {
    const match = document.cookie.match(new RegExp('(^| )csrf_token=([^;]+)'));
    if (match) {
      config.headers['x-csrf-token'] = match[2];
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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
