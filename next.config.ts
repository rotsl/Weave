import type { NextConfig } from "next";

// Detect if we're building for static export (GitHub Pages)
const isStaticExport = process.env.NEXT_STATIC === 'true';

// Get the base path from environment (set by GitHub Actions)
// For GitHub Pages, this is typically the repo name
const basePath = process.env.GITHUB_PAGES === 'true' 
  ? process.env.NEXT_STATIC_BASE_PATH || ''
  : '';

const nextConfig: NextConfig = {
  // Use 'export' for static sites (GitHub Pages), 'standalone' for servers
  output: isStaticExport ? "export" : "standalone",
  
  // Base path for GitHub Pages deployment
  basePath: basePath || undefined,
  
  // Disable image optimization for static export (requires server)
  images: isStaticExport ? {
    unoptimized: true,
  } : undefined,
  
  // Trailing slashes for static hosting compatibility
  trailingSlash: isStaticExport ? true : false,
  
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
