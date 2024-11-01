import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { RootToggle } from 'fumadocs-ui/layouts/docs.client';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}
    sidebar={{
      banner: (
        <RootToggle
        className='border px-4 py-2 mb-3 noise relative bg-gradient-to-t from-[#111111] to-green-500/30'
        options={[
          {
            title: 'Applio',
            description: 'Documentation for Applio',
            url: '/docs',
            props: {
              className: 'px-4'
            }
          },
          {
            title: 'Applio API',
            description: 'Documentation for Applio API',
            url: '/docs/api',
            props: {
              className: 'px-4'
            }
          },
        ]}
      />
      )
    }}>
      {children}
    </DocsLayout>
  );
}
