import React from 'react'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const config: DocsThemeConfig = {
  logo: <span className='font-medium tracking-tight'>Applio Docs</span>,
  project: {
    link: 'https://github.com/iahispano/applio',
  },
  chat: {
    link: 'https://discord.gg/iahispano',
  },
  docsRepositoryBase: 'https://github.com/iahispano/applio-docs',
  footer: {
    text: 'Copyright © 2024 AI Hispano. All rights reserved.',
  },
  nextThemes: {
    defaultTheme: 'dark'
  },
  feedback: {
    content: null
  },
  editLink: {
    component: null
  },
  faviconGlyph: '/favicon.ico',
  logoLink: '/favicon.ico',
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter()
    const { frontMatter } = useConfig()
    const url =
      'https://docs.applio.org' +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`)
 
    return (
      <>
        <meta property="og:url" content={url} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta
          property="og:description"
          content={frontMatter.description || 'Documentation for the Applio project.'}
        />
        <meta
          property="og:title"
          content={frontMatter.title ? `${frontMatter.title} | Applio` : 'Applio Docs'}
        />
        <meta property='favicon' content='https://i.imgur.com/ZeuGiOR.png'/>
      </>
    )
  },
  useNextSeoProps() {
    return {
      titleTemplate: `%s | Applio`
    }
  }
}

export default config
