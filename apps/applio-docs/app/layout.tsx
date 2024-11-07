import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Syne } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const runtime = 'edge';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
