/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.edu.tw',
      },
    ],
  },
}

module.exports = nextConfig
