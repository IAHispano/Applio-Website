import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons/icons"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <div className="flex h-full items-center justify-start gap-2 flex-grow truncate">
        <a
          href="/"
          className="text-2xl font-bold tracking-tight truncate hover:bg-white/20 hover:px-4 hover:py-0.5 rounded-lg gtransition"
        >
          Applio
        </a>
      </div>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-center text-md text-dark dark:text-white hover:bg-white/20 hover:px-4 hover:py-0.5 gtransition rounded-lg",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
