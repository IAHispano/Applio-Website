import { supabase } from "@/utils/database";
import { useEffect, useState } from "react";
import NumberTicker from "../magicui/number-ticker";
import Spinner from "@/components/layout/spinner";

export default function ApiUsage({ auth_id }: { auth_id: string | undefined }) {
	const [data, setData] = useState<any>();
	const [end, setEnd] = useState(3);
	const [loading, setLoading] = useState(true);

	async function getUserUsage() {
		if (auth_id) {
			const { data, error } = await supabase
				.from("tokens")
				.select("")
				.eq("user", auth_id)
				.range(0, end);

			if (data) {
				setData(data);
				setLoading(false);
			}

			if (error) {
				console.log(error);
			}
		}
	}

	useEffect(() => {
		getUserUsage();
	}, [auth_id]);

	async function deleteToken(token: string) {
		const { error } = await supabase.from("tokens").delete().eq("token", token);
		if (error) {
			console.log(error);
		} else {
			window.location.href = "/settings?p=developer";
		}
	}

	return (
		<section className="grid gap-4 w-full h-full">
			{loading && <Spinner />}
			{!loading && (
				<section className="gap-4 flex flex-col">
					{data?.map(
						(item: {
							token: string;
							created_at: string;
							usage: number;
							role: "user" | "premium" | "commercial";
						}) => {
							const getMaxUsage = (role: "user" | "premium" | "commercial") => {
								return role === "premium" ? 500 : role === "commercial" ? 1000 : 100;
							};
							const maxUsage = getMaxUsage(item.role);
							const progressPercentage = Math.min(
								(item.usage / maxUsage) * 100,
								100,
							);
							return (
								<div
									key={item.token}
									className="bg-white/10 h-fit w-full rounded-xl p-4 border border-white/20 flex justify-center mx-auto flex-col"
								>
									<div>
										<div className="w-full h-fit flex items-start gap-2">
											<h2 className="font-medium tracking-tight text-sm max-md:text-xs w-full text-neutral-300">
												{new Date(item.created_at).toLocaleDateString("en-US", {
													year: "numeric",
													month: "long",
													day: "numeric",
													hour: "numeric",
													minute: "numeric",
													second: "numeric",
												})}
											</h2>
											{item.role === "premium" && (
												<div className="flex h-full items-center m-auto gap-2">
													<p className="md:px-4 md:py-1 p-2 bg-white/80 text-black font-semibold rounded-xl max-md:text-xs">
														<span className="max-md:hidden">Premium</span>
														<span className="md:hidden">P</span>
													</p>
												</div>
											)}
											{item.role === "commercial" && (
												<div className="flex h-full items-center m-auto gap-2">
													<p className="md:px-4 md:py-1 p-2 bg-white/80 text-black font-semibold rounded-xl max-md:text-xs">
														<span className="max-md:hidden">Commercial</span>
														<span className="md:hidden">C</span>
													</p>
												</div>
											)}
											<button
												onClick={() => deleteToken(item.token)}
												type="button"
												className="bg-neutral-600/40 rounded-xl p-2 flex items-center m-auto h-full hover:bg-red-500/50 slow"
											>
												<svg
													role="img"
													aria-label="delete-icon"
													className="md:w-[20px] w-4 h-4 md:h-[20px]"
													fill="#ffffff"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
													stroke="#ffffff"
												>
													<g id="SVGRepo_bgCarrier" strokeWidth="0" />
													<g
														id="SVGRepo_tracerCarrier"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<g id="SVGRepo_iconCarrier">
														<path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" />
													</g>
												</svg>
											</button>
										</div>
										<p className="md:text-3xl text-xl max-md:max-w-[200px] read-font font-medium hover:text-neutral-300 select-all max-md:my-4 blur-md hover:blur-none slow w-fit">
											{item.token}
										</p>
									</div>
									<p className="text-sm text-neutral-300 mt-2 max-md:mb-2">
										Usage
									</p>
									{item.usage < maxUsage && (
										<div className="bg-neutral-800/20 border border-white/20 rounded-full h-4 shadow-xl shadow-white/10 overflow-hidden mt-1">
											<div
												className="bg-white h-full rounded-full transition-all duration-500 ease-out"
												style={{ width: `${progressPercentage}%` }}
											/>
										</div>
									)}
									{item.usage > maxUsage ||
										(item.usage === maxUsage && (
											<div className="bg-neutral-800/20 border border-white/20 rounded-full h-4 shadow-xl shadow-white/20 overflow-hidden mt-1">
												<div
													className="bg-red-500/80 h-full rounded-full transition-all duration-500 ease-out"
													style={{ width: `${progressPercentage}%` }}
												/>
											</div>
										))}
									<div className="justify-between flex read-font font-medium mt-2">
										{item.usage > 100 && (
											<p className="justify-start md:items-end flex max-md:flex-col text-[#9E9E9E]">
												You have reached the limit of use, try again later or{" "}
												<a
													className="underline md:mx-1 hover:text-white slow"
													href="/premium"
												>
													become a Supporter
												</a>{" "}
												to reduce the rate limits.
											</p>
										)}
										{item.usage > 0 ? (
											<div className="flex justify-between w-full items-center">
												<NumberTicker
													value={item.usage}
													className="font-medium text-neutral-400 text-sm"
												/>
												<p className="font-medium text-neutral-400 text-sm">
													{maxUsage}
												</p>
											</div>
										) : (
											<div className="flex justify-between w-full items-center">
												<p className="font-medium text-neutral-300 text-sm">
													0
												</p>
												<p className="font-medium text-neutral-400 text-sm">
													{maxUsage}
												</p>
											</div>
										)}
									</div>
								</div>
							);
						},
					)}
				</section>
			)}
		</section>
	);
}
