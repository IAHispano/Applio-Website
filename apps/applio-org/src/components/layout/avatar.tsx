"use client";

import { supabase } from "@/utils/database";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

		const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
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
			{loading && (
				<svg
					aria-hidden="true"
					className="w-8 h-8 animate-spin text-neutral-800 fill-white"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
			)}
			{!loading && (
				<header className="max-md:w-full relative">
					{data ? (
						<button
							type="button"
							className="flex max-xl:backdrop-blur-xl max-xl:backdrop-filter max-xl:w-full justify-between items-center m-auto w-full max-xl:p-1"
							onClick={openDropdown}
						>
							<div className="flex flex-col">
								<p className="xl:hidden capitalize max-w-[180px] truncate font-medium">
									{data?.full_name || "User"}
								</p>
							</div>
							<img
								alt="Profile Avatar"
								className="xl:w-12 xl:h-12 h-8 w-8 rounded-full z-50 border border-white/20 shadow-xl xl:shadow-white/20 backdrop-filter backdrop-blur-xl"
								src={data.avatar_url || "/logo_no_bg.png"}
								onError={(e) => {
									const target = e.currentTarget as HTMLImageElement;
									target.src = "/logo_no_bg.png";
								}}
							/>
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
					className="xl:absolute xl:mt-16 mt-4"
				>
					<div className="w-full xl:w-fit h-fit bg-neutral-600/60 md:bg-neutral-800 backdrop-filter backdrop-blur-lg rounded-lg flex flex-col p-4 gap-1 text-white md:border border-white/10">
						<div className="flex flex-col gap-2">
							<a
								className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-xl slow"
								href={`/@${data?.full_name || "@"}`}
							>
								<svg fill="#d4d4d4" viewBox="0 0 24 24" className="w-5 h-5" aria-labelledby="profile-icon" aria-label="Profile icon"role="img">
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
								href='/settings'
							>
								<svg viewBox="0 0 512 512" fill="#d4d4d4" className="w-5 h-5" aria-labelledby="settings-icon" aria-label="Settings icon" role="img">
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
								<svg viewBox="0 0 24 24" fill="#d4d4d4" className="w-5 h-5" aria-labelledby="logout-icon" aria-label="Logout icon" role="img">
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
