"use client"

import React, { useRef } from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"

export const StickyScroll = ({
  content,
}: {
  content: {
    title: string
    description: string
  }[]
}) => {
  const [activeCard, setActiveCard] = React.useState(0)
  const ref = useRef<any>(null)
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  })
  const cardLength = content.length

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength)
    cardsBreakpoints.forEach((breakpoint, index) => {
      if (latest > breakpoint - 0.2 && latest <= breakpoint) {
        setActiveCard(() => index)
      }
    })
  })

  const backgroundColors = ["#040300", "#000000", "#303030"]
  const linearGradients = [
    "linear-gradient(to bottom right, #00bcd4, #2ecc71)",
    "linear-gradient(to bottom right, #e91e63, #3f51b5)",
    "linear-gradient(to bottom right, #ff9800, #ffeb3b)",
  ]
  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 p-10 rounded-3xl"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-3xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg text-slate-300 max-w-sm mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <motion.div
        animate={{
          background: linearGradients[activeCard % linearGradients.length],
        }}
        className="hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden"
      ></motion.div>
    </motion.div>
  )
}
