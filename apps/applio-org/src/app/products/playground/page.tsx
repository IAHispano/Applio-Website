export default function Playground() {
	return (
		<main className="w-full h-[96svh] mt-12 flex p-8 flex-col gap-2"> 
			<a className="px-6 py-1 w-fit flex justify-end ml-auto bg-white text-black rounded-md border border-white/20 slow hover:bg-white/80" href="/products/rvc">Playground</a>
			<div className="w-full h-full">
			<iframe
				title="Applio Playground"
				src="https://iahispano-applio.hf.space"
				className="w-full h-full border rounded-xl border-white/20 p-1 shadow-2xl shadow-white/10"
			/>
			</div>
		</main>
	);
}
