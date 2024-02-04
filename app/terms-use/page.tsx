"use client"
import { Card, CardBody } from "@nextui-org/react"

export default function IndexPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      <section className="container flex flex-col justify-center items-center pb-8 pt-6 md:py-10 mx-auto text-center max-w-4xl">
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl mt-7 z-[1]">
          Terms of Use
        </h2>
        <Card className="my-6 md:w-[800px] w-full h-fit font-mono">
          <CardBody className="md:m-4">
            <h1 className="mb-4 text-xl md:text-3xl font-bold">Terms of Use</h1>
            <p className="mb-4">Last updated: February 04, 2024</p>

            <p className="text-pretty">
              <p className="mb-4">
                These Terms of Use (&#34;Terms&#34;) govern your access to and use of
                our website and services. By using our website or services, you
                agree to be bound by these Terms.
              </p>
              <h2 className="text-2xl font-bold mb-2">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By using our website or services, you agree to be bound by these
                Terms. If you do not agree to these Terms, you may not use our
                website or services.
              </p>
              <h2 className="text-2xl font-bold mb-2">2. Changes to Terms</h2>
              <p className="mb-4">
                We may modify these Terms at any time without prior notice. Your
                continued use of our website or services after any changes to
                these Terms constitutes your acceptance of the changes.
              </p>
              <h2 className="text-2xl font-bold mb-2">3. Your Account</h2>
              <p className="mb-4">
                You may be required to create an account to use our services.
                You are responsible for maintaining the confidentiality of your
                account information and for all activities that occur under your
                account.
              </p>
              <h2 className="text-2xl font-bold mb-2">4. Intellectual Property</h2>
              <p className="mb-4">
                Our website and services contain content that is protected by
                copyright, trademark, and other intellectual property laws. You
                may not use our content without our permission.
              </p>
              <h2 className="text-2xl font-bold mb-2">5. Disclaimer of Warranties</h2>
              <p className="mb-4">
                Our website and services are provided &#34;as is&#34; and without
                warranties of any kind. We disclaim all warranties, express or
                implied, including, but not limited to, warranties of
                merchantability, fitness for a particular purpose, and
                non-infringement.
              </p>
              <h2 className="text-2xl font-bold mb-2">6. Limitation of Liability</h2>
              <p className="mb-4">
                We will not be liable for any damages arising from your use of
                our website or services, including, but not limited to, direct,
                indirect, incidental, punitive, and consequential damages.
              </p>
              <h2 className="text-2xl font-bold mb-2">7. Governing Law</h2>
              <p className="mb-4">
                These Terms will be governed by the laws of Spain.
              </p>
              <h2 className="text-2xl font-bold mb-2">8. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us.
              </p>
            </p>
          </CardBody>
        </Card>
      </section>
    </div>
  )
}
