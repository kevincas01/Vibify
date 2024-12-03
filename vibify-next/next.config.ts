import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol:'https',
        hostname:'mosaic.scdn.co'
      },
      {
        protocol:'https',
        hostname:'image-cdn-ak.spotifycdn.com'
      },{
        protocol: 'https',
        hostname: '**',  // This matches any hostname
      },
    ],
  },
};

export default nextConfig;
