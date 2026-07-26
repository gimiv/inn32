import type { NextConfig } from 'next'
import { buildNextRedirects } from './src/lib/redirects'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'images.squarespace-cdn.com',
            }
        ],
    },
    async redirects() {
        return buildNextRedirects()
    },
}

export default nextConfig
