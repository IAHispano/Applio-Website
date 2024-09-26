import Background1 from "@/components/svg/background1";

export default function NotFound() {
	return (
		<main className="flex min-h-screen flex-col items-center">
			<div className="absolute -mt-36">
				<Background1 />
			</div>
			<div className="justify-center items-center flex flex-col mx-auto mt-64 z-30 text-white/80">
				<h1 className="text-xl text-neutral-300">Page not found.</h1>
				<a className="text-xs hover:underline text-neutral-400 mt-2" href="/">
					Return
				</a>
			</div>
		</main>
	);
}
