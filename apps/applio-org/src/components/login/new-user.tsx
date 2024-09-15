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
          console.log(error)
          if (error.message.includes('Password should be at least 6 characters')) {
              setError('Password should be at least 6 characters.');
          } else {
          if (error.message.includes('rate')) {
            setError('Hey calm down! Try again in a few hours.');
          } else {
            setError('Unknown error, please try again later.')
          } }
          return;
        } 

        router.refresh();
        setSuccess(true)
    }

    console.log(error)

    return (
      <main>
      <div className="w-full h-full absolute top-0 bg-gradient-to-b from-[#333333] to-[#110f0f] z-50">
        <div className="flex justify-center items-center m-auto w-full h-full p-8">
          <div className="bg-[#4d4c4c] w-full h-full rounded-xl p-8 xl:max-w-[30%] md:max-w-[60%] md:max-h-[70%] flex flex-col gap-4">
          <h1 className="text-4xl font-medium tracking-lighter mt-0.5 mb-2 text-center">Welcome to Applio Community</h1>
          <form className="flex flex-col w-full h-full gap-4 md:mt-4 mt-6 max-md:px-2">
          <input required type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="rounded-xl bg-black/20 border border-white/20 p-3 focus:outline-none focus:border focus:border-white/40" disabled={success}></input>
          <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="rounded-xl bg-black/20 border border-white/20 p-3 focus:outline-none focus:border focus:border-white/40" disabled={success}></input>
          <input required type="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="rounded-xl bg-black/20 border border-white/20 p-3 focus:outline-none focus:border focus:border-white/40" disabled={success}></input>
          </form>
          {error && <p className="bg-red-500/40 p-4 rounded-xl text-sm text-center">{error}</p>}
          {success && (
          <div className="p-4 bg-white/10 h-44 w-full my-4 rounded-xl text-white text-center flex flex-col justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-check"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path  color="rgb(34 197 94)" d="m16 19 2 2 4-4"/></svg>
          <p className="text-xs mt-2">We have sent you an email, please check it to complete your registration.</p>
          </div> 
          )}
          <button type="submit" onClick={handleSignUp}  className="w-full bg-white text-black border border-white/20 hover:bg-opacity-80 hover:border-white/10 slow p-2 rounded-2xl font-semibold" disabled={success}>Join</button>
          <div className="text-center flex-col flex gap-1">
          <a href="/login" className="text-sm flex justify-center mx-auto hover:underline text-neutral-300 hover:text-white slow cursor-pointer w-fit">Return</a>
          </div>
        </div>
        </div>
      </div>
      </main>
    )
}