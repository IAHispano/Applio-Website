import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  logo: <span className="font-medium tracking-tight">Applio Docs</span>,
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
  logoLink: "favicon.ico",
  banner: {
    key: "new-release",
    text: (
      <a href="https://applio.org" target="_blank">
        🎉 Applio has evolved into the next generation. Watch more →
      </a>
    ),
  },
  primarySaturation: 100,
  primaryHue: 151,

  i18n: [
    { locale: "en-US", text: "English" },
    { locale: "es-ES", text: "Spanish" },
  ],
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
