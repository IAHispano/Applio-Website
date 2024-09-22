import Groq from "groq-sdk";
import { useEffect, useState } from "react"
import LoadingIndicator from "./loading";
import { supabase } from "@/utils/database";

type ModelAIDescription = {
    description: string;
}

export default function ApplioAI({modelName, tags, id}: {modelName: string, tags: string, id: string}) {  
    const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ, dangerouslyAllowBrowser: true });
    const [data, setData] = useState<ModelAIDescription>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getAIDescription() {
            setLoading(true);
            try {
                const {data: dbdata, error} = await supabase.from("models").select("description").eq("id", id).single(); 
                if (dbdata?.description) {
                    setData(dbdata);
                    setLoading(false);
                } else {
                    console.log('error', error);
                    sendAIDescription();
                }
            } catch (error) {
                console.log(error);
                sendAIDescription();
            }
        }

        async function sendAIDescription() {
            try {
            const tagsArray = tags.split(",").map(tag => tag.trim());

            const countryMap: { [key: string]: string } = {
                "ES": "Spain",
                "PT": "Portugal",
                "FR": "France",
                "DE": "Germany",
                "IT": "Italy",
                "UK": "United Kingdom",
                "US": "United States",
                "EN": "England",
            };

            const locationTag = tagsArray.find(tag => countryMap[tag]);

            const locationDescription = locationTag ? ` from ${countryMap[locationTag]},` : undefined;

            const filteredTags = tagsArray.filter(tag => !countryMap[tag]);

            let tagDescription = filteredTags.length > 2 ? "He is a famous " : "";

            if (filteredTags.includes("Artist")) tagDescription += "artist, ";
            if (filteredTags.includes("Rapper")) tagDescription += "rapper, ";
            if (filteredTags.includes("OG")) tagDescription += "original gangster (OG), ";
            if (filteredTags.includes("Actor")) tagDescription += "actor, ";
            if (filteredTags.includes("Singer")) tagDescription += "singer, ";
            if (filteredTags.includes("Fictional")) tagDescription += "fictional character, ";
            if (filteredTags.includes("Anime")) tagDescription += "anime character, ";
            if (filteredTags.includes("E-Celeb")) tagDescription += "e-celebrity, ";

            tagDescription = tagDescription.trim().replace(/,$/, "");

            if (modelName.length < 20) {
                try {
                    const response = groq.chat.completions.create({
                        messages: [
                            {
                                role: "system",
                                content: `Your task is to provide a concise description of the famous person named ${modelName}${locationDescription} ${tagDescription}. Focus on key facts about their life, career, and achievements. Do not include any introductory phrases like "According to my research" or similar. Give a direct description in no more than 500 characters. If you don't have enough information about the person, simply respond with "not found" and nothing else.`,
                            },
                        ],
                        max_tokens: 100,
                        model: "llama3-8b-8192",
                    });
                    if ((await response).choices) {
                        const content = (await response).choices[0].message.content;

                        if (content?.includes("not found") || content?.includes("No relevant match") || content?.includes("Not found")) {
                           const contentToData: ModelAIDescription = {
                                description: "We have not found any information on this model.",
                            };
                            setData(contentToData);
                        } else {
                            if (content) {
                            const contentToData: ModelAIDescription = {
                                description: content,
                            };
                            setData(contentToData);
                            const {data: dbdata, error} = await supabase.from("models").update({description: content}).eq("name", modelName);
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


	return (
        <div className="relative">
            {data?.description !== "model name too long" && (
            <div>
            <button type="button" className="rounded-xl px-3 py-1 text-sm font-semibold bg-green-500/30 backdrop-filter backdrop-blur-3xl relative z-10 flex items-center gap-2">
                Applio AI
                <span className="bg-green-400/50 text-xs px-4 py-0.5 rounded-md font-medium">BETA</span>
            </button>
            {!loading && data ? (
                <p className="read-font text-sm text-neutral-300 p-2">{data.description}</p>
            ): (
                <div className="flex justify-start m-auto items-center w-full">
                <LoadingIndicator />
                </div>
            )}
            </div>
            )}
        </div>
    )}