import { redirect } from "next/navigation"
import NewuserUI from "@/components/login/new-user"
import { supabase } from "@/utils/database"

export default async function newuser() {
  const {
    data: { session },
  } = await supabase.auth.getSession()


  if (session) {
    redirect("/")
  }
   
  return (
    <section>
        <NewuserUI />
    </section>
  )
}