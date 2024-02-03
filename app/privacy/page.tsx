"use client"
import { Card, CardBody } from "@nextui-org/react";

export default function IndexPage() {

  return (
    <div className="flex flex-col overflow-hidden">
     <section className="container flex flex-col justify-center items-center pb-8 pt-6 md:py-10 mx-auto text-center max-w-4xl">
      <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl mt-7 z-[1]">
        Privacy Policy
      </h2>
      <Card className="my-6 md:w-[800px]  w-full h-fit font-mono">
        <CardBody>
          <div className="md:m-4">
          <p className="text-pretty">
            At Applio, we do not sell your personal data. We only collect the information necessary for login, using cookies for this purpose. We guarantee that your information will be handled securely and confidentially.
            Cookies are used exclusively to facilitate the login to our platform. We do not share this information with third parties and guarantee its use for internal purposes only.
            Applio stands out for its state-of-the-art voice cloning technologies. However, we want to assure you that we do not use your personal recordings for any purpose beyond improving our services.
            We implement robust security measures to protect your data from unauthorized access. Your trust is our priority.
            Applio reserves the right to make changes to this policy at any time. We encourage you to periodically review this page for updates.
            If you have any questions or concerns about our privacy policy, please feel free to contact us at https://discord.gg/iahispano.

            Last updated: 02/03/2024
            </p>
          </div>
        </CardBody>
      </Card>
    </section>
    </div>
  )
}
