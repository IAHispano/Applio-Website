import starlight from "@astrojs/starlight";
// @ts-check
import { defineConfig } from "astro/config";
import starlightThemeNext from "starlight-theme-next";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			plugins: [starlightThemeNext()],
			title: "Applio",
			description: "Documentation for Applio - AI-driven voice conversion tool",
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/iahispano/applio",
				},
			],
			sidebar: [
				{
					label: "Introduction",
					link: "/",
				},
				{
					label: "Getting Started",
					autogenerate: { directory: "getting-started" },
				},
				{
					label: "Guides",
					autogenerate: { directory: "guides" },
				},
				{
					label: "Terms of Use",
					link: "/tos",
				},
			],
			editLink: {
				baseUrl:
					"https://github.com/iahispano/applio-website/edit/main/apps/applio-docs/",
			},
			head: [
				{
					tag: "link",
					attrs: {
						rel: "icon",
						href: "/favicon.ico",
					},
				},
				{
					tag: "meta",
					attrs: {
						property: "og:image",
						content: "/opengraph-image.png",
					},
				},
				{
					tag: "meta",
					attrs: {
						name: "twitter:image",
						content: "/opengraph-image.png",
					},
				},
				{
					tag: "link",
					attrs: {
						rel: "preconnect",
						href: "https://fonts.googleapis.com",
					},
				},
				{
					tag: "link",
					attrs: {
						rel: "preconnect",
						href: "https://fonts.gstatic.com",
						crossorigin: "",
					},
				},
				{
					tag: "link",
					attrs: {
						rel: "stylesheet",
						href: "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap",
					},
				},
				{
					tag: "style",
					attrs: {
						type: "text/css",
					},
					content: `
						@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
						
						* {
							font-family: 'Syne', sans-serif;
						}
						
						/* center and round corners for all images */
						img {
							display: block;
							margin-left: auto;
							margin-right: auto;
							border-radius: 8px;
							max-width: 100%;
							height: auto;
						}
						
						/* ensure images in cards are also centered and rounded */
						.card img {
							display: block;
							margin-left: auto;
							margin-right: auto;
							border-radius: 8px;
						}
						
						/* ensure images in content areas are centered */
						.content img {
							display: block;
							margin-left: auto;
							margin-right: auto;
							border-radius: 8px;
						}
					`,
				},
			],
		}),
	],
});
