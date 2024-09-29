import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/public/", "/api/", "/_next/"],
		},
		sitemap: "https://applio.org/sitemap.xml",
	};
}
