/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://laughing-system-97g5rrr74vv6cx6rg-5000.app.github.dev/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
