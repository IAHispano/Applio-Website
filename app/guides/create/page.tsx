import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import MarkdownInput from "@/components/guides/create/text-input"

export default async function CreateGuide() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session === null) {
    redirect("/login")
  }

  return (
    <main className="absolute inset-0 py-32">
      <MarkdownInput />
    </main>
  )
}
