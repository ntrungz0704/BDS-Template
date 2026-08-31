import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';
import Head from 'next/head';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

if (typeof window !== 'undefined') {
  axios.defaults.withCredentials = true;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';

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
      if (isExtensionError(reason?.message, reason?.filename, reason?.stack)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );

  // Request interceptor: đính kèm CSRF token từ cookie vào header
  axios.interceptors.request.use((config) => {
    const match = document.cookie.match(new RegExp('(^| )csrf_token=([^;]+)'));
    if (match) {
      config.headers['x-csrf-token'] = match[2];
    }
    return config;
  });

  // Response interceptor: tự động recovery khi CSRF token hết hạn hoặc thiếu
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response?.status === 403 &&
        error.response?.data?.error?.code === 'CSRF_ERROR' &&
        !originalRequest._csrfRetried
      ) {
        originalRequest._csrfRetried = true;
        try {
          // Gọi /api/auth/me để API server set lại cookie csrf_token mới
          await axios.get(`${API_URL}/api/auth/me`, { withCredentials: true });
          // Đọc lại csrf token mới từ cookie
          const match = document.cookie.match(new RegExp('(^| )csrf_token=([^;]+)'));
          if (match) {
            originalRequest.headers['x-csrf-token'] = match[2];
          }
          return axios(originalRequest);
        } catch {
          window.location.href = '/login';
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
}

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
