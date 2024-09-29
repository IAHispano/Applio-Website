"use client";

import ApiDashboard from "@/components/settings/developer-ui";
import SettingsUI from "@/components/settings/settings-ui";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/utils/database";
import ModelsUI from "@/components/settings/models-ui";

export default function Settings() {
	return (
		<Suspense>
			<SettingsContent />
		</Suspense>
	);
}

function SettingsContent() {
	const searchParams = useSearchParams();
	const initialPage =
		searchParams.get("p") === "developer"
			? 3
			: searchParams.get("p") === "models"
				? 2
				: 1;
	const [page, setPage] = useState<number>(initialPage);

	useEffect(() => {
		if (searchParams.get("api") === "developer") {
			setPage(3);
		}
	}, [searchParams]);

	useEffect(() => {
		async function fetchUser() {
			const { data, error } = await supabase.auth.getSession();
			if (error) {
				console.error("Error fetching user:", error);
				return;
			}

			if (data.session === null) {
				window.location.href = "/login";
			}
		}

		fetchUser();
	}, []);

	return (
		<main className="w-full min-h-screen max-w-5xl flex flex-col items-center mx-auto p-8 mt-16">
			<div className="w-full flex max-md:flex-col justify-start items-center gap-4 mb-12 bg-neutral-800 rounded-lg p-2">
				<button
					type="button"
					className={`rounded-full border max-md:w-full border-white/20 px-4 py-1 ${page === 1 ? "bg-neutral-600" : "bg-neutral-700/20"}`}
					onClick={() => setPage(1)}
				>
					Profile
				</button>
				<button
					type="button"
					className={`rounded-full border max-md:w-full border-white/20 px-4 py-1 ${page === 2 ? "bg-neutral-600" : "bg-neutral-700/20"}`}
					onClick={() => setPage(2)}
				>
					Models
				</button>
				<button
					type="button"
					className={`rounded-full border max-md:w-full border-white/20 px-4 py-1 ${page === 3 ? "bg-neutral-600" : "bg-neutral-700/20"}`}
					onClick={() => setPage(3)}
				>
					Developer
				</button>
				<button
					type="button"
					className={`rounded-full border max-md:w-full border-white/20 px-4 py-1 ${page === 4 ? "bg-neutral-600" : "bg-neutral-700/20"}`}
					onClick={() => setPage(4)}
				>
					Premium
				</button>
			</div>
			{page === 1 && <div className="flex flex-col gap-4 w-full"><SettingsUI /></div>}
			{page === 2 && <ModelsUI />}
			{page === 3 && <ApiDashboard />}
			{page === 4 && (
				<div className="mt-6 flex flex-col justify-center items-start prose text-left max-w-sm m-auto text-sm text-neutral-300 gap-2">
					<p>
						Donating money to a non-profit organization is really complicated.
					</p>
					<p>
						Due to recent events we have had to withdraw this section. We are
						working to reinstate Applio Premium.
					</p>
					<p>
						Read more about Applio Premium Incident{" "}
						<a
							className="underline text-neutral-200 hover:text-white slow"
							href="/blog/incident-response"
						>
							here
						</a>
					</p>
				</div>
			)}
		</main>
	);
}
