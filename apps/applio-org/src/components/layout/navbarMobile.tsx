"use client"

import { useEffect, useState } from "react";
import Avatar from "./avatar";
import { motion } from "framer-motion";

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

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <header>
        <div>
            <div className="flex xl:flex-cols-3 max-xl:flex-col w-full">
            <div className="flex justify-between p-4 h-fit bg-gradient-to-b from-[#110F0F] to-transparent backdrop-filter backdrop-blur-lg w-full">
            <a className="text-3xl font-semibold tracking-tight py-0.5" href="/">Applio</a>
            {isOpen && (
            <motion.button
            onClick={() => setIsOpen(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            >
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ rotate: 180 }}
            >
                <motion.path
                d="M18 6 6 18"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                />
                <motion.path
                d="m6 6 12 12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                />
            </motion.svg>
            </motion.button>
        )}
        {!isOpen && (
            <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            >
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{rotate: 180}}
                transition={{rotate: 0}}
                
                exit={{rotate: 90}}
            >
                <motion.line
                x1="4"
                x2="20"
                y1="12"
                y2="12"
                />
                <motion.line
                x1="4"
                x2="20"
                y1="6"
                y2="6"
                />
                <motion.line
                x1="4"
                x2="20"
                y1="18"
                y2="18"
                />
            </motion.svg>
            </motion.button>
        )}
            </div>
            {isOpen && (
            <div className="overflow-hidden fixed top-0 h-screen w-full mt-12 no-scroll">
            <section className="backdrop-filter backdrop-blur-xl mt-1 p-4 h-screen">
            <div className="flex max-xl:flex-col gap-4 w-full py-2 items-start justify-start xl:ml-12 mb-1 max-xl:mt-4 text-white/80">
                <a className="col-span-1 max-md:p-1 max-md:rounded-xl max-md:w-full" href="/models">Explore</a>
                <a className="col-span-1 max-md:p-1 max-md:rounded-xl max-md:w-full" href="/learn">Learn</a>
                <div className="col-span-1 max-md:px-1 max-md:rounded-xl max-md:w-full text-white/80 relative">
                <button className="flex justify-between w-full" onClick={() => handleDropdown(1)}>  
                {dropdownOpen === 1 && (          
                <svg className="absolute -left-1" width="2" height="40" viewBox="0 0 2 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="2" height="40" rx="1" fill="#A1A1A1"/>
                </svg>
                )}
              <h1 className={`pt-2 ${dropdownOpen === 1 ? 'font-bold pl-2' : ''}`}>Products</h1>
                {dropdownOpen === 1 && (
                    <svg className="m-3" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 7L7 1L1 7" stroke="#A1A1A1" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                )}
                {dropdownOpen != 1 && (
                    <svg className="rotate-180 m-3" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 7L7 1L1 7" stroke="#A1A1A1" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                )}
                </button>
                {dropdownOpen === 1 && (
                <div className="flex flex-col gap-4 mt-4 pb-6">
                    <a className="rounded-xl p-2" href="/products/rvc">Applio</a>
                    <a className="rounded-xl p-2" href="/products/app">Desktop App</a>
                    <a className="rounded-xl p-2" href="/products/playground">Playground</a>
                    <a className="rounded-xl p-2" href="https://docs.applio.org" target="_blank">Documentation</a>
                    <a className="rounded-xl p-2" href="/products/bot">Discord Bot</a>
                    <a className="rounded-xl p-2" href="https://github.com/IAHispano/Applio-plugins" target="_blank">Marketplace</a>
                    <a className="rounded-xl p-2" href="/products/api">Free API</a>
                    <a className="rounded-xl p-2" href="https://github.com/blaise-tk/rvc_cli" target="_blank">RVC CLI</a>
                </div>
                )}
                </div>
                <div className="col-span-1 max-md:px-1 max-md:rounded-xl max-md:w-full text-white/80 relative">
                {dropdownOpen === 2 && (          
                <svg className="absolute -left-1" width="2" height="40" viewBox="0 0 2 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="2" height="40" rx="1" fill="#A1A1A1"/>
                </svg>
                )}
                <button className="flex justify-between w-full" onClick={() => handleDropdown(2)}>
                <h1 className={`pt-2 ${dropdownOpen === 2 ? 'font-bold pl-2' : ''}`}>About Us</h1>
                {dropdownOpen === 2 && (
                    <svg className="m-3" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 7L7 1L1 7" stroke="#A1A1A1" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                )}
                {dropdownOpen != 2 && (
                    <svg className="rotate-180 m-3" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 7L7 1L1 7" stroke="#A1A1A1" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                )}
                </button>
                {dropdownOpen === 2 && (
                <div className="flex flex-col gap-4 mt-4">
                    <a className="rounded-xl p-2" href="/about/team">Team</a>
                    <a className="rounded-xl p-2" href="/about/mission">Mission</a>
                    <a className="rounded-xl p-2" href="https://discord.gg/iahispano" target="_blank">Contact Us</a>
                </div>
                )}
                </div>
                <Avatar />
            </div>
            </section>
            </div>
        )}
            </div>
        </div>
        </header>
    )
}