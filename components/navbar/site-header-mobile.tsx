"use client"

import React from "react"
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
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
      <NavbarBrand className="flex justify-center w-full items-center ml-16">
      <a href="/" className="flex items-center gap-2.5 truncate hover:bg-white/10 active:bg-white/20 active:scale-90 p-2.5 rounded-xl gtransition">
      <div className="w-10 h-10 aspect-square">
            <img id="a" src="/no_bg_applio_logo.png" className="scale-150" alt="logo"/>
      </div>
      </a>
      </NavbarBrand>
    </NavbarContent>
        <AvatarMobile />
      <NavbarMenu className="flex justify-start items-center  w-full flex-wrap gap-4 h-full z-20 text-center">
        {siteConfig.navMenuItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3"
          >
            <Link
              href={item.href}
              className="p-4 text-2xl flex items-center justify-center gap-2 bg-white/10 active:bg-white/20 rounded-xl tracking-tight gtransition"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
