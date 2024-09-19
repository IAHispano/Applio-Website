"use server";

import { supabase } from "@/utils/database";
import { redirect } from "next/navigation";

// Remove for local development
const runtimeConfig = {
	runtime: "edge",
};

export const removeGuides = async (id: string) => {
	const { error, status } = await supabase.from("guides").delete().eq("id", id);

	if (error) {
		console.log(error);
	} else if (status === 204) {
		console.log("response.ok");
		redirect("/learn");
	}

	return status;
};

export const getConfig = async () => {
	return runtimeConfig;
};
