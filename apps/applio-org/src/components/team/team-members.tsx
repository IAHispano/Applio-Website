"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/utils/database";

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
				<div className="text-white h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
			</div>
		);
	}

	return (
		<div className="flex justify-center items-center flex-col w-full">
			<div className="grid grid-cols-3 gap-12 w-full">
				{data.map((item: any) => (
					<a
						className="flex flex-col justify-center items-center"
						key={item.id}
						href={`/${item.full_name}`}
					>
						<img
							className="m-0 inline-flex rounded-md object-cover !xs:w-36 !xs:h-36 !sm:w-40 !sm:h-40 h-32 w-32 cursor-pointer slow hover:opacity-80"
							src={item.avatar_url || "/favicon.ico"}
							alt={item.full_name}
							onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
								e.currentTarget.src = "/favicon.ico";
							}}
						/>
						<h3 className="mb-0 mt-4 text-white">{item.full_name}</h3>
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
