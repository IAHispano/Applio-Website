"use client"

import { supabase } from "@/utils/database";
import { useEffect, useState } from "react"

export default function SettingsUI() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [full_name, setFullName] = useState("")
    const [bio, setBio] = useState("")

    useEffect(() => {
        async function getUser() {
            const {data, error} = await supabase.auth.getUser();
            if (data && data.user) {
                const userInfo = await supabase.from("profiles").select("*").eq("auth_id", data.user.id).single()
                setData(userInfo.data)
                setLoading(false)
                console.log(userInfo.data)
                setFullName(userInfo.data.full_name)
                setBio(userInfo.data.bio)
            } else {
                setData(null)
            }

            if (error) {
                console.log(error)
                setLoading(false)
            }
        }

        getUser();
    }, [])

    async function updateData() {
        const { data: updatedData, error } = await supabase
            .from("profiles")
            .update({ full_name, bio, updated_at: new Date().toISOString() })
            .eq("auth_id", data?.auth_id); 

        if (error) {
            console.error("Error updating data:", error)
        } else {
            console.log("Updated data:", updatedData); 
        }
    }

    return (
        <section className="flex flex-col justify-start items-start mx-auto max-w-5xl w-full">
            {!loading && data && (
            <div className="flex flex-col w-full h-full gap-4">
            <h1 className="text-3xl font-medium">Welcome back,<span className="pl-2 capitalize">{data.full_name}</span>.</h1>
            <div className="bg-neutral-800 border border-white/10 rounded-lg w-full h-[60svh] p-4">
            <div className="h-full flex flex-col gap-4">
            <input className="w-full rounded-xl h-12 p-2 border border-white/10 bg-white/20 focus:bg-white/30 slow focus:outline-none focus:border-white/20 text-neutral-300" type="username" placeholder="Username" value={full_name} onChange={(e) => setFullName(e.target.value)}/>
            <input className="w-full rounded-xl h-12 p-2 border border-white/10 bg-white/20 focus:bg-white/30 slow focus:outline-none focus:border-white/20 text-neutral-300" type="bio" placeholder="Biography" value={bio} onChange={(e) => setBio(e.target.value)}/>
            <div className="flex justify-end items-end mt-auto">
                <button onClick={updateData} className="bg-white text-black px-6 py-1.5 rounded-md font-semibold hover:bg-white/80 slow text-sm">Save</button> 
            </div>
            </div>
            </div>
            </div>
            )}
        </section>
    )
}