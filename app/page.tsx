import Link from "next/link"
import { Code2Icon, DownloadIcon } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import 'styles/remove-scrollbar.css'

export default async function IndexPage() {

  return (
    <section className="container flex flex-col justify-center items-center h-screen pb-8 pt-6 md:py-10 mx-auto text-center max-w-7xl">
      <Link className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground hover:bg-[#974200]/10 hover:scale-110  gtransition " href={"./blog/13"}>
        <span style={{ textShadow: "2px 2px 4px rgba(255, 255, 255, 0.2)" }}>
          🎃 <span className="bg-gradient-radial text-transparent bg-clip-text ">Halloween</span> is here!
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
