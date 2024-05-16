"use client"
import { supabaseTV } from "@/utils/database"
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function TopViews() {
    const [data, setData] = useState<any>()
    const [error, setError] = useState<boolean>()
    const [loading, setLoading] = useState<boolean>(true)
    const t = useTranslations('home');
    const locale = useLocale();

    async function getTopVideos() {
        const { data, error } = await supabaseTV
            .from("history")
            .select("video_id");
    
        if (error) {
            console.error(error);
            setError(true)
            setLoading(false)
        }
    
        if (data) {
            const videoCounts: { [key: string]: number } = data.reduce<{ [key: string]: number }>((acc, current: { video_id: string }) => {
                acc[current.video_id] = (acc[current.video_id] || 0) + 1;
                return acc;
            }, {});
    
            const sortedVideos = Object.keys(videoCounts).sort((a, b) => videoCounts[b] - videoCounts[a]);
            const topVideos = sortedVideos.slice(0, 4); 
    
            console.log(topVideos);
            
            if (topVideos.length > 0) {
                const { data: videosData, error: videosError } = await supabaseTV
                    .from("videos")
                    .select("*")
                    .in("id", topVideos);
    
                if (videosError) {
                    console.error(videosError);
                    setError(true)
                    setLoading(false)
                }
    
                if (videosData) {
                    const videoMap: { [key: string]: any } = {};
                    videosData.forEach((video: any) => videoMap[video.id] = video);
    
                    const sortedVideosData = topVideos.map(videoId => videoMap[videoId]).filter(video => !!video);
                    setData(sortedVideosData);
                    setLoading(false)
                }
            }
        }
    }

    useEffect(() => {
        setLoading(true)
        getTopVideos();
    }, []);

    return (
        <main>
        {error && (  <h1 className="text-3xl tracking-tight md:tracking-tighter font-bold text-center text-[#ffffffa3] md:mx-40 mx-12 mt-24">{t("not_found_top")}</h1> )}
        {!loading && !error && (  <h1 className="md:mx-44 mx-12 mt-12 mb-4 text-3xl tracking-tight md:tracking-tighter font-bold">{t("most_viewed")}</h1> )}
        {!loading && (
        <div className="justify-center lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-4 md:mx-44 mx-12 mb-8">
            {data && data.map((video: any, index: number) => (
                <a key={video.id} href={`${locale}/watch/${video.id}`}>
                    <div className="relative w-full h-full rounded-[12px] overflow-hidden block border border-black/10">
                        <img className="w-full h-full object-center" src={`http://img.youtube.com/vi/${video.video_url}/maxresdefault.jpg`} alt="Miniature of video" />
                        <div className="absolute inset-x-0 bottom-0 w-full h-3/4 bg-gradient-to-t from-black to-transparent"></div>
                        <p className="absolute inset-x-0 bottom-0 text-white text-lg font-bold p-4 truncate xl:max-w-sm md:max-w-[100px]">{video.title}</p>
                        <p className="absolute right-0 -bottom-1 text-5xl font-bold p-4 text-[#ffffffa3]">{index + 1}</p>
                    </div>
                </a>
            ))}
            </div>
        )}
        </main>
    )
}