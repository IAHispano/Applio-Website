import { supabase } from "@/utils/database";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "./use-toast";

type ModelPopupProps = {
	id: string | null;
	handleClose: () => void;
};

export default function OptionsModelMenu({ id, handleClose }: ModelPopupProps) {
	const [clicked, setClicked] = useState(false);
	const [liked, setLiked] = useState(false);
	const router = useRouter();
	const { showToast } = useToast();

	function handleShare() {
		showToast("Copied to clipboard!", "success");
		navigator.clipboard.writeText(`https://applio.org/models?id=${id}`);
	}

	async function handleDownload() {
		window.location.href = `/models/download/${id}`;
	}

	async function handleLike() {
		const auth = await supabase.auth.getSession();

		if (auth.data.session) {
			setClicked(true);
			if (!liked) {
				setLiked(true);
			}

			if (liked) {
				setLiked(false);
			}
		} else {
			router.push("/login");
		}
	}

	async function sendLike() {
		const auth = await supabase.auth.getUser();

		if (auth.data?.user) {
			const profile = await supabase
				.from("profiles")
				.select("id, full_name")
				.eq("auth_id", auth.data.user.id)
				.single();
			console.log(liked);
			if (liked && profile.data && clicked) {
				const { data, error } = await supabase.from("likes").insert({
					by: profile.data.full_name,
					by_id: profile.data.id,
					model: id,
				});
				if (data) {
				}
				if (error) {
					console.log(error);
				}
			}
			if (!liked && profile.data && clicked) {
				const { data, error } = await supabase
					.from("likes")
					.delete()
					.eq("by_id", profile.data.id);
				if (data) {
				}
				if (error) {
					console.log(error);
				}
			}

			if (profile.data && !clicked && !liked) {
				const { data, error } = await supabase
					.from("likes")
					.select()
					.eq("by_id", profile.data.id)
					.eq("model", id);
				if (data && data?.length > 0) {
					setLiked(true);
				}
				console.log(data);
			}

			if (profile.data && !clicked && !liked) {
				const { data, error } = await supabase
					.from("likes")
					.select()
					.eq("by_id", profile.data.id)
					.eq("model", id);
				if (data && data?.length > 0) {
					setLiked(true);
				}
			}
		} else {
			if (clicked) {
				router.push("/login");
			}
		}
	}

	useEffect(() => {
		sendLike();
	}, [id, liked]);

	return (
		<div className="flex gap-2 max-lg:mb-6 max-lg:w-full max-lg:mt-4">
			<button
				className={`max-md:border max-md:border-white/20 bg-white/10 hover:bg-white/20 slow px-5 py-2 lg:w-fit w-full justify-center items-center mx-auto flex h-fit rounded-xl`}
				onClick={handleShare}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="18" cy="5" r="3" />
					<circle cx="6" cy="12" r="3" />
					<circle cx="18" cy="19" r="3" />
					<line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
					<line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
				</svg>
			</button>
			<button
				className={`${
					liked
						? "bg-white/30 hover:bg-white/40"
						: "bg-white/10 hover:bg-white/20"
				} max-md:border max-md:border-white/20 slow px-5 py-2 lg:w-fit w-full justify-center items-center mx-auto flex h-fit rounded-xl`}
				onClick={handleLike}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M7 10v12" />
					<path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
				</svg>
			</button>
			<button
				className={`max-md:border max-md:border-white/20 bg-white/10 hover:bg-white/20 slow px-5 py-2 lg:w-fit w-full justify-center items-center mx-auto flex h-fit rounded-xl`}
				onClick={handleDownload}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
					<polyline points="7 10 12 15 17 10" />
					<line x1="12" x2="12" y1="15" y2="3" />
				</svg>
			</button>
			<button
				className={`max-md:border max-md:border-white/20 bg-white/10 hover:bg-red-500/20 slow px-2 py-2 lg:w-fit w-full justify-center items-center mx-auto flex h-fit rounded-xl`}
				onClick={handleClose}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M18 6 6 18" />
					<path d="m6 6 12 12" />
				</svg>
			</button>
		</div>
	);
}
