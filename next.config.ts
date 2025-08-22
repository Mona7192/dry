/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/orders-user/:path*",
        destination: "https://intrcmpa-opsusm-887420.hostingersite.com/api/orders-user/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
