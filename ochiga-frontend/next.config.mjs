/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ This replaces the deprecated `next export` command
  output: "export",

  // ✅ Required so Next.js doesn't try to optimize images (not supported in static export)
  images: {
    unoptimized: true,
  },

  // ✅ Helps ensure clean static routing (like /dashboard/ instead of /dashboard)
  trailingSlash: true,

  // ✅ Optional but useful if you’re deploying as a subpath or mobile app
  reactStrictMode: true,
};

export default nextConfig;
