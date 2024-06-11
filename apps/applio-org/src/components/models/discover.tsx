"use client"

import { supabase } from "@/utils/database";
import { useEffect, useState } from "react"
import NumberTicker from "../magicui/number-ticker";
import tags from './tags'; 
import ModelCard from "./model-card";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from 'next/navigation';
import ModelPopup from "./model-popup";

export default function DiscoverModels() {
    const searchParams = useSearchParams();

    const [count, setCount] = useState<number | null>(null);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);
    const [end, setEnd] = useState<number>(4);
    const [searchInput, setSearchInput] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [searchTime, setSearchTime] = useState<string>()
    const [showPopup, setShowPopup] = useState(false);
    const [popupId, setPopupId] = useState<string | null>(null);


    const handleTagClick = (tag: string) => {
        if (selectedTag === tag) {
        setSelectedTag(null) 
        } else {
        setSelectedTag(tag);
        }
      };

    useEffect(() => {
        async function getModelsCount() {
            const {count, error} = await supabase
            .from("models")
            .select('', { count: 'exact', head: true });

            if (count) {
                setCount(count)
            } else {
                console.log(error)
                setCount(23.000)
            }
        }

        getModelsCount();
    }, []);

    function loadmore() {
      if (hasMore && !loading) {
        setEnd(end + 10)
      }
    }

    useEffect(() => {
        async function getModels() {
          const startTime = performance.now();

          let query = supabase
            .from("models")
            .select('*')
            .order("created_at", {ascending: false})
            .range(0, end);
    
          if (selectedTag) {
            query = query.eq('tags', selectedTag); 
          }

          if (searchInput) {
            query = query.or(`name.ilike.%${searchInput}%,tags.ilike.%${searchInput}%`);
          }

          const { data, error } = await query;

          const endTime = performance.now();
          const executionTime = endTime - startTime;
          const executionTimeInSeconds = executionTime / 1000;

          setSearchTime(executionTimeInSeconds.toFixed(2))
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

      useEffect(() => {
        const id = searchParams.get('id');
    
        if (id) {
          handleOpenPopup(id);
        }
      }, [searchParams]);

      const handleOpenPopup = (id: string) => {
        if (id) {
          setPopupId(id as string);
          setShowPopup(true);
        }
      }

      const handleClosePopup = () => {
        setShowPopup(false);
        setPopupId(null);
      };

    return (
      <>
        {showPopup && <ModelPopup id={popupId} onClose={handleClosePopup} />}
        <section className="justify-center items-center flex flex-col mx-auto my-12 max-xl:mx-4 w-full">
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
            <h1 className="text-5xl font-semibold mb-12 text-center">Discover {count ? (<NumberTicker value={count} className="font-bold text-6xl"/>): (<span className="font-bold text-6xl">23k</span>)} voices</h1>
            <article className="grid grid-cols-4 max-md:grid-cols-2  gap-4 px-4">
            {tags.map((tag, index) => (
                <a
                key={index}
                onClick={() => handleTagClick(tag)}
                className={`slow hover:shadow-lg hover:shadow-white/10 cursor-pointer w-full px-4 py-1.5 ${tag === selectedTag ? 'bg-white/20' : ''} hover:bg-white/20 rounded-xl border-white/10 border text-center select-none`}
            >
                {tag}
                </a>
            ))}
            </article>
            <div className="flex gap-2 mt-8 w-full relative">
            <input 
            type="text" 
            className="p-4 mt-8 rounded-xl border border-white/10 focus:outline-none bg-transparent placeholder-white/80 w-full pr-24" 
            placeholder="Write here to search..." 
            onChange={(e) => {
                setSearchInput(e.target.value);
                setLoading(true);
            }} 
            value={searchInput}
            />
            {searchInput && (
            <button
                className="p-2 rounded-xl absolute right-16 hover:bg-white/10 bottom-3 slow"
                onClick={() => setSearchInput("")}
            >           
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.48535 13.5149L13.5151 2.48513" stroke="#E0E0E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.5156 13.5149L2.48586 2.48513" stroke="#E0E0E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </button>
            )}
            <button
            className="p-2 rounded-xl absolute right-8 hover:bg-white/10 bottom-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1.74805 5.31714H3.5207M14.2527 5.31714H9.84492" stroke="#E0E0E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.74805 10.6492L6.29953 10.6492M14.2527 10.6492L12.5758 10.6492" stroke="#E0E0E0" strokeWidth="1.5" strokeLinecap="round"/>
              <ellipse cx="6.7317" cy="5.35084" rx="1.52467" ry="1.52467" stroke="#E0E0E0" strokeWidth="1.5"/>
              <ellipse cx="9.36549" cy="10.6492" rx="1.52467" ry="1.52467" stroke="#E0E0E0" strokeWidth="1.5"/>
              </svg>
            </button>
            </div>
            {data && data.length === 0 && !loading && (<h1 className="text-white/80 my-14 md:text-xl text-center">We have not found any voice models</h1>)}
            {data && data.length === 0 && loading && (<h1 className="text-white/80 my-14 md:text-xl text-center">Loading...</h1>)}
            <div className="justify-between flex">
            {data && !loading && searchInput && (<p className="text-sm text-white/40 px-5 pt-2">We have found <span className="text-white/80">{data.length}</span> results in less than <span className="text-white/80">{searchTime}s</span></p>)}
            {data && !loading && searchInput && (<p className="text-sm text-white/80 px-5 pt-2">😕 Don&apos;t find a voice? <span className="underline">Create your own!</span></p>)}
            </div>
            <article className="flex flex-col gap-4 w-full h-full mt-8">
            {data && data.map((model: any, index: number) => (
            <button className="w-full h-full flex cursor-pointer" key={index} onClick={() => handleOpenPopup(model.id)}><ModelCard key={index} data={model} /></button>
            ))}
            </article>
            </section>
            </InfiniteScroll>
          )}
        </section>
        </>
    )
}