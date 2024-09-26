"use client";

import MarkdownForGuides from "@/components/learn/markdown";
import { useEffect, useState } from "react";

export default function Changelog() {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("https://api.github.com/repos/iahispano/Applio/releases")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setData(data);
				setLoading(false);
			})
			.catch((error) => console.error("Error fetching data:", error));
		setLoading(false);
	}, []);

	return (
		<main className="mt-24 max-w-5xl flex flex-col justify-center mx-auto gap-8 max-lg:p-4">
			<div className="flex max-md:flex-col justify-center mx-auto items-center md:items-end md:justify-between md:w-full gap-0.5 border-b border-white/10 pb-6">
				<h1 className="font-semibold text-5xl">Changelog</h1>
				<h2 className="text-neutral-200">Check out the new Applio updates.</h2>
			</div>
			<div className="flex flex-col gap-4">
				{loading && <p className="text-xs text-center">Loading...</p>}
				{!loading &&
					Array.isArray(data) &&
					data.map((tag) => (
						<a
							key={tag.id}
							href={`https://github.com/iahispano/Applio/releases/${tag.tag_name}`}
							rel="noreferrer"
							target="_blank"
							className="hover:bg-neutral-600/10 slow rounded-xl p-4 flex flex-col gap-2 border border-white/10"
						>
							<div className="flex justify-between items-start ml-auto w-full">
								<h1 className="font-semibold text-3xl">
									<span className="max-md:hidden">Applio</span>{" "}
									<span className="read-font">{tag.tag_name}</span>
								</h1>
								<div className="flex flex-col md:gap-2 items-end">
									<p className="md:text-sm text-xs text-neutral-300 read-font">
										{new Date(tag.published_at).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</p>
									<p className="text-[10px] text-neutral-400 capitalize select-all">
										{tag.target_commitish}{" "}
										<span className="read-font">{tag.id}</span>
									</p>
								</div>
							</div>
							<div className="mt-6 bg-neutral-600/40 rounded-xl p-4">
								<MarkdownForGuides content={tag.body} />
							</div>
						</a>
					))}
				{!loading && !Array.isArray(data) && (
					<p className="text-xs text-center">No updates available.</p>
				)}
			</div>
		</main>
	);
}
