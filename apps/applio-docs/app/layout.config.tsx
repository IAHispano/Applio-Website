import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: 'Applio',
  },
  links: [
    {
      text: 'Documentation',
      url: '/applio',
      active: 'nested-url',
    },
    {
      text: 'API',
      url: '/api',
      active: 'nested-url',
    }
  ],
};
