"use client"

import React, { useEffect, useState } from "react"

const CountdownTimer: React.FC = () => {
  const targetDate = new Date("2024-01-19T23:59:00Z")

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining())
  const [isExpired, setIsExpired] = useState(false)

  function calculateTimeRemaining(): {
    hours: number
    minutes: number
    seconds: number
  } {
    const now = new Date()
    const difference = targetDate.getTime() - now.getTime()

    const hours = Math.max(Math.floor(difference / (1000 * 60 * 60)), 0)
    const minutes = Math.max(
      Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      0
    )
    const seconds = Math.max(Math.floor((difference % (1000 * 60)) / 1000), 0)

    return { hours, minutes, seconds }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = calculateTimeRemaining()
      setTimeRemaining(remainingTime)

      if (
        remainingTime.hours <= 0 &&
        remainingTime.minutes <= 0 &&
        remainingTime.seconds <= 0
      ) {
        setIsExpired(true)
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div
      className={`text-3xl md:text-6xl py-10 text-white gtransition z-20  ${
        isExpired ? "expired" : ""
      }`}
      suppressHydrationWarning
    >
      {isExpired ? (
        <div>
          <p className="md:tracking-tighter tracking-tight font-bold ">
            Introducing{" "}
            <span className="underline underline-offset-8 font-semibold">
              Applio <span className="hover:text-8xl gtransition">V3</span>
            </span>
          </p>
          <p className="text-xl text-white/30 mt-4 tracking-tight">
            Click to see the trailer
          </p>
        </div>
      ) : (
        <p
          suppressHydrationWarning
          className="md:tracking-tighter tracking-tight font-bold"
        >
          {timeRemaining.hours} hours, {timeRemaining.minutes} minutes, and{" "}
          {timeRemaining.seconds} seconds.
        </p>
      )}
    </div>
  )
}

export default CountdownTimer
