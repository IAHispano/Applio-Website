// @ts-check
import { defineConfig } from "astro/config";
import { ecosystem } from "../../shared/ecosystem.ts";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	site: ecosystem.links.website,
	integrations: [tailwind()],
});
