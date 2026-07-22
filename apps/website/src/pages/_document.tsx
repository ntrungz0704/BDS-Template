/**
 * Custom Next.js Document for PlatformBDS Tenant Website
 *
 * This file is only rendered on the server side.
 * It injects the tenant's theme CSS variables into the <head>
 * before the page renders, preventing any "flash of unstyled content" (FOUC).
 *
 * The theme CSS is passed via __NEXT_DATA__ → initialProps from _app.tsx.
 * We use getInitialProps here (not getServerSideProps) because _document
 * is SSR-only and runs before the page component.
 */

import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';

interface MyDocumentProps extends DocumentInitialProps {
  themeCSS?: string;
  googleFontsUrl?: string;
  darkMode?: boolean;
}

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);
    
    // Read theme CSS from the request context
    // This is injected by the page's getServerSideProps via __NEXT_DATA__
    // We read it from the custom __themeCSS__ property set by _app.tsx
    const themeCSS = (ctx as any).__themeCSS__ || '';
    const googleFontsUrl = (ctx as any).__googleFontsUrl__ || '';
    const darkMode = (ctx as any).__darkMode__ || false;

    return {
      ...initialProps,
      themeCSS,
      googleFontsUrl,
      darkMode,
    };
  }

  render() {
    const { themeCSS, googleFontsUrl, darkMode } = this.props;

    return (
      <Html lang="vi" className={darkMode ? 'dark' : ''}>
        <Head>
          {/* Preconnect to Google Fonts for faster loading */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          {/* Dynamic Google Fonts based on tenant theme */}
          {googleFontsUrl && (
            <link href={googleFontsUrl} rel="stylesheet" />
          )}

          {/* Fallback fonts (always loaded for fast initial paint) */}
          <link
            href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />

          {/* Tenant theme CSS variables — injected before anything renders */}
          {themeCSS && (
            <style
              id="tenant-theme"
              dangerouslySetInnerHTML={{ __html: themeCSS }}
            />
          )}

          {/* Performance hints */}
          <meta name="format-detection" content="telephone=no" />
          <meta name="theme-color" content={darkMode ? '#0F172A' : '#FFFFFF'} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
