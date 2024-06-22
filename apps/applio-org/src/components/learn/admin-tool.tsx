"use client"

import { removeGuides } from "@/app/actions/guides/remove-guide";
import { supabase } from "@/utils/database"
import { useEffect, useState } from "react";

export default function AdminGuidesTool({ id }: Readonly<{ id: string }>) {
    const [role, setRole] = useState()

    async function getSessionAndRole() {
        const {data, error} = await supabase.auth.getUser()
        
        if (data) {
            const adminData = await supabase.from("profiles").select("role").eq("auth_id", data.user?.id).single();
            setRole(adminData.data?.role)
        }

        if (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSessionAndRole()
    }, [])
    
    return (
        <footer className="fixed bottom-0 right-0 p-4 z-50">
        {role === "admin" && (
        <div className="flex flex-col gap-2">
        <button className="bg-red-500/20 w-fit h-full rounded-xl hover:bg-red-500/30 slow text-sm px-4 py-2 font-medium items-center justify-center mx-auto text-center" onClick={() => removeGuides(id)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
        </div>
        )}
        </footer>
    )
}