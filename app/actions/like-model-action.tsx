"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

export const addPost = async (formData: FormData) => {
  const id = formData.get("id")

  if (id === null) return

  const supabase = createServerActionClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user === null) return

  const { data: modelData } = await supabase
    .from("models")
    .select("likes")
    .eq("id", id)
    .single()

  if (!modelData) return

  const { likes } = modelData

  const newLikes = likes + 1

  await supabase
    .from("models")
    .update({ likes: newLikes})
    .eq("id", id)

  revalidatePath("/")
}
