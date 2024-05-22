"use client"

import { supabase } from "@/utils/database"
import { useEffect, useState } from "react";

export default function BlogFixed() {
    const [data, setData] = useState("")

    async function getFixedNews() {
        const {data, error} = await supabase.from("blog").select("*").eq("fixed", true).limit(2);
        if (data) {
            setData(JSON.stringify(data))
        }

        if (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFixedNews();
    }, []);

    return (
        <section>
            <h1 className="text-left text-3xl px-4 font-bold tracking-tight md:tracking-tighter text-white max-w-4xl">Overview</h1>
            <div className="grid md:grid-cols-2 md:w-[120svh] p-4 gap-4">
            {data && JSON.parse(data).map((item: any) => (
                <div className="relative w-full h-full rounded-lg overflow-hidden flex flex-col justify-end">
                <div className="absolute inset-x-0 bottom-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
                <img src={item.image_url} className="rounded-md h-[30svh] object-cover bg-center bg-white/10 shadow-xl"/>
                <div className="p-4 absolute top-0">
                    <p className="text-xs text-white">{item.tag} · {new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}</p>
                </div>
                <div className="p-4 absolute">
                    <h1 className="text-xl font-bold max-w-sm text-left">{item.title}</h1>
                </div>
                </div>
            ))}
            </div>
        </section>
    )
}