"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

export const addPost = async (formData: FormData) => {
  const title = formData.get("title")
  const description = formData.get("description")
  const content = formData.get("content")

  if (title === null || description === null || content === null) return

  const supabase = createServerActionClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (user === null) return
  if (session === null) return

  const { data: userProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_id", user.id)
    .single()

  await supabase.from("blog").insert({
    title: title,
    image_url: description,
    content: content,
    by: session?.user.user_metadata.full_name,
  })

  redirect("/blog")
}
