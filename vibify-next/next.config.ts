import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "platform-lookaside.fbsbx.com",  // Add this domain here
      // other allowed domains if you have them
    ],
  },
};

export default nextConfig;
