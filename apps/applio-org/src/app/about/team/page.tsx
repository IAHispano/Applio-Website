import Team from "@/components/team/team-members";

export default function About() {
	return (
		<>
			<div className="bg-gradient-to-b from-[#FFFFFF]/20 to-transparent max-md:mx-full w-full h-[20svh] md:-mt-[5svh] md:px-[25svh] py-[15svh] flex flex-col gap-24 max-md:px-12">
				<h1 className="text-7xl text-center font-bold">Our Team</h1>
			</div>
			<main className="flex flex-col items-center justify-center mt-12">
				<div className="flex flex-col justify-center mx-auto items-center py-9 max-md:px-12 max-w-5xl">
					<Team />
				</div>
			</main>
		</>
	);
}
