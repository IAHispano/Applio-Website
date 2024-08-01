import { supabase } from "@/utils/database";
import { useEffect, useState } from "react";
import { Download } from "@/types/downloadsTypes";
import { Bar, BarChart } from "recharts";
import NumberTicker from "../magicui/number-ticker";

export default function ModelStats({ id }: { id: string }) {
    const [data, setData] = useState<Download[] | null>()
    const [views, setViews] = useState<any | null>()
    const [likes, setLikes] = useState<any | null>()
    const [totalViews, setTotalViews] = useState<number>(0);
    const [totalLikes, setTotalLikes] = useState<number>(0);
    const [totalDownloads, setTotalDownloads] = useState<number>(0);
    
    useEffect(() => {
        async function getModelDownloads(id: string) {
            const { data, error } = await supabase.from("downloads").select("see_at").eq("model", id);

            if (data) {
                const counts = data.reduce((acc: { [key: string]: number }, { see_at }: { see_at: string }) => {
                    const date = new Date(see_at).toLocaleDateString();
                    acc[date] = (acc[date] || 0) + 1;
                    return acc;
                }, {});
                const formattedData = Object.keys(counts).map(date => ({ see_at: date, Downloads: counts[date] }));
                console.log(formattedData);
                setData(formattedData as Download[]);
                setTotalDownloads(data.length as number); 
            }

            if (error) {
                setData(null);
                setTotalDownloads(0); 
                console.log(error);
            }
        }

        async function getModelViews(id: string) {
            const { data, error } = await supabase.from("views").select("see_at").eq("model", id);

            if (data) {
                const counts = data.reduce((acc: { [key: string]: number }, { see_at }: { see_at: string }) => {
                    const date = new Date(see_at).toLocaleDateString();
                    acc[date] = (acc[date] || 0) + 1;
                    return acc;
                }, {});
                const formattedData = Object.keys(counts).map(date => ({ see_at: date, Views: counts[date] }));
                console.log(formattedData);
                setViews(formattedData as any); 
                setTotalViews(data.length); 
            }

            if (error) {
                setViews(null);
                setTotalViews(0); 
                console.log(error);
            }
        }

        async function getModelLikes(id: string) {
            const { data, error } = await supabase.from("likes").select("see_at").eq("model", id);

            if (data) {
                const counts = data.reduce((acc: { [key: string]: number }, { see_at }: { see_at: string }) => {
                    const date = new Date(see_at).toLocaleDateString();
                    acc[date] = (acc[date] || 0) + 1;
                    return acc;
                }, {});
                const formattedData = Object.keys(counts).map(date => ({ see_at: date, Views: counts[date] }));
                console.log(formattedData);
                setLikes(formattedData as any); 
                setTotalLikes(data.length); 
            }

            if (error) {
                setLikes(null);
                setTotalLikes(0); 
                console.log(error);
            }
        }

        getModelLikes(id)
        getModelDownloads(id);
        getModelViews(id)
    }, [id]);

    return (
        <section className="z-50 grid grid-cols-3 gap-4 bg-white/10 p-4 rounded-xl">
        <div className="border bg-neutral-700/10 border-white/10 py-2 md:px-4 px-2 rounded-xl w-full flex flex-col">
        <p className="text-white/70 text-left mb-2 text-sm max-md:text-xs">Views</p>
        <div className="flex gap-4 w-full">
        {views?.length === 0 ? (<h1 className="text-4xl max-md:text-2xl font-bold read-font">0</h1>) : (<NumberTicker value={totalViews || 0} className="text-4xl max-md:text-2xl font-bold read-font"/>)}
        {views && (
        <BarChart width={200} height={40} data={views} className="flex items-end m-auto max-md:hidden">
        <Bar dataKey="Views" fill="#ffffffaa" />
        </BarChart>
        )}
        </div>
        </div>
        <div className="border bg-neutral-700/10 border-white/10 py-2 md:px-4 px-2 rounded-xl w-full flex flex-col">
        <p className="text-white/70 text-left mb-2 text-sm max-md:text-xs">Downloads</p>
        <div className="flex gap-4 w-full">
        {data?.length === 0 ? (<h1 className="text-4xl max-md:text-2xl font-bold read-font">0</h1>) : (<NumberTicker value={totalDownloads || 0} className="text-4xl max-md:text-2xl font-bold read-font"/>)}
        {data && (
        <BarChart width={200} height={40} data={data} className="flex items-end m-auto max-md:hidden">
        <Bar dataKey="Downloads" fill="#ffffffaa" />
        </BarChart>
        )}
        </div>
        </div>
        <div className="border bg-neutral-700/10 border-white/10 py-2 md:px-4 px-2 rounded-xl w-full flex flex-col">
        <p className="text-white/70 text-left mb-2 text-sm max-md:text-xs">Likes</p>
        <div className="flex gap-4 w-full">
        {likes?.length === 0 ? (<h1 className="text-4xl max-md:text-2xl font-bold read-font">0</h1>) : (<NumberTicker value={totalLikes || 0} className="text-4xl max-md:text-2xl font-bold read-font"/>)}
        {likes && (
        <BarChart width={200} height={40} data={likes} className="flex items-end m-auto max-md:hidden">
        <Bar dataKey="Views" fill="#ffffffaa" />
        </BarChart>
        )}
        </div>
        </div>
        </section>
    )
}