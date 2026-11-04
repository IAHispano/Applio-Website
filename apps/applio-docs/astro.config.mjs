import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";
import { ecosystem } from "../../shared/ecosystem.ts";
import imageParagraphs from "./src/lib/rehype-image-paragraphs";

export default defineConfig({
	site: ecosystem.links.docs,
	trailingSlash: "ignore",
	integrations: [mdx({ rehypePlugins: [imageParagraphs] })],
});
