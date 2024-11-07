import { metadataImage } from '@/utils/metadata-image';
import { generateOGImage } from 'fumadocs-ui/og';
import type { ImageResponse } from 'next/og';
export const runtime = 'edge';

export const GET = metadataImage.createAPI((page): ImageResponse => {
  return generateOGImage({
    title: page.data.title,
    description: page.data.description || 'Applio Documentation',
    site: 'Applio Documentation',
    primaryColor: 'rgba(0,170,140,0.5)',
    primaryTextColor: 'rgb(255, 255, 255)',
  });
});