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
import GoogleAnalytics from "@/components/stadistics/GoogleAnalytics"
import Footer from "@/components/layout/footer"

import { Providers } from "./providers"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://applio.org/"),
  manifest: "/manifest.json",
}

export const viewport = {
  themeColor: {
    default: "#090909", 
    light: "black",
    dark: "black",
  },
}


interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
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
            content="AI, IA, AI Hispano, AI Hub, IA Hispano, Applio, Applio-RVC-Fork, RVC, SVC, Open Source, Mangio-RVC-Fork, music, Artificial Intelligence, Guides, Tutorials, Voice Models, Voice Search, Machine Learning, Natural Language Processing, NLP, AI Development, AI Programming, Voice Recognition, Speech Recognition, Conversational AI, Virtual Assistants, Neural Networks, Deep Learning, Open Source AI, Voice Assistant Development, AI Tools, AI Solutions, Voice Interface, Voice Technology, Voice Control, AI Applications, Voice-enabled Devices, AI Development Frameworks, Voice Model Integration, AI Development Community, AI Development Resources, Programming, Coding, Data Science, Robotics, Automation, Chatbots, IoT, Internet of Things, Big Data, Cloud Computing, Computer Vision, Reinforcement Learning, Data Mining, Predictive Analytics, Sentiment Analysis, Text Mining, Recommender Systems, Decision Trees, Support Vector Machines, Genetic Algorithms, Swarm Intelligence, Autonomous Systems, Cognitive Computing, Humanoid Robots, Data Engineering, Data Warehousing, Data Visualization, Data Analysis, Algorithm Development, Model Deployment, Model Optimization, DevOps, Continuous Integration, Continuous Deployment, Agile Development, Software Engineering, Software Development Life Cycle, Web Development, Mobile Development, Game Development, Augmented Reality, Virtual Reality, Mixed Reality, Blockchain, Cryptocurrency, Cybersecurity, Ethical Hacking, Privacy Protection, Digital Transformation, Industry 4.0, Smart Cities, Smart Homes, Edge Computing, Quantum Computing, Startup, Entrepreneurship, Innovation, Research, Education, Training, Community, Forums, Conferences, Workshops, Publications, Journals, Blogs, Podcasts, Social Media."
          />
          <ColorSchemeScript defaultColorScheme="dark" />
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontMono.variable
          )}
        >
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
            <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
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
  )
}
