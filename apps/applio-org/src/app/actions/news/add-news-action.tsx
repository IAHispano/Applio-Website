"use server"

import { supabase } from "@/utils/database"
import { redirect } from "next/navigation"

export const config = {
  runtime: 'edge',
};


export const addPost = async (formData: FormData, id: string, role: string) => {
  const title = formData.get("title")
  const description = formData.get("description")
  const content = formData.get("content")
  const fixed = formData.get("fixed")

  if (title === null || content === null || fixed === null || description === null) return

  if (role === "admin") {
    const insert = await supabase.from("blog").update({
        title: title,
        image_url: description,
        content: content,
        fixed: fixed, 
    }).eq("title", decodeURIComponent(id))

  }
  redirect("/news")
}