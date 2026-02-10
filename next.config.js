import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.openenergytransition.org',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      // Add Vercel preview/production URL if available
      ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? [
            {
              protocol: 'https',
              hostname: process.env.VERCEL_PROJECT_PRODUCTION_URL,
            },
          ]
        : []),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
