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

export default function BotPage() {
  return (
    <section className="container flex flex-col justify-center items-center pb-8 pt-6 md:py-10 mx-auto text-center max-w-7xl my-10">
    <h1 className="text-9xl font-bold leading-tight tracking-tighter md:text-8xl mt-4 ">
      Applio
    </h1>
    <p className="mt-4 text-muted-foreground mb-24 text-xs md:text-xl ">
      Enjoy +8000 voice models available in our database, but from Discord!
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
        <AccordionTrigger>Why are there so many bots with the same name?</AccordionTrigger>
        <AccordionContent>
        Discord is still verifying our Bot so Applio is currently limited to 250 servers. To allow more people to add Applio Bot to their server we created Applio Beta and Applio Canary.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="mt-10 ml-[3rem] font-bold">
          Invite Applio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-w-[300px]"> 
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Search models easily 🍏</DialogTitle>
          <DialogDescription>
            By inviting our bot to your server, you will able to search +8000 models in your Discord server with this command
            <div className="bg-gray-900 hover:bg-gray-800 text-green-300 flex justify-center rounded p-2 mt-4 mb-2 font-bold text-xl css-0">/search [Model Name]</div>
          </DialogDescription>
          <DialogFooter>
            <Button asChild className="bg-green-400 hover:bg-green-300 border-0 text-1xl mb-4" size="sm" type="submit">
              <Link href="https://discord.com/oauth2/authorize?client_id=1144714449563955302&permissions=2147871809&scope=bot" target="blank">Applio</Link>
            </Button>
            <Button asChild className="bg-green-400 hover:bg-green-300 border-0 text-1xl mb-4" size="sm" type="submit">
              <Link href="https://discord.com/api/oauth2/authorize?client_id=1150834440973594784&permissions=277028849729&scope=bot" target="blank">Applio Beta</Link>
            </Button>
            <Button asChild className="bg-green-400 hover:bg-green-300 border-0 text-1xl mb-4" size="sm" type="submit">
              <Link href="https://discord.com/api/oauth2/authorize?client_id=1151157990477533326&permissions=277026719809&scope=bot" target="blank">Applio Canary</Link>
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </section>
)
}
