"use client"

import { Button } from "@nextui-org/react"

export default function BotPage() {
  const handleonclick = () => {
    window.open("https://bot.applio.org", "_blank")
  }
  return (
    <section className="container flex flex-col justify-center items-center pb-8 pt-6 md:py-10 mx-auto text-center max-w-7xl my-10">
      <h1 className="text-9xl font-bold leading-tight tracking-tighter md:text-8xl mt-4 text-[#00AA68] p-1">
        Applio
      </h1>
      <p className="text-muted-foreground mb-24 text-xs md:text-xl ">
        Enjoy +600.000 voice models available in our database, but from Discord!
      </p>
      <div className="m-12">
        <Button size="lg" color="primary" onClick={handleonclick}>
          Try Applio Bot now!
        </Button>
      </div>
    </section>
  )
}
