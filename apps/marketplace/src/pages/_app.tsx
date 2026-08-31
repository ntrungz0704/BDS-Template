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
    const reqInterceptor = axios.interceptors.request.use((config) => {
      const csrfToken = (localStorage.getItem('csrf_token') || '');
      if (csrfToken) {
        config.headers['x-csrf-token'] = decodeURIComponent(csrfToken);
      }
      return config;
    });
    const resInterceptor = axios.interceptors.response.use((response) => {
      const csrfToken = response.data?.data?.csrfToken;
      if (csrfToken) {
        localStorage.setItem('csrf_token', csrfToken);
      }
      return response;
    });
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
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

  // Safe Scroll Reveal Enhancer for all 24 Templates & 7 LPs (Never hides content)
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('bds-revealed');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
    );

    const observeSections = () => {
      const targets = document.querySelectorAll(
        'section, [data-animate], .template-section, .bds-section'
      );
      targets.forEach((el) => {
        el.classList.add('bds-revealed');
        observer.observe(el);
      });
    };

    observeSections();
    const timer = setTimeout(observeSections, 300);
    const timer2 = setTimeout(observeSections, 1000);
    router.events.on('routeChangeComplete', observeSections);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
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
