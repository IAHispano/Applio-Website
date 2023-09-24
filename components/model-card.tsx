"use client"

import React from "react"
import Image from "next/image"

export default function ModelCard({
  imageUrl,
  name,
  created_at,
}: {
  imageUrl: string
  name: string
  created_at: string
}) {
  const formattedDate = new Date(created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const truncateTitle = (text: string, maxLetters: number) => {
    if (text && text.length > maxLetters) {
      return text.slice(0, maxLetters) + "..."
    }
    return text
  }

  return (
    <div className="max-w-sm bg-black border rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-60">
        {!imageUrl ? (
          <Image
            src="https://imgs.search.brave.com/TdFbVvqhx_iORMgnTYBWQhMmTg8PN2NQ-oEd17Y33N8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdDIu/ZGVwb3NpdHBob3Rv/cy5jb20vMTU2MDc2/OC82MTYyL2kvNjAw/L2RlcG9zaXRwaG90/b3NfNjE2MjEwNTct/c3RvY2stcGhvdG8t/bm8taW1hZ2UtYXZh/aWxhYmxlLmpwZw"
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            alt="Picture of the model"
          />
        ) : (
          <Image
            src={imageUrl}
            alt="Picture of the model"
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            style={{
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 1)",
            }}
          />
        )}
        <div
          className="absolute bottom-0 left-0 w-full h-20"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6))",
            backdropFilter: "blur(1px)",
            opacity: 1,
            transition: "opacity 0.3s",
          }}
        >
          <p className="text-white font-inter text-xl p-4 mt-8">
            {truncateTitle(name, 16)}
          </p>
        </div>
      </div>
    </div>
  )
}
