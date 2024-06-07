"use client"

import { useState } from "react";
import Avatar from "./avatar";

export default function NavbarMobile() {
    const [isOpen, setIsOpen] = useState<Boolean>(false)
    const [dropdownOpen, setDropdownOpen] = useState(0)

    function handleDropdown(dropdown: number) {
        if (dropdown === dropdownOpen) {
            setDropdownOpen(0)
        } else {
            setDropdownOpen(dropdown)
        }
    }

    return (
        <>
        {!isOpen && (
            <button onClick={() => setIsOpen(true)} className="fixed top-0 inset-x-0 z-50 m-4 p-3 w-fit bg-white/10 rounded-xl backdrop-blur-3xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
        )}
        {isOpen && (
        <div className="overflow-auto bg-[#110F0F] backdrop-blur-lg md:w-[80%] md:h-[8svh] max-md:h-svh rounded-b-xl border border-white/10 flex max-md:flex-col md:justify-center md:items-center mx-auto max-md:p-4">
            <div className="flex md:flex-cols-3 max-md:flex-col md:px-16 px-2 w-full">
            <a className="text-3xl font-semibold tracking-tight py-0.5" href="/">Applio</a>
            <button className="absolute top-0 right-0 mx-3 my-3 p-3 text-3xl rounded-xl hover:bg-red-500/20 slow" onClick={() => setIsOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <Avatar />
            <div className="flex max-md:flex-col gap-4 w-full py-2 items-center justify-start md:ml-12 mb-1 max-md:mt-4 text-white/80">
                <a className="col-span-1 max-md:p-1 max-md:rounded-xl max-md:w-full" href="/premium">Pricing</a>
                <a className="col-span-1 max-md:p-1 max-md:rounded-xl max-md:w-full" href="/models">Explore</a>
                <a className="col-span-1 max-md:p-1 max-md:rounded-xl max-md:w-full" href="/news">News</a>
                <div className="col-span-1 max-md:p-2 max-md:px-4 max-md:rounded-xl max-md:w-full text-white/80 relative">
                <button className="flex justify-between w-full" onClick={() => handleDropdown(1)}>            
                <svg className="absolute left-0" width="2" height="40" viewBox="0 0 2 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="2" height="40" rx="1" fill="#A1A1A1"/>
                </svg>
                <h1 className="font-bold pt-2">Products</h1>
                {dropdownOpen != 1 && (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>)}
                {dropdownOpen === 1 && (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>)}
                </button>
                {dropdownOpen === 1 && (
                <div className="flex flex-col gap-4 mt-4">
                    <a className="rounded-xl p-2" href="/products/rvc">Applio RVC</a>
                    <a className="rounded-xl p-2" href="/products/app">Applio APP</a>
                    <a className="rounded-xl p-2" href="https://docs.applio.org" target="_blank">Applio Docs</a>
                    <a className="rounded-xl p-2" href="/products/bot">Applio Bot</a>
                    <a className="rounded-xl p-2" href="https://github.com/IAHispano/Applio-plugins" target="_blank">Applio Plugins</a>
                    <a className="rounded-xl p-2" href="/products/api">Applio API</a>
                    <a className="rounded-xl p-2" href="https://github.com/blaise-tk/rvc_cli" target="_blank">RVC CLI</a>
                </div>
                )}
                </div>
                <div className="col-span-1 max-md:p-2 max-md:px-4 max-md:rounded-xl max-md:w-full text-white/80 relative">
                <svg className="absolute left-0" width="2" height="40" viewBox="0 0 2 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="2" height="40" rx="1" fill="#A1A1A1"/>
                </svg>
                <button className="flex justify-between w-full" onClick={() => handleDropdown(2)}>
                <h1 className="font-bold pt-2">About Us</h1>
                {dropdownOpen != 2 && (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>)}
                {dropdownOpen === 2 && (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>)}
                </button>
                {dropdownOpen === 2 && (
                <div className="flex flex-col gap-4 mt-4">
                    <a className="rounded-xl p-2" href="/team">Team</a>
                    <a className="rounded-xl p-2" href="/join-team">Join Us</a>
                    <a className="rounded-xl p-2" href="/history">History</a>
                    <a className="rounded-xl p-2" href="/branding">Brand</a>
                </div>
                )}
                </div>
            </div>
            </div>
        </div>
        )}
        </>
    )
}