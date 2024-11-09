"use client"

import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { RootToggle } from 'fumadocs-ui/components/layout/root-toggle';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: ReactNode }) {
  const path = usePathname();

  return (
    <DocsLayout tree={source.pageTree} {...baseOptions} 
    sidebar={
      {
        tabs: false,
        banner: (
          <RootToggle
          className={`border px-4 py-2 mb-3 noise relative ${path.includes('applio') && 'bg-gradient-to-t from-white to-black/30 dark:from-[#111111] dark:to-white/30' || path.includes('api') && 'bg-gradient-to-t from-white to-green-500/30 dark:from-[#222222] dark:to-green-500/30'}`}
          options={[
            {
              title: 'Applio',
              description: 'A Complete Guide to Applio',
              url: '/applio',
              props: {
                className: 'px-4'
              }
            },
            {
              title: 'API',
              description: 'API Documentation and Resources for Developers',
              url: '/api',
              props: {
                className: 'px-4'
              }
            },
          ]}
        />
        )
      }
    }>
      {children}
    </DocsLayout>
  );
}
