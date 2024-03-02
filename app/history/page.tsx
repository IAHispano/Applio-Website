"use client"

import { TracingBeam } from "@/components/landing/roadmap"
import { motion } from "framer-motion"

export default function HistoryPage() {
  return (
    <main className="mx-auto flex flex-col max-w-[90rem] py-24">
        <h1 className="text-5xl font-bold tracking-tight text-center mb-8">Our History</h1>
        <TracingBeam>
        <div className="max-w-2xl mx-auto antialiased pt-4 relative max-md:mx-24">
            {dummyContent.map((item, index) => (
            <div key={`content-${index}`} className="mb-10">
                <h2 className="bg-white/30 text-white rounded-lg text-xs w-fit px-4 py-1 mb-4 font-mono font-medium">
                {item.badge}
                </h2>
    
                <p className="text-xl mb-4">
                {item.title}
                </p>
    
                <div className="text-sm  prose prose-sm dark:prose-invert">
                {item?.image && (
                    <img
                    src={item.image}
                    alt="blog thumbnail"
                    height="1000"
                    width="1000"
                    className="rounded-lg mb-10 object-cover"
                    />
                )}
                {item.description}
                </div>
            </div>
            ))}
        </div>
        </TracingBeam>
        
  </main>
  )
}

const dummyContent = [
    {
      title: "IA Hispano was born",
      description: (
        <>
          <p>
          On April 4th, 2023 IA Hispano was born, it was created by Blaise Pascal with the original idea of creating an artificial intelligence server in Spanish.
          </p>
        </>
      ),
      badge: "04/15/2023",
      image: "/aihispano_banner.png"
    },
    {
      title: "Our first tutorial",
      description: (
        <>
          <p>
          On April 23rd 2023 we created and uploaded our first tutorial on Youtube, this one was about how to create artificial intelligence models with (also) our first Google Colab.
          </p>
        </>
      ),
      badge: "04/23/2023"
    },
    {
        title: "50,000 Members",
        description: (
          <>
            <p>
            In a few months we reached 50,000 members, we made a name for ourselves in the artificial intelligence community.
            </p>
          </>
        ),
        badge: "06/18/2023",
      },
      {
        title: "We created Applio",
        description: (
          <>
            <p>
            On August 8, 2023 Applio, so far the best tool for voice cloning, was publicly released, at the beginning it was a simple project created by enthusiasts, now it is the most used tool.
            </p>
          </>
        ),
        badge: "08/08/2023",
        image:
          "/applio_banner.png",
      },
      {
        title: "We developed Applio Bot",
        description: (
          <>
            <p>
                In September we launched our first Discord bot, it contained more than 8k models, it grew to more than half a million models and today it has more than 20k.
            </p>
          </>
        ),
        badge: "09/09/2023",
      },
      {
        title: "We developed Applio Website and Applio Docs",
        description: (
          <>
            <p>
            This website was created on September 17, 2023, today it has more than 90k users per day. It is the only open source website with a powerful search engine with RVC models. On the same day Applio Docs was created, the reference website if you have questions about Applio.
            </p>
          </>
        ),
        badge: "09/17/2023",
      },
      {
        title: "We developed Applio API",
        description: (
          <>
            <p>
            We managed to receive 1000 models from our servers in less than 1 second. This API is currently used in more than 200 different applications.
            </p>
          </>
        ),
        badge: "11/10/2023",
      },
      {
        title: "New AI Hispano",
        description: (
          <>
            <p>
            Right at the beginning of 2024, AI Hispano underwent the biggest change since its inception, now AI Hispano became a brand, expanding to other languages, other topics related to artificial intelligence and much more. As of today our Discord server has more than 230k users.
            </p>
          </>
        ),
        badge: "01/01/2024",
      },
      {
        title: "We introduced Applio Version 3",
        description: (
          <>
            <p>
            So far, our best version. With fast and easy installation, no bugs and many more features that were not included in previous versions.
            </p>
          </>
        ),
        badge: "01/19/2024",
        image: "/applio_v3.png"
      },
      {
        title: "We continue to work",
        description: (
          <>
            <p>
            We continue to move towards leadership in voice cloning technologies. Our engineers continue to support Applio V3, while others are dedicated to improving our Discord bots and databases. We maintain our focus on developing free and open source tools for the benefit of people. At Applio, we firmly believe that the day this changes, our existence will lose its purpose. In the meantime, we invite you to keep a close eye on all developments on our platform.
            </p>
          </>
        ),
        badge: "Today",
      },
  ];
