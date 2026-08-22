import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Default (~1MB) is too small for lesson PDF uploads in /admin/resources.
      bodySizeLimit: "25mb",
    },
  },
};

export default nextConfig;
