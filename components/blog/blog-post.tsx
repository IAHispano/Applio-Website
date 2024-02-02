"use client"

import React, { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function BlogPost({ id }: Readonly<{ id: string }>) {
  const supabase = createClientComponentClient()
  const [data, setData] = useState<any[] | null>(null)
  const [_error, setError] = useState<PostgrestError | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      // Fetch user data based on full name
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
      {loading ? (
        <div className="justify-center items-center flex flex-col h-72">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
      ) : (
        data &&
        data?.map((item) => (
          <div key={id}>
            <div className="dark:h-[48rem] absolute w-full pointer-events-none overflow-hidden">
              <div className="h-96 top-0 absolute w-full scale-120 rounded-3xl blur-3xl filter brightness-90 pointer-events-none">
                <img
                  className="z-10 absolute top-0 left-0 w-full h-full object-cover object-center"
                  src={item.image_url}
                  alt="post banner"
                ></img>
              </div>
            </div>
            <main className="w-full py-14 flex flex-col top-0 justify-start items-center text-center min-h-screen overflow-x-hidden relative">
              <div className="flex justify-center  sm:justify-between items-center flex-wrap gap-5 gtransition">
                <a
                  className="text-white dark:bg-neutral-950/40 bg-neutral-950/60 gtransition hover:opacity-50 py-2 px-4 rounded-lg"
                  href="/blog"
                >
                  Return
                </a>
                <a
                  className="bg-white text-black gtransition py-2 px-4 hover:opacity-50 rounded-lg border-2"
                  href={`https://twitter.com/intent/tweet?text=${item.title} www.applio.org/blog/${item.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Share
                </a>
              </div>
              <div className="px-5 w-full flex justify-center items-center">
                <div className="pt-5 pb-10 z-10 flex justify-center items-center gap-5 flex-col w-full max-w-4xl">
                  <div className="overflow-hidden w-full max-w-md md:hover:scale-105 md:active:scale-150 md:active:z-50 rounded-2xl relative shadow-2xl mb-5 gtransition">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="object-fill h-full w-full"
                    ></img>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold tracking-tight dark:text-white">
                    {item.title}
                  </h1>
                  <div className="flex flex-col-2 text-left gap-2 flex-grow justify-center items-center w-full">
                    <p className="text-xs md:text-lg tracking-tight dark:text-neutral-300 text-left">{`Written on ${formatDate(
                      item.created_at
                    )},`}</p>
                    <p className="text-xs md:text-lg tracking-tight dark:text-neutral-300 text-left">{`by ${item.by}.`}</p>
                  </div>
                  <hr className="w-full dark:opacity-10"></hr>
                </div>
              </div>
              <div className="text-start px-5 mb-5">
                <div className="w-full rounded-lg underline-offset-2 p-5 text-white max-w-4xl z-10">
                  <Markdown
                    className="dark:text-neutral-300 text-black text-lg"
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ node, children, ...props }) => (
                        <a
                          {...props}
                          className="text-green-500 hover:underline"
                        >
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
                          className="text-4xl font-bold mb-8 dark:text-white"
                        >
                          {children}
                        </h1>
                      ),
                      h2: ({ node, children, ...props }) => (
                        <h2
                          {...props}
                          className="text-3xl font-bold mb-4 dark:text-white"
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
                          className="font-bold dark:text-white"
                        >
                          {children}
                        </strong>
                      ),
                    }}
                  >
                    {item.content}
                  </Markdown>
                </div>
              </div>
            </main>
          </div>
        ))
      )}
    </div>
  )
}
