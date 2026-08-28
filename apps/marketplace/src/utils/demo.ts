/**
 * Helper to generate the preview/demo URL for a template inside Marketplace (/demo/[slug])
 * Fulfills YÊU CẦU 15: /demo/luxury-gold, /demo/minimal-white...
 */
export function getTemplateDemoUrl(slug: string): string {
  return `/demo/${slug}`;
}

