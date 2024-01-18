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
        <Button color="primary" className="ml-4" onClick={handleSignIn}>
          Login
        </Button>
      ) : (
        <NavbarAvatar userFullName={session?.user?.user_metadata?.full_name} />
      )}
    </header>
  )
}
