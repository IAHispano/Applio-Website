"use client";

import { useState } from "react";
import { useToast } from "@/components/models/use-toast";

export default function AppProduct() {
	const { showToast } = useToast();
	const [clickedCards, setClickedCards] = useState<number[]>([]);

	const handleCardClick = (cardIndex: number) => {
		if (clickedCards.length === cardIndex) {
			setClickedCards([...clickedCards, cardIndex]);
		}
	};

	if (clickedCards.length === 6) {
		showToast("You've unlocked the secret code: ACAT69", "success");
		showToast(
			"Contact us at support@applio.org for more information",
			"success",
		);
		setClickedCards([]);
	}

	return (
		<main className="w-full min-h-screen">
			<section className="w-full h-[70svh] rounded-xl flex flex-col justify-center items-center p-4 relative mb-14">
				<div
					className="w-full h-full rounded-xl"
					style={{
						backgroundImage:
							"radial-gradient(ellipse 120% 80% at 50% 110%, #FFFFFF, transparent)",
					}}
				/>
				<div className="absolute text-center md:text-[3svh]">
					<h1 className="text-5xl font-bold">Applio App</h1>
					<p className="text-sm text-white/80 mt-2">
						The easiest voice cloning tool, now in app.
					</p>
					<a
						href="#join-beta"
						className="text-sm px-6 py-2 bg-white text-black rounded-xl font-semibold"
					>
						Join beta
					</a>
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

			<div className="flex flex-col justify-center items-center my-16">
				<img
					className="rounded-2xl"
					src="https://i.imgur.com/lpROW4u.png"
					alt="app-screenshot"
				/>
				<h3 className="mt-2 text-neutral-300 italic text-xs">
					*Pre-release images. Final product may vary.
				</h3>
			</div>

			<div
				className="my-10 w-full max-w-5xl justify-center m-auto max-md:px-4"
				id="timeline"
			>
				<h1 className="font-semibold text-4xl">What to expect</h1>
				<div className="mt-4 w-full flex items-center mx-auto">
					<div className="grid md:grid-cols-3 md:grid-rows-2 gap-4 justify-center items-start m-auto">
						<div
							className={`flex flex-col gap-2 items-start justify-center border border-white/20 rounded-xl p-4 w-full cursor-pointer hover:bg-white/[0.03] transition-all ${
								clickedCards.includes(0) ? "bg-green-500/50 hover:bg-green-500/50" : ""
							}`}
							onClick={() => handleCardClick(0)}
						>
							<h3 className="text-xl font-semibold text-neutral-200">
								Simple installation
							</h3>
							<p className="text-sm text-neutral-300">
								A simple installation, integrated within the application, and
								with 2 simple steps: download and run.
							</p>
						</div>

						<div
							className={`flex flex-col gap-2 items-start justify-center border border-white/20 rounded-xl p-4 w-full cursor-pointer hover:bg-white/[0.03] transition-all ${
								clickedCards.includes(1) ? "bg-green-500/50 hover:bg-green-500/50" : ""
							}`}
							onClick={() => handleCardClick(1)}
						>
							<h3 className="text-xl font-semibold text-neutral-200">
								Applio's ecosystem
							</h3>
							<p className="text-sm text-neutral-300">
								With all the models in our database ready for download. Click on
								a model and it will download and unzip automatically.
							</p>
						</div>

						<div
							className={`flex flex-col gap-2 items-start justify-center border border-white/20 rounded-xl p-4 w-full cursor-pointer hover:bg-white/[0.03] transition-all ${
								clickedCards.includes(2) ? "bg-green-500/50 hover:bg-green-500/50" : ""
							}`}
							onClick={() => handleCardClick(2)}
						>
							<h3 className="text-xl font-semibold text-neutral-200">
								Auto Update
							</h3>
							<p className="text-sm text-neutral-300">
								Every time you open the application we check for you if there is
								a new update and apply it without you doing anything!
							</p>
						</div>

						<div
							className={`flex flex-col gap-2 items-start justify-center border border-white/20 rounded-xl p-4 w-full cursor-pointer hover:bg-white/[0.03] transition-all ${
								clickedCards.includes(3) ? "bg-green-500/50 hover:bg-green-500/50" : ""
							}`}
							onClick={() => handleCardClick(3)}
						>
							<h3 className="text-xl font-semibold text-neutral-200">
								Share with friends
							</h3>
							<p className="text-sm text-neutral-300">
								Thanks to Discord Rich Presence your friends will be able to see
								if you are downloading a model, using it or training it.
							</p>
						</div>

						<div
							className={`flex flex-col gap-2 items-start justify-center border border-white/20 rounded-xl p-4 w-full cursor-pointer hover:bg-white/[0.03] transition-all ${
								clickedCards.includes(4) ? "bg-green-500/50 hover:bg-green-500/50" : ""
							}`}
							onClick={() => handleCardClick(4)}
						>
							<h3 className="text-xl font-semibold text-neutral-200">
								Your data is yours
							</h3>
							<p className="text-sm text-neutral-300">
								We will never store any information about you, everything is
								anonymous and if you give us permission.
							</p>
						</div>

						<div
							className={`flex flex-col gap-2 items-start justify-center border border-white/20 rounded-xl p-4 w-full cursor-pointer hover:bg-white/[0.03] transition-all ${
								clickedCards.includes(5) ? "bg-green-500/50 hover:bg-green-500/50" : ""
							}`}
							onClick={() => handleCardClick(5)}
						>
							<h3 className="text-xl font-semibold text-neutral-200">
								Customize to your liking
							</h3>
							<p className="text-sm text-neutral-300">
								You can customize everything to your liking, how about an Anime
								inspired theme or how about an Acat inspired theme?
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="flex h-fit items-center justify-center p-4">
				<div className="relative w-full max-w-4xl">
					<div className="relative h-24">
						<div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gray-700" />
						<div className="absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 transform rounded-full bg-white">
							<div className="absolute inset-0 animate-pulse rounded-full bg-white opacity-75 blur-sm" />
							<div className="absolute inset-0 animate-pulse rounded-full bg-white opacity-50 blur-md" />
						</div>
						<p className="text-neutral-400 text-[10px]">18 Oct 2024</p>
						<div className="absolute left-0 top-24 text-white">
							<h3 className="text-sm font-semibold">Pre-Alpha</h3>
							<p className="text-xs text-neutral-300">
								Pre-Alpha version. Available only for internal team, not
								accessible to the public.
							</p>
						</div>
						{[1, 2, 3, 4].map((_, index) => (
							<div
								key={index}
								className="absolute top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full bg-gray-500"
								style={{ left: `calc(${25 * (index + 1)}% - 6px)` }}
								aria-hidden="true"
							/>
						))}
					</div>
				</div>
			</div>

			<div
				className="bg-gradient-to-t from-transparent via-white/20 to-transparent w-full h-[30svh] mt-20"
				id="join-beta"
			>
				<div className="max-w-5xl w-full h-full flex justify-center items-center m-auto max-md:px-4">
					<div className="flex max-md:flex-col md:justify-between max-md:justify-center w-full items-center mx-auto">
						<div className="flex flex-col mt-auto h-full justify-center">
							<h1 className="text-4xl font-semibold max-md:text-center">
								Join the beta
							</h1>
							<h2 className="text-neutral-200 text-sm max-md:text-center max-md:text-balance">
								When the beta starts, you will be able to test the application
								by clicking the button.
							</h2>
						</div>
						<div className="flex flex-col mt-auto h-full justify-center max-md:mt-12">
							<button
								className="bg-white slow enabled:hover:shadow-lg disabled:bg-white/80 enabled:hover:shadow-white disabled:bg-opacity-40 text-black rounded-xl px-6 py-2 w-full max-w-md"
								type="button"
								disabled
							>
								<p className="text-sm font-medium">Stay tuned!</p>
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
