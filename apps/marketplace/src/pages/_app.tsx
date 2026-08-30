import '../styles/globals.css';
import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../context/AuthContext';
import Toast from '../components/Toast';
import FloatingButtons from '../components/FloatingButtons';
import { fontVariables } from '../utils/fonts';

import Head from 'next/head';
import axios from 'axios';

export default function App({ Component, pageProps, router }: AppProps) {
  const isDemoPage = router.pathname.startsWith('/demo');
  React.useEffect(() => {
    axios.defaults.withCredentials = true;
    const interceptor = axios.interceptors.request.use((config) => {
      const csrfToken = document.cookie.match(new RegExp('(^| )csrf_token=([^;]+)'))?.[2];
      if (csrfToken) {
        config.headers['x-csrf-token'] = decodeURIComponent(csrfToken);
      }
      return config;
    });
    return () => axios.interceptors.request.eject(interceptor);
  }, []);

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

  // Global High-Performance Scroll Reveal Animation Engine for all 24 Templates & 7 LPs
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    document.body.classList.add('bds-reveal-init');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('bds-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const observeSections = () => {
      const targets = document.querySelectorAll(
        'section, [data-animate], .template-section, .bds-section'
      );
      targets.forEach((el, index) => {
        // Initial top section or elements in viewport immediately activate
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95 || index === 0) {
          el.classList.add('bds-revealed');
        } else {
          observer.observe(el);
        }
      });
    };

    observeSections();
    const timer = setTimeout(observeSections, 600);
    router.events.on('routeChangeComplete', observeSections);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      router.events.off('routeChangeComplete', observeSections);
    };
  }, [router]);

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
          {!isDemoPage && <FloatingButtons />}
        </main>
      </AuthProvider>
    </QueryClientProvider>
  );
}
