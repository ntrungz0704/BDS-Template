/**
 * Keeps tenant website navigation reloadable without coupling production
 * websites to the Marketplace `/demo/:template` route.
 *
 * Template components already update their local page state before calling
 * this helper. We only mirror that state into `?page=` so refresh/back/forward
 * can be resolved by the tenant website SSR entry point.
 */
export function syncDemoUrl(pageKey: string, _templateSlug?: string): void {
  if (typeof window === 'undefined') return;

  try {
    const normalizedPage = pageKey === 'home' || pageKey === '/' ? '' : pageKey.replace(/^\/+/, '');
    const nextUrl = new URL(window.location.href);

    if (normalizedPage) {
      nextUrl.searchParams.set('page', normalizedPage);
    } else {
      nextUrl.searchParams.delete('page');
    }

    const nextPath = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextPath !== currentPath) {
      window.history.pushState({ page: normalizedPage || 'home' }, '', nextPath);
    }
  } catch {
    // Embedded/custom-domain environments may restrict history mutations.
  }
}
