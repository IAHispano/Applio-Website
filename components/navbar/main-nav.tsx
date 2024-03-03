import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex justify-center">
      {items?.length ? (
        <nav className="flex justify-center items-center mx-auto mr-28">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-center text-md text-dark dark:text-white hover:bg-white/20 hover:py-0.5 gtransition rounded-lg font-mono py-1 px-3 hover:last:after:content-['_↗'] hover:last:gap-2",
                    item.disabled && "cursor-not-allowed opacity-80",
                    "flex-grow"
                  )}
                  {...(index === items.length - 1 ? { target: "_blank" } : {})}
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
