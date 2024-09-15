"use client";

import { supabase } from "@/utils/database";
import { AuthError, Provider } from "@supabase/supabase-js";
import { useState } from "react";

export default function AuthUI() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState<AuthError>();
	const [success, setSuccess] = useState(false);

	async function resetPassword(password: string) {
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: "https://applio.org/login/forgot-password/update-password",
		});
		if (error) {
			setError(error);
		} else {
			setSuccess(true);
		}
	}

	return (
		<main className="w-full h-full absolute top-0 bg-gradient-to-b from-[#333333] to-[#110f0f] z-50">
			<section className="flex justify-center md:items-center m-auto w-full h-full p-8">
				<div className="bg-[#4d4c4c] w-full py-12 rounded-xl md:p-8 p-4 xl:max-w-[30%] md:max-w-[60%] md:max-h-fit flex flex-col gap-4">
					<div className="flex flex-col 2xl:items-center items-left gap-0 max-md:px-4">
						<h1 className="text-4xl font-medium">Forgot your password?</h1>
						<h2 className="text-sm max-w-[80%] max-2xl:mt-2">
							We will send you an email with the steps to follow.
						</h2>
					</div>
					<div className="flex flex-col w-full h-full gap-4 md:mt-10 mt-6 max-md:px-2">
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="rounded-xl bg-black/20 border border-white/20 p-3 focus:outline-none focus:border focus:border-white/40"
							placeholder="Email address"
						/>
						{error && (
							<p className="flex justify-center text-xs p-3 bg-red-500/40 text-white rounded-xl font-medium">
								{error.message}
							</p>
						)}
						{!success && !error && (
							<button
								onClick={() => resetPassword(email)}
								className="w-full bg-[#666666] border border-white/20 hover:bg-opacity-80 hover:border-white/10 slow p-2 rounded-2xl font-semibold"
							>
								Next
							</button>
						)}
						{success && (
							<div>
								<div className="bg-white/20 rounded-xl p-2 text-sm text-center">
									We have sent you an email ✅
								</div>
								<p>You can close this window</p>
							</div>
						)}
						<a
							href="/login"
							className="text-sm flex justify-center mx-auto hover:underline text-neutral-300 hover:text-white slow cursor-pointer w-fit"
						>
							Return
						</a>
					</div>
				</div>
			</section>
		</main>
	);
}
