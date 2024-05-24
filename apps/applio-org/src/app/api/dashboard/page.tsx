"use client"

import ApiUsage from "@/components/api/usage";
import Background2 from "@/components/svg/background2";
import { supabase } from "@/utils/database";
import { useEffect, useState } from "react";

export default function ApiDashboard() {
    const [auth_id, setAuth_id] = useState<string>("");
    const [userTokens, setUserTokens] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchUserTokens = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession()
    
        if (session?.user.id) {
          const { data } = await supabase
            .from("tokens")
            .select("*")
            .eq("user", session.user.id)
    
          setUserTokens(data || [])
          setLoading(false)
        } else {
          console.error("Error: User ID is undefined.")
        }
      }

    const handleGenerateToken = async () => {
        const user = await supabase.auth.getUser();
    
        if (user.data.user?.id) {
          if (userTokens.length >= 3) {
            console.error("Error: You cannot create more than 3 keys.")
            return
          }
    
          const { data: newToken, error } = await supabase
            .from("tokens")
            .upsert([{ user: user.data.user?.id }])
    
          if (error) {
            console.error("Error at saving token:", error.message)
          } else {
            fetchUserTokens()
          }
        } else {
          console.error("Error: User ID is undefined.")
        }
      }

    useEffect(() => {
        const tryGetSession = async () => {
          const { data, error } = await supabase.auth.getUser();
          if (data.user === null) {
            window.location.href = '/login'
          }

          if (data.user) {
            setAuth_id(data.user.id)
          }

          if (error) {
            console.log(error)
          }

                  
        }

        fetchUserTokens();
        tryGetSession();
    }, [])

    return (
        <main className="min-h-[70svh] md:max-w-[120svh] justify-center items-center flex flex-col mx-auto max-md:mx-10 mt-20">
        <div className="absolute">
        <Background2 />
        </div>
            <div className="justify-between items-start flex flex-col mb-12 w-full relative">
                <a className="p-2 bg-white/10 border border-white/20 items-center text-black leading-none rounded-full flex lg:inline-flex hover:shadow-xl hover:shadow-white/50 slow mb-5" role="alert" href="/premium">
                    <span className="font-semibold mx-2 text-left flex-auto text-white">Developers</span>
                </a>
                <div className="flex md:justify-between w-full max-md:gap-6">
                <h1 className="pl-0.5 md:text-5xl text-4xl font-bold">Dashboard</h1>
                <button className={`rounded-full w-12 h-12 max-md:mx-4 max-md:px-2 bg-white text-black text-3xl font-bold slow ${userTokens.length < 3 ? "hover:shadow-lg hover:shadow-white " : "opacity-50 cursor-not-allowed"}`} onClick={userTokens.length < 3 ? handleGenerateToken : undefined}>+</button>
                </div>
                <p className="pl-1 text-[#9E9E9E]">Manage your API keys, if you have any questions please refer to the documentation.</p>
            </div>
            <ApiUsage auth_id={auth_id}/>
            {!loading && userTokens && ( 
            <p className="justify-start items-end flex text-[#9E9E9E] mt-4">
             You have {userTokens.length} space left out of 3 for a new key.
            </p>
            )}
        </main>
    )
}