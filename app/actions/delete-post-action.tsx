"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

export const addPost = async (formData: FormData) => {
  const id = formData.get("id")
  const author_id = formData.get("author_id")

  if (id === null) return

  const supabase = createServerActionClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user === null) return

  await supabase.from("models").delete().eq("id", id)

  redirect(`/models`)
}
