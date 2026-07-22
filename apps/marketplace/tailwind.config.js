const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(__dirname, "./src/pages/**/*.{js,ts,jsx,tsx}"),
    path.join(__dirname, "./src/components/**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        primary: "#C5A572",
        secondary: "#1A1A2E",
        text: {
          primary: '#0F172A',
          secondary: '#334155',
          body: '#475569',
          caption: '#64748B',
          disabled: '#94A3B8',
        }
      },
      fontSize: {
        'display-xl': ['72px', { lineHeight: '1.05', letterSpacing: '-0.04em', fontWeight: '700' }],
        'display': ['60px', { lineHeight: '1.1', letterSpacing: '-0.04em', fontWeight: '700' }],
        'h1': ['48px', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }],
        'h2': ['40px', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }],
        'h3': ['32px', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '600' }],
        'h4': ['28px', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '600' }],
        'section-title': ['24px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'card-title': ['22px', { lineHeight: '1.6', letterSpacing: '-0.01em', fontWeight: '600' }],
        'subtitle': ['18px', { lineHeight: '1.6', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.7', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.7', fontWeight: '400' }],
        'small': ['15px', { lineHeight: '1.7', fontWeight: '400' }],
        'caption': ['14px', { lineHeight: '1.6', fontWeight: '500' }],
        'label': ['13px', { lineHeight: '1.0', letterSpacing: '0.03em', fontWeight: '600' }],
        'button': ['15px', { lineHeight: '1.0', letterSpacing: '0.01em', fontWeight: '600' }],
        'price': ['36px', { lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: '700' }],
        'old-price': ['18px', { lineHeight: '1.0', fontWeight: '500' }],
      }
    },
  },
  plugins: [],
}
