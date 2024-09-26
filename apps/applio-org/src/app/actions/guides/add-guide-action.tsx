import { supabase } from "@/utils/database";
import { NextResponse } from "next/server";

// Remove for local development
const runtimeConfig = {
	runtime: "edge",
};

export const addPost = async (formData: FormData, created_by: string) => {
	const title = formData.get("title");
	const description = formData.get("description");
	const content = formData.get("content");
	const type = formData.get("type");

	if (!title || !content || !description) {
		console.error("Missing required fields");
		return NextResponse.json(
			{ error: "Missing required fields" },
			{ status: 400 },
		);
	}

	const { data, error } = await supabase
		.from("guides")
		.insert({
			title: title,
			description: description,
			content: content,
			type: type || "AI",
			created_by: created_by,
		})
		.select();

	if (error) {
		console.error("Error inserting guide:", error);
		return NextResponse.json(
			{ error: "Error inserting guide" },
			{ status: 500 },
		);
	}
	if (data) {
		return NextResponse.json({ success: true, data: data });
	}
};
