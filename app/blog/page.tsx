"use client"
import BlogCard from "@/components/blog/blog-card"
import Head from "next/head"

export default function BotPage() {
  return ( 
    <main className="flex flex-col justify-center items-center text-center min-h-[600px]">
    <Head>
      <meta name="description" content="Visit Applio's blog with the latest news!" />
    </Head> 
        <section className="md:w-full max-w-6xl p-4 flex flex-col gap-5 rounded-medium max-md:mx-2">
          <h1 className="text-8xl font-semibold mt-4">Latest news</h1>
          <div className="my-8">
            <BlogCard />  
          </div>
        </section>
  </main>
)
}
