import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { badgeVariants } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"


export default function IndexPage() {
  return (
  <section className="container flex flex-col justify-center items-center h-screen pb-8 pt-6 md:py-10 mx-auto text-center max-w-7xl">
    <Link className={badgeVariants({ variant: "outline" })} href={"./bot"}>Applio Bot is available now!</Link>
    <h1 className="text-6xl font-bold leading-tight tracking-tighter md:text-8xl mt-4 mb-4">Create, experiment, enjoy with <span className="bg-gradient-radial text-transparent bg-clip-text">Applio</span>.</h1>
    <p className="text-sm text-muted-foreground sm:text-lg text-center mb-4 max-w-xl mx-auto mt-2 ">
      Applio is a user-friendly fork of Mangio-RVC-Fork/RVC, designed to provide an intuitive interface, especially for newcomers.
    </p>
    <Link href="/download">
    <Button className="mb-28 mt-4">
      <ChevronRight className="h-4 w-4 mr-2"/>
      Download
    </Button>
    </Link>
  </section>

  )
}
