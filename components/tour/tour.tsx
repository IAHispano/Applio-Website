"use client"

import { useEffect, useState } from "react"

export default function Tour2023({
  numberOfModels,
  modelLikes,
  kitsAiCount,
  rvcCount,
  epochsCount,
  apiUsage,
  full_name,
}: Readonly<{
  numberOfModels: number
  modelLikes: any
  kitsAiCount: number
  rvcCount: number
  epochsCount: number
  apiUsage: number
  full_name: string
}>) {
  const [pageNumber, setPageNumber] = useState(1)

  const handleNextClick = () => {
    setPageNumber((prevPageNumber) =>
      prevPageNumber < 12 ? prevPageNumber + 1 : 12
    )
  }

  const handleBackClick = () => {
    setPageNumber((prevPageNumber) =>
      prevPageNumber > 1 ? prevPageNumber - 1 : 1
    )
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      handleNextClick()
    } else if (event.key === "ArrowLeft") {
      handleBackClick()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  return (
    <div className="z-10 text-white flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="md:bg-black md:hover:saturate-200 md:saturate-150 gtransition md:border-2 md:border-white/40 md:w-[100rem]  md:h-[50rem] rounded-xl md:flex md:justify-center md:items-center text-center md:relative">
        {pageNumber !== 12 && pageNumber !== 11 && (
          <div className="md:w-[1000px] w-full justify-center items-center flex h-[300px] bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-[#41295a] blur-[160px] to-[#2F0743] absolute rounded-lg animate-gradient"></div>
        )}
        {pageNumber === 1 && (
          <article>
            <div className="z-30 gap-4 flex flex-col items-center">
              <div className="flex items-center">
                <h1 className="animate-delay-20 fade-in z-30 bg-clip-text text-center font-semibold leading-tight text-white md:text-9xl text-7xl">
                  Tour 2023
                </h1>
              </div>
              <p className="animate-delay-20 fade-in text-center w-full justify-center items-center flex md:text-lg text-sm tracking-tight text-neutral-300 z-30">
                Your annual summary is now available! Discover your achievements
                with us.
              </p>
              <button
                onClick={handleNextClick}
                className="z-30 flex items-center gap-1 border-2 border-white/40 text-white-500 hover:border-white active:opacity-50 font-medium py-1 px-8 rounded-lg gtransition"
              >
                Start
              </button>
            </div>
            <p className="inset-0 absolute md:py-6 max-md:pt-44 md:ml-6 max-md:mx-4 text-xs text-neutral-300">
              You can move forward or backward with the arrow keys or the
              keyboard.
            </p>
          </article>
        )}
        {pageNumber === 2 && (
          <article className="">
            <div className="z-30 gap-4 flex flex-col items-center">
              <h1 className="z-30 bg-clip-text text-center font-semibold leading-tight text-white md:text-6xl text-4xl">
                You have uploaded{" "}
                <span className="underline underline-offset-8 decoration-white/50 text-7xl">
                  {numberOfModels}
                </span>{" "}
                <span>models</span>
              </h1>
              <h2 className="max-w-xl text-center w-full md:text-2xl text-xl tracking-tight text-neutral-200 z-30">
                2023 has been your year; you have reached{" "}
                <span className="font-semibold text-white">
                  impressive levels
                </span>{" "}
                by surpassing yourself.
              </h2>
            </div>
          </article>
        )}
        {pageNumber === 3 && (
          <article className="">
            <div className="z-30 gap-4 flex flex-col items-center">
              <h1 className="animate-delay-40 fade-in z-30 bg-clip-text text-center font-semibold leading-tight text-white md:text-6xl text-4xl">
                They usually have{" "}
                <span className="underline underline-offset-8 decoration-white/50 text-7xl">
                  {epochsCount}
                </span>{" "}
                epochs
              </h1>
              <h2 className="animate-delay-20 slide-up max-w-xl text-center w-full md:text-2xl text-xl tracking-tight text-neutral-200 z-30">
                More epochs,{" "}
                <span className="font-semibold text-white">
                  higher quality!
                </span>
              </h2>
            </div>
          </article>
        )}
        {pageNumber === 4 && (
          <article className="">
            <div className="z-30 gap-4 flex flex-col items-center">
              <h1 className="animate-delay-40 fade-in z-30 bg-clip-text text-center font-semibold leading-tight text-white md:text-6xl text-4xl">
                <span className="underline underline-offset-8 decoration-white/50 text-7xl">
                  {kitsAiCount}
                </span>{" "}
                come from kits.ai
              </h1>
              <h2 className="animate-delay-20 slide-up max-w-xl text-center w-full md:text-2xl text-xl tracking-tight text-neutral-200 z-30">
                A{" "}
                <span className="font-semibold text-white">
                  simple and efficient
                </span>{" "}
                way to create models.
              </h2>
            </div>
          </article>
        )}
        {pageNumber === 5 && (
          <article className="">
            <div className="z-30 gap-4 flex flex-col items-center">
              <h1 className="animate-delay-40 fade-in z-30 bg-clip-text text-center font-semibold leading-tight text-white md:text-6xl text-4xl">
                <span className="underline underline-offset-8 decoration-white/50 text-7xl">
                  {rvcCount}
                </span>{" "}
                from RVC
              </h1>
              <h2 className="animate-delay-20 slide-up max-w-xl text-center w-full md:text-2xl text-xl tracking-tight text-neutral-200 z-30">
                You usually share{" "}
                <span className="font-semibold text-white">good models</span>.
              </h2>
            </div>
          </article>
        )}
        {pageNumber === 6 && (
          <article className="">
            <div className="z-30 gap-4 flex flex-col items-center">
              <h1 className="animate-delay-40 fade-in z-30 bg-clip-text text-center font-semibold leading-tight text-white md:text-6xl text-4xl">
                You have{" "}
                <span className="underline underline-offset-8 decoration-white/50 text-7xl">
                {parseInt(modelLikes, 10)}
                </span>{" "}
                <span>likes</span>
              </h1>
              <h2 className="animate-delay-20 slide-up max-w-xl text-center w-full md:text-2xl text-xl tracking-tight text-neutral-200 z-30">
                The community has loved you like{" "}
                <span className="font-semibold text-white">never before</span>.
              </h2>
            </div>
          </article>
        )}
        {pageNumber === 7 && (
          <article className="">
            <div className="z-30 gap-4 flex flex-col items-center">
              <h1 className="animate-delay-40 fade-in z-30 bg-clip-text text-center font-semibold leading-tight text-white md:text-6xl text-4xl">
                You used our <span>API</span>{" "}
                <span className="underline underline-offset-8 decoration-white/50 text-7xl">
                  {apiUsage}
                </span>{" "}
                times
              </h1>
              <h2 className="animate-delay-20 slide-up max-w-xl text-center w-full md:text-2xl text-xl tracking-tight text-neutral-200 z-30">
                You are a{" "}
                <span className="font-semibold text-white">good developer</span>
                .
              </h2>
            </div>
          </article>
        )}
        {pageNumber === 8 && (
          <article className="">
            <div className="z-30 gap-4 flex flex-col items-center">
              <h1 className="animate-delay-40 fade-in z-30 bg-clip-text text-center font-semibold leading-tight text-white md:text-5xl text-3xl max-w-xl px-4">
                You have done your best! As a result, you have become...
              </h1>
            </div>
          </article>
        )}
        {pageNumber === 9 && (
          <article className="">
            <div className="z-30 gap-4 flex flex-col items-center">
              {numberOfModels <= 20 && (
                <div className="md:h-[38rem] md:w-[25rem] h-[35rem] md:mt-0 mt-8 w-80 border-2 border-white/40 bg-clip-padding backdrop-filter backdrop-blur-sm bg-black/80 rounded-lg z-50 ">
                  <div className="circlePosition md:w-[20rem] -z-10 w-full justify-center items-center flex h-[25rem] bg-gradient-to-r from-[#000] blur-[120px] to-white/80 flex rounded-lg animate-gradient absolute"></div>
                  <img
                    alt="Level Avatar"
                    src="https://i.pinimg.com/564x/4a/df/f2/4adff294e337ce28439ca934a08dadce.jpg"
                    className="h-96 z-30 rounded-xl w-80 justify-center items-center flex mx-auto my-4"
                  />
                  <h1 className="animate-delay-40 fade-in z-50 bg-clip-text text-center font-semibold leading-tight text-white md:text-6xl text-4xl ">
                    Fan
                  </h1>
                  <h2 className="animate-delay-20 fade-in max-w-xl text-center w-full md:text-xl text-xl tracking-tight px-6 text-neutral-200 z-50">
                    This is a hobby for you, you do it from time to time and try
                    to learn.
                  </h2>
                </div>
              )}
              {numberOfModels > 20 && numberOfModels <= 30 && (
                <div className="md:h-[38rem] md:w-[25rem] h-[38rem] md:mt-0 mt-12 w-80 border-2 border-white/40 bg-clip-padding backdrop-filter backdrop-blur-sm bg-black/80 rounded-lg z-50 ">
                  <div className="circlePosition md:w-[20rem] -z-10 w-full justify-center items-center flex h-[25rem] bg-gradient-to-r from-[#000] blur-[120px] to-white/80 flex rounded-lg animate-gradient absolute"></div>
                  <img
                    alt="Level Avatar"
                    src="https://i.pinimg.com/564x/20/fa/42/20fa42814988311ad53ddbe6fc4ed9b8.jpg"
                    className="h-96 z-30 rounded-xl w-80 justify-center items-center flex mx-auto my-4"
                  />
                  <h1 className="animate-delay-40 fade-in z-50 bg-clip-text text-center font-semibold leading-tight text-white md:text-6xl text-4xl ">
                    Adventurer
                  </h1>
                  <h2 className="animate-delay-20 fade-in max-w-xl text-center w-full md:text-xl text-xl tracking-tight px-6 text-neutral-200 z-50">
                    You usually make quality models, you are usually active on
                    the AI Hispano server, and you like music!
                  </h2>
                </div>
              )}
              {numberOfModels > 30 && numberOfModels <= 70 && (
                <div className="md:h-[38rem] md:w-[25rem] h-[40rem] md:mt-0 mt-24 w-80 border-2 border-white/40 bg-clip-padding backdrop-filter backdrop-blur-sm bg-black/80 rounded-lg z-50 ">
                  <div className="circlePosition md:w-[20rem] -z-10 w-full justify-center items-center flex h-[25rem] bg-gradient-to-r from-[#000] blur-[120px] to-blue-500/30 flex rounded-lg animate-gradient absolute"></div>
                  <img
                    alt="Level Avatar"
                    src="https://i.pinimg.com/564x/71/65/e3/7165e34e650e917b44f6f822a077cf16.jpg"
                    className="h-96 z-30 rounded-xl w-80 justify-center items-center flex mx-auto my-4"
                  />
                  <h1 className="animate-delay-40 fade-in z-50 bg-clip-text text-center font-semibold leading-tight text-white md:text-6xl text-4xl ">
                    Admin
                  </h1>
                  <h2 className="animate-delay-20 fade-in max-w-xl text-center w-full md:text-xl text-xl tracking-tight px-6 text-neutral-200 z-50">
                    You&apos;re an AI genius, you&apos;re always making models,
                    you hang out on Discord and you have a Tiktok account where
                    you share your music.
                  </h2>
                </div>
              )}
              {numberOfModels > 71 && (
                <div className="md:h-[38rem] md:w-[25rem] h-[38rem] md:mt-0 mt-14 w-80 border-2 border-white/40 bg-clip-padding backdrop-filter backdrop-blur-sm bg-black/80 rounded-lg z-50 ">
                  <div className="circlePosition md:w-[20rem] -z-10 w-full justify-center items-center flex h-[25rem] bg-gradient-to-r from-[#000] blur-[120px] to-[#484848] flex rounded-lg animate-gradient absolute"></div>
                  <img
                    alt="Level Avatar"
                    src="https://i.pinimg.com/564x/3c/12/be/3c12be38d743fa93d5240c248dd73b0b.jpg"
                    className="h-96 z-30 rounded-xl w-80 justify-center items-center flex mx-auto my-4"
                  />
                  <h1 className="animate-delay-40 fade-in z-50 bg-clip-text text-center font-semibold leading-tight text-white md:text-6xl text-4xl ">
                    Legend
                  </h1>
                  <h2 className="animate-delay-20 fade-in max-w-xl text-center w-full md:text-xl text-xl tracking-tight px-6 pt-2 text-neutral-200 z-50">
                    There&apos;s not much more to say, you are a legend for
                    artificial intelligence.
                  </h2>
                </div>
              )}
            </div>
          </article>
        )}
        {pageNumber === 10 && (
          <article className="">
            <div className="z-30 gap-4 flex flex-col items-center">
              <h1 className="animate-delay-40 fade-in z-30 bg-clip-text text-center font-semibold leading-tight text-white md:text-5xl text-3xl max-w-3xl">
                <span className="slide-up underline">{full_name}</span>,{" "}
                <span className="animate-delay-40 fade-in">
                  thank you for this year with us, we look forward to seeing you
                  in 2024!
                </span>{" "}
              </h1>
            </div>
          </article>
        )}
        {pageNumber === 11 && (
          <article className="">
            <div className="z-30 gap-4 flex flex-col items-center">
              <h1 className="animate-delay-40 fade-in z-30 bg-clip-text text-center leading-tight font-bold text-white md:text-9xl text-3xl max-w-sm">
                Happy 2024
              </h1>
            </div>
          </article>
        )}
        {pageNumber === 12 && (
          <article className="">
            <div className="z-30 gap-4 flex flex-col items-center">
              <img
                alt="AI Hispano Logo"
                src="/aihispano_logo.webp"
                className="w-96 h-96 z-30"
              />
            </div>
            <p className="text-neutral-300 text-xs">
              made by{" "}
              <a
                className="font-semibold hover:underline"
                href="https://twitter.com/bygimenezz"
              >
                bydeivih
              </a>{" "}
              for fun
            </p>
          </article>
        )}
        <div className="z-30">
          <button
            onClick={handleBackClick}
            className="text-sm text-white m-4 absolute md:top-2 top-24 left-2 w-6 h-6 cursor-pointer"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <button
            onClick={handleNextClick}
            className="text-sm text-white m-4 absolute md:top-2 top-24 right-2 w-6 h-6 cursor-pointer"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <span className="text-xl absolute bottom-0 inset-x-0 m-4">
            {pageNumber}
          </span>
        </div>
      </div>
    </div>
  )
}
