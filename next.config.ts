import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
  },
  eslint: {
    ignoreDuringBuilds: true, // ESLint error/warning-ები იგნორირება
  },
  typescript: {
    ignoreBuildErrors: true, // TypeScript error-ებზე build აღარ გაჩერდება
  },
};

export default nextConfig;
