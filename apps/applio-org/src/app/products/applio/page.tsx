"use client";

import { useEffect, useState } from "react";

export default function RvcProduct() {
	const [version, setVersion] = useState<string>("");

	useEffect(() => {
		fetch("https://api.github.com/repos/iahispano/Applio/releases/latest")
			.then((res) => res.json())
			.then((data) => {
				setVersion(data.tag_name);
			});
	}, []);

	return (
		<main className="w-full min-h-screen p-8">
			<section className="w-full h-[80svh] rounded-xl flex flex-col justify-center items-center p-4 relative">
				<h1 className="md:text-[40svh] text-green-300/10 text-[20svh] text-center font-bold">
					V3
				</h1>
				<div className="absolute text-center md:text-[10svh] text-5xl font-semibold">
					<p>Introducing</p>
					<p>Applio</p>
				</div>
			</section>
			<p className="justify-center items-center mx-auto flex animate-bounce">
				<svg
					aria-hidden="true"
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
			<div className="mt-44 mb-4 flex flex-col w-full h-full justify-center items-center">
				<article className="flex max-md:flex-col w-full h-full justify-center items-center">
					<div className="flex flex-col text-left md:w-[40%] md:h-[80%]">
						<h2 className="text-4xl font-semibold">
							An advanced AI audio technology tool.
						</h2>
						<h3 className="text-neutral-200 max-w-xl">
							Pioneering Open-Source Ecosystem Unveiling the Latest
							Breakthroughs in AI Voice Cloning Technologies.
						</h3>
					</div>
					<div className="flex justify-center items-center md:w-[40%] h-[80%] max-md:mt-8">
						<img
							src="https://i.imgur.com/LHvgEuv.png"
							className="rounded-xl"
							alt="screenshot"
						/>
					</div>
				</article>
				<article className="flex max-md:flex-col w-full h-screen justify-center items-center">
					<div className="flex justify-center items-center md:w-[40%] md:h-[80%] max-md:mb-8">
						<img
							src="https://i.imgur.com/KupCnDb.png"
							className="rounded-xl"
							alt="screenshot"
						/>
					</div>
					<div className="flex flex-col justify-right items-end text-right md:w-[40%] h-[80%]]">
						<h2 className="text-4xl font-semibold">With a lot of features.</h2>
						<h3 className="text-neutral-200 max-w-sm w-full">
							You can make inferences with more than 20k models or create your
							own, plus you have text to speech or you can use one of our
							plugins.
						</h3>
					</div>
				</article>
				<article className="flex flex-col justify-center items-center mx-auto w-full h-full gap-8">
					<h1 className="text-5xl font-semibold mt-28 max-w-3xl text-center">
						Download the world's most widely used voice cloning tool
					</h1>
					<div className="md:gap-12 gap-4 w-full h-full flex max-md:flex-col justify-center">
						<a
							href="https://docs.applio.org/applio/getting-started/installation#download-applio"
							className="md:px-8 text-center py-2 bg-white hover:shadow-lg hover:shadow-white slow border border-white/10 rounded-xl text-black font-medium"
						>
							Download for Windows
						</a>
						<a
							href="https://docs.applio.org/applio/getting-started/installation#download-applio-1"
							className="md:px-8 text-center py-2 bg-neutral-600/30 hover:shadow-lg hover:shadow-neutral-600/30 slow border border-white/20 rounded-xl font-medium"
						>
							Download for macOS/Linux
						</a>
					</div>
					<div className="flex flex-col text-center">
						<p className="text-xs text-neutral-300">
							Last stable version:{" "}
							<a
								className="hover:text-white slow read-font underline"
								href="/products/applio/changelog"
							>
								{version}
							</a>
							.
						</p>
						<p className="text-xs text-neutral-300 text-center">
							This project is{" "}
							<a
								className="underline hover:text-white slow"
								target="blank"
								href="https://github.com/iahispano/Applio"
							>
								open source on github
							</a>
							, you can participate too!
						</p>
					</div>
				</article>
			</div>
		</main>
	);
}
