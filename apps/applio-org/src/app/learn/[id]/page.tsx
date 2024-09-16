import AdminGuidesTool from "@/components/learn/admin-tool";
import GuidePost from "@/components/learn/guide-post";
import { supabase } from "@/utils/database";

// Remove for local development
export const runtime = process.env.NEXT_PUBLIC_LOCAL === "true" ? undefined : "edge";

export async function generateMetadata({ params }: { params: { id: string } }) {
	const id = params.id;

	if (id) {
		const { data, error } = await supabase
			.from("guides")
			.select("title, created_at, created_by")
			.eq("id", id)
			.single();

		if (error) {
			return {
				title: "Applio Guides",
			};
		}
		if (data) {
			return {
				title: `${data.title}`,
				description: `See ${data.title} guide by ${data.created_by} at ${new Date(data.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} in Applio.`,
				openGraph: {
					title: `${data.title}`,
					images: "/opengraph-image.png",
					description: `See ${data.title} guide by ${data.created_by} at ${new Date(data.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} in Applio.`,
				},
			};
		}
	}
}

export default function ReadGuide({ params }: { params: { id: string } }) {
	const id = params.id;

	return (
		<main className="md:min-h-[80svh] flex justify-center items-start p-4 mx-auto">
			<GuidePost id={id} />
			<AdminGuidesTool id={id} />
		</main>
	);
}
