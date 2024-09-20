"use client"

import { supabase } from "@/utils/database";
import { useEffect, useState } from "react";

// Remove for local development
export const runtime = "edge";

export default function DownloadModel({ params }: { params: { id: string } }) {
    const [model, setModel] = useState<any>()

    useEffect(() => {
        async function getModel() {
            const { data, error } = await supabase
                .from("models")
                .select("name, link")
                .eq("id", params.id)
                .single();

            if (data) {
                console.log(data)
                setModel(data)
            }

            if (error) {
                console.log(error)
            }
        }

        getModel();
    }, [params.id])

    useEffect(() => {
        async function redirectUser() {
            await getUserAndUpdateHistory();
            window.location.href = `${model.link}`;
            }

        if (model?.link) {
            redirectUser();
        }
    }, [model]);

    async function getUserAndUpdateHistory() {
        try {
        const { data: userData, error: userError } = await supabase.auth.getUser()
    
        if (userError) {
            console.error("Error fetching user data:", userError)
            return
        }
    
        const { data: userProfile, error: profileError } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("auth_id", userData.user.id)
            .single()
    
        if (profileError) {
            console.error("Error fetching user profile:", profileError)
            return
        }
    
        const historyInsert = {
            see_by: userProfile.full_name,
            model: params.id,
        }
    
        const { error: historyError } = await supabase
            .from("downloads")
            .insert(historyInsert)
    
        if (historyError) {
            console.error("Error inserting into history:", historyError)
        } else {
            console.log("History inserted successfully.")
        }
        } catch (error) {
        console.log(error)
        }
    }

	return (
		<main className="min-h-screen flex flex-col w-full items-center justify-center mx-auto">
            {model && (
            <div className="flex flex-col items-center gap-2">
            <h1 className="md:text-4xl text-3xl font-semibold">Downloading...</h1> 
            <h2 className="text-neutral-300 text-xs">If the download has not started, <a className="underline hover:text-white slow" href={model.link} target="_blank" rel="noreferrer">click here</a>.</h2>
            </div>
)}
        </main>
	);
}