/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  }
}

module.exports = nextConfig