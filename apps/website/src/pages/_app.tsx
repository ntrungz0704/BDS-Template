import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

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
      if (isExtensionError(reason?.message, reason?.filename, reason?.stack)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );
}

import Head from 'next/head';
import { AIChatWidget } from '../components/ai/AIChatWidget';

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

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      observer.disconnect();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </Head>
      <Component {...pageProps} />
      <AIChatWidget
        websiteName={(pageProps as any)?.company?.name || 'Sàn Giao Dịch Bất Động Sản'}
        slogan={(pageProps as any)?.company?.slogan}
        hotline={(pageProps as any)?.company?.phone || '0919 006 030'}
        zalo={(pageProps as any)?.company?.zalo || '0919 006 030'}
        email={(pageProps as any)?.company?.email}
        address={(pageProps as any)?.company?.address}
        projects={(pageProps as any)?.projects}
      />
    </QueryClientProvider>
  );
}

