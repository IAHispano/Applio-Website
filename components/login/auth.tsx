"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { motion } from "framer-motion"

export default function AuthUI() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const supabase = createClientComponentClient()

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error.message.includes("credentials")) {
        setError("Wrong email or password.")
      } else {
        setError("Login error.")
      }
      return
    }

    router.refresh()
  }

  const handleOAuthDiscord = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  const handleOAuthGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <main>
      <motion.div
        style={{
          background:
            "radial-gradient(70% 70% at 0% 0%,#222222 0%,#09090b 100%)",
        }}
        className="w-full h-full absolute top-0 left-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      ></motion.div>
      <div className="flex items-center justify-center p-6 h-[80svh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="max-md:mt-12 z-[2] absolute border border-white/10 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[480px] translate-x-[-50%] translate-y-[-50%] md:rounded-xl bg-[#101010]  p-[25px] focus:outline-none "
        >
          <h1 className="text-4xl font-bold">Start your experience</h1>
          <h1 className="text-xl ml-0.5 mt-1 ">Navigate to the AI universe</h1>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="my-4 w-full p-3 rounded-md bg-neutral-800 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:border-2"
          ></input>
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mb-4 w-full p-3 rounded-md bg-neutral-800 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:border-2"
          ></input>
          <button
            onClick={handleSignIn}
            className="w-full p-3 font-bold rounded-md bg-neutral-800/80 text-white hover:bg-white/20  gtransition focus:outline-none border-2 border-white/20"
          >
            Sign In
          </button>
          <p className="text-xs  my-2 text-neutral-300 text-center">
            or continue with
          </p>
          <div className=" grid grid-cols-1 md:grid-cols-8 w-full grid-rows-1 gap-4 gtransition pb-4 z-[2] mb-4 mt-2">
            <button
              onClick={handleOAuthDiscord}
              className="md:col-span-4 w-full h-full p-3 gap-4 flex flex-col rounded-lg bg-neutral-800/80 hover:bg-white/20 gtransition justify-center items-center text-center relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 127.14 96.36"
                width={"2rem"}
                height={"2rem"}
              >
                <path
                  fill="#fff"
                  d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
                />
              </svg>
            </button>
            <button
              onClick={handleOAuthGithub}
              className="md:col-span-4 w-full h-full p-3 gap-4 flex flex-col rounded-lg bg-neutral-800/80 hover:bg-white/20 gtransition justify-center items-center text-center relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
                width={"2rem"}
                height={"2rem"}
              >
                <path
                  fill="#fff"
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                />
              </svg>
            </button>
          </div>
          <p className="text-red-500 font-mono text-sm text-center pb-2">
            {error}
          </p>
          <button
            onClick={() => (window.location.href = `/login/new-user`)}
            className="w-full p-3 font-bold rounded-md bg-white text-black hover:bg-white/80 gtransition focus:outline-none"
          >
            Sign Up
          </button>
          <div className="text-center flex-col flex py-3 gap-1">
            <a
              href="/login/fast-link"
              className="text-neutral-300 text-md hover:text-white gtransition mb-2"
            >
              or use <strong>Fast Link</strong>
            </a>
            <div className="border border-white/10 rounded-lg my-3" />
            <a
              href="/login/forgot-password"
              className="text-neutral-300 text-sm hover:underline"
            >
              Forgot your password?
            </a>
            <a
              href="https://discord.gg/iahispano"
              rel="noreferrer"
              target="_blank"
              className="text-neutral-300 text-sm hover:underline"
            >
              Need more help?
            </a>
            <a
              href="/privacy"
              rel="noreferrer"
              target="_blank"
              className="text-neutral-300 text-sm hover:underline"
            >
              Privacy Policy
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
