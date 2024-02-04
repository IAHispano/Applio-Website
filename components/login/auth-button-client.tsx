"use client"

import { useRouter } from "next/navigation"
import { Button } from "@nextui-org/button"
import {
  createClientComponentClient,
  type Session,
} from "@supabase/auth-helpers-nextjs"

import NavbarAvatar from "../navbar/navbar-avatar"

export function AuthButton({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: "http://applio.org/auth/callback",
      },
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header>
      {session === null ? (
        <Button
          color="primary"
          className="w-24 flex items-center gap-1 [&_span]:hover:opacity-100 [&_span]:hover:ml-0 gtransition  text-md font-semibold font-mono"
          radius="sm"
          onClick={handleSignIn}
        >
          Login
          <span className="-ml-4 opacity-0 gtransition text-black">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </span>
        </Button>
      ) : (
        <NavbarAvatar userFullName={session?.user?.user_metadata?.full_name} />
      )}
    </header>
  )
}
