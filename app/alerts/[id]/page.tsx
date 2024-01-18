import Head from "next/head"
import { cookies, cookies as requestCookies } from "next/headers"
import { redirect } from "next/navigation"
import { Divider } from "@nextui-org/react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import Cookies from "js-cookie"

import { AsideSelection } from "@/components/account/settings/aside"
import Information from "@/components/account/settings/information"
import { Notifications } from "@/components/alerts/notifications"

import { Database } from "../../types/database"

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
      content = <Notifications userFullName={userProfile.full_name} />
    }
  }

  return content
}
