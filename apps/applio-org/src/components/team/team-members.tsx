"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/database";
import Spinner from "@/components/layout/spinner";

export default function Team() {
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<
		Array<{ id: number; avatar_url: string; full_name: string }>
	>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data, error } = await supabase
					.from("profiles")
					.select("*")
					.eq("role", "admin");

				if (error) {
					handleError("An error has occurred");
					console.error(error);
				} else {
					setData(data || []);
				}
			} catch (error) {
				handleError("An error has occurred");
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const handleError = (errorMessage: string) => {
		setError(errorMessage);
	};

	if (loading || !data || data.length === 0) {
		return (
			<div>
				<Spinner />
			</div>
		);
	}

	return (
		<div className="flex justify-center items-center flex-col w-full">
			<div className="grid grid-cols-3 gap-6 w-full">
				{data.map((item: any) => (
					<a
						className="flex flex-col justify-center items-center"
						key={item.id}
						href={`/@${item.full_name}`}
					>
						<img
							className="m-0 inline-flex rounded-md object-cover w-32 h-32 xs:w-36 xs:h-36 sm:w-40 sm:h-40 cursor-pointer slow hover:opacity-80"
							src={item.avatar_url || "/favicon.ico"}
							alt={item.full_name}
							onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
								e.currentTarget.src = "/favicon.ico";
							}}
						/>
						<h3 className="mb-0 mt-3 text-white">{item.full_name}</h3>
					</a>
				))}
			</div>
			<p className="md:text-sm text-xs text-neutral-300 pt-12 pb-4">
				also all the awesome open source contributors at GitHub...
			</p>
			<a
				href="https://github.com/IAHispano/Applio?tab=readme-ov-file#contributors"
				rel="noreferrer"
				target="_blank"
				className="justify-center items-center flex-col w-full"
			>
				<img
					src="https://contrib.rocks/image?repo=IAHispano/Applio"
					alt="Github collaborators"
				/>
			</a>
		</div>
	);
}
