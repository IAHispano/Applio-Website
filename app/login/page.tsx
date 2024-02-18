import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/app/types/database"
import AuthUI from "@/components/login/auth"

export default async function User({ params }: { params: { id: string } }) {
  const { id } = params
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()


  if (session) {
    redirect("/")
  } 
  return (
    <section>
        <AuthUI />
    </section>
  )
}
