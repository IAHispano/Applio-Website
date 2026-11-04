import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fromHtml } from "hast-util-from-html";
import { toMdast } from "hast-util-to-mdast";
import { gfmTableToMarkdown } from "mdast-util-gfm-table";
import { toMarkdown } from "mdast-util-to-markdown";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const hasClass = (node, name) => node.properties?.className?.includes(name);
const find = (node, predicate) =>
	predicate(node)
		? node
		: node.children?.map((child) => find(child, predicate)).find(Boolean);
const text = (node) =>
	node.type === "text" ? node.value : (node.children ?? []).map(text).join("");
const element = (tagName, children, properties = {}) => ({
	type: "element",
	tagName,
	properties,
	children,
});
const plain = (value) => ({ type: "text", value });

function clean(node, canonical) {
	const props = node.properties ?? {};
	if (
		["script", "style", "template", "dialog", "button"].includes(
			node.tagName,
		) ||
		hasClass(node, "sr-only") ||
		hasClass(node, "screenshot-enlarge") ||
		props.ariaHidden === "true" ||
		props.role === "status"
	)
		return null;
	if (node.tagName === "docs-command") {
		return element("pre", [
			element("code", [plain(props.dataCommand)], {
				className: [`language-${props.dataShell ?? "bash"}`],
			}),
		]);
	}
	if (node.tagName === "docs-path") {
		const description = find(node, (child) =>
			hasClass(child, "docs-path-description"),
		);
		return element("p", [
			element("code", [plain(props.dataPath)]),
			...(description ? [plain(`: ${text(description)}`)] : []),
		]);
	}
	if (hasClass(node, "svg-diagram")) {
		const title = find(node, (child) => child.tagName === "figcaption");
		const description = find(node, (child) =>
			hasClass(child, "svg-diagram-description"),
		);
		const svg = find(node, (child) => child.tagName === "svg");
		const nodes = svg?.children?.filter((child) => child.tagName === "g") ?? [];
		const labels = nodes.map((group) =>
			group.children
				.filter((child) => child.tagName === "text")
				.map((label) => label.children.map(text).join(" "))
				.join(": "),
		);
		return element("div", [
			element("p", [element("strong", [plain(text(title))])]),
			element(
				"ul",
				labels.map((label) => element("li", [element("p", [plain(label)])])),
			),
			element("p", [plain(text(description))]),
		]);
	}
	if (node.tagName === "svg") return null;
	if (props.href) props.href = new URL(props.href, canonical).href;
	if (props.src) props.src = new URL(props.src, canonical).href;
	// Hidden tab panels and collapsed disclosures are intentional variants, not omitted content.
	delete props.hidden;
	if (node.children)
		node.children = node.children
			.map((child) => clean(child, canonical))
			.filter(Boolean);
	return node;
}

const files = (await readdir(dist, { recursive: true })).filter((file) =>
	file.endsWith("index.html"),
);
const documents = [];
for (const file of files) {
	const tree = fromHtml(await readFile(join(dist, file), "utf8"));
	if (
		find(
			tree,
			(node) =>
				node.tagName === "meta" &&
				node.properties?.name === "robots" &&
				node.properties.content?.includes("noindex"),
		)
	)
		continue;
	const canonical = find(
		tree,
		(node) =>
			node.tagName === "link" && node.properties?.rel?.includes("canonical"),
	)?.properties.href;
	const title = find(tree, (node) => node.tagName === "h1");
	const description =
		find(
			tree,
			(node) =>
				node.tagName === "meta" && node.properties?.name === "description",
		)?.properties.content ?? "";
	const content = find(tree, (node) => hasClass(node, "prose"));
	if (!canonical || !title || !content)
		throw new Error(`Missing documentation metadata: ${file}`);
	const body = toMarkdown(toMdast(clean(content, canonical)), {
		extensions: [gfmTableToMarkdown()],
		fences: true,
		bullet: "-",
	});
	const markdown = `# ${text(title)}\n\n${description}\n\nCanonical URL: ${canonical}\n\n${body}`;
	const output = join(dirname(file), "index.md");
	await writeFile(join(dist, output), markdown);
	documents.push({ title: text(title), description, canonical, markdown });
}
documents.sort((a, b) => a.canonical.localeCompare(b.canonical));
const home = documents.find((doc) => new URL(doc.canonical).pathname === "/");
if (!home) throw new Error("Missing documentation home page");
const origin = new URL(home.canonical).origin;
const index = [
	"# Applio documentation",
	"",
	"> Official documentation for Applio Desktop and the Gradio interface: installation, voice conversion, training, audio tools, and troubleshooting.",
	"",
	"Desktop and Gradio have different controls and runtime locations. Preserve interface and platform distinctions, and use the CLI reference for supported command syntax. Each Markdown page links to its canonical HTML source.",
	"",
	"## Documentation",
];
for (const doc of documents) {
	const pathname = new URL(doc.canonical).pathname;
	doc.url = new URL(`${pathname}index.md`, origin).href;
	index.push(`- [${doc.title}](${doc.url}): ${doc.description}`);
}
index.push(
	"",
	"## Optional",
	`- [Complete documentation](${origin}/llms-full.txt): All guides in one file.`,
	"",
);
await writeFile(join(dist, "llms.txt"), index.join("\n"));
await writeFile(
	join(dist, "llms-full.txt"),
	`# Applio complete documentation\n\n${documents.map((doc) => doc.markdown).join("\n---\n\n")}`,
);
console.log(
	`Generated ${documents.length} readable Markdown pages, llms.txt, and llms-full.txt.`,
);
