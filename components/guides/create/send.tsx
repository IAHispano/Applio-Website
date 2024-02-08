"use client"

import { useFormStatus } from "react-dom"

export function SendButton({ isDisabled }: { isDisabled?: boolean }) {
  const { pending } = useFormStatus()

  return (
  <button className={`flex items-center flex-wrap gap-3 px-4 py-2 bg-white mt-5 z-10  rounded-lg text-black justify-center ${pending || isDisabled ? "opacity-40 cursor-default hover:none" : "cursor-pointer hover:bg-opacity-80 active:opacity-50 gtransition"}`}  disabled={isDisabled}>
      {pending ? "Please wait..." : "Send"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1rem"
        height="1rem"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-send-horizontal hidden md:block"
      >
        <path d="m3 3 3 9-3 9 19-9Z" />
        <path d="M6 12h16" />
      </svg>
    </button>
  )
}
