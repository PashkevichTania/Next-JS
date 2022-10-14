require("dotenv").config()
const withTM = require("next-transpile-modules")(["react-icons"])

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
  // env: {
  //   BASE_URL: process.env.BASE_URL,
  //   API_URL: process.env.API_URL,
  // },
  images: {
    domains: ["127.0.0.1:80"],
  },
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
  devIndicators: {
    buildActivityPosition: "bottom-right",
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
})

module.exports = nextConfig
