import Groq from "groq-sdk";
import { useEffect, useState } from "react";
import LoadingIndicator from "./loading";
import { supabase } from "@/utils/database";

type ModelAIDescription = {
	description: string;
};

export default function ApplioAI({
	modelName,
	tags,
	id,
}: { modelName: string; tags: string; id: string }) {
	const groq = new Groq({
		apiKey: process.env.NEXT_PUBLIC_GROQ,
		dangerouslyAllowBrowser: true,
	});
	const [data, setData] = useState<ModelAIDescription>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function getAIDescription() {
			setLoading(true);
			try {
				const { data: dbdata, error } = await supabase
					.from("models")
					.select("description")
					.eq("id", id)
					.single();
				if (dbdata?.description) {
					setData(dbdata);
					setLoading(false);
				} else {
					console.log("error", error);
					sendAIDescription();
				}
			} catch (error) {
				console.log(error);
				sendAIDescription();
			}
		}

		async function sendAIDescription() {
			try {
				const tagsArray = tags.split(",").map((tag) => tag.trim());

				const countryMap: { [key: string]: string } = {
					ES: "Spain",
					PT: "Portugal",
					FR: "France",
					DE: "Germany",
					IT: "Italy",
					UK: "United Kingdom",
					US: "United States",
					EN: "England",
				};

				const locationTag = tagsArray.find((tag) => countryMap[tag]);

				const locationDescription = locationTag
					? ` from ${countryMap[locationTag]},`
					: undefined;

				const filteredTags = tagsArray.filter((tag) => !countryMap[tag]);

				let tagDescription = filteredTags.length > 2 ? "He is a famous " : "";

				if (filteredTags.includes("Artist")) tagDescription += "artist, ";
				if (filteredTags.includes("Rapper")) tagDescription += "rapper, ";
				if (filteredTags.includes("OG"))
					tagDescription += "original gangster (OG), ";
				if (filteredTags.includes("Actor")) tagDescription += "actor, ";
				if (filteredTags.includes("Singer")) tagDescription += "singer, ";
				if (filteredTags.includes("Fictional"))
					tagDescription += "fictional character, ";
				if (filteredTags.includes("Anime"))
					tagDescription += "anime character, ";
				if (filteredTags.includes("E-Celeb")) tagDescription += "e-celebrity, ";

				tagDescription = tagDescription.trim().replace(/,$/, "");

				if (modelName.length < 30) {
					const jinaDescription = await getDescription(
						modelName || "",
						tagDescription || "",
						locationDescription || "",
					);

					if (!jinaDescription) {
						console.error("Jina search failed");
						const contentToData: ModelAIDescription = {
							description: "We have not found any information on this model.",
						};
						setData(contentToData);
						setLoading(false);
						return;
					}

					try {
						const response = groq.chat.completions.create({
							messages: [
								{
									role: "system",
									content: `Improve the following description, keeping key facts about the person's life, career, and major achievements. Keep specific examples of their work and avoid reducing it to just a list of roles. The description is: "${jinaDescription}". Respond with only the improved text, no introductions or extra commentary. Limit to 500 characters. Don't use markdown.`,
								},
							],
							max_tokens: 100,
							model: "llama3-8b-8192",
						});
						if ((await response).choices) {
							const content = (await response).choices[0].message.content;

							if (
								content?.includes("not found") ||
								content?.includes("No relevant match") ||
								content?.includes("Not found")
							) {
								const contentToData: ModelAIDescription = {
									description:
										"We have not found any information on this model.",
								};
								setData(contentToData);
							} else {
								if (content) {
									const contentToData: ModelAIDescription = {
										description: content,
									};
									setData(contentToData);
									const { data: dbdata, error } = await supabase
										.from("models")
										.update({ description: content })
										.eq("name", modelName);
									if (dbdata) {
										console.log(dbdata);
									} else {
										console.log(error);
									}
									setLoading(false);
								}
							}

							setLoading(false);
						}
					} catch (error) {
						console.error("Error fetching AI description:", error);
						setLoading(false);
					}
				} else {
					const contentToData: ModelAIDescription = {
						description: "model name too long",
					};
					setData(contentToData);
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
			}
		}

		getAIDescription();
	}, [modelName, tags]);

	const getDescription = async (
		modelName: string,
		tags: string,
		locationDescription: string,
	) => {
		try {
			const query = `who%20is%20${modelName}%20${tags}%20${locationDescription}`;

			const response = await fetch(`https://s.jina.ai/${query}`);

			if (!response.ok) {
				throw new Error(`fetch error: ${response.statusText}`);
			}

			const data = await response.text();

			const regex =
				/Description:\s*([^]*?)(?=\[1\] (Markdown Content|Published Time|Title|URL Source):|\.\.\.|$)/i;
			const match = data.match(regex);
			console.log("jira", match);
			if (match && match[1]) {
				const description = match[1].trim();
				return description;
			} else {
				throw new Error("Not found");
			}
		} catch (error) {
			console.error("Error fetching AI description:", error);
		}
	};

	return (
		<div className="relative">
			{data?.description !== "model name too long" && (
				<div>
					<button
						type="button"
						className="rounded-xl px-3 py-1 text-sm font-semibold bg-green-500/30 backdrop-filter backdrop-blur-3xl relative z-10 flex items-center gap-2 shadow-xl shadow-green-300/10"
					>
						Applio AI
						<span className="bg-green-400/50 text-xs px-4 py-0.5 rounded-md font-medium">
							BETA
						</span>
					</button>
					{!loading && data ? (
						<p className="read-font text-sm text-neutral-300 p-2">
							{data.description}
						</p>
					) : (
						<div className="flex justify-start m-auto items-center w-full">
							<LoadingIndicator />
						</div>
					)}
				</div>
			)}
		</div>
	);
}
