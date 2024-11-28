"use client"

import { useEffect } from "react"

// remove for local development


export default function Discord() {
    useEffect(() => {
        window.location.href = "https://discord.gg/urxFjYmYYh"
    }, [])
    
    return (
        <main className="mt-24 flex justify-center items-center flex-col m-auto">
            <h1 className="text-xs text-neutral-300">Redirecting... if it doesn't do it automatically <a href="https://discord.gg/urxFjYmYYh" className="text-xs text-neutral-200 underline hover:text-white slow">click here</a>.</h1>
            
        </main>
    )
}

