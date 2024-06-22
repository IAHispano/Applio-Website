"use client"

import { supabase } from "@/utils/database";
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter, useSearchParams } from 'next/navigation';
import Card from "./card";
import { Guide } from "@/types/guidesTypes";
import tags from "./tags";

export default function DiscoverGuides() {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [data, setData] = useState<Guide[] | null>(null);
    const [end, setEnd] = useState<number>(5);
    const [searchInput, setSearchInput] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true)
    const [hasMore, setHasMore] = useState<boolean>(true)

    function loadmore() {
      if (hasMore && !loading) {
        setEnd(end + 3)
      }
    }

    useEffect(() => {
        async function getModels() {
          let query = supabase
            .from("guides")
            .select('*')
            .order("created_at", {ascending: false})
            .range(0, end);
    
          if (selectedTag) {
            query = query.eq('type', selectedTag); 
          }

          if (searchInput) {
            query = query.or(`title.ilike.%${searchInput}%,type.ilike.%${searchInput}%`);
          }

          const { data, error } = await query;

          if (data) {
            const updatedEnd = end
            if (data.length < updatedEnd) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }
            setLoading(false)
            setData(data);
          } else {
            console.log(error);
            setLoading(false);
            setData([]);
          }
        }
      
        getModels();
      }, [end, selectedTag, searchInput]);

      const handleTagClick = (tag: string) => {
        if (selectedTag === tag) {
        setSelectedTag(null) 
        } else {
        setSelectedTag(tag);
        }
      };

    return (
      <>
        <section className="flex flex-col max-xl:mx-4 w-full mt-6">
          {data && (
            <InfiniteScroll
            dataLength={data.length}
            hasMore={hasMore}
            next={loadmore}
            loader={
            <h1 className="text-white/80 my-14 md:text-xl text-center">Loading...</h1>
            }
            >
            <section className="flex flex-col xl:min-w-[100svh]">
            <h2 className="text-3xl font-medium mb-6">Browse more</h2>
            <div className="flex flex-col gap-2 w-full relative">
            <input 
            type="text" 
            className="p-4 rounded-xl border border-white/10 focus:outline-none bg-transparent placeholder-white/80 w-full pr-24" 
            placeholder="Write here to search..." 
            onChange={(e) => {
                setSearchInput(e.target.value);
                setLoading(true);
            }} 
            value={searchInput}
            />
            {searchInput && (
            <button
                className="p-2 rounded-xl absolute right-4 hover:bg-white/10 top-3 slow"
                onClick={() => setSearchInput("")}
            >           
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.48535 13.5149L13.5151 2.48513" stroke="#E0E0E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.5156 13.5149L2.48586 2.48513" stroke="#E0E0E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </button>
            )}
            <div className="flex max-md:flex-col gap-4 mt-2">
            {tags.map((tag, index) => (
                <a
                key={index}
                onClick={() => handleTagClick(tag)}
                className={`slow hover:shadow-lg hover:shadow-white/10 cursor-pointer w-full px-4 py-1.5 ${tag === selectedTag ? 'bg-white/20' : ''} hover:bg-white/20 rounded-xl border-white/10 border text-center select-none`}
            >
                {tag}
                </a>
            ))}
            </div>
            </div>
            {data && data.length === 0 && !loading && (<h1 className="text-white/80 my-14 md:text-xl text-center">We have not found any guides</h1>)}
            {data && data.length === 0 && loading && (<h1 className="text-white/80 my-14 md:text-xl text-center">Loading...</h1>)}
            <article className="grid md:grid-cols-3 gap-4 w-full h-full mt-8">
            {data && data.map((model: any, index: number) => (
            <a href={`/learn/${model.id}`} key={index} className="h-[42svh] w-full bg-neutral-400/10 rounded-xl p-6 border border-white/[5%] relative hover:bg-neutral-400/20 slow hover:shadow-xl hover:shadow-white/[5%]">
                <p className="font-semibold text-3xl max-w-3xl truncate text-wrap text-balance text-left h-full w-full">{model.title}</p>
                <p className="absolute bottom-6 right-6 text-white/60 text-xs">{model.type || "AI"} · {model.created_at ? new Date(model.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "May 13, 2024"}</p>
            </a>
            ))}
            </article>
            </section>
            </InfiniteScroll>
          )}
        </section>
        </>
    )
}
