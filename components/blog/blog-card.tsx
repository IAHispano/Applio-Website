import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Spinner } from "@nextui-org/react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"

import { Database } from "@/app/types/database"

export default function BlogCard() {
  const supabase = createClientComponentClient<Database>()
  const [data, setData] = useState<any[] | null>(null)
  const [user, setUser] = useState<any | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      // Fetch user data based on full name
      const { data: userData, error: userError } = await supabase
        .from("blog")
        .select("*")
        .order("created_at", { ascending: false })
      if (userError) {
        setError(userError)
        return
      }
      setData(userData)
      setLoading(false)
    }

    fetchData()
  }, []);

  const formatDate = (dateStr: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
    return new Date(dateStr).toLocaleDateString(undefined, options)
  }

  return (
    <div className="w-full max-w-6xl p-5 pt-0 flex flex-col gap-5 text-white">
      {loading === false && (
        <h1 className="text-8xl font-semibold mb-4 dark:text-white text-black">
          Latest news
        </h1>
      )}
      {loading ? (
        <Spinner color="success" />
      ) : (
        data &&
        data.map((item, index) => (
          <a
            key={item.id}
            href={`/blog/${item.id}`}
            className="w-full bg-black rounded-xl flex gap-5 h-32 md:hover:h-40 first:h-44 md:[&_img]:hover:opacity-70 md:first:hover:h-52 md:hover:scale-[101%] md:active:scale-95 gtransition relative overflow-hidden"
          >
            <div className="flex-grow flex flex-col justify-center items-start p-10 z-10">
              <img
                className="z-10 saturate-150 absolute top-0 left-0 w-full h-full object-cover object-center opacity-30 dark:opacity-50 blur scale-110 gtransition ltransition"
                src={item.image_url}
                alt={item.title}
              />
              <p className="text-xl md:text-3xl font-bold tracking-tight text-left z-30">
                {item.title}
              </p>
              <p className="text-sm md:text-lg text-neutral-300 text-left z-30">
                {formatDate(item.created_at)}
              </p>
            </div>
          </a>
        ))
      )}
    </div>
  )
}
