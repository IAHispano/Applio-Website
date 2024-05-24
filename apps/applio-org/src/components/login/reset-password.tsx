"use client"

import { supabase } from "@/utils/database"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ResetPassword(){
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleForgotPassword = async () => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://applio.org/login/forgot-password/update-password'
      })
      if (error) {
        if (error.message.includes('format')) {
          setError('Wrong email address.');
        } 
        if (error.message.includes('rate')) {
          setError('Hey calm down! Try again in a few hours.');
        } 
        return;
      }
        router.refresh();
        setSuccess(true)
    }


    return (
      <main>
      <div className="flex items-center justify-center p-6 h-[100svh]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="max-md:rounded-t-xl max-md:my-20 z-[2] absolute border border-white/10 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[100svh] md:max-w-[480px] translate-x-[-50%] translate-y-[-50%] md:rounded-xl bg-white/10 p-[25px] focus:outline-none ">
          <h1 className="text-4xl">Forgot password?</h1>
          <input required type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="my-4 w-full p-3 rounded-md bg-white/10 text-white placeholder-white/80 focus:outline-none focus:border-white/40 focus:border-2" disabled={success}></input>
          <p className="text-red-500 font-mono text-sm text-center pb-2">{error}</p>
          <button onClick={handleForgotPassword} className="w-full p-3 font-bold rounded-md bg-neutral-800/80 text-white hover:bg-white/20  gtransition focus:outline-none border-2 border-white/20" disabled={success}>Next</button>
          {success && !error && (
          <div className="p-4 bg-neutral-800 h-44 w-full my-4 rounded-xl text-white text-center flex flex-col justify-center items-center">
          <motion.svg xmlns="http://www.w3.org/2000/svg" initial={{opacity: 0, rotate: 0, scale: '105%', marginBottom: '10px'}} animate={{opacity: 1, rotate: 10, scale: '100%', marginBottom: '0px'}} transition={{duration: 0.8}} width="4rem" height="4rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-check"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><motion.path initial={{pathLength: 0}} animate={{pathLength: 1}} transition={{duration: 0.8}} color="rgb(34 197 94)" d="m16 19 2 2 4-4"/></motion.svg>
          <motion.p initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.8, delay: 1}} className="text-xs mt-2">We have sent you an email, please check it to continue with the password change.</motion.p>
          </div> 
          )}
          <div className="text-center flex-col flex py-3 gap-1">
          <div className="border border-white/10 rounded-lg my-3"/>
          <a href="https://discord.gg/iahispano" rel="noreferrer" target="_blank" className="text-neutral-300 text-sm hover:underline">Need more help?</a>
          <a href="/login" className="text-neutral-300 text-sm hover:underline">Return</a>
          </div>
        </motion.div>
      </div>
      </main>
    )
}