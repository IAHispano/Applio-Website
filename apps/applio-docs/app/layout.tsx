import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Syne } from 'next/font/google';
import RedirectComponent from '../lib/redirect';
import type { ReactNode } from 'react';

const inter = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const runtime = process.env.CF_PAGES_URL ? 'edge' : undefined;

export default function Layout({ children }: { children: ReactNode }) {
  
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-[#111111]">
        <RedirectComponent /> 
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

export function generateMetadata() {
  return {
    title: 'Applio Documentation',
    description: 'Documentation for the most used voice cloning tool in the world.',
    openGraph: {
      title: 'Applio Documentation',
      description: 'Documentation for the most used voice cloning tool in the world.',
      images: ['/banner.png'],
      url: 'https://docs.applio.org/applio',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Applio Documentation',
      description: 'Documentation for the most used voice cloning tool in the world.',
      image: '/banner.png',
    },
  };
}
