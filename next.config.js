/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Warning: This allows production builds to successfully complete even if
  // your project has ESLint errors.
  ignoreDuringBuilds: true,
  // FROM: https://nextjs.org/docs/api-reference/next.config.js/ignoring-typescript-errors
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
