import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ComposeModel } from "@/components/compose/compose-model";
import { Database } from "../types/database";
import Head from "next/head";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session === null) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
  <Head>
    <meta name="description" content="Log in and upload models to our database of over 20000 models." />
  </Head> 
      <section>
        <ComposeModel />
      </section>
    </main>
  );
}