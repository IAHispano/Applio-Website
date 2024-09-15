"use server";

import { supabase } from "@/utils/database";
import { redirect } from "next/navigation";

const runtimeConfig = {
	runtime: "edge",
};

export const addPost = async (formData: FormData, created_by: string) => {
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
		return;
	} else {
		const insert = await supabase.from("guides").insert({
			title: title,
			description: description,
			content: content,
			type: type,
			created_by: created_by,
		});
		console.log(insert);

		redirect("/learn");
	}
};

export const getConfig = async () => {
	return runtimeConfig;
};
