"use client";

import ApiDashboard from "@/components/settings/developer-ui";
import SettingsUI from "@/components/settings/settings-ui";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/utils/database";

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
			<div className="w-full flex max-md:flex-col justify-start items-center gap-4 mb-12 rounded-lg p-2 bg-neutral-700/20">
				<button
					type="button"
					className={`max-md:w-full hover:bg-white/20 rounded-xl border-white/10 border px-4 py-1 ${page === 1 ? "bg-neutral-600" : "bg-neutral-700/20"}`}
					onClick={() => setPage(1)}
				>
					Profile
				</button>
				<button
					type="button"
					className={`max-md:w-full hover:bg-white/20 rounded-xl border-white/10 border px-4 py-1 ${page === 3 ? "bg-neutral-600" : "bg-neutral-700/20"}`}
					onClick={() => setPage(3)}
				>
					Developer
				</button>
			</div>
			{page === 1 && (
				<div className="flex flex-col gap-4 w-full">
					<SettingsUI />
				</div>
			)}
			{page === 3 && <ApiDashboard />}
		</main>
	);
}
