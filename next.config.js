/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')()

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'huhpmogbdpibjlquvuli.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: '54321',
        pathname: "/**"
      }
    ]
  },
  headers: () => [
    {
      source: '/user/:id',
      headers: [
        {
          key: 'x-nextjs-cache',
          value: 'MISS',
        },
      ],
    },
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: '15mb',
    },
  },
}

module.exports = process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig