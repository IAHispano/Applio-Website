"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

export const addPost = async (formData: FormData) => {
  const name = formData.get("content")
  const image_url = formData.get("image_url")
  const link = formData.get("model_url")
  const algorithm = formData.get("algorithm")
  const epochs = formData.get("epochs")
  const type = formData.get("version")

  if (
    name === null ||
    image_url === null ||
    image_url === null ||
    link === null ||
    epochs === null ||
    algorithm === null ||
    type === null
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

  const currentTimestamp = Date.now()
  const formattedTimestamp = currentTimestamp.toString()

  await supabase.from("models").insert({
    name,
    image_url,
    link,
    epochs,
    algorithm,
    type,
    created_at: formattedTimestamp,
    author_id: userProfile?.id,
  })

  revalidatePath(
    `/?name=${name.toString()}&image_url=${image_url.toString()}&link=${link.toString()}&epochs=${epochs.toString()}&alogrithm=${algorithm.toString()}&type=${type.toString()}`
  )

  redirect("/models")
}
