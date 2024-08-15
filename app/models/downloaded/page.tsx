"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"

import TestCard from "@/components/models/test-card"

export const runtime = "edge"

export default function ModelDownloaded() {
  const [search, _setSearch] = useState("")
  const [data, setData] = useState<any[] | null>(null)
  const [_error, setError] = useState<PostgrestError | null>(null)
  const [_posts, setPosts] = useState<any[] | null>(null)
  const supabase = createClientComponentClient()
  const [end, setEnd] = useState(14)
  const [hasMore, setHasMore] = useState(true)
  const [increment, _setIncrement] = useState(10)
  const [loading, setLoading] = useState(false)
  const [selectedFilter, _setSelectedFilter] = useState("")
  const [algorithmFilter, _setAlgorithmFilter] = useState("")

  async function fetchData() {
    if (loading) return
    setLoading(true)
    let query = supabase
      .from("models")
      .select("*")
      .order("image_url", { ascending: false })

    query = query.range(0, 9)

    try {
      const updatedEnd = end
      const { data: fetchedData, error } = await query

      if (error) {
        setError(error)
      } else {
        if (fetchedData.length < updatedEnd) {
          setHasMore(false)
        } else {
          setHasMore(true)
        }

        setData(fetchedData)
        setPosts(fetchedData)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setError(error as PostgrestError)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [end, search, selectedFilter, algorithmFilter])

  if (!data) {
    return (
      <div className="justify-center items-center flex flex-col h-72"></div>
    )
  }

  return (
    <main className="container flex flex-col justify-center items-center pb-8 pt-6 gap-5 md:py-10 mx-auto text-center max-w-8xl">
      <div>
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl my-4">
          Your model has been{" "}
          <span className="bg-gradient-radial bg-clip-text text-transparent">
            downloaded
          </span>{" "}
          <span className="bg-gradient-radial bg-clip-text text-transparent">
            successfully
          </span>
          !
        </h2>
      </div>
      <h3 className="text-2xl font-bold leading-tight tracking-tighter md:text-4xl mt-12">
        Explore more models:
      </h3>
      <section className="grid grid-cols-1 md:grid-cols-5 max-w-8xl gap-5 py-8 md:py-8 mx-16 items-center justify-center">
        {data?.map((post: any, index: number) => {
          const {
            name,
            image_url: imageUrl,
            created_at,
            link,
            id,
            epochs,
            version,
            type,
            algorithm,
            author_id,
            author_username,
            likes,
          } = post
          return (
            <div className="w-full button-cursor" key={id}>
              <TestCard
                name={name}
                imageUrl={imageUrl}
                created_at={created_at}
                id={id}
                link={link}
                epochs={epochs}
                version={version}
                type={type}
                algorithm={algorithm}
                author_id={author_id}
                likes={likes}
                author_username={author_username}
              />
            </div>
          )
        })}
      </section>
      <div className=" rounded-2xl w-11/12 sm:w-[581px] h-40 sm:h-[80px] p-0.5 z-10 mx-auto hover:w-full gtransition">
        <a
          className="rounded-[14px] size-full bg-white/10 border-2 border-zinc-600  flex flex-col  items-center justify-center text-center cursor-pointer"
          href="/models"
        >
          <p className="dark:text-white text-3xl w-[304px] h-10 flex items-center justify-center p-3 text-black text-center">
            See more models
          </p>
        </a>
      </div>
    </main>
  )
}
