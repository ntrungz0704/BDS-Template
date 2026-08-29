/**
 * Helper to generate the preview/demo URL for a template inside Marketplace (/demo/[slug])
 * Fulfills YÊU CẦU 15: /demo/luxury-gold, /demo/minimal-white...
 */
export function getTemplateDemoUrl(slug: string): string {
  return `/demo/${slug}`;
}

/**
 * Synchronizes browser URL slug seamlessly across all 24 templates
 * when clicking buttons, tabs, links, or navigation items.
 */
export function syncDemoUrl(pageKey: string, templateSlug?: string) {
  if (typeof window === 'undefined') return;
  try {
    const pathname = window.location.pathname;
    const parts = pathname.split('/').filter(Boolean);
    
    // Check if we are within /demo/...
    if (parts[0] === 'demo' && (templateSlug || parts[1])) {
      const tSlug = templateSlug || parts[1];
      const isHome = !pageKey || pageKey === 'home' || pageKey === '/';
      const search = window.location.search || ''; // preserves query params like ?embed=true&vp=...
      const cleanPageSlug = isHome ? '' : `/${pageKey}`;
      const newPath = `/demo/${tSlug}${cleanPageSlug}`;
      
      if (window.location.pathname !== newPath) {
        window.history.pushState({ page: pageKey, template: tSlug }, '', newPath + search);
      }
    }
  } catch (err) {
    // Ignore restricted iframe pushState warnings
  }
}

