"use client"

import BlogCard from "@/components/blog/blog-card"

export default function BlogPage() {
  return (
    <main className="flex flex-col justify-center items-center text-center min-h-[600px]">
      <section className="md:w-full max-w-7xl p-4 flex flex-col gap-5 rounded-medium max-md:mx-2 justify-center items-center place-items-center">
        <div className="my-8">
        {process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? (
            <BlogCard />
          ) : (
            <p className="text-neutral-300 text-center h-[400px] flex justify-center items-center text-3xl">Development mode activated</p>
          )}
        </div>
      </section>
    </main>
  )
}
