import Team from "@/components/team/team-members";

export default function About() {
	return (
		<>
			<div className="flex flex-col justify-center items-start mx-auto w-full max-w-4xl">
				<h1 className="text-4xl font-semibold mt-24 text-left">Team</h1>
				<p className="text-sm text-neutral-200 text-left pl-1.5">
					Meet the people why make Applio happen.
				</p>
			</div>
			<main className="min-h-screen flex flex-col items-center justify-center">
				<div className="flex flex-col justify-center mx-auto items-center py-12 max-w-5xl">
					<Team />
				</div>
			</main>
		</>
	);
}
