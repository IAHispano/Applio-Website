"use client";

import { supabase } from "@/utils/database";
import { useEffect, useState } from "react";
import { useToast } from "../models/use-toast";

export default function SettingsUI() {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [full_name, setFullName] = useState("");
	const [bio, setBio] = useState("");
	const { showToast } = useToast();

	useEffect(() => {
		getUser();
	}, []);

	async function getUser() {
		const { data, error } = await supabase.auth.getUser();
		if (data?.user) {
			const userInfo = await supabase
				.from("profiles")
				.select("*")
				.eq("auth_id", data.user.id)
				.single();
			setData(userInfo.data);
			setLoading(false);
			console.log(userInfo.data);
			setFullName(userInfo.data.full_name);
			setBio(userInfo.data.bio);
		} else {
			setData(null);
		}

		if (error) {
			console.log(error);
			setLoading(false);
		}
	}

	async function updateData() {
		const { data: updatedData, error } = await supabase
			.from("profiles")
			.update({ full_name, bio, updated_at: new Date().toISOString() })
			.eq("auth_id", data?.auth_id);

		if (error) {
			console.error("Error updating data:", error);
		} else {
			console.log("Updated data:", updatedData);
			showToast("Profile updated successfully!", "success");
			getUser();
		}
	}

	return (
		<section className="flex flex-col justify-start items-start mx-auto max-w-5xl w-full">
			{loading && <p className="text-xs w-full text-center">Loading...</p>}
			{!loading && data && (
				<>
					<h1 className="pl-0.5 md:text-5xl text-4xl font-bold max-md:max-w-[100%] break-words">
						{data.full_name}
					</h1>
					<p className="pl-1 pb-4 text-[#9E9E9E]">
						Welcome to your settings page, here you can update your profile
					</p>
					<div className="bg-neutral-800 border border-white/10 rounded-lg w-full pt-8 h-30% p-4">
						<div className="h-full flex flex-col gap-4">
							<h2 className="text-xs p-2 font-bold uppercase">Username</h2>
							<input
								className="w-full rounded-xl h-12 p-2 border border-white/10 bg-white/20 focus:bg-white/30 slow focus:outline-none focus:border-white/20 text-neutral-300"
								type="text"
								placeholder="Username"
								value={full_name}
								onChange={(e) => setFullName(e.target.value)}
							/>
							<h2 className="text-xs p-2 font-bold uppercase">Biography</h2>
							<input
								className="w-full rounded-xl h-12 p-2 border border-white/10 bg-white/20 focus:bg-white/30 slow focus:outline-none focus:border-white/20 text-neutral-300"
								type="text"
								placeholder="Biography"
								value={bio}
								onChange={(e) => setBio(e.target.value)}
							/>
							<div className="flex justify-end items-end mt-auto">
								<button
									onClick={updateData}
									className="bg-white text-black px-6 py-1.5 rounded-xl font-semibold hover:bg-white/80 slow text-sm"
								>
									Save
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</section>
	);
}
