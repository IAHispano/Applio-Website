import DiscoverModels from "@/components/models/discover";
import { supabase } from "@/utils/database";
import { Suspense } from "react";

// Remove for local development
// export const runtime = "edge";

export async function generateMetadata(params: {
	searchParams: { id: string };
}) {
	const id = params.searchParams.id;
	if (id) {
		const { data, error } = await supabase
			.from("models")
			.select("name, image_url, author_username, created_at")
			.eq("id", id)
			.single();

		if (error) {
			return {
				title: "Applio",
			};
		}
		if (data) {
			const formattedDate = new Date(data.created_at).toLocaleDateString(
				"en-EN",
				{ year: "numeric", month: "long", day: "numeric" },
			);

			return {
				title: `${data.name} in Applio.`,
				description: `See this model by ${data.author_username} at ${formattedDate} in Applio.`,
				openGraph: {
					title: data.name,
					images: data.image_url,
					description: `See this model by ${data.author_username} at ${formattedDate} in Applio.`,
				},
			};
		}
	}
}

export default function Models() {
	return (
		<main className="md:min-h-[80svh] flex justify-center items-center mx-auto">
			<Suspense>
				<DiscoverModels />
			</Suspense>
		</main>
	);
}
