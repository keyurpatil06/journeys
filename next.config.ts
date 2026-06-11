import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
        port: ''
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
        port: ''
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
        port: ''
      },
    ],
  },
};

export default nextConfig;