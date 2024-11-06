import { metadataImage } from '@/utils/metadata-image';
import { generateOGImage } from 'fumadocs-ui/og';
import { type ImageResponse } from 'next/og';

export const GET = metadataImage.createAPI((page): ImageResponse => {
  return generateOGImage({
    title: page.data.title,
    description: page.data.description || 'Applio Documentation',
    site: 'Applio Documentation',
  });
});

export function generateStaticParams(): {
  slug: string[];
}[] {
  return metadataImage.generateParams();
}
