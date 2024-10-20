import { Guide } from "@/types/guidesTypes";

export default function Card(data: Guide) {
	return (
		<a
			href={`/learn/${data.id}`}
			className="w-full h-fit min-h-fit rounded-xl bg-neutral-800 hover:bg-neutral-700/40  p-4 pb-6 border border-white/10  transition-all   drop-shadow-xl"
		>
			<p className="text-white/60 text-sm">
				{data.type || "AI"} ·{" "}
				{data.created_at
					? new Date(data.created_at).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})
					: "May 13, 2024"}{" "}
				by @{data.created_by || "?"}
			</p>
			<h1 className="my-2 text-4xl font-semibold max-w-6xl max-md:text-wrap md:truncate text-left">
				{data.title}
			</h1>

			<p className="mt-2 text-sm text-white/70 truncate max-w-full">
				{data.description}
			</p>
		</a>
	);
}
