import { ImageResponse } from 'next/og';
import type { ImageResponseOptions } from 'next/dist/compiled/@vercel/og/types';

export const runtime = 'edge';

interface GenerateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  primaryColor?: string;
  primaryTextColor?: string;
  site?: string;
}

export function generateOGImage(
  options: GenerateProps & ImageResponseOptions,
): ImageResponse {
  const { title, description, icon, site, primaryColor, primaryTextColor, ...rest } = options;

  return new ImageResponse(
    generate({
      title,
      description,
      icon,
      site,
      primaryTextColor,
      primaryColor,
    }),
    {
      width: 1200,
      height: 630,
      ...rest,
    },
  );
}

export function generate({
  primaryColor = 'rgba(0,170,140,0.5)',
  title,
  description,
  icon,
  site,
}: GenerateProps): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        color: '#ffffff',
        backgroundColor: '#0c0c0c',
        backgroundImage: `linear-gradient(to right top, ${primaryColor}, transparent)`,
        padding: '4rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
        {icon}
        <p style={{ fontSize: '56px', fontWeight: 600 }}>{site}</p>
      </div>
      <p style={{ fontWeight: 800, fontSize: '82px' }}>{title}</p>
      <p style={{ fontSize: '52px', color: 'rgba(240,240,240,0.7)' }}>{description}</p>
    </div>
  );
}
