"use client"

import { useEffect, useState } from "react"
import { Progress, Spinner } from "@nextui-org/react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Search } from "lucide-react"
import InfiniteScroll from "react-infinite-scroll-component"

import getModelsByTitle from "@/app/actions/search-model"
import SortBy from "./sort-by"
import TestCard from "./test-card"

export default function ModelsData() {
  const supabase = createClientComponentClient()
  const [modeldata, setModeldata] = useState<any>()
  const [end, setEnd] = useState(14)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [_error, setError] = useState<Error | null>(null)
  const [value, setValue] = useState<string>("")
  const [selectedSortBy, setSelectedSortBy] = useState(null)

  const handleSelect = (animal: any) => {
    setSelectedSortBy(animal)
  }

  const fetchData = async () => {
    if (loading || !supabase) return
    setLoading(true)

    let query = supabase
      .from("models")
      .select("*")
      .order("created_at", { ascending: false })
      .range(0, end)

    const { data, error, count } = await query

    if (error) {
      setError(error as any)
      setLoading(false)
    } else {
      const updatedEnd = end
      if (data.length < updatedEnd) {
        setHasMore(false)
      } else {
        setHasMore(true)
      }

      setModeldata(data)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [end])

  useEffect(() => {
    const fetchDataByTitle = async () => {
      if (value !== "") {
        setLoading(true)
        const result = await getModelsByTitle(
          value,
          selectedSortBy !== null ? selectedSortBy : undefined
        )
        setHasMore(false)
        setModeldata(result)
        setLoading(false)
      } else {
        fetchData()
      }
    }

    fetchDataByTitle()
  }, [value, selectedSortBy])

  function loadmore() {
    if (hasMore && !loading) {
      setEnd(end + 10)
    }
  }

  if (!modeldata) {
    return (
      <div className="flex items-center justify-center h-[40svh]">
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

  return (
    <section>
      <InfiniteScroll
        dataLength={modeldata.length}
        hasMore={hasMore}
        next={loadmore}
        loader={
          <div className="flex items-center justify-center">
            <Spinner color="success" />
          </div>
        }
        endMessage={
          <div className="flex items-center justify-center">
            <b>You have reached the end.</b>
          </div>
        }
      >
        <div className="w-full my-4">
          <div className="flex max-md:flex-col gap-4 items-center md:justify-left max-md:justify-center text-white">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="text-gray-400 w-5 h-5" />
              </span>
              <input
                className="md:w-[1470px] h-10 px-10 w-[300px] bg-white/10 hover:bg-white/20 rounded-full border border-white/20 focus:border-white/40 focus:outline-none focus:ring-0"
                placeholder="Search a model..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <SortBy onSelect={handleSelect} />
            </div>
          </div>
        </div>
        <section className="mt-4 grid grid-cols-1 2xl:gridcols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 pb-8 md:pb-8 mx-auto items-center justify-center w-full ">
          {modeldata.map((post: any, index: number) => {
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
      </InfiniteScroll>
    </section>
  )
}
