"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/docs/applio")
  }, [])
  
  return <p className="flex justify-center items-start my-12 text-neutral-400">Loading...</p>
}
