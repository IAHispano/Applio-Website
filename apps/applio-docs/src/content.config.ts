import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const collections = {
	docs: defineCollection({
		loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			sidebar: z
				.object({
					order: z.number().optional(),
					hidden: z.boolean().optional(),
				})
				.optional(),
			pagefind: z.boolean().default(true),
		}),
	}),
};
