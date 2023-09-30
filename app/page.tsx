import Link from "next/link"
import { Code2Icon, DownloadIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { badgeVariants } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "./types/database";

export default async function IndexPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: posts } = await supabase
    .from("models")
    .select("*, user:users(*)");
  return (
    <section className="container flex flex-col justify-center items-center h-screen pb-8 pt-6 md:py-10 mx-auto text-center max-w-7xl">
    <style>
        {`
          body {
            overflow-y: hidden;
            overflow-x: hidden;
          }
        `}
      </style>
      <Link className={badgeVariants({ variant: "outline" })} href={"./bot"}>
        <span style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.2)" }}>
          🎉 Applio Bot is available now!
        </span>
      </Link>
      <h1 className="text-6xl font-bold leading-tight tracking-tighter md:text-8xl my-4">
        Create, experiment, enjoy with{" "}
        <span className="bg-gradient-radial text-transparent bg-clip-text">
          Applio.
        </span>{" "}
      </h1>
      <p className="text-sm text-muted-foreground sm:text-lg text-center mb-4 max-w-xl mx-auto mt-2 ">
        Applio is a user-friendly fork of Mangio-RVC-Fork/RVC, designed to
        provide an intuitive interface, especially for newcomers.
      </p>

      <div className="flex mb-44">
        <Link href="/download">
          <Button className="mr-4">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Download
          </Button>
        </Link>

        <Link href="https://github.com/IAHispano/Applio-RVC-Fork">
          <Button>
            <Code2Icon className="h-4 w-4 mr-2" />
            Source Code
          </Button>
        </Link>
      </div>
    </section>
  )
}
