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
        <meta property="og:url" content={url} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta
          property="og:description"
          content={
            frontMatter.description || "Documentation for the Applio project."
          }
        />
        <meta
          property="og:title"
          content={
            frontMatter.title ? `${frontMatter.title} | Applio` : "Applio Docs"
          }
        />
        <meta property="favicon" content="https://i.imgur.com/ZeuGiOR.png" />
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
