"use client"

import Link from "next/link"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"

import { Bot, Search, Apple } from "lucide-react"
import BlogCard from "@/components/blog-card"
import 'styles/animation.css'

export default function BotPage() {
  return (
    <main className="w-full pt-16 flex flex-col top-0 justify-start items-center text-center min-h-screen">
        <section className="w-full max-w-6xl p-5 pt-0 flex flex-col gap-5">
            <BlogCard />  
        </section>
  </main>
)
}
