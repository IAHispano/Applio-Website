import type { Metadata } from 'next/types';

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: 'https://applio.org',
      images: '/banner.png',
      siteName: 'Applio Documentation',
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@IAHispano',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: '/banner.png',
      ...override.twitter,
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === 'development' || (!process.env.VERCEL_URL && !process.env.CF_PAGES_URL)
    ? new URL('http://localhost:3000')
    : new URL(`https://${process.env.VERCEL_URL || process.env.CF_PAGES_URL}`);