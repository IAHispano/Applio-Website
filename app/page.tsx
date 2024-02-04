"use client"

// import SparklesCore from "@/components/landing/particles"
import { motion } from "framer-motion"


export default function IndexPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
        className="absolute top-0 h-full min-w-full overflow-hidden blur-3xl"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 40% 50% at 50% 0%, #00AA68, transparent)",
        }}
      ></motion.div>
      <div className="absolute top-0 h-full min-w-full overflow-hidden">
      {/* <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#FFFFFF"
        /> */}
      </div> 
      <main className="flex flex-col w-full justify-start items-center text-center relative z-[1]">
        <div className="min-h-[70svh] flex flex-col justify-center items-center w-full p-10 pt-32  relative">
          <p className="text-3xl md:text-7xl font-bold tracking-tight md:tracking-tighter py-10 text-white max-w-4xl">A universe of possibilities powered by AI</p>
          <p className="font-mono max-w-xl tracking-wide">At the forefront of innovation as an open-source ecosystem that hosts cutting-edge AI voice cloning technologies.</p>
        <div className="flex justify-center items-center gap-4 flex-wrap py-8">
          <a className="py-2 px-3.5 flex items-center gap-2 bg-[#00AA68]/20 hover:opacity-50 gtransition text-[#00DB86] rounded-lg flex gap-2 z-[1]" href="https://download.applio.org" rel="noreferrer" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg> Download</a>
          <a className="py-2 px-3.5 flex items-center gap-2 bg-[#00AA68]/20 hover:opacity-50 gtransition text-[#00DB86] rounded-lg flex gap-2 z-[1]" href="https://discord.com/invite/iahispano" rel="noreferrer" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 127.14 96.36"><path fill="#00DB86" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></svg> Discord</a>
        </div>
        </div>
      </main>
    </div>
  )
}
