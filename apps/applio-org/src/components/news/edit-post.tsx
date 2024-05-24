"use client"

import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Markdown from "react-markdown"
import { supabase } from "@/utils/database"
import { SendButton } from "./send-post"
import { addPost } from "@/app/actions/news/add-news-action"

export default function MarkdownInput({ id }: Readonly<{ id: number }>) {
  const [markdownText, setMarkdownText] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [role, setRole] = useState("")
  const [fixed, setFixed] = useState<any>(false)
  const [full_name, setFull_name] = useState<any>()
  const [disabled, setDisabled] = useState(true)
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (markdownText.length > 20) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [markdownText]);

  useEffect(() => {
    async function getData() {
        const {data, error} = await supabase.from("blog").select("*").eq("id", id).single();

        if (data) {
            setMarkdownText(data.content)
            setTitle(data.title)
            setDescription(data.image_url)
            setFixed(data.fixed)
        }

        if (error) {
            console.log(error)
            window.history.back()
        }
    }

    async function getUserInfo() {
        const user = await supabase.auth.getUser()
        if (user.data.user) {        
            const {data, error} = await supabase.from("profiles").select("full_name, role").eq("auth_id", user.data.user.id).single()
            
            if (data) {
                setFull_name(data.full_name)
                setRole(data?.role)
            }
            if (data?.role != 'admin') {
                window.location.href = "/"
            }
        }
    }

    getData()
    getUserInfo()
  }, [])

  return (
    <>
    {!markdownText && (
        <main className="h-[100svh]">
            <p className="text-center text-xs mt-44">Loading...</p>
        </main>
    )}
    {markdownText && (
    <form
      ref={formRef}
      action={async (formData) => {
        await addPost(formData, id, role);
        formRef.current?.reset()
      }}
    >
      <main className="px-8 pb-8 mt-[8svh] bg-background">
        <div className="grid grid-cols-1 md:grid-cols-8 w-full grid-rows-1 gap-x-4 gap-y-2 gtransition">
          <textarea
            className="md:col-span-5 h-[60px] w-full p-4 rounded-xl bg-white/10 resize-none overflow-auto focus:outline-none hide-scrollbar max-md:mt-4 mb-2"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            key="title"
            name="title"
            required
          ></textarea>
            <SendButton />
        <textarea
            className="md:col-span-6 h-[60px] w-full p-4 rounded-xl bg-white/10 resize-none overflow-auto focus:outline-none hide-scrollbar max-md:mt-4 mb-4"
            placeholder="Image URL"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            key="description"
            name="description"
            required
          ></textarea>
        <textarea name="fixed" key="fixed" value={fixed} required onChange={(e) => setFixed(e.target.value)} className="md:col-span-2 h-[60px] bg-white/30 rounded-xl p-4 mb-4 max-md:mt-4 text-white outline-none" placeholder="Must it FALSE or TRUE" defaultValue={fixed}></textarea>
        </div>
        <div className="md:flex">
        <textarea
            className="md:flex-1 h-[600px] w-full p-4 rounded-xl bg-white/10 resize-none overflow-auto focus:outline-none hide-scrollbar max-md:mt-4 font-mono"
            defaultValue={markdownText}
            onChange={(e) => setMarkdownText(e.target.value)}
            key="content"
            name="content"
            required       
        >
        </textarea>
              <div className="flex-1 md:ml-4 border border-white/10 rounded-xl max-md:mt-4" suppressHydrationWarning>
                  <Markdown
                      className="text-neutral-200 text-wrap md:max-w-4xl break-all text-lg z-50 h-[500px] overflow-auto p-4"
                      components={{
                          a: ({ node, children, ...props }) => (
                              <a {...props} className="text-green-500 hover:underline break-words">
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
                                      src={src} />
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
                    {markdownText}
                  </Markdown>
              </div>
          </div>
        </main>
        </ form>
        )}
        </>
  );
}