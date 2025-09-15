/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'i.imgur.com',
      'images.unsplash.com',
      'localhost'
    ],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig