const apiProxyTarget = process.env.API_PROXY_TARGET
  || process.env.NEXT_PUBLIC_API_URL
  || 'https://bds-template-api.onrender.com';
const publicApiBase = process.env.NODE_ENV === 'production'
  ? 'https://cms.aireviewbds.com'
  : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui", "@repo/config", "@repo/types", "@repo/utils"],
  env: {
    NEXT_PUBLIC_API_URL: publicApiBase,
  },
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${apiProxyTarget}/api/:path*` }];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudflarestorage.com',
      }
    ],
  },
};

module.exports = nextConfig;
