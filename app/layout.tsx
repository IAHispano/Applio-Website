import "@/styles/globals.css"
import { Metadata } from "next"
import { ColorSchemeScript, MantineProvider } from "@mantine/core"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { fontMono } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { SiteHeader } from "@/components/navbar/site-header"
import { ThemeProvider } from "@/components/navbar/theme-provider"
import { Providers } from "./providers"
import GoogleAnalytics from "@/components/stadistics/GoogleAnalytics"
import Footer from "@/components/layout/footer"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://applio.org/"),
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Applio stands at the forefront of innovation as an open-source ecosystem that hosts cutting-edge AI voice cloning technologies."
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="Applio" />
          <meta name="apple-mobile-web-app-title" content="Applio" />
          <meta name="theme-color" content="#090909" />
          <meta name="msapplication-navbutton-color" content="#090909" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="msapplication-starturl" content="https://applio.org" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="keywords"
            content="AI, IA, IA Hispano, Applio, Applio-RVC-Fork, RVC, SVC, Open Source, Mangio-RVC-Fork, music"
          />
          <ColorSchemeScript defaultColorScheme="auto" />
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontMono.variable
          )}
        >
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
        <GoogleAnalytics ga_id= 
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
          <Providers>
            <MantineProvider>
              <ThemeProvider attribute="class" defaultTheme="dark">
                <div className="relative flex min-h-screen flex-col bg-background">
                  <SiteHeader />
                  <div className="flex-1 bg-background">
                    <div className="h-full md:py-16">{children}</div>
                  </div>
                </div>
              </ThemeProvider>
            </MantineProvider>
          </Providers>
          <Toaster />
          <Footer />
        </body> 
      </html>
    </>
  )
}
