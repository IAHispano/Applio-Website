import type { APIRoute } from "astro";
import { ecosystem } from "../../../../shared/ecosystem";

export const GET: APIRoute = () =>
	new Response(
		`User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", ecosystem.links.docs).href}\n`,
		{ headers: { "Content-Type": "text/plain; charset=utf-8" } },
	);
