import { cookies } from "next/headers"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons/icons"
import { MainNav } from "@/components/navbar/main-nav"
import { ThemeToggle } from "@/components/navbar/theme-toggle"
import { Database } from "@/app/types/database"

import { AuthButtonServer } from "../login/auth-button-server"
import NavbarAvatar from "./navbar-avatar"
import HeaderMobile from "./site-header-mobile"

export async function SiteHeader() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: posts } = await supabase.from("profiles").select("*")

  return (
    <section>
      <div className="block md:hidden">
        <HeaderMobile />
      </div>
      <header className="w-full fixed top-0 border-b dark:border-white/20 backdrop-blur-sm justify-center px-3 items-center z-50 overflow-hidden hidden md:block">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 ">
          <MainNav items={siteConfig.mainNav} />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.gitHub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
              <Link
                href={siteConfig.links.discord}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.discord className="h-5 w-5 fill-current" />
                  <span className="sr-only">Support</span>
                </div>
              </Link>
              <div className="hidden md:flex">
                <AuthButtonServer />
              </div>
            </nav>
          </div>
        </div>
      </header>
    </section>
  )
}
