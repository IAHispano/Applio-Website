export default function Playground() {
	return (
		<main className="w-full h-[96svh] mt-12 flex p-8 flex-col gap-2">
			<div className="w-full h-full">
				<iframe
					title="Applio Playground"
					src="https://iahispano-applio.hf.space"
					className="w-full h-full rounded-xl"
				/>

				<a
					href="https://huggingface.co/spaces/IAHispano/Applio"
					target="_blank"
					rel="noreferrer"
				>
					<p className="text-center text-sm text-gray-500">
						This is a sandbox for experimenting with Applio. To avoid long wait
						times, please duplicate the playground and use your own copy.
					</p>
				</a>
			</div>
		</main>
	);
}
