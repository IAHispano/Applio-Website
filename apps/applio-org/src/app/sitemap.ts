import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://applio.org/",
			lastModified: new Date("2024-09-20T14:58:04+00:00"),
			changeFrequency: "weekly",
			priority: 1.0,
		},
		{
			url: "https://applio.org/models",
			lastModified: new Date("2024-09-20T14:58:04+00:00"),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: "https://applio.org/learn",
			lastModified: new Date("2024-09-20T14:58:04+00:00"),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: "https://applio.org/products/applio",
			lastModified: new Date("2024-09-20T14:58:04+00:00"),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: "https://applio.org/products/app",
			lastModified: new Date("2024-09-20T14:58:04+00:00"),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: "https://applio.org/products/playground",
			lastModified: new Date("2024-09-20T14:58:04+00:00"),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: "https://applio.org/products/api",
			lastModified: new Date("2024-09-20T14:58:04+00:00"),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: "https://applio.org/about/team",
			lastModified: new Date("2024-09-20T14:58:04+00:00"),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: "https://applio.org/@",
			lastModified: new Date("2024-09-20T14:58:04+00:00"),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: "https://applio.org/about/branding",
			lastModified: new Date("2024-09-20T14:58:04+00:00"),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: "https://applio.org/learn/create",
			lastModified: new Date("2024-09-20T14:58:04+00:00"),
			changeFrequency: "weekly",
			priority: 0.64,
		},
		{
			url: "https://applio.org/products/applio/changelog",
			lastModified: new Date("2024-09-20T14:58:04+00:00"),
			changeFrequency: "weekly",
			priority: 0.64,
		},
		{
			url: "https://applio.org/settings?p=developer",
			lastModified: new Date("2024-09-20T14:58:04+00:00"),
			changeFrequency: "weekly",
			priority: 0.64,
		},
	];
}
