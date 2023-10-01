'use client'

import {NextUIProvider} from '@nextui-org/react'
import React from 'react'
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
});

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme}>
    <NextUIProvider>
      {children}
    </NextUIProvider>
    </MantineProvider>
  )
}