"use client"

import { Card, CardBody } from "@nextui-org/react"

export const runtime = "edge"

export default function BotPage() {
  return (
    <section className="container flex flex-col justify-center items-center pb-8 pt-6 md:py-10 mx-auto text-center max-w-7xl">
      <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl mt-7">
        Terms of Service
      </h2>
      <Card className="my-6">
        <CardBody>
          <div className="m-4">
            <h2 className="text-3xl font-bold mb-2">Conditions</h2>
            <p>
              Our terms and conditions apply to each and every user of Applio
              Bot. By adding Applio in your server, you agree to these terms of
              service and the future terms which we may add after a notice.
            </p>

            <h1 className="text-4xl font-bold my-4">Terms of Use</h1>
            <ul className="list-disc pl-6 mb-4">
              <li>The client must not resell the premium codes.</li>
              <li>
                Intentional command spam or attempts to crash the bot should not
                be made.
              </li>
              <li>
                Applio should not be used in Bot spam servers which cause
                command spam.
              </li>
              <li>
                Applio Team reserves the rights to prohibit any server or user
                from using Applio.
              </li>
              <li>
                The client is responsible for any violation caused by them.
              </li>
              <li>
                We have the rights to update terms of service anytime with a
                notice in the support server.
              </li>
            </ul>

            <h1 className="text-4xl font-bold my-4">
              Terms of Use (Global Chat)
            </h1>
            <ul className="list-disc pl-6">
              <li>
                Applio Team reserves the rights to prohibit any user or any
                server from using global chat feature if they fail to comply
                with our rules. Rules will be pinned in the global chat channel
                once chat is activated.
              </li>
              <li>Servers must use an appropriate server name.</li>
              <li>
                You must not use global chat for fraudulent activities or
                advertising.
              </li>
              <li>
                Ratelimits can be imposed on servers which cause overload in the
                global chat.
              </li>
              <li>
                Applio team can delete any messages from global chat which we
                may find inappropriate, they do not necessarily have to violate
                our rules.
              </li>
              <li>
                Other basic chat rules mentioned in the pinned rules embed must
                be followed.
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </section>
  )
}
