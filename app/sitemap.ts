import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://applio.org",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: "https://applio.org/models",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.8,
    },
    {
      url: "https://applio.org/guides",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.5,
    },
    {
      url: "https://applio.org/playground",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.6,
    },
    {
      url: "https://applio.org/blog",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.8,
    },
    {
      url: "https://applio.org/bot",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.5,
    },
    {
      url: "https://applio.org/api",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.8,
    },
    {
      url: "https://applio.org/team",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.2,
    },
    {
      url: "https://applio.org/history",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.2,
    },
    {
      url: "https://applio.org/careers",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.2,
    },
    {
      url: "https://applio.org/privacy",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.1,
    },
    {
      url: "https://applio.org/terms-service",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.1,
    },
    {
      url: "https://applio.org/terms-use",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.1,
    },
    {
      url: "https://applio.org/login",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.5,
    },
    
  ]
}
