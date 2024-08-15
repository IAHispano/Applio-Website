"use client"

import React from "react"
import { NextUIProvider } from "@nextui-org/react"

import "@mantine/core/styles.css"

import { createTheme, MantineProvider } from "@mantine/core"

const theme = createTheme({})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme}>
      <NextUIProvider>{children}</NextUIProvider>
    </MantineProvider>
  )
}
