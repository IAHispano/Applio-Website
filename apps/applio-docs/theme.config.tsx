import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  logo: 'Applio Docs',
  search: {
    placeholder: "Search in Applio Docs..."
  },
  project: {
    link: "https://github.com/iahispano/applio",
  },
  chat: {
    link: "https://discord.gg/iahispano",
  },
  docsRepositoryBase: "https://github.com/iahispano/applio-website",
  footer: {
    text: (
      <span>
        Copyright {new Date().getFullYear()} © Applio. All rights reserved.
      </span>
    ),
  },
  nextThemes: {
    defaultTheme: "dark",
  },
  feedback: {
    content: "Do you think we should improve something? Let us know!",

  },
  editLink: {
    component: null,
  },
  themeSwitch: {
    useOptions() {
      return {
        light: 'Light',
        dark: 'Dark',
        system: 'System'
      }
    }
  },
  faviconGlyph: "favicon.ico",
  logoLink: "/",
  banner: {
    key: "new-release",
    text: (
      <a href="https://v2.docs.applio.org/" target="_blank">
        🎉 Applio Docs has been updated!
      </a>
    ),
  },
  primarySaturation: 100,
  primaryHue: 151,
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const url =
      "https://docs.applio.org" +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

    return (
      <>
      <meta name="msapplication-TileColor" content="#fff" />
      <meta name="theme-color" content="#111" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta
        name="description"
        content="Documentation for the VITS-based Voice Conversion project focused on simplicity, quality and performance."
      />
      <meta
        name="og:description"
        content="Documentation for the VITS-based Voice Conversion project focused on simplicity, quality and performance."
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site:domain" content="docs.applio.org" />
      <meta name="twitter:url" content="https://docs.applio.org" />
      <meta
        name="og:title"
        content={frontMatter.title || 'Applio Docs'}
      />
      <meta name="apple-mobile-web-app-title" content="Applio Docs" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
    </>
    );
  },
  useNextSeoProps() {
    return {
      titleTemplate: `%s - Applio`,
    };
  },
};

export default config;
