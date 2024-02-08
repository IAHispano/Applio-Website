"use client"

import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-2 p-5 justify-center items-center top-0 left-0 size-full fixed text-center text-white">
      <h1 className="text-4xl font-bold tracking-tight fade-in">
        Page not found (404)
      </h1>
      <button
        onClick={() => router.back()}
        className="underline underline-offset-4 hover:text-zinc-300 gtransition"
      >
        Return
      </button>
    </div>
  )
}
