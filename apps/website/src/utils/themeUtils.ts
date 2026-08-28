/**
 * Theme CSS Injection Utility
 *
 * Converts a TenantThemeSettings object (from the DB) into a CSS string
 * that can be injected as a <style> tag in the website's <head> during SSR.
 *
 * This makes theme changes instant without requiring a rebuild.
 *
 * Usage:
 *   import { themeToCSS, themeToGoogleFontsUrl } from '../utils/themeUtils';
 *
 *   // In _document.tsx or per-page <Head>:
 *   <style dangerouslySetInnerHTML={{ __html: themeToCSS(theme) }} />
 *   <link href={themeToGoogleFontsUrl(theme)} rel="stylesheet" />
 */

export interface TenantTheme {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  surfaceColor?: string;
  textColor?: string;
  textMutedColor?: string;
  borderColor?: string;
  fontHeading?: string;
  fontBody?: string;
  fontSizeBase?: string;
  lineHeight?: string;
  containerWidth?: string;
  borderRadius?: string;
  shadowStyle?: 'soft' | 'hard' | 'none';
  darkMode?: boolean;
  buttonStyle?: 'rounded' | 'square' | 'pill';
  animationsEnabled?: boolean;
  customCss?: string;
}

const DEFAULTS: Required<Omit<TenantTheme, 'customCss'>> = {
  primaryColor: '#2563EB',
  secondaryColor: '#64748B',
  accentColor: '#F59E0B',
  backgroundColor: '#FFFFFF',
  surfaceColor: '#F8FAFC',
  textColor: '#0F172A',
  textMutedColor: '#64748B',
  borderColor: '#E2E8F0',
  fontHeading: 'Plus Jakarta Sans',
  fontBody: 'Inter',
  fontSizeBase: '16px',
  lineHeight: '1.6',
  containerWidth: '1280px',
  borderRadius: '8px',
  shadowStyle: 'soft',
  darkMode: false,
  buttonStyle: 'rounded',
  animationsEnabled: true,
};

// Merge theme with defaults, ignoring null/undefined values
export function mergeTheme(theme?: TenantTheme | null): Required<Omit<TenantTheme, 'customCss'>> {
  if (!theme) return DEFAULTS;
  return {
    primaryColor: theme.primaryColor || DEFAULTS.primaryColor,
    secondaryColor: theme.secondaryColor || DEFAULTS.secondaryColor,
    accentColor: theme.accentColor || DEFAULTS.accentColor,
    backgroundColor: theme.backgroundColor || DEFAULTS.backgroundColor,
    surfaceColor: theme.surfaceColor || DEFAULTS.surfaceColor,
    textColor: theme.textColor || DEFAULTS.textColor,
    textMutedColor: theme.textMutedColor || DEFAULTS.textMutedColor,
    borderColor: theme.borderColor || DEFAULTS.borderColor,
    fontHeading: theme.fontHeading || DEFAULTS.fontHeading,
    fontBody: theme.fontBody || DEFAULTS.fontBody,
    fontSizeBase: theme.fontSizeBase || DEFAULTS.fontSizeBase,
    lineHeight: theme.lineHeight || DEFAULTS.lineHeight,
    containerWidth: theme.containerWidth || DEFAULTS.containerWidth,
    borderRadius: theme.borderRadius || DEFAULTS.borderRadius,
    shadowStyle: (theme.shadowStyle as any) || DEFAULTS.shadowStyle,
    darkMode: theme.darkMode ?? DEFAULTS.darkMode,
    buttonStyle: (theme.buttonStyle as any) || DEFAULTS.buttonStyle,
    animationsEnabled: theme.animationsEnabled ?? DEFAULTS.animationsEnabled,
  };
}

// Calculate button border radius from buttonStyle
function buttonBorderRadius(style: string, base: string): string {
  if (style === 'pill') return '999px';
  if (style === 'square') return '4px';
  return base; // 'rounded' uses the base border radius
}

// Convert hex to rgba for shadow generation
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Darken a hex color by a percentage
function darken(hex: string, percent: number): string {
  const h = hex.replace('#', '');
  const r = Math.max(0, Math.round(parseInt(h.substring(0, 2), 16) * (1 - percent / 100)));
  const g = Math.max(0, Math.round(parseInt(h.substring(2, 4), 16) * (1 - percent / 100)));
  const b = Math.max(0, Math.round(parseInt(h.substring(4, 6), 16) * (1 - percent / 100)));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Shadow presets
function getShadow(style: string, color: string): string {
  if (style === 'none') return 'none';
  if (style === 'hard') return `4px 4px 0 ${hexToRgba(color, 0.2)}`;
  // soft (default)
  return `0 4px 24px ${hexToRgba(color, 0.12)}, 0 1px 4px ${hexToRgba(color, 0.06)}`;
}

/**
 * Converts a theme object into CSS custom properties string.
 * Inject this as `<style>` inside `<head>` for SSR.
 */
export function themeToCSS(theme?: TenantTheme | null): string {
  const t = mergeTheme(theme);

  const cssVars = `
    --color-primary: ${t.primaryColor};
    --color-primary-dark: ${darken(t.primaryColor, 15)};
    --color-primary-light: ${t.primaryColor}20;
    --color-secondary: ${t.secondaryColor};
    --color-accent: ${t.accentColor};
    --color-bg: ${t.backgroundColor};
    --color-surface: ${t.surfaceColor};
    --color-ink: ${t.textColor};
    --color-ink-2: ${t.textMutedColor};
    --color-muted: ${t.textMutedColor};
    --color-border: ${t.borderColor};
    --font-heading: '${t.fontHeading}', system-ui, sans-serif;
    --font-body: '${t.fontBody}', system-ui, sans-serif;
    --font-size-base: ${t.fontSizeBase};
    --line-height: ${t.lineHeight};
    --container-width: ${t.containerWidth};
    --radius-base: ${t.borderRadius};
    --radius-card: calc(${t.borderRadius} * 2);
    --radius-btn: ${buttonBorderRadius(t.buttonStyle, t.borderRadius)};
    --shadow-card: ${getShadow(t.shadowStyle, t.textColor)};
    --shadow-card-hover: ${getShadow(t.shadowStyle === 'soft' ? 'soft' : t.shadowStyle, t.primaryColor)};
    --transition-base: 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  `.trim();

  let css = `:root {\n  ${cssVars.split('\n').map(l => l.trim()).filter(Boolean).join('\n  ')}\n}\n`;

  // Dark mode
  if (t.darkMode) {
    css += `
html { color-scheme: dark; }
body { background-color: #0F172A !important; color: #F1F5F9 !important; }
`;
  } else {
    css += `
body {
  background-color: ${t.backgroundColor};
  color: ${t.textColor};
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  line-height: var(--line-height);
}
`;
  }

  // Disable animations if turned off
  if (!t.animationsEnabled) {
    css += `
*, *::before, *::after {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
}
`;
  }

  // Inject custom CSS if provided
  if (theme?.customCss) {
    css += `\n/* Custom CSS */\n${theme.customCss}\n`;
  }

  return css;
}

/**
 * Builds a Google Fonts URL for the heading and body fonts in the theme.
 * Use as `<link href={url} rel="stylesheet" />`.
 */
export function themeToGoogleFontsUrl(theme?: TenantTheme | null): string {
  const t = mergeTheme(theme);
  const fonts = new Set([t.fontHeading, t.fontBody]);

  // Skip system fonts that don't need loading
  const SYSTEM_FONTS = new Set(['system-ui', 'sans-serif', 'serif', 'monospace', 'Arial', 'Helvetica', 'Times New Roman', 'Georgia']);
  const googleFonts = [...fonts].filter(f => !SYSTEM_FONTS.has(f));

  if (googleFonts.length === 0) {
    return '';
  }

  const families = googleFonts
    .map(f => `family=${encodeURIComponent(f)}:wght@300;400;500;600;700;800;900`)
    .join('&');

  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

/**
 * Generates a <meta> color-scheme tag value based on darkMode setting.
 */
export function themeColorScheme(theme?: TenantTheme | null): string {
  const t = mergeTheme(theme);
  return t.darkMode ? 'dark' : 'light';
}

