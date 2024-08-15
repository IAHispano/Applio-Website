import Head from "next/head"
import { cookies, cookies as requestCookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import Cookies from "js-cookie"

import { AsideSelection } from "@/components/account/settings/aside"

import { Database } from "../../types/database"

export const runtime = "edge"

export default async function User({ params }: { params: { id: string } }) {
  const { id } = params
  const supabase = createServerComponentClient<Database>({ cookies })
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
    } else if (userProfile.id !== id) {
      redirect("/what-are-you-doing")
    } else {
      content = (
        <div className="my-12 md:fixed md:top-20 md:bottom-0 w-full h-full bg-background z-50">
          <AsideSelection
            full_name={userProfile.full_name}
            avatar_url={userProfile.avatar_url}
            role={userProfile.role}
            bio={userProfile.bio}
            links={userProfile.links}
          />
        </div>
      )
    }
  }

  return content
}
