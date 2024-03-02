"use client"

import React, { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function GuidePost({ id }: Readonly<{ id: string }>) {
  const supabase = createClientComponentClient()
  const [data, setData] = useState<any[] | null>(null)
  const [userData, setUserData] = useState<any | null>(null)
  const [_error, setError] = useState<PostgrestError | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const { data: userData, error: userError } = await supabase
        .from("guides")
        .select("*")
        .eq("id", id)
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (userError) {
        setError(userError)
        return
      }
        setData(userData)
      setLoading(false)
    }

    fetchData()
  }, [id, userData])

  const formatDate = (dateStr: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
    return new Date(dateStr).toLocaleDateString(undefined, options)
  }

  if (data?.length === null) {
    return (
      <div className="flex flex-col gap-2 p-5 justify-center items-center top-0 left-0 w-full h-full fixed text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight fade-in">
          Guide not found (404)
        </h1>
      </div>
    )
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
            <div className="h-[48rem] absolute w-full pointer-events-none overflow-hidden">
              <div className="h-96 top-0 absolute w-full scale-125 rounded-2xl blur-3xl backdrop-blur-sm pointer-events-none">
              </div>
            </div>
            <main className="w-full py-14 flex flex-col top-0 justify-start items-center text-center min-h-screen overflow-x-hidden relative">
              <div className="px-5 w-full flex justify-center items-center">
                <div className="pt-5 pb-10 z-10 flex justify-center items-center gap-5 flex-col w-full max-w-4xl">
                  <h1 className="text-3xl md:text-5xl font-bold tracking-tight dark:text-white">
                    {item.title}
                  </h1>
                  <div className="flex flex-col-2 text-left gap-2 flex-grow justify-center items-center w-full">
                    <p className="text-xs md:text-lg tracking-tight dark:text-neutral-300 text-left">{`Written on ${formatDate(
                      item.created_at
                    )},`}</p>
                    <a
                      className="text-xs md:text-lg tracking-tight dark:text-neutral-300 text-left hover:underline"
                      href={`/user/${item.created_by}`}
                    >
                      by {item.created_by || "unknown user"}.
                    </a>
                  </div>
                  <div className="flex justify-center items-center flex-wrap gap-5 w-full">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${item.title}&url=https://applio.org/guides/${id}`}
                      rel="noreferrer"
                      target="_blank"
                      className="flex items-center flex-wrap gap-3 justify-center px-4 py-2 max-sm:aspect-square bg-white text-black hover:bg-opacity-20 active:opacity-50 rounded-full gtransition"
                    >
                      Share
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-share"
                      >
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" x2="12" y1="2" y2="15" />
                      </svg>
                    </a>
                    {isOwner && (
                      <a
                        href={`https://twitter.com/intent/tweet?text=${item.title}&url=https://applio.org/guides/${id}`}
                        rel="noreferrer"
                        target="_blank"
                        className="flex items-center flex-wrap gap-3 justify-center px-4 py-2 max-sm:aspect-square bg-red-500 text-white hover:bg-opacity-20 active:opacity-50 rounded-full gtransition"
                      >
                        Delete
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-x"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <div className="border border-white/20 w-full rounded-lg " />
                </div>
              </div>
              <div className="text-start px-5 mb-5">
                <div className="w-full rounded-lg underline-offset-2 p-5 text-white max-w-4xl z-10 ">
                  <Markdown
                    className="text-neutral-200 md:text-lg max-md:max-w-sm  z-50"
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ node, children, ...props }) => (
                        <a
                          {...props}
                          className="text-green-500 hover:underline break-words"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {children}
                        </a>
                      ),
                      p: ({ node, children, ...props }) => (
                        <p {...props} className="mb-4 font-mono">
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
                      code: ({ node, children, ...props }) => (
                        <code
                          {...props}
                          className="select-all bg-white/80 text-black font-bold rounded-lg p-1"
                        >
                          {children}
                        </code>
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
