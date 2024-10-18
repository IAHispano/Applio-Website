"use client";

import { addPost } from "@/app/actions/guides/add-guide-action";
import MarkdownForGuides from "@/components/learn/markdown";
import tags from "@/components/learn/tags";
import { supabase } from "@/utils/database";
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
			if (error) {
				console.error("Error fetching user data:", error);
				return window.location.href = "/login";
			}
	
			if (data?.user) {
				const { data: userInfo } = await supabase
					.from("profiles")
					.select("full_name, writer")
					.eq("auth_id", data.user.id)
					.single();
	
				if (!userInfo || userInfo.writer === false) {
					window.location.href = "/learn";
				} else {
					setUserID(userInfo.full_name);
				}
			} else {
				window.location.href = "/login";
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
		<main className="flex flex-col gap-8 mx-auto items-center mt-16 min-h-screen max-md:mx-4">
			<form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-4xl">
				<>
					<h1 className="text-5xl text-center font-bold mt-12">
						Create a guide
					</h1>
					<div className="flex flex-col gap-4 w-full mx-auto">
						<label className="text-2xl font-bold text-left">Title</label>
						<input
							className="focus:outline-none rounded-lg w-full px-4 py-3 bg-neutral-600 focus:ring focus:ring-white"
							required
							type="text"
							name="title"
							key="title"
							placeholder="Enter the guide title..."
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							maxLength={100}
						/>
					</div>

					<div className="flex flex-col gap-4 w-full mx-auto mt-4">
						<label className="text-2xl font-bold text-left">Description</label>
						<input
							className="focus:outline-none rounded-lg w-full px-4 py-3 bg-neutral-600 focus:ring focus:ring-white"
							type="text"
							name="description"
							key="description"
							placeholder="Enter the guide description..."
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							maxLength={200}
						/>
						<select
							key="type"
							name="type"
							className="mt-2 focus:outline-none rounded-lg w-full px-4 py-3 bg-neutral-600 focus:ring focus:ring-white"
							required
							value={type}
							onChange={(e) => setType(e.target.value)}
						>
							<option value="" disabled hidden>
								Select a guide type
							</option>
							{tags.map((item) => (
								<option key={item} className="py-2" value={item}>
									{item}
								</option>
							))}
						</select>
					</div>

					<div className="flex flex-col gap-4 w-full mx-auto mt-8">
						<label className="text-2xl font-bold text-left">Content</label>
						<textarea
							key="content"
							className="h-80 w-full p-4 rounded-lg resize-none focus:outline-none bg-neutral-600 focus:ring focus:ring-white"
							placeholder="Start writing your guide in Markdown here..."
							value={markdownText}
							onChange={(e) => setMarkdownText(e.target.value)}
							name="content"
							required
						/>
						<div className="w-full flex justify-between mt-4 items-start">
							<div className="flex flex-col truncate">
								<p className="font-bold text-xl truncate">{title}</p>
								<p className="text-md text-gray-500 truncate">{description}</p>
							</div>
							<button className="bg-neutral-600 text-white font-medium px-4 py-1 rounded-full">
								Preview
							</button>
						</div>
						<div className="mt-4 p-4 bg-neutral-600 rounded-lg">
							<MarkdownForGuides content={markdownText} />
						</div>
					</div>

					{title && description && markdownText && type && (
						<button
							className="text-black border-white/10 border bg-white rounded-lg xl:rounded-xl flex px-4 mt-10 w-full max-xl:px-12 py-2 xl:w-42 justify-center hover:bg-white/80 slow font-medium"
							type="submit"
						>
							Upload
						</button>
					)}
				</>
			</form>
		</main>
	);
}
