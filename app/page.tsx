"use client"
import Link from "next/link"
import { Code2Icon, DownloadIcon } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import Snowfall from 'react-snowfall'

export default function IndexPage() {

  return (      
  <><div className="z-30"><Snowfall snowflakeCount={40}/></div>
    <section className="container flex flex-col justify-center items-center text-center min-h-[600px] h-[100svh]">
      <Link className="inline-flex scale-105 items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground hover:bg-zinc-500/10 hover:scale-125  gtransition " href={"./blog/14"}>
        <span style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.1)" }}>
        🎄 It&apos;s <span className="bg-gradient-radial-red text-transparent bg-clip-text mx-0.5">Christmas</span> at <span className="">Applio</span>!
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
          <Button className="mr-4 rounded-medium">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Download
          </Button>
        </Link>

        <Link href="https://github.com/IAHispano/Applio-RVC-Fork">
          <Button className="rounded-medium">
            <Code2Icon className="h-4 w-4 mr-2 " />
            Source Code
          </Button>
        </Link>
      </div>
    </section></>
  )
}
