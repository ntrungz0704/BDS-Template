import '../styles/globals.css';
import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../context/AuthContext';
import Toast from '../components/Toast';
import FloatingButtons from '../components/FloatingButtons';
import { fontVariables } from '../utils/fonts';

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

  const [queryClient] = useState(() => new QueryClient({
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
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        </Head>
        <main className={`${fontVariables} font-sans antialiased text-[#475569]`}>
          <Component {...pageProps} />
          <Toast />
          <FloatingButtons />
        </main>
      </AuthProvider>
    </QueryClientProvider>
  );
}

