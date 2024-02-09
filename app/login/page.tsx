import { AuthButtonServer } from "@/components/login/auth-button-server"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"

export default async function Login() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return (
      <div className="flex flex-col gap-2 p-5 justify-center items-center top-0 left-0 size-full fixed text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight fade-in mb-2">
          You must log in. (401)
        </h1>
        <AuthButtonServer />
      </div>
    ); 
  }
  
  if (session) {
    redirect(`/user/${session.user.user_metadata.full_name}`);
  }

  return null; 
}