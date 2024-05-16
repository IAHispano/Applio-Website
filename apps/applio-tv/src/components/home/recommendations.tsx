"use client"
import { supabase, supabaseTV } from "@/utils/database"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import AdCard from "./adCard"
import { useLocale, useTranslations } from "next-intl"

export default function VideoRecommendations() {
    const [end, setEnd] = useState(15)
    const [data, setData] = useState<any[] | null>(null); 
    const [error, setError] = useState<any>()
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState<boolean>(true)
    const t = useTranslations('home');
    const locale = useLocale();
    
    async function getVideos() {
        const user = await supabase.auth.getUser();
        const full_name = await supabase.from("profiles").select("full_name").eq("auth_id", user.data.user?.id).single();

        const userHistory = await supabaseTV
            .from("history")
            .select("video_styles")
            .eq("see_by", full_name.data?.full_name);

        const allStyles: string[] = userHistory.data?.map((entry: { video_styles: string[] }) => entry.video_styles).flat() || [];

        const styleCounts: { [style: string]: number } = {};
        allStyles.forEach((style: string) => {
            styleCounts[style] = (styleCounts[style] || 0) + 1;
        });

        let mostUsedStyle: string | null = null;
        let maxCount = 0;
        for (const style in styleCounts) {
            if (styleCounts[style] > maxCount) {
                mostUsedStyle = style;
                maxCount = styleCounts[style];
            }
        }


        const {data, error} = await supabaseTV.from("videos").select("*").range(0, end);

        if (data) {
            data.sort((a, b) => {
                const aHasMostUsed = a.styles.includes(mostUsedStyle);
                const bHasMostUsed = b.styles.includes(mostUsedStyle);
                
                if (aHasMostUsed && !bHasMostUsed) {
                    return -1;
                }
                else if (!aHasMostUsed && bHasMostUsed) {
                    return 1;
                }
                else {
                    return 0;
                }
            });

            setData(data)
            setLoading(false)
            const updatedEnd = end
            if (data.length < updatedEnd) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }

        } else {
            setError('no video')
            setLoading(false)
        }

        if (error) {
            setError(error)
            console.log(error)
            setLoading(false)
        }
    }

    function loadmore() {
        if (hasMore) {
          setEnd(end + 10)
        }
      }


    useEffect(() => {
        setLoading(true)
        getVideos();
    }, [end]);


  return (
    <section>
    {!error && !loading && (<h1 className="md:mx-44 mx-12 mt-12 mb-4 text-3xl tracking-tight md:tracking-tighter font-bold">{t("recommended")}</h1>)}
    <InfiniteScroll 
    dataLength={data ? data.length : 0}
    hasMore={hasMore} 
    next={loadmore}
    loader={!error ? <p className="text-center flex justify-center mx-auto text-xs">{t("loading")}</p> : null}
    endMessage={
    <p className="text-center flex justify-center mx-auto text-xs mb-8">{t("end_message")}</p>
    }>
    <div className="justify-center lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-4 md:mx-44 mx-12 mb-8">
    {data && data.map((video: any) => (
        <a key={video.id} href={`${locale}/watch/${video.id}`}>
            <div className="relative w-full h-full rounded-[12px] overflow-hidden block border border-black/10">
                <img className="w-full h-full object-center" src={`http://img.youtube.com/vi/${video.video_url}/maxresdefault.jpg` || `	https://i.ytimg.com/vi/${video.video_url}/hqdefault.jpg`} alt="Miniature of a video" />
                <div className="absolute inset-x-0 bottom-0 w-full h-3/4 bg-gradient-to-t from-black to-transparent"></div>
                <p className="absolute inset-x-0 bottom-0 text-white text-lg font-bold p-4 truncate">{video.title}</p>
                <p className="absolute inset-x-0 bottom-6 text-white text-xs p-4 truncate">{video.created_by}</p>
            </div>
        </a>
    ))}
    </div>
    </InfiniteScroll>
    {error && 
    <p className="text-3xl tracking-tight md:tracking-tighter font-bold text-center text-[#ffffffa3]">{t("not_found_recommended")}</p>
    }
    {!loading && (
        <AdCard image={{image: "https://i.imgur.com/RUmzcL3.png"}} link="https://applio.org/premium" text={t("applio_premium_ad")}/>
    )}
    </section>
  )
}
