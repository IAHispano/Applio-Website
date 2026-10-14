import manifest from "./ecosystem.json";

export const ecosystem = manifest;

export function docsUrl(guide: keyof typeof manifest.guides): string {
	return new URL(manifest.guides[guide], manifest.links.docs).href;
}
