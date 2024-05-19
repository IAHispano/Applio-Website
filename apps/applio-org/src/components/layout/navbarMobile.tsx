"use client"

import { useState } from "react";
import Avatar from "./avatar";

export default function NavbarMobile() {
    const [isOpen, setIsOpen] = useState<Boolean>(false)

    return (
        <>
        {!isOpen && (
            <button onClick={() => setIsOpen(true)} className="fixed top-0 inset-x-0 z-50 m-4 p-3 w-fit bg-white/10 rounded-xl backdrop-blur-3xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
        )}
        {isOpen && (
        <div className="bg-white/[3%] backdrop-blur-lg md:w-[80%] md:h-[8svh] max-md:h-svh rounded-b-xl border border-white/10 flex max-md:flex-col md:justify-center md:items-center mx-auto max-md:p-4 max-md:bg-neutral-800/80 max-md:rounded-t-3xl">
            <div className="flex md:flex-cols-3 max-md:flex-col md:px-16 px-2 w-full">
            <p className="text-3xl font-semibold tracking-tight py-0.5">Applio</p>
            <button className="absolute top-0 right-0 mx-6 my-3 px-3 py-1 text-3xl bg-white/10 rounded-xl hover:bg-red-500/20 slow" onClick={() => setIsOpen(false)}>X</button>
            <div className="flex max-md:flex-col gap-6 w-full py-2 items-center justify-start md:ml-12 mb-1 max-md:mt-4">
                <a className="col-span-1 text-lg max-md:bg-white/10 max-md:p-4 max-md:rounded-xl max-md:w-full">Pricing</a>
                <a className="col-span-1 text-lg max-md:bg-white/10 max-md:p-4 max-md:rounded-xl max-md:w-full">Explore</a>
                <a className="col-span-1 text-lg max-md:bg-white/10 max-md:p-4 max-md:rounded-xl max-md:w-full">Products</a>
                <a className="col-span-1 text-lg max-md:bg-white/10 max-md:p-4 max-md:rounded-xl max-md:w-full">About us</a>
            </div>
            <Avatar />
            </div>
        </div>
        )}
        </>
    )
}