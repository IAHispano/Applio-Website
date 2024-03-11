import { Database } from "@/app/types/database"
import { BackgroundGradientAnimation } from "@/components/ui/background-canceled"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function SuccessPager() {
    const supabase = createServerComponentClient<Database>({ cookies })
    const {
      data: { session },
    } = await supabase.auth.getSession()

    let data = null; 

    if (session === null) {
        redirect("/what-are-you-doing"); 
    } 
    
  return (
    <BackgroundGradientAnimation>
  </BackgroundGradientAnimation>
  )
}