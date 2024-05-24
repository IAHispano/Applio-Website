"use client"

import { useFormStatus } from "react-dom"

export function SendButton({ isDisabled }: { isDisabled?: boolean }) {
  const { pending } = useFormStatus()

  return (
  <button className={`md:col-span-3 h-[60px] w-full p-4 rounded-xl bg-white text-black resize-none overflow-auto focus:outline-none hide-scrollbar max-md:mt-4 mb-2 ${pending || isDisabled ? "opacity-40 cursor-default hover:none" : "cursor-pointer hover:bg-opacity-80 active:opacity-50 gtransition"}`}  disabled={isDisabled}>
      {pending ? "Please wait..." : "Change"}
    </button>
  )
}