"use client"

import { Card, CardBody } from "@nextui-org/react"
import { Apple, Bot, Search } from "lucide-react"

export const runtime = "edge"

export default function BotPage() {
  return (
    <section className="container flex flex-col justify-center items-center pb-8 pt-6 md:py-10 mx-auto text-center max-w-7xl">
      <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl mt-7">
        Privacy Policy
      </h2>
      <Card className="my-6">
        <CardBody>
          <div className="m-4">
            <p>
              Privacy policy for the Applio bot, explaining how we handle user
              data while adhering to Discord&apos;s privacy policy.
            </p>

            <p>
              We take your privacy seriously. This policy explains how we
              collect, use, and protect your personal information while
              following Discord&apos;s privacy guidelines.
            </p>

            <ul className="list-disc pl-6 my-4">
              <li>
                We may collect certain information when you interact with our
                bot, including user IDs and command history.
              </li>
              <li>
                We use this information to improve our services and provide
                support to our users.
              </li>
              <li>
                We do not sell or share your personal information with third
                parties.
              </li>
              <li>
                By using Applio Bot, you consent to the terms of this privacy
                policy.
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </section>
  )
}
