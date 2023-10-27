"use client"
import React, { useState } from "react";
import { Bot, CalendarSearch, User2 } from "lucide-react";
import Information from "@/components/account/settings/information";
import { ModelsAccount } from "@/components/account/settings/models";
import Events from "./events";

interface AsideSelectionProps {
  avatar_url: string;
  full_name: string | null;
  role: string;
  bio: string;
}

export function AsideSelection({
  avatar_url,
  full_name,
  role,
  bio,
}: AsideSelectionProps) {
  const [section, setSection] = useState("account");

  return (
    <div className="w-full flex fixed h-full justify-center items-center pt-16 text-white dark:text-white">
      <div className="max-w-7xl w-full h-full flex p-2 max-md:pt-16 gap-2">
        <aside className="hidden md:w-72 xl:w-96 bg-neutral-900 h-96 p-5 gap-3 md:flex flex-col rounded-3xl gtransition">
          <h2 className="text-4xl font-bold tracking-tight">Settings</h2>
          <div className="flex flex-col gap-3 overflow-y-auto rounded-2xl">
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
          <div className="flex flex-col gap-3 overflow-y-auto rounded-2xl">
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
          <div className="flex flex-col gap-3 overflow-y-auto rounded-2xl">
            <a
            className={`flex gap-3 items-center justify-start p-3 hover:bg-neutral-600 active:opacity-50 rounded-2xl ${
                section === "events" ? "bg-neutral-600" : "bg-neutral-700/50"
            } gtransition`}
            onClick={() => setSection("events")}
            >
            <span className="text-xl">
              <CalendarSearch />
            </span>
            <span>Events</span>
            </a>
          </div>
        </aside>
        <div className="flex-grow bg-neutral-900 h-3/4 p-5 gap-5 flex flex-col rounded-3xl overflow-y-auto">
          {section === "account" && (
            <Information
              full_name={full_name}
              avatar_url={avatar_url}
              role={role}
              bio={bio}
            />
          )}
          {section === "models" && <ModelsAccount  userFullName={full_name!}/>}
          {section === "events" && <Events                
          full_name={full_name}
          avatar_url={avatar_url}
          role={role}
          bio={bio}/>}
        </div>
      </div>
    </div>
  );
}
