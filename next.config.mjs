/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true, // This disables optimization, allowing unrestricted image sources
  },
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
  ],
  async headers() {
    return [
      {
        // Apply headers to all routes
        source: "/_next/image",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Allow all origins, or restrict to your domain
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,HEAD,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Authorization",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin", // Adjust if needed
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "geolocation 'self'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
