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

  // Helper: get CSRF token from localStorage (cross-domain safe)
  const getCsrfToken = (): string | null => {
    try {
      return localStorage.getItem('csrf_token');
    } catch {
      return null;
    }
  };

  // Helper: save CSRF token to localStorage
  const saveCsrfToken = (token: string) => {
    try {
      localStorage.setItem('csrf_token', token);
    } catch {
      // ignore
    }
  };

  // Request interceptor: attach CSRF token from localStorage
  axios.interceptors.request.use((config) => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      config.headers['x-csrf-token'] = csrfToken;
    }
    return config;
  });

  // Response interceptor: capture csrfToken from responses & auto-recovery on CSRF error
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
      if (
        error.response?.status === 403 &&
        error.response?.data?.error?.code === 'CSRF_ERROR' &&
        !originalRequest._csrfRetried
      ) {
        originalRequest._csrfRetried = true;
        try {
          // Call refresh to get a new CSRF token in response body
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
