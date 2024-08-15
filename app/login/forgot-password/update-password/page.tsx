import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import UpdatePassword from "@/components/login/update-password"
import { Database } from "@/app/types/database"

export const runtime = "edge"

export default async function updatepassword() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/")
  }

  return (
    <section>
      <UpdatePassword />
    </section>
  )
}
