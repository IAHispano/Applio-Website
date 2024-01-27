"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Guides() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/"); 
        }, 1000); 
    }, [])

    return (
        <main className="min-h-screen flex flex-col justify-start items-center py-20 w-full px-5">
            <section className="max-w-6xl w-full flex flex-col gap-5 justify-center items-center text-left py-5">
                <h1 className="font-extrabold tracking-[-0.04em] leading-none text-[40px] md:text-5xl lg:text-[80px] max-w-lg md:max-w-xl lg:max-w-4xl text-center text-white">
                    Coming soon
                </h1>
            </section>
        </main>
    )
}
