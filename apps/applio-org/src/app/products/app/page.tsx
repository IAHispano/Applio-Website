export default function AppProduct() {
	return (
		<main className="w-full min-h-screen p-8">
			<section className="w-full h-[70svh] rounded-xl flex flex-col justify-center items-center p-4 relative mb-24">
				<div
					className="w-full h-full rounded-xl max-w-7xl"
					style={{
						backgroundImage:
							"radial-gradient(ellipse 120% 80% at 50% 100%, #00AA68, transparent)",
					}}
				/>
				<div className="absolute text-center md:text-[8svh] text-5xl font-bold leading-relaxed">
					<h1>Applio APP</h1>
					<h2 className="text-sm tracking-widest font-semibold text-neutral-300">
						Coming soon
					</h2>
				</div>
			</section>
			<p className="justify-center items-center mx-auto flex animate-bounce">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M8 18L12 22L16 18" />
					<path d="M12 2V22" />
				</svg>
			</p>
			<div className="flex flex-col justify-center items-center my-20">
				<img className="rounded-2xl" src="https://i.imgur.com/3aTHht2.png" />
				<h2 className="text-4xl font-semibold mt-12">
					Exclusively designed to be simple, beautiful and fast.
				</h2>
			</div>
		</main>
	);
}
