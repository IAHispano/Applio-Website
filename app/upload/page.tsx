import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ComposeModel } from "@/components/compose/compose-model";
import { Database } from "../types/database";

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
      <section>
        <ComposeModel />
      </section>
    </main>
  );
}