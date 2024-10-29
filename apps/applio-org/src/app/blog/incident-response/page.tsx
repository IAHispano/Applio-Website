export default function IncidentResponsePage() {
    return (
        <main className="min-h-screen max-w-5xl flex justify-center items-start mx-auto mt-28 p-6">
            <div className="flex flex-col w-full gap-24">
                <section>
                    <h1 className="text-2xl md:text-3xl text-neutral-200 font-bold">
                        Incident: 21 October 2024
                    </h1>
                    <div className="my-2 h-0.5 bg-neutral-600 rounded-xl" />
                    <div className="prose text-neutral-300 mt-4 gap-2">
                        <p>
                            We regret to inform you that in the early hours of September 21,{" "}
                            <span className="text-white underline font-semibold">the Discord account of Blaise</span>, 
                            owner of Applio and AI Hispano, was hacked.
                        </p>
                        <p>
                            We want to assure you that this incident{" "}
                            <span className="underline text-white font-semibold">did not affect the Applio website or the Applio program</span>.
                        </p>
                        <p>
                            The only compromise was the Discord token,{" "}
                            <span className="text-white underline font-semibold">which was resolved within a few hours</span>, 
                            and thankfully,{" "}
                            <span className="text-white underline font-semibold">there were no more severe damages</span>.
                        </p>
                        <p>
                            However, the AI Hispano server was impacted for a short time,{" "}
                            <span className="text-white underline font-semibold">during which a typical cryptocurrency scam link was shared, directing users to a fake domain resembling a legitimate website</span>.
                        </p>
                        <p>
                            We have taken immediate steps to secure the account and prevent further incidents. 
                            We encourage everyone to be vigilant and avoid clicking on any suspicious links.
                        </p>
                        <p>Thank you for your understanding and support.</p>
                        <p className="mt-4">
                            Sincerely,<br />
                            The <span className="font-semibold">Applio</span> Team.
                        </p>
                    </div>
                </section>

                <section>
                    <h1 className="text-2xl md:text-3xl text-neutral-200 font-bold">
                        About Applio Premium
                    </h1>
                    <div className="my-2 h-0.5 bg-neutral-600 rounded-xl" />
                    <div className="prose text-neutral-300 mt-4 gap-2">
                        <p>
                            We regret to inform you that due to{" "}
                            <span className="text-white underline font-semibold">Stripe's policies</span>, 
                            our account was suspended as{" "}
                            <span className="text-white underline font-semibold">they do not allow non-profit organizations to accept donations</span>.
                            <span className="text-white underline font-semibold"> This forced us to</span> 
                            close our account and{" "}
                            <span className="text-white underline font-semibold">discontinue our premium service</span>.
                        </p>
                        <p>
                            We are no longer charging our premium users, and{" "}
                            <span className="text-white underline font-semibold">we are actively working on restoring the features</span>
                            that were part of our premium offering.
                        </p>
                        <p>
                            Our main priority is to ensure that all those who have supported us with a donation can once again enjoy the benefits of our service.
                        </p>
                        <p>Thank you for your understanding and continued support.</p>
                        <p className="mt-4">
                            Sincerely,<br />
                            The <span className="font-semibold">Applio</span> Team.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
