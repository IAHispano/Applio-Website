import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"

import ModelsTable from "@/components/admin/tables/keys-table"
import UsersTable from "@/components/admin/tables/users-table"
import Tabs from "@/components/admin/tabs"
import { Database } from "@/app/types/database"

export default async function User({ params }: { params: { id: string } }) {
  const { id } = params
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  let content = []
  let admin = null

  if (session === null) {
    redirect("/what-are-you-doing")
  } else {
    const { data: user } = await supabase
      .from("profiles")
      .select("full_name, role, id")
      .eq("id", id)
      .single()

    if (!user || user.role !== "admin" || user.id !== id) {
      redirect("/what-are-you-doing")
    } else {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("auth_id", session?.user.id)
        .single()

      admin = data
    }
  }

  return (
    <section>
      <h1
        style={{ overflow: "visible" }}
        className="hidden md:block text-center text-3xl font-bold leading-tight tracking-tighter md:text-8xl my-4 p-4 mb-24 mt-12"
      >
        Hey{" "}
        <span className="bg-gradient-radial text-transparent bg-clip-text">
          {admin?.full_name}
        </span>
        ! Good to see you again.
      </h1>
      <div className="block md:hidden ">
        <h1 className="bg-gradient-radial-red text-transparent bg-clip-text mx-auto flex items-center justify-center text-4xl font-bold leading-tight tracking-tighter mt-24">
          Please login in PC.
        </h1>
      </div>
      <Tabs id={id} />
    </section>
  )
}
