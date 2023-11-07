"use client"
import { Button, Link } from "@nextui-org/react";

export default function api() {
  return (
    <main className="min-h-screen flex flex-col justify-start items-center py-8 md:w-5/6 mx-auto px-5">
    <div className="grid grid-cols-1 md:grid-cols-8 w-full grid-rows-1 gap-5 gtransition">
        <article className="md:col-span-8 overflow-hidden md:h-72 relative md:hover:h-96 md:hover:-mx-5 md:hover:w-[calc(100%+40px)] md:hover:rounded-[2rem] gtransition w-full h-full p-5 gap-4 flex flex-col rounded-3xl border-2 border-white/20 bg-black justify-start items-start relative">
            <div id="h-full flex flex-col justify-center items-center bg-black w-full p-10 absolute overflow-hidden blur-lg scale-110 -ml-5 -mt-5 gtransition-5" >
                <img className="absolute top-0 left-0 pointer-events-none h-full w-full object-cover blur-3xl opacity-70 hover:opacity-75" src="https://camo.githubusercontent.com/bffdf5c096954637ef527b596a05e13d3cc598423fa029a2b5d3d3ce18fb91e0/68747470733a2f2f646f63732e6170706c696f2e6f72672f6173736574732f6170706c696f2e706e67"></img>
            </div>
            <div className="flex flex-col justify-center items-center text-center gap-4 w-full h-full z-[2] p-5">
                <h2 className="text-5xl md:text-6xl md:hover:text-8xl font-bold tracking-tighter gtransition-5 text-white">Introducing Applio API</h2>
                <p className="text-white">Now create, experiment and developer: free, easy and fast.</p>
                <div className="flex flex-col-2 gap-4">
                <Button color="primary" className="hover:scale-110 -bottom-4" as={Link} href="https://docs.google.com/forms/d/e/1FAIpQLSd0YLF8D4n2KNzxDXDfQXhwrQ0KaIGg-Urezlbcix3lKJVHrg/viewform?usp=send_form" target="_blank">Request Access</Button>
                <Button color="primary" variant="faded" className="hover:scale-110 -bottom-4" as={Link} href="/api/docs">Read Docs</Button>
                </div>
            </div>
        </article>
        <article className="md:col-span-3 w-full h-full p-5 gap-4 flex flex-col rounded-3xl undefined bg-black justify-start items-start relative border-2 border-white/5">
            <section className="w-full flex flex-col gap-2 rounded-lg min-h-[13rem] max-h-[16rem] flex-grow overflow-y-auto max-md:min-h-[8rem]">
                <p className="text-center w-full h-full justify-center items-center flex text-5xl max-md:text-2xl font-semibold text-white px-5 break-words">+500.000 Models</p>
            </section>
        </article>
        <article className="md:col-span-5 w-full h-full p-5 gap-4 flex flex-col rounded-3xl undefined bg-black justify-start items-start relative border-2 border-white/5">
            <section className="w-full flex flex-col gap-2 rounded-lg min-h-[13rem] max-h-[16rem] flex-grow overflow-y-auto max-md:min-h-[8rem]">
                <p className="text-center w-full h-full justify-center items-center flex text-5xl max-md:text-2xl font-semibold text-white px-5 " style={{ wordWrap: 'break-word' }}><span className="underline underline-offset-8 decoration-green-500 italic decoration-4 mx-4 md:hover:text-7xl gtransition">-2s</span> Response Time</p>
            </section>
        </article>
        <article className="md:col-span-5 w-full h-full p-5 gap-4 flex flex-col rounded-3xl undefined bg-black justify-start items-start relative border-2 border-white/5">
            <section className="w-full flex flex-col gap-2 rounded-lg min-h-[13rem] max-h-[16rem] flex-grow overflow-y-auto max-md:min-h-[8rem]">
                <p className="text-center w-full h-full justify-center items-center flex text-5xl max-md:text-2xl font-semibold text-white px-5 " style={{ wordWrap: 'break-word' }}>Completely <span className="underline underline-offset-8 decoration-green-500 italic decoration-4 mx-4 md:hover:text-7xl gtransition">free</span></p>
            </section>
        </article>
        <article className="md:col-span-3 w-full h-full p-5 gap-4 flex flex-col rounded-3xl undefined bg-black justify-start items-start relative border-2 border-white/5">
            <section className="w-full flex flex-col gap-2 rounded-lg min-h-[13rem] max-h-[16rem] flex-grow overflow-y-auto max-md:min-h-[8rem]">
                <p className="text-center w-full h-full justify-center items-center flex text-5xl max-md:text-2xl font-semibold text-white px-5 " style={{ wordWrap: 'break-word' }}>Highly functional</p>
            </section>
        </article>
    </div>
    </main>
  )
}
