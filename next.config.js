require("dotenv").config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  darkmode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
    SITE_NAME: process.env.SITE_NAME,
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false }

    return config
  },
  images: {
    domains: ["127.0.0.1:80"],
  },
}

module.exports = nextConfig
