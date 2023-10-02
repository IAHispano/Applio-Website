'use client'

import { type Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/button'
import NavbarAvatar from './navbar-avatar'

export function AuthButton ({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: 'http://applio.org/auth/callback'
      }
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header>
      {
        session === null
          ? (
            <Button color="primary" variant="shadow" className='ml-4' onClick={handleSignIn}>
            Login
          </Button>
            )
          :
          <NavbarAvatar
          userFullName={session?.user?.user_metadata?.full_name}
        />
      }
    </header>
  )
}