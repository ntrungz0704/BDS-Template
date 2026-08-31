/**
 * Next.js Edge Middleware — Domain Routing for Multi-Tenant SaaS
 *
 * This middleware runs at the CDN/Edge level on EVERY request.
 * It resolves the current hostname to a tenant slug and injects it
 * as a header so `getServerSideProps` can read it securely.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PLATFORM_DOMAIN = process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'templates.aireviewbds.com';
const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));

const EXCLUDED_PATHS = [
  '/_next/',
  '/api/',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/demo/',
  '/templates',
  '/pricing',
  '/marketplace',
  '/__nextjs',
];

const RESERVED_SLUGS = [
  'www', 'admin', 'cms', 'api', 'app', 'marketplace', 'templates', 'template', 'themes', 'mail', 'static', 'assets', 'support', 'bds-template-website', 'website'
];

export const TENANT_SLUG_HEADER = 'x-tenant-slug';
export const TENANT_HOST_HEADER = 'x-tenant-host';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Skip excluded paths (static, API, demo, etc.)
  if (EXCLUDED_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // 1. Sanitize incoming headers to prevent header injection from outside
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete(TENANT_SLUG_HEADER);
  requestHeaders.delete(TENANT_HOST_HEADER);

  const cleanHost = hostname.split(':')[0].toLowerCase().trim();
  const isLocalhost = cleanHost.includes('localhost') || cleanHost.includes('127.0.0.1');

  let tenantSlug: string | null = null;

  // 2. Query param or preview resolution (cho phép xem thử tức thì ngay cả khi DNS chưa trỏ)
  const queryTenant = request.nextUrl.searchParams.get('subdomain') || 
                      request.nextUrl.searchParams.get('tenant') || 
                      request.nextUrl.searchParams.get('preview');
  if (queryTenant && !RESERVED_SLUGS.includes(queryTenant)) {
    tenantSlug = queryTenant.toLowerCase().trim();
  }

  // 3. Subdomain resolution
  if (!tenantSlug) {
    if (isLocalhost) {
      if (cleanHost.endsWith('.localhost')) {
        const parts = cleanHost.split('.');
        if (parts.length > 1 && parts[0] !== 'www' && !RESERVED_SLUGS.includes(parts[0])) {
          tenantSlug = parts[0];
        }
      }
    } else {
      const knownSuffixes = [
        `.${PLATFORM_DOMAIN}`,
        '.templates.aireviewbds.com',
        '.aireviewbds.com',
        '.templatesbds.com',
        '.vercel.app',
      ].sort((a, b) => b.length - a.length);
      
      for (const suffix of knownSuffixes) {
        if (cleanHost.endsWith(suffix) && cleanHost !== suffix.slice(1)) {
          const sub = cleanHost.slice(0, -suffix.length).split('.').filter(Boolean).pop();
          if (sub && sub !== 'www' && !RESERVED_SLUGS.includes(sub)) {
            tenantSlug = sub;
            break;
          }
        }
      }
    }
  }

  // 4. Custom domain resolution via API
  if (!tenantSlug && !isLocalhost && cleanHost !== PLATFORM_DOMAIN && cleanHost !== `www.${PLATFORM_DOMAIN}` && !cleanHost.startsWith('bds-template-website')) {
    try {
      const resolveUrl = `${API_URL}/api/website/resolve-domain?domain=${encodeURIComponent(cleanHost)}`;
      const res = await fetch(resolveUrl, {
        headers: { 'x-internal-token': process.env.INTERNAL_API_TOKEN || '' },
        signal: AbortSignal.timeout(1500),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.data?.tenantSlug) {
          tenantSlug = data.data.tenantSlug;
        }
      }
    } catch (err) {
      console.warn('[Middleware] Custom domain resolution failed:', cleanHost);
    }
  }

  if (!tenantSlug || RESERVED_SLUGS.includes(tenantSlug)) {
    tenantSlug = '_notfound';
  }

  // Inject headers into the request (so getServerSideProps can read them) and the response
  requestHeaders.set(TENANT_SLUG_HEADER, tenantSlug);
  requestHeaders.set(TENANT_HOST_HEADER, hostname);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set(TENANT_SLUG_HEADER, tenantSlug);
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
