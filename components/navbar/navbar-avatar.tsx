"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Avatar,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react"
import {
  createClientComponentClient,
  type Session,
} from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"
import { IconBrandDiscord } from "@tabler/icons-react"
import {
  Bell,
  Bug,
  HandHeart,
  LogOut,
  Settings,
  Shield,
  Sparkles,
  Upload,
  UserCircle,
} from "lucide-react"

import { Icons } from "../icons/icons"
import { motion } from "framer-motion"

export default function NavbarAvatar({
  userFullName,
}: {
  userFullName: string
}) {
  const [showAlert, setShowAlert] = useState(false)
  const [data, setData] = useState<any[] | null>(null)
  const [user, setUser] = useState<any | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleProfileClick = () => {
    const encodedFullName = encodeURIComponent(user?.full_name || "")
    window.location.href = `/user/${encodedFullName}`
  }

  const handleProfileClick2 = () => {
    window.open(
      "https://github.com/IAHispano/Applio-Website/issues/new",
      "_blank"
    )
  }

  const handleSettings = () => {
    window.location.href = `/settings/${user?.id}`
  }

  const handleAdminDashboardClick = () => {
    window.location.href = `/admin/${user?.id}`
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
  useEffect(() => {
    async function fetchData() {
      // Fetch user data based on full name
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("*")
        .eq("full_name", userFullName)

      if (userError) {
        setError(userError)
        return
      }

      setUser(userData[0])
    }

    fetchData()
  }, [userFullName])

  const iconClasses =
    "text-sm text-default-500 pointer-events-none flex-shrink-0"
  const dropdownItems = [
    <DropdownItem
      key="profile"
      onClick={handleProfileClick}
      startContent={<UserCircle className={iconClasses} />}
    >
      <p className="font-semibold">Profile</p>
    </DropdownItem>,
    <DropdownItem
      key="settings"
      onClick={handleSettings}
      startContent={<Settings className={iconClasses} />}
    >
      Settings
    </DropdownItem>,
    <DropdownItem
      key="bug"
      onClick={handleProfileClick2}
      startContent={<Bug className={iconClasses} />}
    >
      Report a bug
    </DropdownItem>,
    <DropdownItem
      key="logout"
      onClick={handleSignOut}
      className="text-danger"
      color="danger"
      startContent={<LogOut className={iconClasses} />}
    >
      Logout
    </DropdownItem>,
  ]

  if (user && user.role === "admin") {
    dropdownItems.push(
      <DropdownSection title="Admin zone">
        <DropdownItem
          key="admin"
          onClick={handleAdminDashboardClick}
          startContent={<Shield className={iconClasses} />}
        >
          Admin Dashboard
        </DropdownItem>
      </DropdownSection>
    )
  }

  return (
    <div className="flex items-center font-mono">
      <Dropdown>
        <DropdownTrigger>
          <div
            className="mx-2"
            style={{
              cursor: "pointer",
            }}
          >
            <Avatar src={user?.avatar_url} color="primary" radius="sm" className="hover:opacity-50 gtransition w-12 h-12 border-2 border-neutral-600"/>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" className="font-mono">{dropdownItems}</DropdownMenu>
      </Dropdown>
    </div>
  )
}
