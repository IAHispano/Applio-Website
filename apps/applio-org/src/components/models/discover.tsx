"use client";

import { supabase } from "@/utils/database";
import { useEffect, useRef, useState } from "react";
import NumberTicker from "../magicui/number-ticker";
import tags from "./tags";
import ModelCard from "./model-card";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter, useSearchParams } from "next/navigation";
import ModelPopup from "./model-popup";

export default function DiscoverModels() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const [count, setCount] = useState<number>(0);
	const [selectedTag, setSelectedTag] = useState<string | null>(null);
	const [data, setData] = useState<any>(null);
	const [end, setEnd] = useState<number>(4);
	const [searchInput, setSearchInput] = useState<string>();
	const [loading, setLoading] = useState<boolean>(true);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [searchTime, setSearchTime] = useState<string>();
	const [showPopup, setShowPopup] = useState(false);
	const [popupId, setPopupId] = useState<string | null>(null);
	const [showSettings, setShowSettings] = useState(false);
	const [date, setDate] = useState<string>("Latest");
	const popupRef = useRef<HTMLDivElement>(null)
	const handleTagClick = (tag: string) => {
		if (selectedTag === tag) {
			setSelectedTag(null);
		} else {
			setSelectedTag(tag);
		}
	};

	useEffect(() => {
		async function getModelsCount() {
			const { count, error } = await supabase
				.from("models")
				.select("", { count: "exact", head: true });

			if (count) {
				setCount(count);
			} else {
				console.log(error);
				setCount(23.0);
			}
		}

		getModelsCount();
	}, []);

	function loadmore() {
		if (hasMore && !loading) {
			setEnd(end + 10);
		}
	}

	useEffect(() => {
		async function getModels() {
			const startTime = performance.now();

			let query = supabase
				.from("models")
				.select("*")
				.order("created_at", { ascending: date === "oldest" });

			query = query.range(0, end);

			if (selectedTag) {
				query = query.eq("tags", selectedTag);
			}

			if (searchInput) {
				query = query.or(
					`name.ilike.%${searchInput}%,tags.ilike.%${searchInput}%`,
				);
			}

			const { data, error } = await query;

			const endTime = performance.now();
			const executionTime = endTime - startTime;
			const executionTimeInSeconds = executionTime / 1000;

			setSearchTime(executionTimeInSeconds.toFixed(2));
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
	}, [end, selectedTag, searchInput, date]);

	useEffect(() => {
		const id = searchParams.get("id");

		if (id) {
			handleOpenPopup(id);
		}

		setTimeout(() => {
			localStorage.removeItem(`viewed_${id}`);
		}, 120000);
	}, [searchParams]);

	async function sendView(id: string) {
		if (!hasViewed(id)) {
			const data2 = await supabase.auth.getUser();
			if (data2?.data.user) {
				const userInfo = await supabase
					.from("profiles")
					.select("full_name, id")
					.eq("auth_id", data2.data.user.id)
					.single();
				if (userInfo.data) {
					const views = await supabase.from("views").insert({
						by: userInfo.data.full_name,
						model: id,
						by_id: userInfo.data.id,
					});
					setViewed(id);
				}
			} else {
				const views = await supabase
					.from("views")
					.insert({ by: "Unknown", model: id, by_id: "Unknown" });
				setViewed(id);
			}
		}
	}

	function hasViewed(id: string): boolean {
		const viewed = localStorage.getItem(`viewed_${id}`);
		return viewed === "true";
	}

	function setViewed(id: string): void {
		localStorage.setItem(`viewed_${id}`, "true");
	}

	const handleOpenPopup = (id: string) => {
		if (id) {
			setPopupId(id as string);
			setShowPopup(true);
			const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?id=${id}`;
			window.history.replaceState({ path: newUrl }, "", newUrl);

			// send view to db
			if (!popupId || popupId !== id) {
				sendView(id);
			}
		}
	};

	const handleClosePopup = () => {
		setShowPopup(false);
		setPopupId(null);
		const originalUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
		window.history.replaceState({ path: originalUrl }, "", originalUrl);
	};

	useEffect(() => {
		const handleScroll = (e: WheelEvent) => {
		  if (showPopup && popupRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = popupRef.current
			const isScrollingUp = e.deltaY < 0
			const isScrollingDown = e.deltaY > 0
	
			if (
			  (isScrollingUp && scrollTop > 0) ||
			  (isScrollingDown && scrollTop < scrollHeight - clientHeight)
			) {
			  e.preventDefault()
			  popupRef.current.scrollTop += e.deltaY
			}
		  }
		}
	
		window.addEventListener('wheel', handleScroll, { passive: false })
		return () => window.removeEventListener('wheel', handleScroll)
	  }, [showPopup])
	
	  useEffect(() => {
		if (showPopup) {
		  document.body.style.overflow = 'hidden'
		} else {
		  document.body.style.overflow = 'auto'
		}
	
		return () => {
		  document.body.style.overflow = 'auto'
		}
	  }, [showPopup])
	

	function openSettings() {
		if (showSettings) {
			setShowSettings(false);
		} else {
			setShowSettings(true);
		}
	}

	return (
		<main className="w-full p-6 md:max-w-5xl min-w-full md:flex justify-center mx-auto min-h-screen overflow-hidden">
			{showPopup && <ModelPopup id={popupId} handleClose={handleClosePopup} />}
			<section className="my-12">
				{data && (
					<InfiniteScroll
						dataLength={data.length}
						hasMore={hasMore}
						next={loadmore}
						loader={
							<h1 className="text-white/80 my-14 md:text-xl text-center">
								Loading...
							</h1>
						}
					>
						<section className="flex flex-col w-full">
							<h1 className="text-5xl font-semibold mb-12 text-center">
								Discover{" "}
								{count ? (
									<NumberTicker value={count} className="font-bold text-6xl" />
								) : (
									<span className="font-bold text-6xl">23k</span>
								)}{" "}
								voices
							</h1>
							<article className="grid grid-cols-4 max-md:grid-cols-2 gap-4 px-4">
								{tags.map((tag, index) => (
									<button
										type="button"
										key={tag}
										onClick={() => handleTagClick(tag)}
										className={`slow hover:shadow-lg hover:shadow-white/10 cursor-pointer w-full px-4 py-1.5 ${tag === selectedTag ? "bg-white/20" : ""} hover:bg-white/20 rounded-xl border-white/10 border text-center select-none`}
									>
										{tag}
									</button>
								))}
							</article>
							<div className="flex gap-2 mt-8 w-full lg:min-w-[100svh] relative">
								<input
									type="text"
									className={`p-4 mt-8 bg-neutral-800/20 border border-white/10 focus:border-white/20 focus:outline-none placeholder-white/80 w-full pr-24 slow mx-1 ${showSettings ? "rounded-t-xl border-b-transparent" : "shadow-white/[.03] shadow-lg rounded-xl"}`}
									placeholder="Write here to search..."
									onChange={(e) => {
										setSearchInput(e.target.value);
										setLoading(true);
									}}
									value={searchInput}
								/>
								{searchInput && (
									<button
										type="button"
										className="p-2 rounded-xl absolute right-14 hover:bg-white/10 bottom-3 slow"
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
								<button
									className="p-2 rounded-xl absolute right-5 hover:bg-white/10 bottom-3"
									onClick={openSettings}
									type="button"
								>
									<svg
										aria-label="Settings"
										role="img"
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
									>
										<path
											d="M1.74805 5.31714H3.5207M14.2527 5.31714H9.84492"
											stroke="#E0E0E0"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M1.74805 10.6492L6.29953 10.6492M14.2527 10.6492L12.5758 10.6492"
											stroke="#E0E0E0"
											strokeWidth="1.5"
											strokeLinecap="round"
										/>
										<ellipse
											cx="6.7317"
											cy="5.35084"
											rx="1.52467"
											ry="1.52467"
											stroke="#E0E0E0"
											strokeWidth="1.5"
										/>
										<ellipse
											cx="9.36549"
											cy="10.6492"
											rx="1.52467"
											ry="1.52467"
											stroke="#E0E0E0"
											strokeWidth="1.5"
										/>
									</svg>
								</button>
							</div>
							{showSettings && (
								<div className="h-fit border bg-neutral-800/20  border-white/10 rounded-b-xl p-4 mx-1">
									<div className="flex max-md:flex-col gap-4 mx-auto justify-left w-full h-full text-neutral-300">
										<div className="w-fit">
											<p className="px-1">Date</p>
											<select
												className="w-fit bg-neutral-600/40 rounded-lg text-sm p-2 focus:outline-none my-2"
												onChange={(e) => setDate(e.target.value)}
											>
												<option className="bg-neutral-700" value="latest">
													Latest
												</option>
												<option className="bg-neutral-700" value="oldest">
													Oldest
												</option>
											</select>
										</div>
									</div>
								</div>
							)}
							{data && data.length === 0 && !loading && (
								<h1 className="text-white/80 my-14 md:text-xl text-center">
									We have not found any voice models
								</h1>
							)}
							{data && data.length === 0 && loading && (
								<h1 className="text-white/80 my-14 md:text-xl text-center">
									Loading...
								</h1>
							)}
							<div className="justify-between flex">
								{data && !loading && searchInput && (
									<p className="text-sm text-white/40 px-5 pt-2">
										We have found{" "}
										<span className="text-white/80">{data.length}</span> results
										in less than{" "}
										<span className="text-white/80">{searchTime}s</span>
									</p>
								)}
								{data && !loading && searchInput && (
									<p className="text-sm text-white/80 px-5 pt-2">
										😕 Don&apos;t find a voice?{" "}
										<span className="underline">Create your own!</span>
									</p>
								)}
							</div>
							<article className="flex flex-col justify-center items-center mx-auto w-full gap-4 my-10">
								{data?.map((model: any, index: number) => (
									<div
										key={model.id}
										className="max-h-96 overflow-y-auto w-full"
									>
										<button
											type="button"
											className="w-full h-full flex cursor-pointer"
											key={model.id}
											onClick={(e) => {
												e.preventDefault();
												handleOpenPopup(model.id);
											}}
										>
											<ModelCard key={model.id} data={model} />
										</button>
									</div>
								))}
							</article>
						</section>
					</InfiniteScroll>
				)}
			</section>
		</main>
	);
}
