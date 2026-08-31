import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';
import Head from 'next/head';

// ─── CSRF helpers: use localStorage for cross-domain CSRF tokens ─────────────
const getCsrfToken = (): string | null => {
  try { return typeof window !== 'undefined' ? localStorage.getItem('csrf_token') : null; } catch { return null; }
};
const saveCsrfToken = (token: string) => {
  try { if (typeof window !== 'undefined') localStorage.setItem('csrf_token', token); } catch { /* ignore */ }
};

// ─── Global Axios: Auto Token Refresh + 401 handler ──────────────────────────
if (typeof window !== 'undefined') {
  const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));
  axios.defaults.withCredentials = true;
  let isRefreshing = false;
  let refreshQueue: Array<(token: boolean) => void> = [];

  // Request interceptor: attach CSRF token from localStorage
  axios.interceptors.request.use((config) => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      config.headers['x-csrf-token'] = csrfToken;
    }
    return config;
  });

  // Response interceptor: capture CSRF tokens + auto-refresh on 401 + CSRF recovery on 403
  axios.interceptors.response.use(
    (response) => {
      // Capture CSRF token from login/refresh response body
      const csrfToken = response.data?.data?.csrfToken;
      if (csrfToken) {
        saveCsrfToken(csrfToken);
      }
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const status = error?.response?.status;
      const errorCode = error?.response?.data?.error?.code;

      // CSRF error recovery
      if (
        status === 403 &&
        errorCode === 'CSRF_ERROR' &&
        !originalRequest._csrfRetried
      ) {
        originalRequest._csrfRetried = true;
        try {
          const refreshRes = await axios.post(`${API_URL}/api/auth/refresh`, {}, { withCredentials: true });
          const newCsrfToken = refreshRes.data?.data?.csrfToken;
          if (newCsrfToken) {
            saveCsrfToken(newCsrfToken);
            originalRequest.headers['x-csrf-token'] = newCsrfToken;
          }
          return axios(originalRequest);
        } catch {
          window.location.href = '/login';
          return Promise.reject(error);
        }
      }

      // 401 auto-refresh
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
          const refreshRes = await axios.post(`${API_URL}/api/auth/refresh`, {}, { withCredentials: true });
          const newCsrfToken = refreshRes.data?.data?.csrfToken;
          if (newCsrfToken) {
            saveCsrfToken(newCsrfToken);
          }
          refreshQueue.forEach(cb => cb(true));
          refreshQueue = [];
          isRefreshing = false;
          return axios(originalRequest);
        } catch (refreshError) {
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
        const status = error?.response?.status;
        if (status === 401 || status === 403) return false;
        return failureCount < 1;
      },
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
