"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Bot, CalendarSearch, User2 } from "lucide-react"

import Information from "./information"
import ModelsAccount from "./models"

interface AsideSelectionProps {
  avatar_url: string
  full_name: string | null
  role: string
  bio: string
  links: Array<string>
}

export function AsideSelection({
  avatar_url,
  full_name,
  role,
  bio,
  links,
}: AsideSelectionProps) {
  const [section, setSection] = useState("account")
  const router = useRouter()

  return (
    <main>
      <div className="w-full flex fixed h-full justify-center items-center text-white dark:text-white flex mx-auto">
        <div className="md:max-w-[100rem] max-md:flex-col size-full p-2 flex gap-4 max-md:mx-4">
          <aside className="md:w-72 xl:w-96 bg-neutral-900 md:h-4/5 p-5 gap-3 md:flex flex-col rounded-3xl gtransition">
            <h2 className="text-4xl font-bold tracking-tight">Settings</h2>
            <div className="flex flex-col gap-3 max-md:mt-2 overflow-y-auto rounded-2xl">
              <a
                className={`flex gap-3 items-center justify-start p-3 hover:bg-neutral-600 active:opacity-50 rounded-2xl ${
                  section === "account" ? "bg-neutral-600" : "bg-neutral-700/50"
                } gtransition`}
                onClick={() => setSection("account")}
              >
                <span className="text-xl">
                  <User2 />
                </span>
                <span>Account</span>
              </a>
            </div>
            <div className="flex flex-col gap-3 max-md:mt-2 overflow-y-auto rounded-2xl">
              <a
                className={`flex gap-3 items-center justify-start p-3 hover:bg-neutral-600 active:opacity-50 rounded-2xl ${
                  section === "models" ? "bg-neutral-600" : "bg-neutral-700/50"
                } gtransition`}
                onClick={() => setSection("models")}
              >
                <span className="text-xl">
                  <Bot />
                </span>
                <span>Models</span>
              </a>
            </div>
          </aside>
          <div className="grow bg-neutral-900 h-4/5 p-5 gap-5 flex flex-col rounded-3xl overflow-y-auto">
            {section === "account" && <Information bio={bio} links={links} />}
            {section === "models" && (
              <ModelsAccount userFullName={full_name as string} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
