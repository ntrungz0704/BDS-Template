import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="vi">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  function isExtError(e) {
                    var s = (e && (e.message || e.filename || (e.reason && e.reason.message) || String(e))) || '';
                    var stack = (e && e.error && e.error.stack) || (e && e.reason && e.reason.stack) || '';
                    var all = (s + ' ' + stack).toLowerCase();
                    return all.indexOf('chrome-extension') !== -1 ||
                           all.indexOf('moz-extension') !== -1 ||
                           all.indexOf('safari-extension') !== -1 ||
                           all.indexOf('eppiocemhmnlbhjplcgkofciiegomcon') !== -1 ||
                           all.indexOf('m_id') !== -1;
                  }
                  window.addEventListener('error', function(e) {
                    if (isExtError(e)) {
                      e.stopImmediatePropagation();
                      e.preventDefault();
                      return true;
                    }
                  }, true);
                  window.addEventListener('unhandledrejection', function(e) {
                    if (isExtError(e)) {
                      e.stopImmediatePropagation();
                      e.preventDefault();
                      return true;
                    }
                  }, true);
                  var origError = console.error;
                  console.error = function() {
                    var args = Array.prototype.slice.call(arguments);
                    var joined = args.map(function(a) { return String(a && a.stack ? a.stack : a); }).join(' ');
                    if (isExtError({ message: joined })) return;
                    origError.apply(console, arguments);
                  };
                })();
              `,
            }}
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap&subset=vietnamese"
            rel="stylesheet"
          />
        </Head>
        <body className="antialiased font-sans bg-slate-950 text-slate-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
