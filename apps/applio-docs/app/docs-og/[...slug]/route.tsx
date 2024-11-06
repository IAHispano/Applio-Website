import { generateOGImage } from 'fumadocs-ui/og';
import { metadataImage } from '../../../lib/metadata';

export const GET = metadataImage.createAPI((page) => {
  return generateOGImage({
    title: page.data.title,
    description: page.data.description ?? '',
    site: 'Applio Documentation',
  });
});

export function generateStaticParams() {
  return metadataImage.generateParams();
}
