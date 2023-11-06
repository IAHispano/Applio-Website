"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@nextui-org/react";

import { Bot, Search, Apple } from "lucide-react"

export default function BotPage() {
  const handleonclick = () => {
    window.open('https://discord.com/application-directory/1144714449563955302', '_blank');
  };
  return (
    <section className="container flex flex-col justify-center items-center pb-8 pt-6 md:py-10 mx-auto text-center max-w-7xl my-10">
    <h1 className="text-9xl font-bold leading-tight tracking-tighter md:text-8xl mt-4 bg-gradient-radial bg-clip-text text-transparent p-1">
      Applio
    </h1>
    <p className="mt-4 text-muted-foreground mb-24 text-xs md:text-xl ">
      Enjoy +500.000 voice models available in our database, but from Discord!
    </p>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it free?</AccordionTrigger>
        <AccordionContent>
          Yes, everything we develop is done on a non-profit basis and for the benefit of the community.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How often are the models updated?</AccordionTrigger>
        <AccordionContent>
          This is a laborious process and is currently done manually. We aim to update our database on a monthly basis.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>In which languages is it available?</AccordionTrigger>
        <AccordionContent>
        Currently in English and Spanish. Don&apos;t worry, we are still working to expand it to more languages.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    <div className="m-12">
    <Button size="lg" variant="shadow" color="primary" onClick={handleonclick}>
          Invite Applio
        </Button>
    </div>
  </section>
)
}
