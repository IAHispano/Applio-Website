class ImageViewer extends HTMLElement {
	connectedCallback() {
		if (this.dataset.ready) return;
		this.dataset.ready = "true";
		const link = this.querySelector<HTMLAnchorElement>("[data-image-open]")!;
		const dialog = this.querySelector<HTMLDialogElement>("dialog")!;
		link.addEventListener("click", (event) => {
			if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
				return;
			event.preventDefault();
			dialog.showModal();
		});
		this.querySelector("[data-image-close]")?.addEventListener("click", () =>
			dialog.close(),
		);
		dialog.addEventListener("click", (event) => {
			if (event.target === dialog) dialog.close();
		});
	}
}
if (!customElements.get("image-viewer"))
	customElements.define("image-viewer", ImageViewer);
