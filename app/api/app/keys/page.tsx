"use client"

import { redirect } from "next/navigation"

import ApiDashboard from "@/components/api/dashboard"
import ActualKeys from "@/components/api/keys/actual_keys"
import { Database } from "@/app/types/database"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"


export default async function User() {
  const supabase = createClientComponentClient<Database>()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  let content = null
  let section = ""

  if (session === null) {
    redirect("/login")
  } else {
    const { data: userProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("auth_id", session?.user.id)
      .single()

    if (!userProfile) {
      redirect("/what-are-you-doing")
    } else if (userProfile.auth_id !== session.user.id) {
      redirect("/what-are-you-doing")
    } else {
      content = (
        <main className="min-h-screen flex flex-col justify-start items-center md:py-10 w-full px-5">
          <ApiDashboard auth_id={session.user.id} current_page="keys" />
          <div className="w-full justify-center items-center flex">
            <ActualKeys />
          </div>
        </main>
      )
    }
  }
  return content
}
