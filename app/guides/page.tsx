import { Plus } from "lucide-react"

import Guide from "@/components/guides/guide"

export const runtime = "edge"

export default function Guides() {
  return (
    <main className="min-h-screen flex flex-col justify-start items-center py-4 w-full px-5">
      <section className="md:max-w-[1240px] w-full flex flex-col gap-5 justify-center items-center text-left py-5 sm:px-12">
        <div className="flex items-center gap-2 w-full flex-wrap">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight grow">
            Guides
          </h1>
          {process.env.NEXT_PUBLIC_SUPABASE_URL &&
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && (
              <a
                className="flex items-center gap-2 bg-white/90 text-black hover:bg-white active:opacity-50 font-medium max-md:text-sm py-2 px-4 rounded-full gtransition cursor-pointer"
                href="/guides/create"
              >
                New
                <span className="text-lg md:text-xl rotate-180 gtransition">
                  <Plus />
                </span>
              </a>
            )}
        </div>
        {process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? (
          <Guide />
        ) : (
          <p className="text-neutral-300 text-center h-[400px] flex justify-center items-center text-3xl">
            Development mode activated
          </p>
        )}
      </section>
    </main>
  )
}
