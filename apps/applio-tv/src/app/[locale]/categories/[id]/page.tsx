"use client"
import Logo from "@/components/navbar/logo"
import { supabase, supabaseTV } from "@/utils/database"
import { PostgrestError } from "@supabase/supabase-js"
import { motion } from "framer-motion"
import { useLocale } from "next-intl"
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

export default function VideoRecommendations({ params }: { params: { id: string } }) {
    const { id } = params
    const idCapitalized = id.charAt(0).toUpperCase() + id.slice(1);
    const [end, setEnd] = useState(15)
    const [data, setData] = useState<any[] | null>(null); 
    const [error, setError] = useState<any>()
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState<boolean>(true)
    const locale = useLocale();
    
    async function getVideos() {
        const {data, error} = await supabaseTV.from("videos").select("*").contains("styles", [`${idCapitalized}`]).range(0, end);

        if (data) {
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
    <div className='-mt-12 pt-12'>
      <Logo position='top' />
    </div>
    {!error && !loading && (<h1 className="md:mx-44 mx-12 mt-20 mb-4 text-3xl tracking-tight md:tracking-tighter font-bold">Videos with the category <span className="capitalize">&quot; {id} &quot;</span>:</h1>)}
    <InfiniteScroll 
    dataLength={data ? data.length : 0}
    hasMore={hasMore} 
    next={loadmore}
    loader={!error ? <p className="text-center flex justify-center mx-auto text-xs">Loading...</p> : null}
    endMessage={
    <p className="text-center flex justify-center mx-auto text-xs mb-8">You reached the end</p>
    }>
    <div className="justify-center lg:grid-cols-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 grid gap-4 md:mx-44 mx-12 mb-8 mt-4">
    {data && data.map((video: any) => (
        <a key={video.id} href={`${locale}/watch/${video.id}`}>
            <div className="relative w-full h-[40svh] rounded-[12px] overflow-hidden block border border-black/10">
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
    <p className="text-3xl tracking-tight md:tracking-tighter font-bold text-center text-[#ffffffa3]">There has been an error, please try again later.</p>
    }
    </section>
  )
}
