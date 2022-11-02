require("dotenv").config()
const withTM = require("next-transpile-modules")(["react-icons"])

/** @type {import("next").NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USER_NAME: process.env.DB_USER_NAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_NAME: process.env.ADMIN_NAME,
    ROOT_DIR: process.env.ROOT_DIR,
  },
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
})

module.exports = nextConfig
