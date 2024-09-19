import { createClient } from "@/utils/server-database";
import { redirect } from "next/navigation";

// Remove for local development
const runtimeConfig = {
	runtime: "edge",
};

export const addPost = async (formData: FormData, created_by: string) => {
	const supabase = createClient();
	const title = formData.get("title");
	const description = formData.get("description");
	const content = formData.get("content");
	const type = formData.get("type");

	if (
		title === null ||
		content === null ||
		type === null ||
		description === null
	) {
		console.error("Missing required fields");
		return;
	}

	const { data, error } = await supabase.from("guides").insert({
		title: title,
		description: description,
		content: content,
		type: type || "AI",
		created_by: created_by,
	});

	if (error) {
		console.error("Error inserting guide:", error);
		return;
	}

	console.log(data);
	redirect("/learn");
};
