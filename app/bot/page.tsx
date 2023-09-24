"use client"

import Link from "next/link"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export default function ErrorPage() {
  return (
    <section className="container flex flex-col justify-center items-center pb-8 pt-6 md:py-10 mx-auto text-center max-w-7xl">
      <h1 className="text-9xl font-bold leading-tight tracking-tighter md:text-9xl mt-4 ">
        Applio
      </h1>
      <p className="mt-4 text-muted-foreground mb-24 text-xs md:text-xl ">
        Enjoy +8000 voice models available in our database, but from Discord!
      </p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it free?</AccordionTrigger>
          <AccordionContent>
            Yes, everything we develop is done on a non-profit basis and for the
            benefit of the community.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How often are the models updated?</AccordionTrigger>
          <AccordionContent>
            This is a laborious process and is currently done manually. We aim
            to update our database on a monthly basis.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            How do I invite the bot to my server?
          </AccordionTrigger>
          <AccordionContent>
            Simply click{" "}
            <span className="text-green-500">
              <Link href="https://discord.com/api/oauth2/authorize?client_id=1144714449563955302&permissions=277026719809&scope=bot">
                here
              </Link>
            </span>{" "}
            and follow the steps discord tells you to follow.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button className="mt-24">
        <Link href="/models">Do you want to see all our models?</Link>
      </Button>
    </section>
  )
}
