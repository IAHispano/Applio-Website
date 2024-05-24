"use client"

import React, { useEffect, useState } from "react"
import { PostgrestError } from "@supabase/supabase-js"
import Markdown from "react-markdown"
import { supabase } from "@/utils/database"

export default function BlogPost({ id }: Readonly<{ id: number }>) {
  const [data, setData] = useState<any[] | null>(null)
  const [_error, setError] = useState<PostgrestError | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data: userData, error: userError } = await supabase
        .from("blog")
        .select("*")
        .eq("id", id)
      if (userError) {
        setError(userError)
        return
      }
      setData(userData)
      setLoading(false)
    }

    fetchData()
  })

  const formatDate = (dateStr: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
    return new Date(dateStr).toLocaleDateString(undefined, options)
  }

  return (
    <div className="text-black dark:text-white">
        {data?.length === 0 && !loading && (
            <h1 className="text-4xl text-center h-[80svh] mt-44">Oops... we didn&apos;t find that news.</h1>
        )}
      {loading ? (
        <div className="justify-center items-center flex flex-col h-[90svh]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
      ) : (
        data &&
        data?.map((item) => (
            <article key={item.id} className="w-full h-full max-md:mt-12">
            <div className="h-full top-0 absolute w-full pointer-events-none overflow-hidden">
            <div className="h-64 top-0 absolute w-full scale-120 rounded-3xl blur-xl filter opacity-40 pointer-events-none">
            <img
            className="absolute top-0 left-0 w-full h-full object-cover object-center"
            src={item.image_url}
            alt="post banner"
            ></img>
            </div>
            </div>
            <main className="w-full py-14 flex flex-col min-h-screen overflow-x-hidden relative">
            <div className="flex flex-col justify-start items-center text-left">
            <h1 className="text-4xl max-md:max-w-sm text-wrap text-center">{item.title}</h1>
            <h2 className="text-xl pl-0.5 mt-2">by {item.by} at {formatDate(item.created_at)}.</h2>
            </div>
            <div>
                <Markdown
                className="text-neutral-300 mt-24 max-w-3xl max-md:max-w-sm max-md:mx-12 select-none mx-auto justify-center "
                components={{
                    a: ({ node, children, ...props }) => (
                      <a {...props} className="text-green-500 hover:underline break-words">
                        {children}
                      </a>
                    ),
                    p: ({ node, children, ...props }) => (
                      <p {...props} className="mb-4">
                        {children}
                      </p>
                    ),
                    img: ({ node, alt, src, ...props }) => (
                      <div className="w-full h-full overflow-hidden rounded-2xl">
                        <img
                          {...props}
                          className="w-full h-full object-cover"
                          alt={alt}
                          src={src}
                        />
                      </div>
                    ),
                    h1: ({ node, children, ...props }) => (
                      <h1
                        {...props}
                        className="text-xl font-bold mb-8 text-white"
                      >
                        {children}
                      </h1>
                    ),
                    h2: ({ node, children, ...props }) => (
                      <h2
                        {...props}
                        className="text-lg font-bold mb-4 text-white"
                      >
                        {children}
                      </h2>
                    ),
                    ul: ({ node, children, ...props }) => (
                      <ul {...props} className="list-disc ml-5 mb-4">
                        {children}
                      </ul>
                    ),
                    strong: ({ node, children, ...props }) => (
                      <strong
                        {...props}
                        className="font-bold text-white"
                      >
                        {children}
                      </strong>
                    ),
                  }}
                >
                  {item.content}
                </Markdown>
            </div>
            </main>
            </article>
        ))
      )}
    </div>
  )
}