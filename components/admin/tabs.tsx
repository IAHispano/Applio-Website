"use client"

import React from "react"
import { Button, Tab, Tabs } from "@nextui-org/react"
import { Bot, KeyRound, Text, User } from "lucide-react"

import KeysTable from "./tables/keys-table"
import UsersTable from "./tables/users-table"

interface tabsprops {
  id: string
}

function TabsComponent({ id }: tabsprops) {
  return (
    <div className="max-md:my-8">
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          className="mx-auto justify-center"
          size="lg"
          color="success"
          defaultSelectedKey="keys"
        >
          <Tab
            key="users"
            title={
              <div className="flex items-center space-x-2">
                <User />
                <span>Users</span>
              </div>
            }
          >
            <UsersTable id={id} />
          </Tab>
          <Tab
            key="keys"
            title={
              <div className="flex items-center space-x-2">
                <KeyRound />
                <span>API Keys</span>
              </div>
            }
          >
            <KeysTable id={id} />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default TabsComponent
