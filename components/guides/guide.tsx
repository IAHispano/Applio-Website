"use client"

import { useEffect, useState } from "react"
import { Button, Divider, Input, Progress, Spinner } from "@nextui-org/react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"
import { ArrowRight, SearchIcon } from "lucide-react"
import InfiniteScroll from "react-infinite-scroll-component"

export default function Guide() {
  const [search, setSearch] = useState("")
  const [data, setData] = useState<any[]>([])
  const [_error, setError] = useState(false)
  const [posts, setPosts] = useState<any[] | null>(null)
  const supabase = createClientComponentClient()
  const [end, setEnd] = useState(14)
  const [hasMore, setHasMore] = useState(true)
  const [increment, setIncrement] = useState(10)
  const [loading, setLoading] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("")
  const [algorithmFilter, setAlgorithmFilter] = useState("")

  async function fetchData() {
    if (loading) return

    setLoading(true)

    let query = supabase
      .from("guides")
      .select("*")
      .order("created_at", { ascending: false })

    if (search) {
      query = query.ilike("title", `%${search}%`)
    }

    if (selectedFilter) {
      query = query.ilike("type", selectedFilter)
    }

    if (algorithmFilter) {
      query = query.ilike("algorithm", algorithmFilter)
    }

    query = query.range(0, end)

    try {
      const updatedEnd = end
      const { data: fetchedData, error } = await query

      if (error) {
        setError(true)
      } else {
        if (fetchedData.length < updatedEnd) {
          setHasMore(false)
        } else {
          setHasMore(true)
        }

        const updatedPosts = await Promise.all(
          fetchedData.map(async (post: any) => {
            const full_name = post.created_by || "Unknown User"

            return { ...post, full_name }
          })
        )

        setData(fetchedData)
        setPosts(updatedPosts)
        if (data.length === null) {
          const error = new Error("No data available.")
          console.error("Error fetching data:", error)
          setError(true)
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [end, selectedFilter, algorithmFilter])

  function loadmore() {
    if (hasMore && !loading) {
      setEnd(end + increment)
    }
  }

  function formatRelativeDate(dateString: string | number | Date) {
    const currentDate = new Date()
    const postDate = new Date(dateString)
    const timeDifference = currentDate.getTime() - postDate.getTime()

    const minuteMillis = 60000
    const hourMillis = 3600000
    const dayMillis = 86400000

    if (timeDifference < minuteMillis) return "Now"
    if (timeDifference < hourMillis)
      return `about ${Math.floor(timeDifference / minuteMillis)} minute${timeDifference < 120000 ? "" : "s"} ago`
    if (timeDifference < dayMillis)
      return `about ${Math.floor(timeDifference / hourMillis)} hour${timeDifference < 7200000 ? "" : "s"} ago`
    return `about ${Math.floor(timeDifference / dayMillis)} day${timeDifference < 172800000 ? "" : "s"} ago`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center ">
        <Progress
          isIndeterminate
          aria-label="Loading..."
          className="max-w-xs md:max-w-md "
          color="success"
          size="sm"
        />
      </div>
    )
  }

  if (_error) {
    return (
      <p
        className="text-neutral-300 text-lg flex items-center justify-center"
        suppressHydrationWarning
      >
        No guides found.
      </p>
    )
  }

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setEnd(9)
    setIncrement(9)
    fetchData()
  }

  return (
    <main className="min-w-screen min-h-screen bg-background">
      {!loading && (
        <>
          <form
            className="flex items-center justify-start text-center max-md:px-12 max-sm:px-3  w-full"
            onSubmit={handleSearchSubmit}
          >
            <Input
              classNames={{
                base: "w-5/6 h-10 pb-4 max-md:mx-12 justify-center flex items-center mx-auto",
                mainWrapper: "h-full w-full",
                input: "text-small",
                inputWrapper:
                  "h-full w-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Press ENTER to search a guide..."
              size="sm"
              startContent={<SearchIcon size={18} />}
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <InfiniteScroll
            dataLength={data.length}
            hasMore={hasMore}
            next={loadmore}
            className="gap-4 flex flex-col my-8"
            loader={
              <div className="flex items-center justify-center">
                <Spinner color="success" />
              </div>
            }
          >
            {posts?.map((post: any, index: number) => {
              const {
                id,
                created_at,
                created_by,
                type,
                title,
                description,
                image,
              } = post
              const formattedDate = created_at
                ? formatRelativeDate(created_at)
                : "Unknown Date"
              const imageStyle =
                index === 0 ? { height: "220px" } : { height: "180px" }

              return (
                <div className="w-full" key={id}>
                  <section className="w-full flex flex-col items-center justify-center gap-4">
                    <a
                      className="mx-12 w-5/6  hover:scale-[99%] flex flex-col text-left justify-left items-left gap-2 p-3 px-6  border border-white/30  bg-black bg-opacity-70 rounded-xl gtransition cursor-pointer "
                      href={`/guides/${id}`}
                    >
                      {/* <img src={image || "/applio_logo.png"} className="w-full rounded-xl flex justify-center items-center object-cover object-top" style={imageStyle} alt="guide banner"/> */}
                      <p className="text-4xl font-bold px-1 mt-2 text-white flex-wrap md:max-w-4xl max-w-sm">
                        {title || "Unknown Title"}
                      </p>
                      <p className="text-lg px-1 whitespace-pre-line flex-wrap md:max-w-4xl">
                        {description || "Unknown Description"}
                      </p>
                      <div className="flex justify-start w-full flex-wrap gap-2 items-center md:justify-end">
                        <div
                          className="flex gap-2 items-center justify-center bg-neutral-900 hover:bg-neutral-800 active:opacity-50 rounded-lg p-2 gtransition max-md:w-full max-md:mt-2 z-50"
                          onClick={() => {
                            window.location.href = `/user/${created_by}`
                          }}
                        >
                          <p className="text-neutral-300 font-medium md:text-xs text-sm">
                            by{" "}
                            <span className="text-white flex-wrap truncate">
                              {created_by || "Unknown User"}
                            </span>{" "}
                            {formattedDate}
                          </p>
                        </div>
                      </div>
                    </a>
                  </section>
                </div>
              )
            })}
          </InfiniteScroll>
        </>
      )}
    </main>
  )
}
