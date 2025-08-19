
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",       // وقتی /api/... صدا زده میشه
        destination: "http://localhost:8000/api/:path*", // بفرست به بک‌اند
      },
    ];
  },
};

module.exports = nextConfig;

