import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  cacheComponents: false,
  partialPrefetching: false,
};

export default nextConfig;
