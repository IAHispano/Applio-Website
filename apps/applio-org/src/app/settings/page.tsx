"use client"

import ApiDashboard from "@/components/settings/developer-ui";
import SettingsUI from "@/components/settings/settings-ui";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function Settings() {
	return (
		<Suspense>
			<SettingsContent />
		</Suspense>
	);
}

function SettingsContent() {
	const searchParams = useSearchParams();
	const initialPage = searchParams.get("p") === "developer" ? 2 : 1;
	const [page, setPage] = useState<number>(initialPage);

	useEffect(() => {
		if (searchParams.get("api") === "developer") {
			setPage(2);
		}
	}, [searchParams]);

	return (
		<Suspense fallback={<div className="w-full flex items-center text-center text-xs">Loading...</div>}>
		<main className="w-full min-h-screen max-w-5xl flex flex-col items-center mx-auto p-8 max-lg:mt-12">
			<div className="w-full flex max-md:flex-col justify-start items-center gap-4 mb-12 bg-neutral-800 rounded-lg p-2">
				<button type="button" className={`rounded-full border max-md:w-full border-white/20 px-4 py-1 ${page === 1 ? 'bg-neutral-600' : 'bg-neutral-700/20'}`} onClick={() => setPage(1)}>Profile</button>
				<button type="button" className={`rounded-full border max-md:w-full border-white/20 px-4 py-1 ${page === 2 ? 'bg-neutral-600' : 'bg-neutral-700/20'}`} onClick={() => setPage(2)}>Developer</button>
				<button type="button" className={`rounded-full border max-md:w-full border-white/20 px-4 py-1 ${page === 3 ? 'bg-neutral-600' : 'bg-neutral-700/20'}`} onClick={() => setPage(3)}>Premium</button>
			</div>
			{page === 1 && <SettingsUI />}
			{page === 2 && <ApiDashboard />}
		</main>
		</Suspense>
	);
}
