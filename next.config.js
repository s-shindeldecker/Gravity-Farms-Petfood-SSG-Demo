/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
    NEXT_PUBLIC_VERCEL_DEPLOY_ID: process.env.VERCEL_DEPLOY_ID || 'local',
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig 