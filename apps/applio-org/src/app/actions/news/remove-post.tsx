'use server'

import { supabase } from "@/utils/database"
import { redirect } from "next/navigation"

export const config = {
    runtime: 'edge',
  };
  

export async function removeNews(id: string) {
    const { error, status } = await supabase
        .from('blog')
        .delete()
        .eq("title", decodeURIComponent(id))

    if (error) {
        console.log(error)
    } else if (status === 204) {
        console.log("response.ok")
        redirect("/news")
    }

    return (
        status
    )
}
