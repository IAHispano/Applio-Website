"use client"

import React from "react"
import {
  Link,
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react"

import { siteConfig } from "@/config/site"

import { AvatarMobile } from "./navbar-avatar-mobile"

export default function HeaderMobile() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBlurred
      className="z-50 fixed"
    >
      <NavbarContent className="sm:hidden">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      <AvatarMobile />
      <NavbarMenu className="flex justify-start items-center w-full flex-wrap gap-4 h-full z-20 text-center">
        {siteConfig.navMenuItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            className="sm:w-1/2 w-72 md:w-1/3 lg:w-1/3 first:mt-4"
          >
            <Link
              href={item.href}
              className="p-3 text-2xl flex items-center justify-center gap-6 bg-white/10 active:bg-white/20 rounded-2xl tracking-tight gtransition"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
