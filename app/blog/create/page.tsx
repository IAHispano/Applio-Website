import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import MarkdownInput from "@/components/blog/create-input"
import { Database } from "@/app/types/database"

export const runtime = "edge"

export default async function CreateGuide() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError || !session) {
    redirect("/login")
  }

  const { data: user, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_id", session.user.id)
    .single()

  if (error || !user) {
    redirect("/login")
  }

  const userRole = user?.role || ""

  if (userRole !== "admin") {
    redirect("/blog")
  }

  return (
    <main className="absolute inset-0 py-32">
      <MarkdownInput />
    </main>
  )
}
