"use client";
import { Model } from "@/types/modelsTypes";
import { supabase } from "@/utils/database";
import { useState, useEffect } from "react";
import OptionsModelMenu from "./options-model-menu";
import ModelStats from "./model-stats";
import MoreModels from "./more-models";
import { motion } from "framer-motion";
import ApplioAI from "./applio-ai";

type Profile = {
	'model-maker': boolean; 
  };
  

const ModelPopup = ({
	id,
	onClose,
}: { id: string | null; onClose: () => void }) => {
	const [data, setData] = useState<Model | null>();
	const [image, setImage] = useState<string | null>(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [isModelMaker, setIsModelMaker] = useState(false);

	useEffect(() => {
		async function getModelInfo(id: string) {
			const { data, error } = await supabase
				.from("models")
				.select("*")
				.eq("id", id)
				.single();

			if (data) {
				setData(data);
				setImage(data.image_url);
				setLoading(false);
				try {
					const { data: profile, error: profileError } = await supabase
					  .from("profiles")
					  .select("model-maker")
					  .eq("full_name", data.author_username)
					  .single<Profile>();
				  
					if (profileError) {
					  throw new Error(profileError.message);
					}
				  
					if (profile) {
					  console.log(profile);
					  setIsModelMaker(profile["model-maker"]); 
					}
				  } catch (error: any) {
					console.error("Error fetching profile:", error.message);
				}
			}

			if (error) {
				setData(null);
				console.log(error);
				setError(true);
			}
		}

		getModelInfo(id as string);
	}, [id]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 z-50 max-xl:p-4 overflow-y-auto h-full m-auto backdrop-filter backdrop-blur-xl"
		>
			<div className="bg-white/10 max-md:border max-md:border-white/20 backdrop-blur-3xl xl:rounded-xl max-xl:rounded-xl p-6 md:pb-0 md:w-full xl:max-w-[110svh] md:h-fit xl:max-h-full md:min-h-[60svh] max-md:w-full h-fit max-md:mt-12">
				<button
					className="absolute top-0 right-0 m-4 lg:mt-6 mt-4 bg-white/10 hover:bg-red-500/10 p-2 rounded-xl slow"
					onClick={onClose}
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
				{error && !data && (
					<article className="flex flex-col justify-center items-center m-auto w-full h-full text-center p-4">
						<h1 className="text-2xl">
							We have not found the model you are looking for
						</h1>
						<p className="read-font text-[10px] my-4">ID: {id}</p>
					</article>
				)}
				{loading && (
					<article className="w-full h-full z-50 flex flex-col justify-center items-center mx-auto">
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
					</article>
				)}
				{data && !error && !loading && (
						<article className="w-full h-full xl:h-[60svh] z-50 flex flex-col">
							<div className="flex justify-between max-lg:flex-col lg:pr-12 pt-0">
								<div className="flex flex-col">
									<h1 className="text-3xl max-w-2xl max-md:text-left max-md:mt-4 max-md:text-pretty truncate font-semibold">
										{data.name}
									</h1>
									<p className="text-white/70 max-md:mt-2 max-md:text-left pl-0.5 mt-1 mb-2 read-font text-sm">
										by{" "}
										<a
											href={`/${data.author_username || "?"}`}
											className="hover:underline text-white/80"
										>
											{data.author_username || "?"}
										</a>{" "}
										in {data.server_name || "?"} ·{" "}
										<span>
											{(() => {
												const t = Math.round(
													(new Date().getTime() -
														new Date(data.created_at).getTime()) /
														(1000 * 60),
												);
												return t < 60
													? `${t} minutes`
													: t < 1440
														? `${Math.floor(t / 60)}h`
														: `${Math.floor(t / 1440)} days`;
											})()}
										</span>{" "}
										ago.
									</p>
								</div>
								<OptionsModelMenu id={data.id} />
							</div>
							<section className="flex justify-between max-md:flex-col gap-2">
								<div className="flex gap-2 max-md:flex-col h-full justify-center items-center">
								{data.tags?.split(",").map((tag, index) => (
										<div
											key={index}
											className="rounded-xl bg-white/10 border border-white/10 px-4 my-auto flex items-center justify-start max-md:py-2 text-sm max-md:w-full"
										>
											{tag}
										</div>
									))}
								</div>
								{isModelMaker && (
								<div className="w-60 max-md:w-full bg-white rounded-xl text-black text-center font-semibold flex gap-1 items-center justify-center py-1 shadow-xl shadow-white/20">
								Verified model
								<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
								</div>
								)}
							</section>
							<div className="flex flex-col gap-4 w-full h-full mt-6">
								<ModelStats id={data.id} />
								<ApplioAI modelName={data.name} tags={data.tags}/>
								<div className="flex bg-white/10 max-md:rounded-xl rounded-t-xl px-4 pt-2 justify-end mt-auto">
									{data.tags && data.author_username && data.author_id && (
										<MoreModels
											tags={data.tags}
											full_name={data.author_username}
											id={data.author_id}
											model_id={data.id}
											model_name={data.name}
										/>
									)}
								</div>
							</div>
						</article>
				)}
			</div>
		</motion.div>
	);
};

export default ModelPopup;
