import Head from "next/head"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { ComposeModel } from "@/components/compose/compose-model"

import { Database } from "../types/database"

export const runtime = "edge"

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (session === null) {
    redirect("/login")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Head>
        <meta
          name="description"
          content="Log in and upload models to our database of over 500.000 models."
        />
      </Head>
      <section>
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl mt-52 ">
          Under{" "}
          <span className="bg-gradient-radial-red text-transparent bg-clip-text">
            maintenance
          </span>
          .
        </h1>
        {/* <ComposeModel /> */}
      </section>
    </main>
  )
}
