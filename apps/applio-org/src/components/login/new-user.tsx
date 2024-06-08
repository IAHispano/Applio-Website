"use client"

import { supabase } from "@/utils/database"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewuserUI(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const generateID = () => {
        const randomNumber = Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);
        const id = randomNumber.toString();
        return id;
    }

    const handleSignUp = async () => {
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: `https://applio.org/auth/callback`,
                data: {
                    sub: generateID(),
                    full_name: username,
                }
            }
        });

        if (error) {
          console.error(error);
          if (error.message.includes('password')) {
            setError('Password should be at least 6 characters.');
          }
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
      <div className="flex items-center justify-center p-6 h-[80svh]">
        <div className="w-full max-w-2xl md:h-fit h-full mt-44 md:m-52 bg-white/10 backdrop-blur-3xl md:p-12 max-md:p-4 rounded-lg">
          <h1 className="text-4xl font-medium tracking-lighter mt-0.5 mb-2">Welcome to Applio Community</h1>
          <form>
          <input required type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="my-4 w-full p-3 rounded-md bg-white/10 text-white placeholder-white/80 focus:outline-none focus:border-white/40 focus:border-2" disabled={success}></input>
          <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mb-4 w-full p-3 rounded-md bg-white/10 text-white placeholder-white/80 focus:outline-none focus:border-white/40 focus:border-2" disabled={success}></input>
          <input required type="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="mb-8 w-full p-3 rounded-md bg-white/10 text-white placeholder-white/80 focus:outline-none focus:border-white/40 focus:border-2" disabled={success}></input>
          </form>
          <p className="text-red-500 font-mono text-sm text-center pb-2">{error}</p>
          <button type="submit" onClick={handleSignUp}  className={`w-full p-3 font-bold rounded-md bg-white text-black hover:bg-opacity-80 slow focus:outline-none border-2 border-white/20 ${success ? 'cursor-not-allowed opacity-40 hover:none' : 'cursor-pointer'}`} disabled={success}>Join the Applio family</button>
          {success && (
          <div className="p-4 bg-white/10 h-44 w-full my-4 rounded-xl text-white text-center flex flex-col justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-check"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path  color="rgb(34 197 94)" d="m16 19 2 2 4-4"/></svg>
          <p className="text-xs mt-2">We have sent you an email, please check it to complete your registration.</p>
          </div> 
          )}
          <div className="text-center flex-col flex py-3 gap-1">
          <div className="border border-white/10 rounded-lg my-3"/>
          <a href="https://discord.gg/iahispano" rel="noreferrer" target="_blank" className="text-neutral-300 text-sm hover:underline">Need more help?</a>
          <a href="/privacy" rel="noreferrer" target="_blank"  className="text-neutral-300 text-sm hover:underline">Privacy Policy</a>
          <a href="/login" className="text-neutral-300 text-sm hover:underline">Return</a>
          </div>
        </div>
      </div>
      </main>
    )
}