/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',               // any frontend fetch to /api/*
        destination: 'http://localhost:5000/api/:path*', // send it to Express backend
      },
    ];
  },
};

module.exports = nextConfig;
