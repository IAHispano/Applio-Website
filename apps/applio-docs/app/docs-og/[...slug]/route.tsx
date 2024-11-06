import { metadataImage } from '@/utils/metadata-image';
import { type ImageResponse } from 'next/og';
import { generateOGImage } from './og';

export const GET = metadataImage.createAPI((page): ImageResponse => {
  return generateOGImage({
    title: page.data.title,
    description: page.data.description || 'Applio Documentation',
    site: 'Applio Documentation',
    primaryTextColor: 'rgb(255,255,255)',
  });
});

export function generateStaticParams(): {
  slug: string[];
}[] {
  return metadataImage.generateParams();
}
