import { defineConfig } from "astro/config";
import imageParagraphs from "./src/lib/rehype-image-paragraphs";
import mdx from "@astrojs/mdx";
import { ecosystem } from "../../shared/ecosystem.ts";

export default defineConfig({
	site: ecosystem.links.docs,
	trailingSlash: "ignore",
	integrations: [mdx({ rehypePlugins: [imageParagraphs] })],
});
