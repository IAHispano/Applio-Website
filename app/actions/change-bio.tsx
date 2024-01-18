"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

export const addPost = async (formData: FormData) => {
  const bio = formData.get("bio")
  const link1 = formData.get("link1")
  const link2 = formData.get("link2")

  if (bio === null || link1 === null || link2 === null) return

  const supabase = createServerActionClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user === null) return

  const currentTime = new Date().toISOString()
  const { data: userProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_id", user.id)
    .single()

  const { error } = await supabase
    .from("profiles")
    .update({
      bio: bio,
      links: [link1, link2],
      updated_at: currentTime,
    })
    .eq("auth_id", user.id)

  redirect(`/user/${userProfile?.full_name}`)
}
