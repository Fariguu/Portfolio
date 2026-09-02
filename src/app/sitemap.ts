import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/url';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
