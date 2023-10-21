"use client"
import BlogCard from "@/components/blog/blog-card"

export default function BotPage() {
  return ( 
    <main className="w-full pt-16 flex flex-col top-0 justify-start items-center text-center min-h-screen">
        <section className="w-full max-w-6xl p-5 pt-0 flex flex-col gap-5">
            <BlogCard />  
        </section>
  </main>
)
}
