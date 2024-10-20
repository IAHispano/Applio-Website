"use client";

import { supabase } from "@/utils/database";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Guide } from "@/types/guidesTypes";
import tags from "./tags";
import Spinner from "@/components/layout/spinner";

export default function DiscoverGuides() {
	const [selectedTag, setSelectedTag] = useState<string | null>(null);
	const [data, setData] = useState<Guide[] | null>(null);
	const [end, setEnd] = useState<number>(11);
	const [searchInput, setSearchInput] = useState<string>();
	const [loading, setLoading] = useState<boolean>(true);
	const [hasMore, setHasMore] = useState<boolean>(true);

	function loadmore() {
		if (hasMore && !loading) {
			setEnd(end + 3);
		}
	}

	useEffect(() => {
		async function getModels() {
			let query = supabase
				.from("guides")
				.select("*")
				.order("created_at", { ascending: false })
				.range(0, end);

			if (selectedTag) {
				query = query.eq("type", selectedTag);
			}

			if (searchInput) {
				query = query.or(
					`title.ilike.%${searchInput}%,type.ilike.%${searchInput}%`,
				);
			}

			const { data, error } = await query;

			if (data) {
				const updatedEnd = end;
				if (data.length < updatedEnd) {
					setHasMore(false);
				} else {
					setHasMore(true);
				}
				setLoading(false);
				setData(data);
			} else {
				console.log(error);
				setLoading(false);
				setData([]);
			}
		}

		getModels();
	}, [end, selectedTag, searchInput]);

	const handleTagClick = (tag: string) => {
		if (selectedTag === tag) {
			setSelectedTag(null);
		} else {
			setSelectedTag(tag);
		}
	};

	return (
		<>
			<section className="flex flex-col max-xl:mx-4 w-full mt-2 justify-center items-center mx-auto">
				{data && (
					<InfiniteScroll
						dataLength={data.length}
						hasMore={hasMore}
						next={loadmore}
						loader="Loading..."
					>
						<section className="flex flex-col xl:min-w-[100svh]">
							<h2 className="text-2xl mb-4 font-bold">Browse more</h2>
							<div className="flex flex-col gap-2 w-full relative">
								<input
									type="text"
									className={`p-4 bg-neutral-800/20 border border-white/10 focus:border-white/20 focus:outline-none placeholder-white/80 pr-24 mx-1 rounded-xl`}
									placeholder="Write here to search..."
									onChange={(e) => {
										setSearchInput(e.target.value);
										setLoading(true);
									}}
									value={searchInput}
								/>
								<h2 className="text-xs mt-4 font-bold uppercase">
									Filter by tags
								</h2>
								{searchInput && (
									<button
										type="submit"
										className="p-2 rounded-xl absolute right-4 hover:bg-white/10 top-3 slow"
										onClick={() => setSearchInput("")}
									>
										<svg
											aria-hidden="true"
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M2.48535 13.5149L13.5151 2.48513"
												stroke="#E0E0E0"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M13.5156 13.5149L2.48586 2.48513"
												stroke="#E0E0E0"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</button>
								)}
								<article className="grid grid-cols-8 max-md:grid-cols-2 gap-2">
									{tags.map((tag, index) => (
										<button
											type="button"
											key={tag}
											onClick={() => handleTagClick(tag)}
											className={`max-md:w-full truncate hover:bg-white/20 rounded-xl border-white/10 border px-4 py-1 ${tag === selectedTag ? "bg-white/20" : ""} hover:bg-white/20 rounded-xl border-white/10 border text-center select-none`}
										>
											{tag}
										</button>
									))}
								</article>
							</div>
							{data && data.length === 0 && !loading && (
								<h1 className="text-white/80 my-14 md:text-xl text-center">
									We have not found any guides
								</h1>
							)}

							<article className="grid md:grid-cols-3 md:grid-rows-3 gap-4 w-full h-full my-10">
								{data.map((model: any, index: number) => (
									<a
										href={`/learn/${model.id}`}
										key={model.id}
										className="h-full w-full bg-neutral-800 hover:bg-neutral-700/40 rounded-xl p-4 pb-6 border border-white/10 relative  transition-all "
									>
										<div className="flex flex-col h-full justify-between">
											<div>
												<p className="text-xs text-white/60">
													{model.type || "AI"} ·{" "}
													{model.created_at
														? new Date(model.created_at).toLocaleDateString(
																"en-US",
																{
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																},
															)
														: "May 13, 2024"}{" "}
													by @{model.created_by || "?"}
												</p>
												<h3 className="font-semibold text-2xl my-2 text-white truncate">
													{model.title}
												</h3>
												<p className="mt-2 text-sm text-white/70 truncate max-w-md">
													{model.description}
												</p>
											</div>
										</div>
									</a>
								))}
							</article>
						</section>
					</InfiniteScroll>
				)}
			</section>
		</>
	);
}
