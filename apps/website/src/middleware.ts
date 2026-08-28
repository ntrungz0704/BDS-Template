/**
 * Next.js Edge Middleware — Domain Routing for Multi-Tenant SaaS
 *
 * This middleware runs at the CDN/Edge level on EVERY request.
 * It resolves the current hostname to a tenant slug and injects it
 * as a header so `getServerSideProps` can read it securely.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PLATFORM_DOMAIN = process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'aireviewbds.com';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';

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
  'www', 'admin', 'cms', 'api', 'app', 'marketplace', 'templates', 'template', 'themes', 'mail', 'static', 'assets', 'support'
];


export const TENANT_SLUG_HEADER = 'x-tenant-slug';
export const TENANT_HOST_HEADER = 'x-tenant-host';

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
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
  const isDev = process.env.NODE_ENV !== 'production';

  let tenantSlug: string | null = null;

  // 2. Subdomain resolution (Hosts take highest precedence)
  if (isLocalhost) {
    // e.g. hoanggialand.localhost:3003 -> tenantSlug = 'hoanggialand'
    if (cleanHost.endsWith('.localhost')) {
      const parts = cleanHost.split('.');
      if (parts.length > 1 && parts[0] !== 'www') {
        tenantSlug = parts[0];
      }
    }
  } else if (cleanHost.endsWith(`.${PLATFORM_DOMAIN}`)) {
    const subdomain = cleanHost.replace(`.${PLATFORM_DOMAIN}`, '');
    if (subdomain && subdomain !== 'www' && subdomain !== PLATFORM_DOMAIN) {
      tenantSlug = subdomain;
    }
  }

  // 3. Query parameter fallback (in development/localhost environment)
  if (!tenantSlug && (isDev || isLocalhost)) {
    const queryTenant = searchParams.get('tenant');
    if (queryTenant) {
      tenantSlug = queryTenant.toLowerCase().trim();
    }
  }

  // 4. Cookie fallback (if previously visited a tenant on localhost)
  if (!tenantSlug && (isDev || isLocalhost)) {
    const cookieTenant = request.cookies.get('tenant_slug')?.value;
    if (cookieTenant && cookieTenant !== '_notfound') {
      tenantSlug = cookieTenant.toLowerCase().trim();
    }
  }

  // 5. Custom domain resolution (Only if not resolved by subdomain/query)
  if (!tenantSlug && !isLocalhost && cleanHost !== PLATFORM_DOMAIN && cleanHost !== `www.${PLATFORM_DOMAIN}`) {
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

  // 6. Reserved slugs validation (system domains cannot be tenants)
  if (tenantSlug && RESERVED_SLUGS.includes(tenantSlug)) {
    tenantSlug = '_notfound';
  }

  // 7. Local development auto-fallback to active tenant if not set
  if ((!tenantSlug || tenantSlug === '_notfound') && (isDev || isLocalhost)) {
    tenantSlug = 'nguyen-pham-thanh-trung-land';
  }

  if (!tenantSlug) {
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
  response.headers.set(TENANT_HOST_HEADER, hostname);

  if (tenantSlug && tenantSlug !== '_notfound') {
    response.cookies.set('tenant_slug', tenantSlug, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return response;

}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};

