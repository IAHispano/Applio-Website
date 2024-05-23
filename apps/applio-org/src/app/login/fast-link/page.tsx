import { redirect } from "next/navigation"
import FastlinkUI from "@/components/login/fast-link"
import { supabase } from "@/utils/database"

export default async function fastlink() {
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