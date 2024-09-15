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
				<>
					{data?.map((item: any) => (
						<div
							key={item.token}
							className="bg-white/10 md:h-[18svh] backdrop-blur-3xl rounded-xl p-4 border border-white/20 flex flex-col"
						>
							<div>
								<h2 className="font-medium tracking-tight text-xl w-full">
									{new Date(item.created_at).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
										hour: "numeric",
										minute: "numeric",
										second: "numeric",
									})}
								</h2>
								<p className="text-3xl read-font font-medium tracking-thight text-[#9E9E9E] select-all mt-2 mb-3">
									{item.token}
								</p>
							</div>
							{item.usage < 100 && (
								<input
									type="range"
									max={100}
									min={0}
									value={item.usage}
									readOnly
									className="w-full accent-white focus:outline-none"
								/>
							)}
							{item.usage > 100 && (
								<input
									type="range"
									max={100}
									min={0}
									value={item.usage}
									readOnly
									className="w-full accent-red-500 focus:outline-none"
								/>
							)}
							<div className="justify-between flex read-font font-medium mt-2">
								{item.usage > 100 && (
									<p className="justify-start md:items-end flex max-md:flex-col  text-[#9E9E9E]">
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
								<NumberTicker value={item.usage as number} />
							</div>
						</div>
					))}
				</>
			)}
		</section>
	);
}
