export {};

const dialog = document.querySelector<HTMLDialogElement>("#docs-search")!;
const input = document.querySelector<HTMLInputElement>("#search-input")!;
const results = document.querySelector<HTMLUListElement>("#search-results")!;
const searchStatus = document.querySelector<HTMLElement>("#search-status")!;
const trigger =
	document.querySelector<HTMLButtonElement>("[data-open-search]")!;
const navigation =
	document.querySelector<HTMLDetailsElement>(".mobile-navigation")!;
const desktop = matchMedia("(min-width: 801px)");
navigation.open = desktop.matches;
desktop.addEventListener("change", (event) => {
	navigation.open = event.matches;
});
const modifier = /Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘" : "Ctrl";
trigger.querySelector("kbd")!.textContent = `${modifier} K`;
function openSearch() {
	if (!dialog.open) dialog.showModal();
	input.focus();
}
trigger.addEventListener("click", openSearch);
document
	.querySelector("[data-close-search]")
	?.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
	if (event.target !== dialog) return;
	const box = dialog.getBoundingClientRect();
	if (
		event.clientX < box.left ||
		event.clientX > box.right ||
		event.clientY < box.top ||
		event.clientY > box.bottom
	)
		dialog.close();
});
dialog.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		event.preventDefault();
		dialog.close();
	}
});
document.addEventListener("keydown", (event) => {
	if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
		event.preventDefault();
		openSearch();
	}
});

type SearchResult = {
	data(): Promise<{ url: string; meta: { title?: string }; excerpt: string }>;
};
type SearchIndex = {
	search(query: string): Promise<{ results: SearchResult[] }>;
};
let index: Promise<SearchIndex> | undefined;
let generation = 0;
let timer: ReturnType<typeof setTimeout>;
input.addEventListener("input", () => {
	clearTimeout(timer);
	const request = ++generation;
	const query = input.value.trim();
	results.replaceChildren();
	if (!query) {
		searchStatus.textContent = "Search guides, workflows, and reference.";
		return;
	}
	searchStatus.textContent = "Searching…";
	timer = setTimeout(async () => {
		try {
			const moduleUrl = "/pagefind/pagefind.js";
			index ??= import(/* @vite-ignore */ moduleUrl).catch((error) => {
				index = undefined;
				throw error;
			});
			const found = await (await index).search(query);
			const matches = await Promise.all(
				found.results.slice(0, 12).map((result) => result.data()),
			);
			if (request !== generation) return;
			searchStatus.textContent = found.results.length
				? `${found.results.length} results`
				: "No results. Try a different word, such as conversion or installation.";
			for (const match of matches) {
				const item = document.createElement("li");
				const link = document.createElement("a");
				link.href = match.url;
				const title = document.createElement("strong");
				title.textContent = match.meta.title ?? "Documentation";
				const excerpt = document.createElement("p");
				excerpt.textContent = new DOMParser().parseFromString(
					match.excerpt,
					"text/html",
				).body.textContent;
				link.append(title, excerpt);
				item.append(link);
				results.append(item);
			}
		} catch {
			if (request === generation)
				searchStatus.textContent =
					"Search is unavailable. Use the sidebar to browse the documentation.";
		}
	}, 160);
});

document.querySelectorAll<HTMLElement>(".prose pre").forEach((pre) => {
	const button = document.createElement("button");
	button.type = "button";
	button.className = "copy-code";
	button.textContent = "Copy";
	button.setAttribute("aria-label", "Copy code to clipboard");
	button.addEventListener("click", async () => {
		try {
			await navigator.clipboard.writeText(
				pre.querySelector("code")?.textContent ?? "",
			);
			button.textContent = "Copied";
		} catch {
			button.textContent = "Select code to copy";
		}
		setTimeout(() => {
			button.textContent = "Copy";
		}, 2000);
	});
	pre.append(button);
});

const tocLinks = Array.from(
	document.querySelectorAll<HTMLAnchorElement>(".toc a[href^='#']"),
);
const observer = new IntersectionObserver(
	(entries) => {
		for (const entry of entries) {
			if (!entry.isIntersecting) continue;
			tocLinks.forEach((link) => {
				if (link.hash === `#${entry.target.id}`)
					link.setAttribute("aria-current", "location");
				else link.removeAttribute("aria-current");
			});
		}
	},
	{ rootMargin: "-80px 0px -65% 0px" },
);
document
	.querySelectorAll(".prose h2[id], .prose h3[id]")
	.forEach((heading) => observer.observe(heading));
