"use client"
import { Card, CardBody } from "@nextui-org/react";

export default function IndexPage() {

  return (
    <div className="flex flex-col overflow-hidden">
     <section className="container flex flex-col justify-center items-center pb-8 pt-6 md:py-10 mx-auto text-center max-w-4xl">
      <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl mt-7 z-[1]">
        Terms of uses
      </h2>
      <Card className="my-6 md:w-[800px]  w-full h-fit font-mono">
        <CardBody>
          <div className="md:m-4">
            <p className="text-pretty">
            Proper Use:
            You agree to use our services in an appropriate and respectful manner. You must not engage in activities that may cause damage or interfere with the functionality of our services.
            User Accounts:
            You are responsible for your account information and must maintain the confidentiality of your login credentials. Any activity performed under your account will be deemed to have been performed by you.
            User Content:
            By using our services, you agree that any content you share or upload is your responsibility. Applio is not responsible for such content.
            Restrictions:
            You may not use our services for illegal activities or activities that violate the rights of third parties. You are not allowed to modify, adapt or hack our services.
            Account Suspension or Termination:
            Applio reserves the right to suspend or terminate your account if these terms of use are violated. We also reserve the right to modify or discontinue our services at any time.
            Intellectual Property:
            Applio&apost;s services and content are protected by intellectual property rights. You may not copy, distribute or modify such content without authorization.
            Changes to the Terms of Use:
            Applio may update these terms at any time. We recommend that you check back periodically for updates.
            Contact us:
            If you have any questions about our terms of use, please contact us at https://discord.gg/iahispano.

            Last updated: 02/03/2024
            </p>
          </div>
        </CardBody>
      </Card>
    </section>
    </div>
  )
}
