import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    return [
      {
        source: '/api/internship',
        destination: 'http://localhost:5000/api/internship',
      },
      {
        source: '/api/internship/:path*',
        destination: 'http://localhost:5000/api/internship/:path*',
      },
      {
        source: '/api/job',
        destination: 'http://localhost:5000/api/job',
      },
      {
        source: '/api/job/:path*',
        destination: 'http://localhost:5000/api/job/:path*',
      },
      {
        source: '/api/admin/stats',
        destination: 'http://localhost:5000/api/admin/stats',
      },
      {
        source: '/api/admin/applications',
        destination: 'http://localhost:5000/api/admin/applications',
      },
      // Keep application API routes in the Next.js app instead of proxying them to the backend.
      // This allows DELETE /api/application/:id and /api/application/:id/status to work.
      // NOTE: backend application routes are not proxied here.
      // {
      //   source: '/api/application/:path*',
      //   destination: 'http://localhost:5000/api/application/:path*',
      // },
      // Note: /api/admin/login is handled by the frontend API route
    ];
  },
};

export default nextConfig;
