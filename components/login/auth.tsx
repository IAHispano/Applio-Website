"use client"

import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Auth } from "@supabase/auth-ui-react"
import { motion } from 'framer-motion';
import SparklesCore from '@/components/landing/particles';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthUI() {
  const supabase = createClientComponentClient()

  return (
  <div className="flex flex-col">
    <div className="absolute top-0 h-full min-w-full overflow-hidden">
  <SparklesCore
      id="tsparticlesfullpage"
      background="transparent"
      minSize={0.6}
      maxSize={1.4}
      particleDensity={30}
      className="size-full"
      particleColor="#FFFFFF"
    /> 
  </div> 
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 1 }} className="absolute drop-shadow-2xl border border-white/10 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] md:rounded-xl bg-neutral-800/40 p-[25px] focus:outline-none ">
  <div className='max-w-2xl max-md:py-24'>
  <Auth
    supabaseClient={supabase}
    providers={['discord', 'twitter', 'github']}
    redirectTo='http://applio.org/auth/callback'
    appearance={{ 
    theme: ThemeSupa, }}
    theme='dark'
    socialLayout='vertical'
    showLinks
    onlyThirdPartyProviders
  />
  </div>
</motion.div>
</div>
  ); 
}