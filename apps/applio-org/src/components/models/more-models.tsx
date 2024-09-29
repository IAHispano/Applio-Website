import { supabase } from "@/utils/database";
import { useEffect, useState } from "react";
import ModelCard from "./model-card";
import { Model } from "@/types/modelsTypes";

export default function MoreModels({
	tags,
	full_name,
	id,
	model_name,
	model_id,
}: {
	tags: string;
	full_name: string;
	id: string;
	model_name: string;
	model_id: string;
}) {
	const [data, setData] = useState<Model[] | null>();

	useEffect(() => {
		async function getMoreModels() {
			const { data, count, error } = await supabase
				.from("models")
				.select("*")
				.filter("name", "ilike", `%${model_name}%`)
				.filter("id", "neq", model_id)
				.limit(6);

			if (data) {
				setData(data);
				console.log(data);
			}
			if (data?.length === 0) {
				const tagsArray = tags.split(",").map((tag) => tag.trim());
				const { data: dbdata, error } = await supabase
					.from("models")
					.select("*")
					.filter("tags", "ilike", tagsArray[0])
					.filter("id", "neq", model_id)
					.limit(6);

				if (dbdata) {
					console.log("data", dbdata);
					setData(dbdata);
				} else {
					console.log("error", error);
				}
			}
			if (error) {
				console.log(error);
				setData(null);
			}
		}

		getMoreModels();
	}, []);

	return (
		<section className="text-white/80 w-full pb-2">
			{data && data.length > 0 && (
				<>
					<p className="max-w-sm truncate">
						More models like <span className="font-semibold">{model_name}</span>
					</p>
					<div className="grid md:grid-cols-3 mt-2 w-full gap-4">
						{data.map((model: Model) => (
							<a
								href={`/models?id=${model.id}`}
								key={model.id}
								className="hover:bg-white/10 slow border border-white/10 py-2 p-4 rounded-xl w-full max-md:w-full text-white"
							>
								<p className="text-sm text-white/60 max-w-sm truncate">
									by {model.author_username}
								</p>
								<h2 className="font-bold max-w-[140px] truncate">
									{model.name}
								</h2>
							</a>
						))}
					</div>
				</>
			)}
		</section>
	);
}
