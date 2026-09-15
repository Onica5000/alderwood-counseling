import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH="/olivewood-site" when deploying to a GitHub Pages
// project site; leave it empty for a user/org site or local `next dev`.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
