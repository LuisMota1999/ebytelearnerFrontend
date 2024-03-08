// dynamicDomains.ts

import { NextConfig, Domain } from "@/types/types";

export function updateNextConfigWithDomains(nextConfig: NextConfig, imageUrls: string[]): NextConfig {
  const dynamicDomains: Domain[] = imageUrls.map(url => new URL(url).hostname);

  return {
    ...nextConfig,
    images: {
      ...nextConfig.images,
      domains: [...nextConfig.images.domains, ...dynamicDomains],
    },
  };
}
