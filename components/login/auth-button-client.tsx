"use client"

import { useRouter } from "next/navigation"
import { Button } from "@nextui-org/button"
import {
  createClientComponentClient,
  type Session,
} from "@supabase/auth-helpers-nextjs"

import NavbarAvatar from "../navbar/navbar-avatar"

export function AuthButton({ session }: { session: Session | null }) {
  const userFullName =
    session?.user?.user_metadata?.full_name ||
    session?.user?.user_metadata?.user_name

  return (
    <header>
      {session === null ? (
        <Button
          color="primary"
          className="w-24 flex items-center gap-1 [&_span]:hover:opacity-100 [&_span]:hover:ml-0 gtransition  text-md font-semibold "
          radius="sm"
          onClick={() => (window.location.href = `/login`)}
        >
          Sign in
          <span className="-ml-4 opacity-0 gtransition text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
        </Button>
      ) : (
        <NavbarAvatar userFullName={userFullName} />
      )}
    </header>
  )
}
