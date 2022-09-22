require('dotenv').config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  darkmode: true,
  env: {
    API_URL: process.env.API_URL,
    SITE_NAME: process.env.SITE_NAME
  }
}

module.exports = nextConfig
