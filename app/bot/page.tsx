"use client"

import { BentoGridThirdDemo } from "@/components/bot/features"
import SparklesCore from "@/components/landing/particles"
import { motion } from "framer-motion"


export default function IndexPage() {
  return (
    <main className="flex flex-col overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-0 h-full min-w-full overflow-hidden blur-3xl"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 40% 30% at 50% 0%, #00AA68, transparent)",
        }}
      ></motion.div>
      <div className="flex flex-col w-full justify-start items-center text-center relative z-[1]">
        <div className="min-h-[30svh] flex flex-col justify-center items-center w-full p-10 relative">
          <p className="text-3xl md:text-7xl font-bold tracking-tight md:tracking-normal pt-6 text-white max-w-4xl">Discord integration</p>
          <p className="font-mono max-w-2xl tracking-wide p-2">Access from anywhere on Discord to thousands of voice models thanks to Applio Bot</p>
        </div>
        <BentoGridThirdDemo />
        <div className="mt-24 w-full ">
          <a className="bg-[#27292c] hover:opacity-80 md:w-[300px] w-full text-xl md:text-6xl rounded-lg px-32 p-6 font-bold gtransition" href="https://bot.applio.org" rel="noreferrer" target="_blank">Try Applio BOT now!</a>
        </div>
      </div>
    </main>
  )
}
