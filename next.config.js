require("dotenv").config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
    SITE_NAME: process.env.SITE_NAME,
  },
  images: {
    domains: ["127.0.0.1:80"],
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false }

    return config
  },
  async redirects() {
    return [
      {
        source: "/api",
        destination: "/apiPage",
        permanent: true,
      },
    ]
  },
  //FIXME
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3000/:path*',
  //     },
  //   ]
  // },
}

module.exports = nextConfig
