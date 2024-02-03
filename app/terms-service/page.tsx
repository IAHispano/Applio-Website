"use client"
import { Card, CardBody } from "@nextui-org/react";

export default function IndexPage() {

  return (
    <div className="flex flex-col overflow-hidden">
     <section className="container flex flex-col justify-center items-center pb-8 pt-6 md:py-10 mx-auto text-center max-w-4xl">
      <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl mt-7 z-[1]">
        Terms of services
      </h2>
      <Card className="my-6 md:w-[800px]  w-full h-fit font-mono">
        <CardBody>
          <div className="md:m-4">
          <p className="text-pretty">
            Use of Our Services:
            You agree to use Applio&apost;s services in an ethical and legal manner. You shall not take any action that may damage, interrupt or compromise the integrity of our services.
            Intellectual Property:
            The services and content provided by Applio are protected by intellectual property rights. You may not reproduce, distribute or modify the content without authorization.
            User Responsibility:
            You are responsible for maintaining the confidentiality of your login information. Any activity performed with your account will be deemed to have been performed by you.
            Limitation of Liability:
            Applio shall not be liable for any direct, indirect, incidental or consequential damages that may arise from the use of our services.
            Modifications to the Services:
            Applio reserves the right to make changes, suspend or discontinue any part of our services at any time without prior notice.
            Links to Third Parties:
            Our services may contain links to third party websites. We are not responsible for the accuracy or content of these sites.
            Changes to the Terms of Service:
            Applio may update these terms at any time. We encourage you to check back periodically for updates.
            Contact us:
            If you have questions about our Terms of Service, contact us at https://discord.gg/iahispano.

            Last updated: 02/03/2024
            </p>
          </div>
        </CardBody>
      </Card>
    </section>
    </div>
  )
}
