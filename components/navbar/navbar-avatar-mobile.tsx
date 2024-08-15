"use client"

import { useEffect, useState } from "react"
import { Button } from "@nextui-org/react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import NavbarAvatar from "./navbar-avatar"

interface User {
  id: string
  name?: string
  user_metadata?: {
    full_name?: string
  }
}

export function AvatarMobile() {
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth
      .getUser()
      .then((userData) => {
        setUser(userData.data.user)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div>
      {user === null ? (
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
        <NavbarAvatar userFullName={user?.user_metadata?.full_name ?? ""} />
      )}
    </div>
  )
}
