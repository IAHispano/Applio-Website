import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { fromHtml } from "hast-util-from-html";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const walk = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.children ?? []).flatMap(child => walk(child, predicate))];
const hasClass = (node, name) => node.properties?.className?.includes(name);
const text = node => node.type === "text" ? node.value : (node.children ?? []).map(text).join("");
const files = (await readdir(dist, { recursive: true })).filter(file => file.endsWith("index.html"));
const index = await readFile(join(dist, "llms.txt"), "utf8");
const full = await readFile(join(dist, "llms-full.txt"), "utf8");
const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");

for (const file of files) {
  test(`Readable export preserves rendered content: ${file}`, async () => {
    const tree = fromHtml(await readFile(join(dist, file), "utf8"));
    const article = walk(tree, node => hasClass(node, "prose"))[0];
    const canonical = walk(tree, node => node.tagName === "link" && node.properties?.rel?.includes("canonical"))[0].properties.href;
    const title = text(walk(tree, node => node.tagName === "h1")[0]);
    const structured = walk(tree, node => node.tagName === "script" && node.properties?.type === "application/ld+json")[0];
    const graph = JSON.parse(text(structured))["@graph"];
    assert.equal(graph.find(entity => entity["@type"] === "TechArticle").headline, title);
    assert.equal(graph.find(entity => entity["@type"] === "TechArticle").url, canonical);
    assert.equal(walk(tree, node => node.tagName === "h1").length, 1);
    const alternate = walk(tree, node => node.tagName === "link" && node.properties?.type === "text/markdown")[0];
    assert.equal(alternate.properties.href, new URL(`${new URL(canonical).pathname}index.md`, canonical).href);
    const output = join(dirname(file), "index.md");
    const markdown = await readFile(join(dist, output), "utf8");
    assert.ok(markdown.startsWith(`# ${title}\n`));
    assert.ok(markdown.includes(canonical));
    assert.ok(full.includes(markdown));
    assert.ok(index.includes(new URL(`${new URL(canonical).pathname}index.md`, canonical).href));
    assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
    assert.doesNotMatch(markdown, /<(?:Command|SvgDiagram|image-viewer)|^import .* from /m);
    for (const node of walk(article, node => node.tagName === "docs-command")) assert.ok(markdown.includes(node.properties.dataCommand), "Command text must be preserved exactly");
    for (const node of walk(article, node => node.tagName === "docs-path")) assert.ok(markdown.includes(node.properties.dataPath), "Paths must be preserved");
    for (const node of walk(article, node => node.properties?.dataLabel)) assert.ok(markdown.includes(node.properties.dataLabel), "All tab variants must be present");
    for (const node of walk(article, node => hasClass(node, "svg-diagram-description"))) assert.ok(markdown.includes(text(node)), "Diagrams need their textual explanation");
  });
}

test("Only canonical HTML documents enter the sitemap", () => {
  assert.equal([...sitemap.matchAll(/<loc>/g)].length, files.length);
  assert.doesNotMatch(sitemap, /404|index\.md|llms/);
});
