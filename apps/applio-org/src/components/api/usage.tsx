import { supabase } from "@/utils/database";
import { useEffect, useState } from "react";
import NumberTicker from "../magicui/number-ticker";

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

	return (
		<section className="grid gap-4 w-full h-full">
			{loading && <p className="my-40 text-xs text-center">Loading...</p>}
			{!loading && (
				<section className="gap-4 flex flex-col">
					{data?.map((item: { token: string; created_at: string; usage: number; role: 'user' | 'premium' }) => {
						const getMaxUsage = (role: 'user' | 'premium') => {
							return role === 'premium' ? 500 : 100; 
						}
						const maxUsage = getMaxUsage(item.role);
						console.log(item.role);
						const progressPercentage = Math.min((item.usage / maxUsage) * 100, 100);
						return (
							<div
								key={item.token}
								className="bg-white/10 h-fit rounded-xl p-4 border border-white/20 flex flex-col"
							>
								<div>
									<div className="w-full flex justify-between">
									<h2 className="font-medium tracking-tight text-sm w-full text-neutral-300">
										{new Date(item.created_at).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
											hour: "numeric",
											minute: "numeric",
											second: "numeric",
										})}
									</h2>
									{item.role === "premium" && <a className="px-4 py-1 max-md:mb-auto bg-white/80 text-black font-semibold rounded-xl max-md:text-xs" href="/premium">Premium</a>}
									</div>
									<p className="text-3xl read-font font-medium tracking-thight hover:text-neutral-300 select-all max-md:my-4 blur-md hover:blur-none slow w-fit">
										{item.token}
									</p>
								</div>
								<p className="text-sm text-neutral-300 mt-2">Usage</p>
								{item.usage < maxUsage && (
									<div className="bg-neutral-800/20 border border-white/20 rounded-full h-4 shadow-xl shadow-white/10 overflow-hidden mt-1">
										<div 
											className="bg-white h-full rounded-full transition-all duration-500 ease-out"
											style={{ width: `${progressPercentage}%` }}
										/>
									</div>
								)}
								{item.usage > maxUsage ||item.usage === maxUsage && (
									<div className="bg-neutral-800/20 border border-white/20 rounded-full h-4 shadow-xl shadow-white/20 overflow-hidden mt-1">
									<div 
										className="bg-red-500/80 h-full rounded-full transition-all duration-500 ease-out"
										style={{ width: `${progressPercentage}%` }}
									/>
								</div>
								)}
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
											<NumberTicker value={item.usage} className="font-medium text-neutral-400 text-sm" />
											<p className="font-medium text-neutral-400 text-sm">{maxUsage}</p>
										</div>
									) : (
										<div className="flex justify-between w-full items-center">
											<p className="font-medium text-neutral-300 text-sm">0</p>
											<p className="font-medium text-neutral-400 text-sm">{maxUsage}</p>
										</div>
									)}
								</div>
							</div>
						);
					})}
				</section>
			)}
		</section>
	);
}
