"use client";

import { supabase } from "@/utils/database";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Spinner from "@/components/layout/spinner";

export default function Avatar() {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

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
		} else {
			setData(null);
		}

		if (error) {
			console.log(error);
			setLoading(false);
		}
	}

	async function logout() {
		setIsOpen(false);
		const { error } = await supabase.auth.signOut();
		window.location.reload();

		if (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		const getUser = async () => {
			const { data } = await supabase.auth.getUser();
			if (data?.user) {
				const userInfo = await supabase
					.from("profiles")
					.select("*")
					.eq("auth_id", data.user.id)
					.single();
				setData(userInfo.data);
				setLoading(false);
			} else {
				setData(null);
				setLoading(false);
			}
		};

		getUser();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event) => {
			if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
				getUser();
			}
		});

		return () => {
			subscription?.unsubscribe();
		};
	}, []);

	const openDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<section className="flex max-xl:flex-col xl:justify-end w-full">
			{loading && <Spinner />}
			{!loading && (
				<header className="max-md:w-full relative">
					{data ? (
						<button
							type="button"
							className="flex slow max-xl:w-full justify-start items-center m-auto w-full max-xl:p-1 rounded-xl border-white/20"
							onClick={openDropdown}
						>
							<img
								alt="Profile Avatar"
								className="w-10 h-10 rounded-full z-50 border border-white/20 shadow-xl xl:shadow-white/20 backdrop-filter backdrop-blur-xl"
								src={data.avatar_url || "/logo_no_bg.png"}
								onError={(e) => {
									const target = e.currentTarget as HTMLImageElement;
									target.src = "/logo_no_bg.png";
								}}
							/>
							<div className="flex flex-col pl-2 ml-1">
								<p className="text-md">@{data.full_name}</p>
							</div>
						</button>
					) : (
						<a
							className="w-full max-xl:mt-4 border-white/10 border bg-white rounded-lg xl:rounded-xl flex px-4 max-xl:px-12 py-1 xl:w-32 items-center justify-center text-neutral-300 hover:bg-white/80 slow font-medium"
							href="/login"
						>
							<p className="max-xl:text-center text-black">Log In</p>
						</a>
					)}
				</header>
			)}
			{isOpen && (
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					transition={{ duration: 0.2 }}
					className="xl:absolute xl:mt-14 mt-2"
				>
					<div className="w-full xl:w-fit h-fit backdrop-filter backdrop-blur-3xl rounded-xl flex flex-col p-2 gap-1 text-white border border-white/20">
						<div className="flex flex-col gap-2">
							<a
								className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-xl slow"
								href={`/@${data?.full_name || "@"}`}
							>
								<svg
									fill="#d4d4d4"
									viewBox="0 0 24 24"
									className="w-5 h-5"
									aria-labelledby="profile-icon"
									aria-label="Profile icon"
									role="img"
								>
									<path
										fill="#d4d4d4"
										fillRule="evenodd"
										d="M16 9a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z"
										clipRule="evenodd"
									/>
									<path
										fill="#d4d4d4"
										fillRule="evenodd"
										d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0112.065 14a8.984 8.984 0 017.092 3.458A9 9 0 103 12zm9 9a8.963 8.963 0 01-5.672-2.012A6.992 6.992 0 0112.065 16a6.991 6.991 0 015.689 2.92A8.964 8.964 0 0112 21z"
										clipRule="evenodd"
									/>
								</svg>
								<p className="text-sm text-neutral-300 font-medium">Profile</p>
							</a>
							<a
								className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-xl slow"
								href="/settings"
							>
								<svg
									viewBox="0 0 512 512"
									fill="#d4d4d4"
									className="w-5 h-5"
									aria-labelledby="settings-icon"
									aria-label="Settings icon"
									role="img"
								>
									<path
										fill="none"
										stroke="#d4d4d4"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={32}
										d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"
									/>
								</svg>
								<p className="text-sm text-neutral-300 font-medium">Settings</p>
							</a>
							<button
								className="flex items-center gap-2 hover:bg-red-500/20 p-2 rounded-xl slow cursor-pointer"
								onClick={logout}
								type="button"
							>
								<svg
									viewBox="0 0 24 24"
									fill="#d4d4d4"
									className="w-5 h-5"
									aria-labelledby="logout-icon"
									aria-label="Logout icon"
									role="img"
								>
									<path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z" />
								</svg>
								<p className="text-sm text-neutral-300 font-medium">Logout</p>
							</button>
						</div>
					</div>
				</motion.div>
			)}
		</section>
	);
}
