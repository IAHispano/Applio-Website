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
  }, [])

  const formatDate = (dateStr: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
    return new Date(dateStr).toLocaleDateString(undefined, options)
  }

  return (
    <>
    {loading === false && (
      <h1 className="text-7xl font-bold mb-4 dark:text-white text-black">
        Latest news
      </h1>
    )}
    <div className="grid grid-cols-1 md:grid-cols-auto-fill md:grid-cols-5 w-full grid-rows-1 gap-4 gtransition mt-10 place-items-center justify-center items-center" >
      {loading ? (
        <Spinner color="success" />
      ) : (
        data &&
        data.map((item, index) => (
          <div className={`w-full  place-items-center md:col-span-${Math.ceil(item.title.length / 10)}`} key={item.id}>
            <a
              href={`/blog/${item.id}`}
              className="bg-black rounded-xl flex flex-col md:flex-row gap-5 h-full w-full md:[&_img]:hover:opacity-70  md:active:scale-95 gtransition relative overflow-hidden border border-white/30"
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
          </div>
        ))
      )}
    </div>
    </>
  )
}
