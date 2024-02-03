"use client"

import { Button } from "@nextui-org/react"
import { Apple, Bot, Search } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function BotPage() {
  const handleonclick = () => {
    window.open("https://bot.applio.org", "_blank")
  }
  return (
    <section className="container flex flex-col justify-center items-center pb-8 pt-6 md:py-10 mx-auto text-center max-w-7xl my-10">
      <h1 className="text-9xl font-bold leading-tight tracking-tighter md:text-8xl mt-4 text-[#00AA68] p-1">
        Applio
      </h1>
      <p className="text-muted-foreground mb-24 text-xs md:text-xl ">
        Enjoy +600.000 voice models available in our database, but from Discord!
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
            In which languages is it available?
          </AccordionTrigger>
          <AccordionContent>
            Currently in English and Spanish. Don&apos;t worry, we are still
            working to expand it to more languages.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Can I contribute to the database?</AccordionTrigger>
          <AccordionContent>
            Absolutely! We welcome contributions from the community to help
            expand and improve our database. Feel free to reach out to us for
            more information on how to contribute.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>How can I report a bug or issue?</AccordionTrigger>
          <AccordionContent>
            If you encounter any bugs or issues while using Applio, please don&apos;t
            hesitate to contact us through our support channels or by filing a
            bug report on our GitHub repository. We appreciate your feedback!
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="m-12">
        <Button size="lg" color="primary" onClick={handleonclick}>
          Try Applio Bot now!
        </Button>
      </div>
    </section>
  )
}
