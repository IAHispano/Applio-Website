export default function incidentResponsePage() {
	return (
		<main className="min-h-screen max-w-5xl flex justify-center items-start mx-auto mt-28 max-md:p-6">
			<div className="flex flex-col w-full gap-24">
				<div>
					<h1 className="md:text-3xl text-2xl text-neutral-200">
						Incident <span className="read-font">09-21-2024</span>
					</h1>
					<div className="h-0.5 bg-neutral-600 rounded-xl w-full my-0.5" />
					<div className="prose text-neutral-300 text-balance gap-2 mt-4">
						<p>
							We regret to inform you that in the early hours of September 21,{" "}
							<span className="text-white underline">
								the Discord account of Blaise
							</span>
							, the owner of Applio and AI Hispano, was hacked.
						</p>
						<p>
							We want to assure you that this incident{" "}
							<span className="underline text-white">
								did not affect the Applio website or the Applio program
							</span>
							.
						</p>
						<p>
							The only compromise was the Discord token,{" "}
							<span className="text-white underline">
								which was resolved within a few hours
							</span>
							, and thankfully,{" "}
							<span className="text-white underline">
								there were no more severe damages.
							</span>
						</p>
						<p>
							However, the AI Hispano server was impacted for a short time,{" "}
							<span className="text-white underline">
								during which a typical cryptocurrency scam link was shared,
								directing users to a fake domain resembling a legitimate
								website.
							</span>
						</p>
						<p>
							We have taken immediate steps to secure the account and prevent
							further incidents. We encourage everyone to be vigilant and avoid
							clicking on any suspicious links.
						</p>
						<p>Thank you for your understanding and support.</p>
						<p className="mt-4">
							Sincerely,
							<br />
							The <span className="font-semibold">Applio</span> Team.
						</p>
					</div>
				</div>
				<div>
					<h1 className="md:text-3xl text-2xl text-neutral-200">
						About Applio Premium
					</h1>
					<div className="h-0.5 bg-neutral-600 rounded-xl w-full my-0.5" />
					<div className="prose text-neutral-300 text-balance gap-2 mt-4">
						<p>
							We regret to inform you that due to{" "}
							<span className="text-white underline">Stripe's policies</span>,
							our account was suspended as{" "}
							<span className="text-white underline">
								they do not allow non-profit organizations to accept donations
							</span>
							. <span className="text-white underline">This forced us to</span>{" "}
							close our account and{" "}
							<span className="text-white underline">
								discontinue our premium service
							</span>
							.
						</p>
						<p>
							We are no longer charging our premium users, and{" "}
							<span className="text-white underline">
								we are actively working on restoring the features
							</span>{" "}
							that were part of our premium offering.
						</p>
						<p>
							Our main priority is to ensure that all those who have supported
							us with a donation can once again enjoy the benefits of our
							service.
						</p>
						<p>Thank you for your understanding and continued support.</p>
						<p className="mt-4">
							Sincerely,
							<br />
							The <span className="font-semibold">Applio</span> Team.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
