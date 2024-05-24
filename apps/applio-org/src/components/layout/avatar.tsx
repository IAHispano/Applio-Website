"use client"

import { supabase } from "@/utils/database"
import { useEffect, useState } from "react";

export default function Avatar() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    async function getUser() {
        const {data, error} = await supabase.auth.getUser();
        if (data && data.user) {
            const userInfo = await supabase.from("profiles").select("*").eq("auth_id", data.user.id).single()
            setData(userInfo.data)
            setLoading(false)
        } else {
            setData(null)
        }

        if (error) {
            console.log(error)
            setLoading(false)
        }
    }

    async function logout() {
        const {error} = await supabase.auth.signOut();
        window.location.reload();

        if (error){
            console.log(error)
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <section>
        {loading && (
            <button className="flex gap-4 items-center max-md:mt-12 max-md:w-full max-md:bg-white/10 max-md:p-6 max-md:rounded-2xl" onClick={logout}>
                        <img className="relative w-12 h-12 rounded-full z-50 border border-white/10" src={"/favicon.ico"}/>
                        <div className="absolute bg-white/10 rounded-full w-12 h-12 scale-125 border border-white/10"/>
                        <div className="flex flex-col text-left w-full">
                        <p className="w-full text-nowrap capitalize font-medium max-w-[100px] truncate mb-4">Loading...</p>
                        </div>
            </button>
        )}
        {!loading && (
        <header>
        {data ? (
            <button className="flex gap-4 items-center max-md:mt-12 max-md:w-full max-md:bg-white/10 max-md:p-6 max-md:rounded-2xl" onClick={logout}>
                        <img className="relative w-14 h-14 bg-white/10 p-1 rounded-full z-50 border border-white/10" src={data.avatar_url || "/favicon.ico"}/>
                        <div className="flex flex-col text-left w-full">
                        <p className="w-full text-nowrap capitalize font-medium max-w-[100px] truncate">{data.full_name}</p>
                        <p className="w-full text-nowrap text-xs text-white/80 max-w-[100px] truncate">@{data.full_name}</p>
                        </div>
            </button>
        ) : 
            <a className="flex gap-4 items-center max-md:justify-center max-md:mt-12 w-full bg-white/20 hover:bg-white/10 slow px-10 py-3 rounded-xl cursor-pointer" href="/login">
                <p className="max-md:text-center">Login</p>
            </a>
        }
        </header>
        )}
        </section>
    )
}