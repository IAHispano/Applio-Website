"use client"

import { supabase } from "@/utils/database"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Updatepassword(){
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter();

    const handleUpdate= async () => {
      setError("")
      const { data, error } = await await supabase.auth.updateUser({
        password: password
        
      })
      if (error) {
        console.log(error)
        if (error.message.includes('Password should be at least 6 characters')) {
            setError('Password should be at least 6 characters.');
          }
        if (error.message.includes('password should be different')) {
          setError('New password should be different from the old password.');
        }
        if (error.message.includes('rate')) {
          setError('Hey calm down! Try again in a few hours.');
        } 
        return;
      } 

      if (data) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
        
    }


    return (
      <main className="w-full h-full absolute top-0 bg-gradient-to-b from-[#333333] to-[#110f0f] z-50">
        <section className="flex justify-center md:items-center m-auto w-full h-full p-8">
          <div className="bg-[#4d4c4c] w-full py-12 rounded-xl md:p-8 p-4 xl:max-w-[30%] md:max-w-[60%] md:max-h-fit flex flex-col gap-4">
            <div className="flex flex-col 2xl:items-center items-left gap-0 max-md:px-4">
            <h1 className="text-4xl font-medium">Forgot your password?</h1>
            <h2 className="text-sm max-w-[80%] max-2xl:mt-2">We will send you an email with the steps to follow.</h2>
            </div>
            <div className="flex flex-col w-full h-full gap-4 md:mt-10 mt-6 max-md:px-2">
              <input 
                value={password} 
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value === '') {
                    setError("");
                  }
                }} 
                className="rounded-xl bg-black/20 border border-white/20 p-3 focus:outline-none focus:border focus:border-white/40" 
                placeholder="Password"
              />
              {error && !success && <p className="flex justify-center text-xs p-3 bg-red-500/40 text-white rounded-xl font-medium">{error}</p>}
              {success && <p className="w-full p-2 bg-green-400/40 rounded-xl text-center text-sm">Password changed! Redirecting...</p>}
              <button onClick={() => handleUpdate()} className="w-full bg-[#666666] border border-white/20 hover:bg-opacity-80 hover:border-white/10 slow p-2 rounded-2xl font-semibold">Change</button>
              <a href="/login" className="text-sm flex justify-center mx-auto hover:underline text-neutral-300 hover:text-white slow cursor-pointer w-fit">Return</a>
            </div>
          </div>
        </section>
      </main>
    )
}