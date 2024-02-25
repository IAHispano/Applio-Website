import { Database } from "@/app/types/database"
import { BackgroundGradientAnimation } from "@/components/ui/background"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function SuccessPager({ params }: { params: { id: string } }) {
    const { id } = params
    const supabase = createServerComponentClient<Database>({ cookies })
    const {
      data: { session },
    } = await supabase.auth.getSession()

    let data = null; 

    if (session === null) {
        redirect("/what-are-you-doing"); 
    } else {
        const response = await supabase
            .from("premium")
            .select("*")
            .eq("payment_id", id)
            .single();
        
        if (response.error) {
            console.error(response.error);
        } else {
            data = response.data;
        }
    }
    
  return (
    <BackgroundGradientAnimation username={data?.user_id}>
  </BackgroundGradientAnimation>
  )
}