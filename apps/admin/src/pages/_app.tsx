import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

if (typeof window !== 'undefined') {
  import('axios').then((axios) => {
    axios.default.interceptors.request.use((config) => {
      const match = document.cookie.match(new RegExp('(^| )csrf_token=([^;]+)'));
      if (match) {
        config.headers['x-csrf-token'] = match[2];
      }
      return config;
    });
  });
}


export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
