import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/app/types/database"
import UpdatePassword from "@/components/login/update-password"

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
