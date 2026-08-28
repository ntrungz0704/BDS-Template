import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function isExtError(msg, src, stack) {
                  var t = (msg || '') + ' ' + (src || '') + ' ' + (stack || '');
                  return t.indexOf('chrome-extension://') !== -1 ||
                         t.indexOf('moz-extension://') !== -1 ||
                         t.indexOf('safari-extension://') !== -1 ||
                         t.indexOf('M_ID') !== -1 ||
                         t.indexOf('eppiocemhmnlbhjplcgkofciiegomcon') !== -1;
                }
                var origOnError = window.onerror;
                window.onerror = function(msg, url, line, col, err) {
                  if (isExtError(msg, url, err && err.stack)) return true;
                  if (origOnError) return origOnError.apply(this, arguments);
                  return false;
                };
                window.addEventListener('error', function(e) {
                  if (isExtError(e.message, e.filename, e.error && e.error.stack)) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                  }
                }, true);
                window.addEventListener('unhandledrejection', function(e) {
                  var r = e.reason;
                  if (r && isExtError(r.message, r.filename, r.stack)) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                  }
                }, true);
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

