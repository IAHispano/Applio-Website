import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { ecosystem } from "../../../../shared/ecosystem";

export const GET: APIRoute = async () => {
  const entries = await getCollection("docs", entry => entry.id !== "404");
  const urls = entries.map(entry => new URL(entry.id === "index" ? "/" : `/${entry.id}/`, ecosystem.links.docs).href).sort();
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<url><loc>${url.replaceAll("&", "&amp;")}</loc></url>`).join("")}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
