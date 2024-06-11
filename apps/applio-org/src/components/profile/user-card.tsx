"use client"

import { useEffect, useState } from "react";
import Background1 from "../svg/background1";
import { supabase } from "@/utils/database";
import { User } from "@/types/userTypes";
import Circles from "../svg/circles";
import { Model } from "@/types/modelsTypes";
import UserModels from "./user-models";

export default function UserCard({ id }: {  id: string  }) {
    const [data, setData] = useState<User | null>()
    const [modelsData, setModelsData] = useState<Model | null>()
    const [modelsCount, setModelsCount] = useState<number>()
    const [guidesCount, setGuidesCount] = useState<number>()
    const [likesCount, setLikesCount] = useState<number>()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getUserInfo() {
            const {data, error} = await supabase
            .from("profiles")
            .select("*")
            .eq("full_name", id)
            .single();

            if (data) {
                setData(data)
                getUserModelsCount(data.id);
                getUserLikes(data?.id as string)
            }

            if (error) {
                setData(null)
                console.log(error)
                setError(true)
                setLoading(false)
            }
        }

        async function getUserModelsCount(id: string) {
            const {count, error} = await supabase
            .from("models")
            .select('', { count: 'exact', head: true })
            .eq('author_id', id)

            if (count) {
                setModelsCount(count)
                getUserGuidesCount(data?.full_name as string)
            } else {
                console.log(error)
                setModelsCount(0)
                setLoading(false)
            }
        }

        async function getUserGuidesCount(id: string) {
            const {count, error} = await supabase
            .from("guides")
            .select('', { count: 'exact', head: true })
            .eq('created_by', id)

            if (count) {
                setGuidesCount(count)
            } else {
                console.log(error)
                setGuidesCount(0)
                setLoading(false)
            }
        }
        
        async function getUserLikes(id: string) {
            const { data, error } = await supabase
                .from("models")
                .select("likes, name, created_at, author_username, id")
                .eq("author_id", id);
        
            if (error) {
                console.log(error);
                setError(true)
                setLoading(false)
                return;
            }
        
            if (data && data.length > 0) {
                const totalLikes = data.reduce(
                    (total, model) => total + (parseInt(model.likes, 10) || 0),
                    0
                );
                setLikesCount(totalLikes);
                setModelsData(data as any);
                setLoading(false)
            } else {
                setLikesCount(0);
                console.log(0);
                setLoading(false)
            }
        }
        
        
    
        if (id) {
          getUserInfo();
        }
      }, [id]);

    return (
        <section className="flex min-h-screen flex-col items-center md:-mt-24">
            <div className="absolute">
            <Background1 />
            </div>
            {data === null && error && (
                <div className="justify-center items-center flex mx-auto mt-36 z-30 text-white/80">
                <h1 className="text-xl">User not found</h1>
                </div>
            )}
            {!data && loading && (
                <div className="justify-center items-center flex mx-auto mt-36 z-30 text-white/80">
                    <h1 className="text-xl">Loading...</h1>
                </div>
            )}
            {data && !loading && (
            <>
            <div className="md:w-[70svh] md:h-fit w-full h-fit p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-3xl flex flex-col md:mt-24 z-20">
                {data.avatar_url && !error && (
                <div className="justify-start flex z-50">
                <img src={data?.avatar_url} className="md:rounded-full rounded-xl max-md:w-full" onError={() => setError(true)}/>
                </div>
                )}
                {data.avatar_url && !error && (
                <div className="absolute -top-7 -left-8 max-md:hidden">
                    <Circles />
                </div>
                )}
                <div className="md:justify-between w-full flex max-md:flex-col max-md:my-4">
                    <div className="flex justify-center items-center gap-2 my-auto max-md:mb-2">
                    {data?.developer === true && (              
                    <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.8541 0L0 1.8541V10.1459L1.85413 12H10.1459L12 10.1459V1.8541L10.1459 0H1.8541ZM5.14365 9.31913H3.48413C3.48413 7.9464 2.36752 6.8298 0.994815 6.8298V5.1702C2.36752 5.1702 3.48413 4.05362 3.48413 2.68091H5.14365C5.14365 4.04282 4.47513 5.2431 3.45847 6C4.47513 6.75698 5.14365 7.9572 5.14365 9.31913ZM11 6.8298C9.6273 6.8298 8.5107 7.9464 8.5107 9.31913H6.8511C6.8511 7.9572 7.51972 6.75698 8.53635 6C7.51972 5.2431 6.8511 4.04282 6.8511 2.68091H8.5107C8.5107 4.05362 9.6273 5.1702 11 5.1702V6.8298Z" fill="white"/>
                    </svg>
                    )}
                    {data?.writer === true && (              
                    <svg width="20" height="20" viewBox="0 0 214 214" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M210.523 48.0542C215.159 43.4181 215.159 35.6914 210.523 31.2932L182.707 3.47702C178.309 -1.15901 170.582 -1.15901 165.946 3.47702L144.073 25.2307L188.65 69.8078M0 169.423V214H44.5771L176.05 82.4083L131.473 37.8311L0 169.423Z" fill="white"/>
                    </svg>
                    )}
                    {data?.premium === true && (                              
                    <svg width="24" height="24" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.1318 3.8822H0.131836L3.28109 0H10.9826L14.1318 3.8822Z" fill="#D7F8F9"/>
                    <path d="M7.13183 11.5287L0.131836 3.88208H14.1318L7.13183 11.5287Z" fill="#6DBCDB"/>
                    <path d="M4.41895 3.88208L7.13163 11.5287L9.80616 3.88208H4.41895Z" fill="#B3E2E5"/>
                    <path d="M4.41895 3.8822L7.13163 0L9.80616 3.8822H4.41895Z" fill="#93D6D8"/>
                    <path d="M4.41915 3.8822L3.28109 0L0.131836 3.8822H4.41915Z" fill="#B3E2E5"/>
                    <path d="M9.80664 3.8822L10.9828 0L14.1321 3.8822" fill="#B3E2E5"/>
                    </svg>
                    )}
                    {data?.admin === true && (  
                    <svg width="24" height="24" viewBox="0 0 246 277" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M142.546 65.9462C154.744 61.4426 166.841 59.0827 179.348 59.5337C197.564 59.9161 211.312 68.5078 222.768 81.8792C235.667 96.9345 243.113 114.515 245.278 134.439C246.525 145.917 246.084 157.39 244.518 168.856C242.388 184.449 238.845 199.624 232.498 213.964C227.037 226.301 221.317 238.591 212.676 248.947C201.87 261.897 188.857 271.644 172.58 276.017C166.998 277.516 161.425 277.3 155.914 275.372C147.617 272.47 139.192 269.998 130.793 267.432C126.89 266.24 123.079 266.193 119.179 267.251C108.974 270.019 98.8226 273.048 88.5304 275.415C74.1206 278.729 61.192 275.509 50.0251 265.105C32.7469 249.009 20.633 229.306 11.7755 207.281C6.1537 193.302 1.99027 178.843 0.647594 163.756C-1.58648 138.653 1.68141 114.492 14.8237 92.6888C22.0198 80.7505 31.3059 70.7559 43.6319 64.2519C51.1145 60.3036 59.174 59.2029 67.4627 59.4291C81.6658 59.8168 95.457 63.0475 109.298 65.9345C110.256 66.1342 111.221 66.2973 112.187 66.4485C112.317 66.4689 112.473 66.319 112.85 66.1326C111.9 62.4624 110.097 59.1468 108.199 55.9415C103.617 48.2035 98.4703 40.8635 93.0673 33.7141C91.4254 31.5415 89.4436 30.5494 86.7276 30.597C80.9899 30.6976 78.7957 27.4036 80.5906 21.6925C82.458 15.7512 87.7745 13.78 92.8396 17.1207C94.5208 18.2295 95.9083 19.6384 97.1803 21.2069C102.677 27.9852 107.245 35.4171 111.506 43.0592C113.689 46.9754 115.045 51.2461 116.276 55.5633C116.591 56.6648 116.678 57.9147 117.819 58.7835C119.336 57.4697 119.06 55.5086 119.221 53.9181C120.825 38.1083 128.378 26.0129 140.331 16.4106C148.54 9.8161 157.07 3.94243 167.145 0.858849C168.084 0.571508 169.039 0.318437 170.001 0.137933C173.68 -0.55182 175.82 1.37585 176.274 5.23625C178.399 23.2986 171.21 37.5301 159.396 49.9427C154.899 54.6673 150.031 58.9246 144.898 62.8768C144.072 63.5123 143.074 64.0124 142.546 65.9462Z" fill="white"/>
                    </svg>
                    )}
                    </div>
                    <div>
                        <button className="border border-white/10 py-1 text-sm hover:bg-white/10 slow px-6 rounded-xl max-md:w-full">Follow</button>
                        <p className="text-xs text-center text-white/60 mt-1"><span className="read-font">{data?.followers ?? 0}</span> Followers</p>

                    </div>
                </div>
                <div>
                    <h1 className="text-4xl font-bold max-w-[200px] md:max-w-lg truncate">{data?.full_name}</h1>
                    <h2 className="text-white/60 text-sm px-0.5 max-md:text-wrap">{data?.bio}</h2>
                </div>
                <div className="flex max-md:flex-col gap-4 mt-6">
                    <div className="w-full h-full border border-white/10 rounded-xl flex-col justify-center items-center flex">
                    <h1 className="font-bold text-xl">{modelsCount || 0}</h1>
                    <h2 className="text-sm text-white/60">Models</h2>
                    </div>
                    <div className="w-full h-full border border-white/10 rounded-xl flex-col justify-center items-center flex">
                    <h1 className="font-bold text-xl">{guidesCount || 0}</h1>
                    <h2 className="text-sm text-white/60">Guides</h2>
                    </div>
                    <div className="w-full h-full border border-white/10 rounded-xl flex-col justify-center items-center flex">
                    <h1 className="font-bold text-xl">{likesCount || 0}</h1>
                    <h2 className="text-sm text-white/60">Likes</h2>
                    </div>
                    <div className="w-full h-full border border-white/10 rounded-xl flex-col justify-center items-center flex">
                    <h1 className="font-bold text-xl">0</h1>
                    <h2 className="text-sm text-white/60">Videos</h2>
                    </div>
                </div>
            </div>
            {Array.isArray(modelsData) && <UserModels data={modelsData}/>}
            </>
            )}
        </section>
    )
}