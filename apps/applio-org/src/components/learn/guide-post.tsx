"use client";

import React, { useEffect, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "@/utils/database";
import MarkdownForGuides from "./markdown";

export default function 	GuidePost({ id }: Readonly<{ id: string }>) {
	const [data, setData] = useState<any[] | null>(null);
	const [_error, setError] = useState<PostgrestError | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			const { data: userData, error: userError } = await supabase
				.from("guides")
				.select("*")
				.eq("id", id);

			if (userError) {
				setError(userError);
				return;
			}
			setData(userData);
			setLoading(false);
		}

		fetchData();
	}, [id]);

	const formatDate = (dateStr: string | number | Date) => {
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "numeric",
			day: "numeric",
		};
		return new Date(dateStr).toLocaleDateString(undefined, options);
	};

	return (
		<div className="text-black dark:text-white">
			{data?.length === 0 && !loading && (
				<h1 className="text-4xl text-center h-[80svh] mt-44">
					Oops... we didn&apos;t find that guide.
				</h1>
			)}
			{loading ? (
				<div className="justify-center items-center flex flex-col h-[40svh]">
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]" />
				</div>
			) : (
				data?.map((item) => (
					<article key={item.id} className="w-full h-full max-md:mt-12">
						<div
							className="absolute inset-0 h-full w-full overflow-visible opacity-20"
							style={{
								backgroundImage:
									"radial-gradient(100% 30% at 50% 0%, rgb(255, 255, 255), transparent)",
							}}
						/>
						<main className="w-full py-14 flex flex-col min-h-screen overflow-x-hidden relative">
							<div className="flex flex-col justify-start items-center text-left">
								<h1 className="text-4xl font-bold max-md:max-w-xs md:max-w-6xl text-wrap text-center truncate">
									{item.title}
								</h1>
								<h2 className="text-xl pl-0.5 mt-2 text-white/80">
									by {item.created_by} at {formatDate(item.created_at)}.
								</h2>
							</div>
							<div className="mt-28">
								<MarkdownForGuides content={item.content} />
							</div>
						</main>
					</article>
				))
			)}
		</div>
	);
}
