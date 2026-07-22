import '../styles/globals.css';
import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import { fontVariables } from '../utils/fonts';

export default function App({ Component, pageProps }: AppProps) {
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
        <main className={`${fontVariables} font-sans antialiased text-[#475569]`}>
          <Component {...pageProps} />
          <AuthModal />
        </main>
      </AuthProvider>
    </QueryClientProvider>
  );
}

