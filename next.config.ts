import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    // This explicitly tells Next.js to expose this variable to the app's process
    DATABASE_URL: process.env.DATABASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // <-- ADD THIS LINE
      },
    ],
    qualities: [75, 100],
  },
  
};

export default nextConfig;
