"use client"
import { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useRouter } from "next/navigation"
import React, { useRef } from "react"
import { SendButton } from './send';
import { addPost } from '@/app/actions/add-guide-action';
import { Divider } from '@nextui-org/react';

export default function MarkdownInput() {
  const [markdownText, setMarkdownText] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)


  return (
    <form
    ref={formRef}
    action={async (formData) => {
      await addPost(formData)
      formRef.current?.reset()
    }}
  >
    <main className='px-8 pb-8 -mt-8 bg-background'>
      <div className="flex justify-between mb-4">
        <button className="cursor-pointer flex items-center flex-wrap gap-3 px-4 py-2  bg-black/10 dark:bg-[#2C2C2C] mt-5 z-10 dark:hover:bg-opacity-80 active:opacity-50 rounded-lg gtransition dark:text-white  justify-center" onClick={() => router.back()}>
          Return
        </button>
        <p className="md:text-5xl font-bold text-white md:ml-5 text-2xl items-center justify-center flex text-center">Splash your creativity in a guide</p>
        <SendButton />
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-8 w-full grid-rows-1  gtransition">
      <textarea
                  className="md:col-span-8 h-[80px] w-full p-4 border rounded-xl bg-white/10 resize-none overflow-auto focus:outline-none hide-scrollbar max-md:mt-4 mb-2"
                  placeholder="Title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  key="title"
                  name="title"
                  required
              >
              </textarea>
              <textarea
                  className="md:col-span-8 h-[80px] w-full p-4 border rounded-xl bg-white/10 resize-none overflow-auto focus:outline-none hide-scrollbar max-md:mt-4 mb-2"
                  placeholder="Description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  key="description"
                  name="description"
                  required
              >
              </textarea>
        </div>
        <div className="md:flex ">
              <textarea
                  className="md:flex-1 h-[600px] w-full p-4 border rounded-xl bg-white/10 resize-none overflow-auto focus:outline-none hide-scrollbar max-md:mt-4"
                  placeholder={
                    "Here you can start writing your guide, before we start, and we will show you how it works.\n\n" +
                    "The guides are made in Markdown, so you may already know how to use it. Here are some examples:\n\n" +
                    "# This is a title \n\n" +
                    "## This is a subtitle \n\n" +
                    "[This is a link](https://applio.org)\n\n" +
                    "**This is bold text**\n\n" +
                    "*This is italic text*\n\n" +
                    "- This is a dot\n\n" +
                    "`This is code`\n\n"  +
                    "![This is an image(Link_Image))"
                  }
                  value={markdownText}
                  onChange={(e) => setMarkdownText(e.target.value)}
                  key="content"
                  name="content"
                  required
              >
              </textarea>
              <div className="flex-1 md:ml-4 border rounded-xl" suppressHydrationWarning>
              <p className='text-3xl font-bold px-4 pt-4 truncate max-w-2xl'>{title || 'Untitled'}</p>
              <p className='text-sm px-4 mt-1 truncate max-w-3xl'>{description || 'Here you will see the description of your guide.'}</p>
              <Divider className='mt-4'/>
                  <Markdown
                      className="text-neutral-200 text-wrap max-w-4xl break-all text-lg z-50 h-[480px] overflow-auto  p-4 hide-scrollbar"
                      remarkPlugins={[remarkGfm]}
                      components={{
                          a: ({ node, children, ...props }) => (
                              <a {...props} className="text-green-500 hover:underline">
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
                    {markdownText || 
                    "Here you will see a preview of your guide, before we start, and we will show you how it works.\n\n" +
                    "The guides are made in Markdown, so you may already know how to use it. Here are some examples:\n\n" +
                    "# This is a title \n\n" +
                    "## This is a subtitle \n\n" +
                    "[This is a link](https://applio.org)\n\n" +
                    "**This is bold text**\n\n" +
                    "*This is italic text*\n\n" +
                    "- This is a dot\n\n" +
                    "`This is code`\n\n" 
                    }
                  </Markdown>
              </div>
          </div>
        </main>
        </ form>
  );
}
