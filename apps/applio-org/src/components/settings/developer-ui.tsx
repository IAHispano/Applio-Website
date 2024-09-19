"use client";

import ApiUsage from "@/components/api/usage";
import Background2 from "@/components/svg/background2";
import { supabase } from "@/utils/database";
import { useEffect, useState } from "react";

export default function DeveloperUi() {
	const [authId, setAuthId] = useState<string>("");
	const [userTokens, setUserTokens] = useState<
		Array<{
			token: string;
			created_at: string;
			usage: number;
			role: "user" | "premium";
		}>
	>([]);
	const [loading, setLoading] = useState(true);
	const [end, setEnd] = useState(3);

	const fetchUserTokens = async () => {
		const {
			data: { session },
			error,
		} = await supabase.auth.getSession();

		if (error) {
			console.error("Error fetching session:", error);
			return;
		}

		if (session?.user.id) {
			const { data, error: tokenError } = await supabase
				.from("tokens")
				.select("*")
				.eq("user", session.user.id)
				.range(0, end);

			if (tokenError) {
				console.error("Error fetching tokens:", tokenError);
				return;
			}

			setUserTokens(data || []);
		} else {
			console.error("Error: User ID is undefined.");
		}
		setLoading(false);
	};

	const handleGenerateToken = async () => {
		const { data: user, error: userError } = await supabase.auth.getUser();

		if (userError) {
			console.error("Error fetching user:", userError);
			return;
		}

		if (user.user.id) {
			if (userTokens.length >= 3) {
				console.error("Error: You cannot create more than 3 keys.");
				return;
			}

			const { data: publicData, error: profileError } = await supabase
				.from("profiles")
				.select("premium")
				.eq("auth_id", user.user.id)
				.single();

			if (profileError) {
				console.error("Error fetching user role:", profileError.message);
				return;
			}

			const { error: tokenError } = await supabase
				.from("tokens")
				.upsert([
					{
						user: user.user.id,
						role: publicData?.premium ? "premium" : "user",
					},
				]);

			if (tokenError) {
				console.error("Error at saving token:", tokenError.message);
			} else {
				fetchUserTokens();
				window.location.reload();
			}
		} else {
			console.error("Error: User ID is undefined.");
		}
	};

	useEffect(() => {
		const tryGetSession = async () => {
			const { data, error } = await supabase.auth.getUser();
			if (error) {
				console.error("Error fetching user:", error);
				return;
			}

			if (data.user === null) {
				window.location.href = "/login";
			}

			if (data.user) {
				setAuthId(data.user.id);
			}
		};

		fetchUserTokens();
		tryGetSession();
	}, []);

	return (
		<main className="h-full w-full items-center flex flex-col mx-auto">
			<div className="absolute">
				<Background2 />
			</div>
			<div className="justify-between items-start flex flex-col mb-12 w-full relative">
				<div className="flex md:justify-between w-full max-md:gap-6">
					<h1 className="pl-0.5 md:text-5xl text-4xl font-bold">
						API Dashboard
					</h1>
					<button
						type="button"
						className={`max-md:rounded-full rounded-xl w-12 md:h-12 max-md:mx-4 max-md:px-2 max-md:mb-1 xl:pb-0.5 bg-white text-black text-3xl font-bold slow ${userTokens.length < 3 ? "hover:shadow-lg hover:shadow-white " : "opacity-50 cursor-not-allowed"}`}
						onClick={userTokens.length < 3 ? handleGenerateToken : undefined}
					>
						+
					</button>
				</div>
				<p className="pl-1 text-[#9E9E9E]">
					Manage your API keys, if you have any questions please refer to the
					documentation.
				</p>
			</div>
			<ApiUsage auth_id={authId} />
			{!loading && userTokens.length === 0 && (
				<p className="md:h-[40svh] text-[#9E9E9E] md:mt-40 text-xl max-md:mb-12 md:text-3xl">
					Not find api keys, generate one.
				</p>
			)}
			{!loading && userTokens && (
				<p className="md:justify-start md:items-end flex max-md:flex-col max-md:text-center max-md:w-full text-[#9E9E9E] mt-4">
					You have{" "}
					<span className="read-font md:mx-1 text-white/80">
						{userTokens.length}
					</span>{" "}
					space left out of{" "}
					<span className="read-font md:mx-1 text-white/80">{end}</span> for a
					new key.
				</p>
			)}
		</main>
	);
}
