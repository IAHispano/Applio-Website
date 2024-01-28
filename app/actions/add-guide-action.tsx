"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

export const addPost = async (formData: FormData) => {
  const title = formData.get("title")
  const description = formData.get("description")
  const content = formData.get("content")

  if (
    title === null ||
    description === null ||
    content === null 
  )
    return

  const supabase = createServerActionClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user === null) return

  const { data: userProfile } = await supabase
  .from("profiles")
  .select("id")
  .eq("auth_id", user.id)
  .single()

  await supabase.from("guides").insert({
    title: title,
    description: description,
    content: content,
    created_by: userProfile?.id,
  })

  redirect("/guides")
}
