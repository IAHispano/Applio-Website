import UserCard from "@/components/profile/user-card";
import { supabase } from "@/utils/database";
import { notFound, redirect } from "next/navigation";

// Remove for local development
export const runtime = process.env.NEXT_PUBLIC_LOCAL === "true" ? undefined : "edge";

export async function generateMetadata({ params }: { params: { id: string } }) {
	let id = params.id;
    id = decodeURIComponent(id).trim().replace(/\s+/g, " ");
    if (!id.startsWith("@")) {
        id = `@${id}`;
    }

	if (id) {
		const { data, error } = await supabase
			.from("profiles")
			.select("full_name, avatar_url")
			.eq("full_name", id.substring(1)) 
			.single();

		if (error) {
			return {
				title: "Applio",
			};
		}
		if (data) {
			return {
				title: `${data.full_name} in Applio.`,
				description: `See ${data.full_name} profile.`,
				openGraph: {
					title: `${data.full_name} in Applio.`,
					images: data.avatar_url,
					description: `See ${data.full_name} profile.`,
				},
			};
		}
	}
}

export default function Profile({ params }: { params: { id: string } }) {
	let id = params.id;
	console.log(id.length)
	if (id.length < 3 || id.length === 3) {
		console.log("Not found");
		notFound();
	}
	if (id.length > 1) {
		id = decodeURIComponent(id).trim().replace(/\s+/g, " ");
	} 
    if (!id.startsWith("@")) {
		redirect(`/@${id}`);
    }


	return (
		<main className="md:min-h-[80svh] flex justify-center items-start p-16 mx-auto">
			<UserCard id={id.substring(1)} />
		</main>
	);
}
