import DiscoverGuides from "@/components/learn/browse-more";
import MoreLiked from "@/components/learn/more-liked";

// Remove for local development
export const runtime = process.env.NEXT_PUBLIC_LOCAL ? undefined : "edge";

export default function LearnGuides() {
	return (
		<main className="md:min-h-[80svh] w-full h-full flex flex-col lg:px-72 items-center mx-auto mt-12 gap-10 max-md:px-4">
			<section className="flex flex-col w-full">
				<a className="p-2 w-fit bg-white/10 border border-white/20 items-center max-md:justify-center max-md:mx-auto text-black leading-none rounded-full flex lg:inline-flex slow mb-5">
					<span className="font-semibold mx-2 md:text-left max-md:text-center md:flex-auto text-white">
						Guides
					</span>
				</a>
				<div className="flex max-md:flex-col md:justify-between w-full">
					<h1 className="md:text-6xl lg:max-w-5xl text-4xl font-bold leading-8 max-md:text-center">
						Learn with Applio
					</h1>
					<a
						href="/learn/create"
						className="mt-2 px-4 rounded-full h-10 bg-white hover:bg-white/80 slow text-black font-semibold flex justify-center items-center gap-2 max-md:mt-6"
					>
						<span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width={20}
								height={20}
								color={"#000000"}
								fill={"none"}
							>
								<path
									d="M3.89089 20.8727L3 21L3.12727 20.1091C3.32086 18.754 3.41765 18.0764 3.71832 17.4751C4.01899 16.8738 4.50296 16.3898 5.47091 15.4218L16.9827 3.91009C17.4062 3.48654 17.618 3.27476 17.8464 3.16155C18.2811 2.94615 18.7914 2.94615 19.2261 3.16155C19.4546 3.27476 19.6663 3.48654 20.0899 3.91009C20.5135 4.33365 20.7252 4.54543 20.8385 4.77389C21.0539 5.20856 21.0539 5.71889 20.8385 6.15356C20.7252 6.38201 20.5135 6.59379 20.0899 7.01735L8.57816 18.5291C7.61022 19.497 7.12625 19.981 6.52491 20.2817C5.92357 20.5823 5.246 20.6791 3.89089 20.8727Z"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M6 15L9 18M8.5 12.5L11.5 15.5"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</span>
						Create a guide
					</a>
				</div>
			</section>
			<MoreLiked />
			<DiscoverGuides />
		</main>
	);
}
