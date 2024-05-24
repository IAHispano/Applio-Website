"use client"

import { supabase } from "@/utils/database"
import { useEffect, useState } from "react";

export default function CreatePostButton() {
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
        <>
        {role === "admin" && (
        <button className="bg-white/20 hover:bg-white/30 slow rounded-lg text-sm px-4 py-2 font-medium">
            Create a new news item
        </button>
        )}
        </>
    )
}