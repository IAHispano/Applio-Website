"use client"


import { supabase } from "@/utils/database"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function AuthUI(){
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const t = useTranslations("login")

    const handleSignIn = async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
    
      if (error) {
        if (error.message.includes('credentials')) {
          setError('Wrong email or password.');
        } else {
          setError('Login error.');
        }
        return;
      }
    
      router.refresh();
    };
    
    

    const handleOAuthDiscord = async () => {
      await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: `${location.origin}/auth/callback`
        }
      })
    }

    const handleOAuthGithub = async () => {
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${location.origin}/auth/callback`
        }
      })
    }


    return (
      <main>
      <div className="flex items-center justify-center p-6 md:h-[80svh] h-full max-md:pb-24">
        <div className="max-md:pb-24 grid gap-4 md:grid-cols-2 max-md:rounded-t-xl max-md:mt-12 z-[2] absolute border border-white/10 top-[49%] left-[50%] max-h-full h-full md:h-auto md:max-h-[70vh] w-full md:w-[90vw] md:max-w-[100vh] translate-x-[-50%] translate-y-[-50%] md:rounded-xl bg-white/10 backdrop-blur-3xl p-[25px] focus:outline-none ">
          <div className="md:max-w-md min-h-full">
            <h1 className="text-4xl font-medium tracking-lighter mt-0.5 mb-2">{t("title")} Applio TV</h1>
          <input required type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("email_placeholder")} className="my-4 mt-6 w-full p-3 rounded-md bg-neutral-800 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:border-2"></input>
          <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("password_placeholder")} className="mb-4 w-full p-3 rounded-md bg-neutral-800 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:border-2"></input>
          <button onClick={handleSignIn} className="w-full p-3 font-bold rounded-md bg-neutral-700/80 text-white hover:bg-white/20  gtransition focus:outline-none">{t("sign_in")}</button>
          <p className="text-red-500 font-mono text-sm text-center pb-2">{error}</p>
          <button onClick={() => (window.location.href = `https://applio.org/login/new-user`)} className="w-full p-3 mt-2 font-bold rounded-md bg-white text-black hover:bg-white/80 gtransition focus:outline-none">{t("sign_up")}</button>
          <p className="text-xs  my-2 mt-6 text-neutral-300 text-center">{t("continue_with")}</p>
          <div className=" grid grid-cols-1 md:grid-cols-8 w-full grid-rows-1 gap-4 gtransition pb-4 z-[2] mb-4 mt-2">
          <button onClick={handleOAuthDiscord} className="md:col-span-4 w-full h-full p-3 gap-4 flex flex-col rounded-lg bg-neutral-700/80 hover:bg-white/20 gtransition justify-center items-center text-center relative"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" width={'2rem'} height={'2rem'}><path fill="#fff" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></svg></button>
          <button onClick={handleOAuthGithub} className="md:col-span-4 w-full h-full p-3 gap-4 flex flex-col rounded-lg bg-neutral-700/80 hover:bg-white/20 gtransition justify-center items-center text-center relative"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" width={'2rem'} height={'2rem'}><path fill="#fff" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg></button>       
          </div>
          <div className="text-center flex-col flex py-3 gap-1 md:block hidden">
          <div className="border border-white/10 rounded-lg mb-4"/>
          <a href="https://applio.org/login/forgot-password" rel="noreferrer" target="_blank"  className="text-neutral-300 text-sm hover:underline">{t("forgot_password")}</a>
          <a href="https://discord.gg/iahispano" rel="noreferrer" target="_blank" className="text-neutral-300 text-sm hover:underline">{t("more_help")}</a>
          <a href="https://applio.org/privacy" rel="noreferrer" target="_blank"  className="text-neutral-300 text-sm hover:underline">{t("privacy_policy")}</a>
          </div>
          </div>
          <div className="grid-cols-8 md:grid gap-4 w-full h-full max-md:mb-36 hidden">
          <article className="bg-white/30 col-span-3 rounded-xl">
          <img className="w-full h-full rounded-xl object-cover" src="/login3.png"/>
          </article>
          <article className="bg-white/30 col-span-5 rounded-xl">
          <img className="w-full h-full rounded-xl object-cover" src="/login4.png"/>
          </article>
          <article className="bg-white/30 col-span-6 rounded-xl">
          <img className="w-full h-full rounded-xl object-cover" src="/login1.png"/>
          </article>
          <article className="bg-white/30 col-span-2 rounded-xl">
            <img className="w-full h-full rounded-xl object-cover" src="/login2.png"/>
          </article>

        </div>
        </div>
      </div>
      <div className="w-full fixed bottom-0 z-50">
            <div className="absolute inset-x-0 bottom-0 w-full h-[120px] bg-gradient-to-t from-black to-transparent -z-10"></div>
            <div className="z-50 flex flex-cols-2 gap-1 justify-end mx-6 my-4">
            <a href="/" className="flex flex-col justify-center items-center text-center"><svg width="48" height="48" viewBox="0 0 234 262" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M135.513 62.3751C147.067 58.1154 158.525 55.8833 170.37 56.3098C187.624 56.6716 200.645 64.798 211.496 77.4453C223.714 91.6854 230.765 108.314 232.816 127.159C233.997 138.015 233.579 148.867 232.096 159.712C230.079 174.461 226.723 188.814 220.711 202.377C215.539 214.046 210.122 225.671 201.937 235.467C191.702 247.715 179.377 256.934 163.96 261.07C158.673 262.489 153.394 262.284 148.174 260.46C140.316 257.715 132.336 255.377 124.382 252.951C120.685 251.823 117.075 251.778 113.381 252.779C103.715 255.397 94.1003 258.262 84.352 260.501C70.7036 263.635 58.4583 260.589 47.8815 250.749C31.5163 235.525 20.0427 216.888 11.6532 196.056C6.3285 182.835 2.38509 169.159 1.11337 154.889C-1.00264 131.144 2.09256 108.292 14.5403 87.6696C21.3562 76.3778 30.1515 66.9244 41.8262 60.7726C48.9133 57.0381 56.5469 55.9969 64.3976 56.211C77.8502 56.5777 90.9126 59.6333 104.022 62.364C104.929 62.553 105.843 62.7072 106.758 62.8502C106.882 62.8695 107.029 62.7277 107.387 62.5514C106.487 59.0799 104.779 55.9439 102.981 52.9121C98.641 45.5932 93.7666 38.6507 88.6491 31.8884C87.094 29.8335 85.2169 28.8951 82.6445 28.9401C77.21 29.0352 75.1317 25.9196 76.8318 20.5179C78.6004 14.8982 83.636 13.0338 88.4334 16.1936C90.0258 17.2423 91.34 18.575 92.5448 20.0585C97.7514 26.4697 102.077 33.4992 106.113 40.7275C108.181 44.4316 109.465 48.471 110.632 52.5545C110.929 53.5964 111.012 54.7785 112.093 55.6003C113.53 54.3577 113.268 52.5027 113.421 50.9983C114.94 36.0447 122.093 24.6043 133.415 15.5219C141.19 9.28455 149.27 3.72894 158.812 0.812341C159.702 0.54056 160.606 0.301193 161.517 0.130463C165.002 -0.521938 167.028 1.30135 167.459 4.9527C169.472 22.037 162.663 35.4978 151.473 47.2382C147.213 51.707 142.602 55.7337 137.741 59.4719C136.959 60.073 136.013 60.546 135.513 62.3751Z" fill="#fff"></path></svg></a>
            <h1 className="text-6xl font-medium tracking-tight text-white max-w-4xl">tv</h1>
            </div>
            </div>
      </main>
    )
}