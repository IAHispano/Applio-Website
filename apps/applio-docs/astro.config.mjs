import starlight from "@astrojs/starlight";
// @ts-check
import { defineConfig } from "astro/config";
import starlightThemeNext from "starlight-theme-next";
import { ecosystem } from "../../shared/ecosystem.ts";

// https://astro.build/config
export default defineConfig({
	site: ecosystem.links.docs,
	integrations: [
		starlight({
			plugins: [starlightThemeNext()],
			title: ecosystem.projects.docs.name,
			logo: {
				dark: "./src/assets/applio-logo.svg",
				light: "./src/assets/applio-logo-light.svg",
			},
			favicon: "/favicon.ico",
			description: ecosystem.brand.description,
			social: [
				{
					icon: "external",
					label: "Applio website",
					href: ecosystem.links.website,
				},
				{
					icon: "download",
					label: "Download Desktop",
					href: ecosystem.links.download,
				},
				{
					icon: "github",
					label: "GitHub",
					href: ecosystem.projects.gradio.repository,
				},
				{
					icon: "discord",
					label: "Discord",
					href: ecosystem.links.discord,
				},
				{
					icon: "star",
					label: "Sponsor",
					href: ecosystem.links.support,
				},
			],
			sidebar: [
				{
					label: "Start here",
					items: [
						{ label: "Welcome", link: "/" },
						{ label: "Applio ecosystem", link: ecosystem.links.ecosystem },
						{ label: "Installation", link: "/getting-started/installation/" },
						{ label: "Meet Desktop", link: "/getting-started/desktop/" },
					],
				},
				{
					label: "Voice conversion",
					items: [
						{ label: "Convert audio", link: "/getting-started/inference/" },
						{ label: "Realtime", link: "/getting-started/realtime/" },
						{ label: "Text to speech", link: "/getting-started/tts/" },
					],
				},
				{
					label: "Models & training",
					items: [
						{
							label: "Add a voice model",
							link: "/getting-started/installing-inference-models/",
						},
						{ label: "Embedders", link: "/getting-started/embedder/" },
						{
							label: "Training pretrainings",
							link: "/getting-started/pretrained/",
						},
						{
							label: "Prepare a dataset",
							link: "/guides/how-create-datasets/",
						},
						{ label: "Train a model", link: "/getting-started/training/" },
						{ label: "Voice Blender", link: "/getting-started/voice-blender/" },
						{ label: "TensorBoard", link: "/getting-started/tensorboard/" },
					],
				},
				{
					label: "Audio tools & extensions",
					items: [
						{ label: "Separate audio", link: "/guides/uvr/" },
						{
							label: "Analyze audio & pitch",
							link: "/getting-started/audio-analyzer/",
						},
						{ label: "KaraFan", link: "/guides/karafan/" },
						{ label: "Gradio plugins", link: "/getting-started/plugins/" },
					],
				},
				{
					label: "Manage Applio",
					items: [
						{
							label: "Migration & storage",
							link: "/guides/moving-to-desktop/",
						},
						{
							label: "Troubleshooting",
							link: "/getting-started/report-error/",
						},
						{
							label: "Cloud workflows",
							link: "/getting-started/cloud-guides/",
						},
					],
				},
				{ label: "Reference", autogenerate: { directory: "reference" } },
				{ label: "Terms of Use", link: "/tos/" },
			],
			editLink: {
				baseUrl:
					"https://github.com/iahispano/applio-website/edit/main/apps/applio-docs/",
			},
			head: [
				{
					tag: "meta",
					attrs: {
						property: "og:image",
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
						
						/* Keep content image styling out of the navigation and theme logos. */
						.sl-markdown-content img {
							display: block;
							margin-left: auto;
							margin-right: auto;
							border-radius: 8px;
							max-width: 100%;
							height: auto;
						}
						
						/* ensure images in cards are also centered and rounded */
						.sl-markdown-content .card img {
							display: block;
							margin-left: auto;
							margin-right: auto;
							border-radius: 8px;
						}
						
						/* ensure images in content areas are centered */
						.sl-markdown-content .content img {
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
