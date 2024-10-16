"use client";

import { addPost } from "@/app/actions/guides/add-guide-action";
import MarkdownForGuides from "@/components/learn/markdown";
import tags from "@/components/learn/tags";
import { supabase } from "@/utils/database";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CreateGuide() {
	const [page, setPage] = useState(1);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [markdownText, setMarkdownText] = useState("");
	const [type, setType] = useState("");
	const formRef = useRef<HTMLFormElement>(null);
	const [userID, setUserID] = useState("");

	useEffect(() => {
		async function getUser() {
			const { data, error } = await supabase.auth.getUser();
			if (data?.user) {
				const userInfo = await supabase
					.from("profiles")
					.select("full_name, writer")
					.eq("auth_id", data.user.id)
					.single();
				if (userInfo) {
					setUserID(userInfo.data?.full_name);
					console.log(userInfo.data?.full_name);
					if (userInfo.data?.writer === false) {
						window.location.href = "/learn";
					}
				} else {
					window.location.href = "/login";
				}
				if (error) {
					console.error("Error fetching user data:", error);
				}
			} else {
				redirect("/login");
			}
		}

		getUser();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!userID) return;

		try {
			const formData = new FormData();
			formData.append("title", title);
			formData.append("description", description);
			formData.append("content", markdownText);
			formData.append("type", type);

			const response = await addPost(formData, userID);

			if (response) {
				window.location.href = "/learn";
			}

			if (formRef.current) {
				formRef.current.reset();
			}
		} catch (error) {
			console.error("error :", error);
		}
	};

	return (
		<main className="flex flex-col gap-4 mx-auto items-center mt-24 min-h-screen max-md:mx-4">
			<form ref={formRef} onSubmit={handleSubmit}>
				{page === 1 && (
					<><div className="flex flex-col gap-6 w-full items-start mx-auto justify-center">
						<h1 className="font-semibold text-4xl max-md:text-2xl">
							1. Write a title for your guide
						</h1>
						<input
							className="focus:outline-none rounded-xl w-full px-4 py-2 bg-white/10 focus:border focus:border-white/10"
							required
							type="name"
							name="title"
							key="title"
							placeholder="Write here..."
							value={title}
							onChange={(e) => setTitle(e.target.value)} />
					</div><div className="flex flex-col gap-6 w-full items-start mx-auto justify-center mt-4">
							<h1 className="font-semibold text-4xl max-md:text-2xl">2. Set a description</h1>
							<input
								className="focus:outline-none rounded-xl w-full px-4 py-2 bg-white/10 focus:border focus:border-white/10"
								type="description"
								name="description"
								key="description"
								placeholder="Write here..."
								value={description}
								onChange={(e) => setDescription(e.target.value)} />
						</div><div className="flex flex-col gap-6 lg:w-[100svh] text-left mt-12">
							<h1 className="font-semibold text-4xl max-md:text-2xl">3. Write your Guide</h1>
							<div className="w-full h-full min-h-[80svh] flex flex-col gap-0">
								<textarea
									key="content"
									className="md:flex-1 h-full w-full min-h-[50svh] p-4 border border-white/10 rounded-xl bg-white/10 resize-none overflow-auto focus:outline-none hide-scrollbar max-md:mt-4 font-mono"
									placeholder={"Here you can start writing your guide, before we start, and we will show you how it works.\n\n" +
										"The guides are made in Markdown, so you may already know how to use it. Here are some examples:\n\n" +
										"# This is a title \n\n" +
										"## This is a subtitle \n\n" +
										"[This is a link](https://applio.org)\n\n" +
										"**This is bold text**\n\n" +
										"*This is italic text*\n\n" +
										"- This is a dot\n\n" +
										"`This is code`\n\n" +
										"![This is an image](Link_Image)\n\n" +
										"%color{#00AA68} This is a colored text %%\n\n"}
									value={markdownText}
									onChange={(e) => setMarkdownText(e.target.value)}
									name="content"
									required />
									<div className="w-full flex justify-between mt-4">
										<p className="font-bold text-xl max-w-3xl truncate max-md:max-w-[120px]">{title}</p>
										<div className="bg-white text-black font-medium text-sm px-6 py-1 w-fit rounded-full mb-2">Preview</div>
									</div>
								<div className="flex-1 h-full min-h-[40svh] w-full p-4 border border-white/10 rounded-xl bg-white/10 resize-none overflow-none">
									<MarkdownForGuides content={markdownText} />
								</div>
							</div>
						</div><div className="flex flex-col gap-6 w-full items-start mx-auto justify-center mt-12">
							<h1 className="font-semibold text-4xl max-md:text-2xl">
								4. What type of guide is it?
							</h1>
							<select
								key="type"
								name="type"
								className="mt-4 focus:outline-none rounded-xl w-full px-4 py-2 bg-white/10 focus:border focus:border-white/10"
								required
								value={type}
								onChange={(e) => setType(e.target.value)}
							>
								{tags.map((item) => (
									<option
										key={item}
										value={item}
										className="bg-neutral-600 py-2"
										onSelect={() => setType(item)}
									>
										{item}
									</option>
								))}
							</select>
						</div>
						{title && description && markdownText && type && (<button className="mt-14 bg-white text-black w-full py-2 font-medium rounded-xl hover:opacity-80 slow" type="button" onClick={() => setPage(5)}>Next</button>)}
						</>
				)}
				{page === 5 && (
					<div>
						<h1 className="font-semibold text-4xl">
							5. Check that everything is correct!
						</h1>
						<div className="grid grid-cols-4 text-lg font-medium mt-20 gap-4">
							<p className="col-span-4 flex flex-col gap-2 w-full">
								1. Title
								<span className="w-full bg-white/10 p-4 rounded-xl font-normal">
									{title}
								</span>
							</p>
							<p className="col-span-4 flex flex-col gap-2 w-full">
								2. Description
								<span className="w-full bg-white/10 p-4 rounded-xl font-normal">
									{description}
								</span>
								<p className="col-span-4 flex flex-col gap-2 w-full">
									3. Content
									<div className="bg-white/10 border border-white/10 p-4 rounded-xl">
										<MarkdownForGuides content={markdownText} />
									</div>
								</p>
								<p className="col-span-4 flex flex-col gap-2 w-full">
									4. Type
									<span className="w-full bg-white/10 p-4 rounded-xl font-normal">
										{type || "AI"}
									</span>
								</p>
							</p>
						</div>
						<div className="flex justify-between w-full mt-6">
							<button
								type="button"
								className="bg-white/20 text-white rounded-xl py-1.5 w-fit px-8 hover:bg-white/10 slow"
								onClick={() => setPage(4)}
							>
								Back
							</button>
							<button
								className="bg-white text-black font-semibold rounded-xl py-1.5 w-fit px-8 hover:bg-white/80 slow"
								type="submit"
							>
								Upload
							</button>
						</div>
					</div>
				)}
			</form>
		</main>
	);
}
