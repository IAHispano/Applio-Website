"use client"

import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="relative pt-3  bg-background overflow-visible">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute bottom-0 left-0 h-full min-w-full blur-xl hidden md:block"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 20% 100% at 0% 100%, #00AA68, transparent)",
        }}
      ></motion.div>
      <div className="m-auto grid min-h-64 max-w-[100rem] grid-cols-2 gap-6 p-8 pb-20 pt-10 text-white sm:grid-cols-2 lg:grid-cols-6">
        <div className="col-span-2">
          <h2 className="text-3xl font-bold truncate tracking-tight  gtransition text-[#00AA68] mb-5">
            Applio
          </h2>
          <p className="text-sm max-w-xs  font-mono ">
            At the forefront of innovation as an open-source ecosystem that
            hosts cutting-edge AI voice cloning technologies.
          </p>
          <p className="text-md text-neutral-300  mt-5">
            Copyright 2024 © All Right Reserved
          </p>
        </div>
        <div className="col-span-1 flex flex-col space-y-2">
          <h1 className="mb-1 text-xs font-bold uppercase text-[#00AA68]">
            Important
          </h1>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/"
          >
            Home
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/models"
          >
            Models
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/guides"
          >
            Guides
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/bot"
          >
            Bot
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/api"
          >
            API
          </a>
        </div>
        <div className="col-span-1 flex flex-col space-y-2">
          <h1 className="mb-1 text-xs font-bold uppercase text-[#00AA68]">
            Support
          </h1>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/faq"
          >
            FAQs
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/privacy"
          >
            Privacy Policy
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/terms-service"
          >
            Terms of Service
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/terms-use"
          >
            Terms of Use
          </a>
        </div>
        <div className="col-span-1 flex flex-col space-y-2">
          <h1 className="mb-1 text-xs font-bold uppercase text-[#00AA68]">
            Social Media
          </h1>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="https://discord.gg/iahispano"
            rel="noreferrer"
            target="_blank"
          >
            Discord
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="https://www.linkedin.com/company/ai-hispano/"
            rel="noreferrer"
            target="_blank"
          >
            Linkedin
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="https://www.youtube.com/@IAHispano"
            rel="noreferrer"
            target="_blank"
          >
            Youtube
          </a>
        </div>
        <div className="col-span-1 flex flex-col space-y-2">
          <h1 className="mb-1 text-xs font-bold uppercase text-[#00AA68]">
            Have any project idea?
          </h1>
          <a
            className="border-2 border-white/30 hover:border-white/80 rounded-md flex px-4 py-2 items-center justify-center gap-2 z-[1] gtransition"
            href="https://discord.gg/iahispano"
            rel="noreferrer"
            target="_blank"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-send"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </span>
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  )
}
