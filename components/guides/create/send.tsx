"use client"
import { experimental_useFormStatus as useFormStatus } from "react-dom"
export function SendButton() {
  const { pending } = useFormStatus()

  return (
    <button className="cursor-pointer flex items-center flex-wrap gap-3 px-4 py-2  bg-white mt-5 z-10 dark:hover:bg-opacity-80 active:opacity-50 rounded-lg gtransition text-black  justify-center">
     {pending ? "Please wait..." : "Send"}
    <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-send-horizontal hidden md:block"><path d="m3 3 3 9-3 9 19-9Z"/><path d="M6 12h16"/></svg>
  </button>
  )
}

