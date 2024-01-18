"use client"

import CountdownTimer from "@/components/idk/countdown";

export default function IndexPage() {

  return (      
    <article className="absolute inset-0 bg-black w-full h-full text-white">
    <a className="min-h-[600px] h-[95svh] flex flex-col justify-center items-center w-full p-10 relative overflow-hidden [&_video]:hover:saturate-150  [&_video]:hover:blur-xl gtransition rounded-b-3xl" href="https://www.youtube.com/watch?v=nxqo6kOhsBI" target="_blank" rel="noreferrer"><video className="absolute top-0 left-0 pointer-events-none h-full w-full object-cover blur-3xl opacity-60 gtransition" playsInline autoPlay muted loop poster="/poster.png"><source src="/background.mp4" type="video/mp4"></source></video>
    <div className=" justify-start items-center text-center flex flex-col gap-4 ">
        <CountdownTimer/>
    </div>
    <div className="absolute flex items-center tracking-tight bottom-10 text-sm md:text-lg text-white/50 hover:text-white gap-2 gtransition">Scroll down to know more...</div>
    </a>
    <main className="flex flex-col w-full justify-start items-center text-center relative bg-black">
      <div className="h-[950px] flex flex-col items-center bg-black w-full p-5 -scroll-mt-1 md:pt-44 pt-12">
        <p className="text-4xl md:text-6xl font-semibold tracking-tighter text-neutral-300 gtransition pb-4">But what is <span className="text-white font-bold">Applio</span>?</p>
        <p className="font-space-grotesk leading-snug text-white text-[16px] lg:text-[20px] max-w-md md:max-w-xl lg:max-w-[640px] text-center mb-8">It is known as the ultimate voice cloning tool, meticulously optimized to offer unmatched power, modularity and ease of use.</p>
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6 max-w-[1200px]">
          <div className="box-border relative flex flex-col gap-5 p-8 overflow-hidden no-underline border text-white rounded-xl dark:border-neutral-800">
            <div className="flex flex-col gap-2">
              <h3 className="m-0 font-bold leading-5  font-space-grotesk text-white">f0 Inference Algorithm Overhaul</h3>
            </div>
          </div>
          <div className="box-border relative flex flex-col gap-5 p-8 overflow-hidden no-underline border text-white rounded-xl dark:border-neutral-800">
            <div className="flex flex-col gap-2">
              <h3 className="m-0 font-bold leading-5  font-space-grotesk text-white">f0 Crepe Pitch Extraction for Training</h3>
            </div>
          </div>
          <div className="box-border relative flex flex-col gap-5 p-8 overflow-hidden no-underline border text-white rounded-xl dark:border-neutral-800">
            <div className="flex flex-col gap-2">
              <h3 className="m-0 font-bold leading-5  font-space-grotesk text-white">f0 Hybrid Estimation Method</h3>
            </div>
          </div>
          <div className="box-border relative flex flex-col gap-5 p-8 overflow-hidden no-underline border text-white rounded-xl dark:border-neutral-800">
            <div className="flex flex-col gap-2">
              <h3 className="m-0 font-bold leading-5  font-space-grotesk text-white">CLI Functionality</h3>
            </div>
          </div>
          <div className="box-border relative flex flex-col gap-5 p-8 overflow-hidden no-underline border text-white rounded-xl dark:border-neutral-800">
            <div className="flex flex-col gap-2">
              <h3 className="m-0 font-bold leading-5  font-space-grotesk text-white">TTS (Text-to-Speech)</h3>
            </div>
          </div>
          <div className="box-border relative flex flex-col gap-5 p-8 overflow-hidden no-underline border text-white rounded-xl dark:border-neutral-800">
            <div className="flex flex-col gap-2">
              <h3 className="m-0 font-bold leading-5  font-space-grotesk text-white">Overtraining Detection</h3>
            </div>
          </div>
          <div className="box-border relative flex flex-col gap-5 p-8 overflow-hidden no-underline border text-white rounded-xl dark:border-neutral-800">
            <div className="flex flex-col gap-2">
              <h3 className="m-0 font-bold leading-5  font-space-grotesk text-white">Mode Collapse Detection</h3>
            </div>
          </div>
          <div className="box-border relative flex flex-col gap-5 p-8 overflow-hidden no-underline border text-white rounded-xl dark:border-neutral-800">
            <div className="flex flex-col gap-2">
              <h3 className="m-0 font-bold leading-5  font-space-grotesk text-white">Data Efficiency</h3>
            </div>
          </div>
          <div className="box-border relative flex flex-col gap-5 p-8 overflow-hidden no-underline border text-white rounded-xl dark:border-neutral-800">
            <div className="flex flex-col gap-2">
              <h3 className="m-0 font-bold leading-5  font-space-grotesk text-white">Efficient Training</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="md:h-[1000px] mt-12 flex flex-col items-center bg-black w-full p-5 ">
        <p className="text-4xl md:text-6xl font-semibold tracking-tighter text-neutral-300 gtransition pb-4 max-md:pt-28">And who made <span className="font-bold text-white">Applio</span>?</p>
        <p className="font-space-grotesk leading-snug text-white text-[16px] lg:text-[20px] max-w-md md:max-w-xl lg:max-w-[640px] text-center mb-8">Who better to do it than you, the community.</p>
        <img src="https://contrib.rocks/image?repo=IAHispano/Applio" alt="Github collaborators" />
      </div>
      <div className="md:h-[400px]  flex flex-col items-center bg-black w-full p-5">
      <p className="font-extrabold tracking-[-0.04em] leading-none text-[40px] md:text-5xl lg:text-[80px] max-w-lg md:max-w-xl lg:max-w-4xl text-center text-white ">Ready to use?</p>
      </div>
    </main>
    </article>
  )
}
