"use client"

import { useEffect } from "react"

export default function IndexPage() {
  useEffect(() => {
    window.location.href =
      "https://github.com/IAHispano/Applio-RVC-Fork/releases"
  }, [])

  return (
    <section className="container flex flex-col justify-center items-center h-screen pb-8 pt-6 md:py-10 mx-auto text-center max-w-7xl">
      <h1 className="text-6xl font-bold leading-tight tracking-tighter md:text-8xl my-4">
        Downloading{" "}
        <span className="bg-gradient-radial text-transparent bg-clip-text">
          Applio
        </span>
        ...
      </h1>
      <p className="text-sm text-muted-foreground sm:text-lg text-center max-w-3xl mx-auto mt-2 mb-36">
        We are downloading Applio especially for you - just a moment more and it
        will be ready!
      </p>
    </section>
  )
}
