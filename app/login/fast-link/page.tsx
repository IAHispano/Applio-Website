import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/app/types/database"
import FastlinkUI from "@/components/login/fast-link"

export default async function fastlink() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()


  if (session) {
    redirect("/")
  }
   
  return (
    <section>
        <FastlinkUI />
    </section>
  )
}
