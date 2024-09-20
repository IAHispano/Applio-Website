export default function DownloadedModel() {
	return (
		<main className="min-h-screen flex flex-col w-full items-center justify-center mx-auto">
			<div className="flex flex-col items-center gap-2">
				<h1 className="md:text-4xl text-3xl font-semibold">Downloaded</h1>
				<h2 className="text-neutral-300 text-xs text-center max-w-[200px]">
					You can now close this tab and go back to the{" "}
					<a
						className="underline hover:text-white slow text-neutral-200"
						href="/models"
					>
						models page
					</a>
					.
				</h2>
			</div>
		</main>
	);
}