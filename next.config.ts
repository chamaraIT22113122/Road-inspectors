import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.GITHUB_ACTIONS === "true" ? "/Road-inspectors" : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  cacheComponents: false,
  partialPrefetching: false,
};

export default nextConfig;

